const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AccountShema = new Schema({
    _id: String,
    username: String,
    password: String,
    role: String,
}, {
    collection: 'account'
});

const AccountModel = mongoose.model('account', AccountShema);

module.exports = AccountModel;
