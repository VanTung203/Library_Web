const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelBuyBook = new Schema({
    idthe: { type: String, default: '' },
    iduser: { type: String, default: '' },
    tensach: { type: String, default: '' },
    ngaycap: { type: String, default: '' },
    tinhtrang: { type: Boolean, default: false },
    ngayhethan: { type: String, default: '' },
});

module.exports = mongoose.model('buybook', ModelBuyBook);
