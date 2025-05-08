const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelCart = new Schema({
    masinhvien: { type: String, default: '' },
    nameUser: { type: String, default: '' },
    idthe: { type: String, default: '' },
    ngaycap: { type: String, default: '' },
    ngayhethan: { type: String, default: '' },
    tinhtrang: { type: Boolean, default: false },
});

module.exports = mongoose.model('cart', ModelCart);