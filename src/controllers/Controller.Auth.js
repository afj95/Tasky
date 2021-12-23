const User = require('../models/user');
const { Response } = require('../tools/Response');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../tools/SendEmail');
const async = require('async');
const { generateRandomNumbers } = require('../tools/generateNumbers');

const register = (req, res) => {

    const { user } = req.body;
    if(user) {
        const newUser = new User(user);

        User.findOne({username: newUser.username}, async (err, user) => {
            if(err) {
                return res.status(500).send(Response(
                    'Error while searching the user',
                    500,
                    {error: err.message})
                )
            } else if(user) {
                return res.status(409).send(Response(
                    'You already have an account with this email or username try to login',
                    409,
                    {err: 'conflict'})
                )
            } else {
                await newUser.save((err, user) => {
                    if(err) {
                    console.log(`Error while saving the user data`, err)
                        return res.status(500).send(Response(
                            'Error while saving the user data',
                            500,
                            {err: err.message})
                        )
                    } else {
                        return res.status(201).send(Response(
                            'User registered successfully',
                            201,
                            {user: user}
                        ))
                    }
                });
            }
        })
    } else {
        return res.status(404).send(Response(
            'User data not found',
            404
        ))
    }
};

const login = (req, res) => {
    const { user } = req.body;

    if(user) {
    // searching via username
        User.findOne({username: user.username} , async (err, FoundedUser) => {
            if(err) {
                return res.status(500).send(Response(
                    'Error while searching the user',
                    500,
                    {err: err.message})
                )
            } else if(FoundedUser) {
                // Checking password
                bcrypt.compare(user.password, FoundedUser.password, async (err, result) => {
                    if(err) {
                        return res.status(500).send(Response(
                            'Error while checking the passwords',
                            500,
                            {err: err.message})
                        )
                    }
                    if(!result) {
                        return res.status(403).send(Response(
                            'Wrong password',
                            403
                        ))
                    } else {
                        /**
                         * The time the user logging in,
                         * To register the token expires time
                         * for blacklist DB after log out
                        */
                        FoundedUser.loggedInDate = new Date();

                        await FoundedUser.save((err, saved) => {
                            if(err) {
                                return res.status(500).send(Response(
                                    'Error while saving the user',
                                    500,
                                    {err: err.message})
                                )
                            }
                            return res.status(200).send(Response(
                                'Founded',
                                200,
                                {user: saved}
                            ))
                        });
                    }
                });
            } else {
                console.log('Not founded')
                return res.status(404).send(Response(
                    'User not found',
                    404
                ))
            }
        })//.clone().catch(err => console.log('err', err))
    } else {
        return res.status(404).send(Response(
            'User data not found',
            404
        ))
    }
};

const forgetPass = async (req, res) => {
    const { email } = req.body;

    // return res.status(200).send(Response(
    //     'Mail sent successfully',
    //     200
    // ))

    async.waterfall([
        (done) => {
            const code = generateRandomNumbers();
            done(null, code);
        }, // end of generatin token function
        (code, done) => {
            User.findOne({email: email}, async (err, user) => {
                if(err) {
                    return res.status(500).send(Response(
                        'Error while saving the user',
                        500,
                        {err: err.message})
                    )
                }
                if(!user) {
                    return res.status(404).send(Response(
                        'User not found',
                        404
                    ))
                }
                else {
                    console.log('finding the user')
                    user.resetPasswordCode = code;
                    user.resetPasswordCodeExpires = Date.now() + 900000 // 0.25 hour;
                    await user.save((err) => {
                        if(err) {
                            return res.status(500).send(Response(
                                'Error while saving the user',
                                500,
                            ))
                        }
                        if(!user) {
                            return res.status(404).send(Response(
                                'User not found',
                                404
                            ))
                        }
                        // done(token, user)
                        done(err, code, user)
                    })
                }
            })
        }, // end of finding the user via email function
        (code, user) => {
            console.log('sending email...')
            sendEmail(code, user).then(() => {
                console.log('mail sent')
                return res.status(200).send(Response(
                    'Mail sent successfully',
                    200
                ))
            }).catch(() => {
                return res.status(500).send(Response(
                    'A problem happened when trying to send an email',
                    500
                ))
            })
        }, // end of sending email function.
    ], (err) => {
            if(err) {
                return res.status(500).send(Response(
                    err,
                    500,
                ))
            }
        }
    )
}

const reset = async (req, res) => {
    const { password, code } = req?.body;

    User.findOne({
        resetPasswordCode: code,
        resetPasswordCodeExpires: { $gt: Date.now() } },
        async (err, user) => {
            if(err) {
                return res.status(500).send(Response(
                    'Error while searching the user',
                    500,
                ))
            }
            if(!user) {
                return res.status(404).send(Response(
                    'User not found',
                    404
                ))
            }
            user.password = password;
            user.resetPasswordCode = null;
            user.resetPasswordCodeExpires = null;
            await user.save(err => {
                if(err) {
                    return res.status(500).send(Response(
                        'Error while saving the user',
                        500,
                    ))
                }
                return res.status(200).send(Response(
                    'Password has been changed successfully',
                    200
                ))
            })
        }
    )
}

module.exports = {
    login,
    register,
    forgetPass,
    reset
};