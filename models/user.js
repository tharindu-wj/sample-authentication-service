const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    email: {
        type: String,
        required: true
    },
    image: { type: String },
    birthday: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    mobile: { type: String },
    address: { type: String },

    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },

    isAnonymous: { type: Boolean, default: false },
    nickname: {
        type: String,
        required: function() {
            return this.isAnonymous;
        }
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    method: {
        type: String,
        required: true,
        enum: ['local', 'google', 'facebook']
    },
    local: {
        username: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        verificationCode: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String
        }
    }
});

/**
 * Encrypt and save password
 */
userSchema.pre('save', async function(next) {
    try {
        // Social methods will skip this process
        if (this.method !== 'local') {
            next();
        }

        const user = await User.findOne({
            'local.username': this.local.username
        });

        // If update this process will skipped
        if (user) {
            next();
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.local.password, salt);

        this.local.password = passwordHash;
        next();
    } catch (err) {
        next(err);
    }
});

/**
 * Check password is valide
 */
userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (err) {
        throw new Error(err);
    }
};

const User = mongoose.model('user', userSchema);

module.exports = User;
