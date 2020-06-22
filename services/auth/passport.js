const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const { User } = require('../../models');

/**
 * Passport user authentiate by JWT token
 *
 * @param 'auth-token' form header
 */
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader('auth-key'),
            secretOrKey: global.config.JWT_SECRET
        },
        async (payload, done) => {
            try {
                // FInd the user specified in token
                const user = await User.findById(payload.sub.id);

                // If user doesn't exist
                if (!user) {
                    return done(null, false);
                }

                // Return the user
                done(null, user);
            } catch (err) {
                console.log(err);
                done(err, false);
            }
        }
    )
);

/**
 * Passport user authentiate username and password
 *
 * @param 'username' from request body
 * @param 'password' from request body
 */
passport.use(
    new LocalStrategy(
        {
            usernameField: 'username'
        },
        async (username, password, done) => {
            try {
                // find the user from email
                const user = await User.findOne({ 'local.username': username });

                // If user doesn't exist
                if (!user) {
                    return done(null, false, { message: 'Unknown user' });
                }
                console.log(user);
                // check password is matched
                const isMatch = await user.isValidPassword(password);
                if (!isMatch) {
                    return done(null, false, { message: 'Unknown password' });
                }
                
                // check user verified the account
                if (!user.isVerified) {
                    return done(null, false, {
                        message: 'You need to verifiy email first'
                    });
                }
                
                // return user object
                return done(null, user);
            } catch (err) {
                done(err, false);
            }
        }
    )
);

/**
 * Passport user authentiate with google oAuth
 *
 * @param 'access_token' from request body
 */
passport.use(
    'googleToken',
    new GooglePlusTokenStrategy(
        {
            clientID: global.config.GOOGLE_CLIENT_ID,
            clientSecret: global.config.GOOGLE_CLIENT_SECRET
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            try {
                // Check account alredy added
                const existingUser = await User.findOne({
                    'google.id': profile.id
                });

                if (existingUser) {
                    return done(null, existingUser);
                }

                // If new account
                const newUser = new User({
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    method: 'google',
                    google: {
                        id: profile.id
                    },
                    local: {
                        username: profile.emails[0].value
                    },
                    isVerified: true
                });

                await newUser.save();
                done(null, newUser);
            } catch (err) {
                done(err, false, err.message);
            }
        }
    )
);

/**
 * Passport user authentiate with facebook oAuth
 *
 * @param 'access_token' from request body
 */
passport.use(
    'facebookToken',
    new FacebookTokenStrategy(
        {
            clientID: global.config.FACEBOOK_CLIENT_ID,
            clientSecret: global.config.FACEBOOK_CLIENT_SECRET
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            try {
                // Check account alredy added
                const existingUser = await User.findOne({
                    'facebook.id': profile.id
                });

                if (existingUser) {
                    return done(null, existingUser);
                }

                // If new account
                const newUser = new User({
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    method: 'facebook',
                    facebook: {
                        id: profile.id
                    },
                    local: {
                        username: profile.emails[0].value
                    }
                });

                await newUser.save();
                done(null, newUser);
            } catch (err) {
                done(err, false, err.message);
            }
        }
    )
);
