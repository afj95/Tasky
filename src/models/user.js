const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: 'Name is required',
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        // email: {
        //     type: String,
        //     unique: true,
        //     required: true
        // },
        phoneNumber: {
            type: String,
            required: 'phoneNumber is required',
        },
        coverImage: {
            type: String,
        },
        password: {
            type: String,
            required: 'password is required',
        },
        // profileImage: {
        //     type: String,
        //     required: 'profile image is required',
        // },
        token: {
            type: String,
        },
        loggedInDate: {
            type: Date
        },
        // this for resetting password
        // @code: Randomly number will be sent to email.
        // @date: will be amount of time this code is valid.
        resetPasswordCode: String,
        resetPasswordCodeExpires: Date,
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// MUST use regular function not arrow function
// arros functions not working here in 'pre()' fun
userSchema.pre('save', function(next) {
    const user = this;

    // if there is no changes on password will not hashing.
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, async (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            // generating the token when the user regestered
            // and log him in to not going to log in page.
            user.token = await this.generateJWT();
            next();
        });
    });
});

userSchema.methods.generateJWT = function() {
    const today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    // The token will expires after 1 month.
    var expirationDate = new Date(year, month + 1, day);

    // const expirationDate = new Date(today);
    // expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        username: this.username,
        name: this.name,
        phoneNumber: this.phoneNumber,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        // getting the seconds by dividing to 1000
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
        // expiresIn: '10s'
    });
};

module.exports = mongoose.model("Users", userSchema);

// This is how to add 100 years to durrent date
/*
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var afterHundredYears = new Date(year + 100, month, day);
*/

// This is how to get the full date: day/month/year
/*
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = day + "/" + month + "/" + year;
*/


// This is how to set an expiration date for token.
// This sets the expires date after 2 months ( 60 days )
/* 
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
*/