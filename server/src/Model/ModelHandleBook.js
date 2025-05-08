const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelHandleBook = new Schema({
    masinhvien: { type: String, default: '' },
    nameBook: { type: String, default: '' },
    ngaymuon: { type: String, default: '' },
    ngayhethan: { type: String, default: '' },
    ngaytra: { type: String, default: '' },
    trangthai: {
        type: String,
        enum: ['chua_xac_nhan', 'da_xac_nhan', 'dang_gia_han', 'da_tra'],
        default: 'chua_xac_nhan'
    }
});

module.exports = mongoose.model('handleBook', ModelHandleBook);