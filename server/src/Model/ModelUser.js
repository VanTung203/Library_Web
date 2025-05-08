const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelUser = new Schema({
    name: { type: String, default: '' },
    masinhvien: { type: String, default: '' },
    address: { type: String, default: '' },
    birthday: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    idthe: { type: String, default: '' },
    createUser: { type: Date, default: Date.now() },
    isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('user', ModelUser);
