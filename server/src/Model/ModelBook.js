const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelBook = new Schema({
    masach: { type: String, default: '' },
    img: { type: String, default: '' },
    tensach: { type: String, default: '' },
    tacgia: { type: String, default: '' },
    nhaxuatban: { type: String, default: '' },
    mota: { type: String, default: '' },
    tinhtrang: { type: Boolean, default: false }
});

module.exports = mongoose.model('book', ModelBook);
