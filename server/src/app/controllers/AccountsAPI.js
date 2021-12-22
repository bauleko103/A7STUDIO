const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');

// models
const Account = require('../models/Account');

class AccountsAPI {
    // [GET] /accounts/checkExist/:email
    async checkExist(req, res) {
        try {
            const { email } = req.params;
            const accountExisted = await Account.findOne({ email: email });
            res.json({ exist: accountExisted ? true : false });
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /accounts/login
    async login(req, res) {
        const areFilled = Object.values(req.body).every(field => field !== '');
        if (!areFilled) {
            res.json({
                status: 'error',
                message: 'Không được bỏ trống!'
            })
            return;
        }
        try {
            const account = await Account
                .findOne({ email: req.body.email });
            if (!account) {
                res.json({
                    status: 'error',
                    message: 'Email hoặc mật khẩu không đúng!'
                })
                return;
            }
            const isRightPassword = await bcrypt.compare(req.body.password, account.password);
            if (!isRightPassword) {
                res.json({
                    status: 'error',
                    message: 'Email hoặc mật khẩu không đúng!'
                })
                return;
            }
            const { _id } = account;
            const tokens = generateToken({ _id });
            account.refreshToken = tokens.refreshToken;
            await account.save();
            res.json(tokens);
        } catch (error) {
            console.log(error);
        };
    };

    // [POST] /accounts/reset-password
    async resetPassword(req, res) {
        try {
            const areFilled = Object.values(req.body).every(field => field !== '');
            if (!areFilled) {
                res.json({
                    status: 'error',
                    message: 'Không được bỏ trống!'
                })
                return;
            }
            const { email, securityCode, newPassword, newPasswordConfirm } = req.body;
            const account = await Account
                .findOne({ email: email });
            if (!account) {
                res.json({
                    status: 'error',
                    message: 'Email không tồn tại!'
                })
                return;
            }
            if (newPassword !== newPasswordConfirm) {
                res.json({
                    status: 'error',
                    message: 'Mật khẩu mới không đồng bộ!'
                })
                return;
            }
            const isRightPassword = process.env.SECURITY_CODE === securityCode;
            if (!isRightPassword) {
                res.json({
                    status: 'error',
                    message: 'Mã bảo vệ không đúng!'
                })
                return;
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            account.password = hashedPassword;
            await account.save();
            res.json({
                statusText: 'success',
                message: 'Cài lại mật khẩu thành công'
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [PUT] /accounts
    async editAccount(req, res) {
        try {
            const { newEmail, ...body } = req.body;
            const areFilled = Object.values(body).every(field => field !== '');
            if (!areFilled) {
                res.json({
                    status: 'error',
                    message: 'Không được bỏ trống!'
                })
                return;
            }
            const { email, oldPassword, newPassword, newPasswordConfirm } = body;
            const account = await Account
                .findOne({ email: email });
            if (!account) {
                res.json({
                    status: 'error',
                    message: 'Email hoặc mật khẩu không đúng!'
                })
                return;
            }
            if (newPassword !== newPasswordConfirm) {
                res.json({
                    status: 'error',
                    message: 'Mật khẩu mới không đồng bộ!'
                })
                return;
            }
            const isRightPassword = await bcrypt.compare(oldPassword, account.password);
            if (!isRightPassword) {
                res.json({
                    status: 'error',
                    message: 'Email hoặc mật khẩu không đúng!'
                })
                return;
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            account.password = hashedPassword;
            if (newEmail) {
                const isExistEmail = await Account
                    .count({ email: newEmail });
                if (isExistEmail > 0) {
                    res.json({
                        status: 'error',
                        message: 'Email mới đã tồn tại!'
                    })
                    return;
                }
                account.email = newEmail;
            }
            await account.save();
            res.json({
                statusText: 'success',
                message: 'Cập nhật mật khẩu thành công'
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /accounts/register
    async register(req, res) {
        const areFilled = Object.values(req.body).every(field => field !== '');
        if (!areFilled) {
            res.json({
                status: 'error',
                message: 'Không được bỏ trống!'
            })
            return;
        }
        try {
            const { email, password, passwordConfirm } = req.body;
            const accountExisted = await Account
                .findOne({ email: email });
            if (accountExisted) {
                res.json({
                    status: 'error',
                    message: 'Tài khoản tồn tại!'
                })
                return;
            }
            if (password !== passwordConfirm) {
                res.json({
                    status: 'error',
                    message: 'Mật khẩu không đồng bộ!'
                })
                return;
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const account = new Account({
                ...req.body,
                password: hashedPassword
            });
            await account.save();
            res.json({
                status: 'success',
                message: 'Tạo tài khoản thành công'
            });
        } catch (error) {
            console.log(error);
        };
    };

    // [POST] /accounts/refreshToken
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) return res.sendStatus(401);
            const account = await Account
                .findOne({
                    refreshToken
                });
            if (!account) return res.sendStatus(403);
            const { _id } = account;
            const tokens = generateToken({ _id });
            account.refreshToken = tokens.refreshToken;
            await account.save();
            res.json(tokens);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new AccountsAPI;
