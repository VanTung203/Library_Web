const ModelUser = require('../Model/ModelUser');
const ModelCart = require('../Model/ModalCart');
const ModelBook = require('../Model/ModelBook');
const ModelHandleBook = require('../Model/ModelHandleBook');

class ControllerAdmin {
    GetUser(req, res) {
        ModelUser.find({}).then((dataUser) => res.status(200).json(dataUser));
    }
    
    async EditUser(req, res) {
        ModelUser.findOne({ _id: req.body.id }).then((dataUser) => {
            if (dataUser) {
                dataUser
                    .updateOne({
                        name: req.body.username || dataUser.name,
                        address: req.body.address || dataUser.address,
                        birthday: req.body.birthday || dataUser.birthday,
                        email: req.body.email || dataUser.email,
                    })
                    .then((data) => res.status(200).json({ message: 'Cập Nhật Thành Công', data }));
            } else {
                return;
            }
        });
    }

    async DeleteUser(req, res) {
        ModelUser.deleteOne({ _id: req.body.id }).then((data) =>
            res.status(200).json({ message: 'Xóa Người Dùng Thành Công ', data }),
        );
    }

    async EditCart(req, res) {
        ModelCart.findOne({ _id: req.body.id }).then((dataCart) => {
            if (dataCart) {
                dataCart
                    .updateOne({
                        idthe: req.body.idthe || dataCart.idthe,
                        masinhvien: req.body.maSinhVien || dataCart.masinhvien,
                        ngaycap: req.body.ngaycap || dataCart.ngaycap,
                        ngayhethan: req.body.ngayhethan || dataCart.ngayhethan,
                        tinhtrang: true,
                    })
                    .then((data) => res.status(200).json({ message: 'Cập Nhật Thành Công', data }));
            } else {
                return res.status(403).json({ message: 'error' });
            }
        });
    }
    async GetAllCart(req, res) {
        ModelHandleBook.find({}).then((data) => res.status(200).json(data));
    }

    // Xác nhận mượn
    async EditGetAllCart(req, res) {
        try {
            const { id, trangthaiMoi } = req.body;
    
            if (!['da_xac_nhan', 'da_tra'].includes(trangthaiMoi)) {
                return res.status(400).json({ error: 'Trạng thái không hợp lệ!' });
            }
    
            // Cập nhật trạng thái mượn sách
            const updateFields = { trangthai: trangthaiMoi };
    
            if (trangthaiMoi === 'da_tra') {
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('en-GB');
                updateFields.ngaytra = formattedDate;
            }
    
            // Cập nhật trạng thái trong ModelHandleBook
            const result = await ModelHandleBook.updateOne(
                { _id: id },
                { $set: updateFields }
            );
    
            // Nếu xác nhận mượn sách -> cập nhật tinhtrang của sách thành true
            if (trangthaiMoi === 'da_xac_nhan') {
                const handleRecord = await ModelHandleBook.findById(id);
                if (handleRecord) {
                    await ModelBook.updateOne(
                        { tensach: handleRecord.nameBook },
                        { $set: { tinhtrang: true } }
                    );
                }
            }
    
            // Nếu là trả sách -> cập nhật lại tinhtrang thành false
            if (trangthaiMoi === 'da_tra') {
                const handleRecord = await ModelHandleBook.findById(id);
                if (handleRecord) {
                    await ModelBook.updateOne(
                        { tensach: handleRecord.nameBook },
                        { $set: { tinhtrang: false } }
                    );
                }
            }
    
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Có lỗi khi cập nhật!' });
        }
    }    
    
    async ThuThe(req, res) {
        ModelCart.deleteOne({ _id: req.body.id }).then((dataUser) =>
            res.status(200).json({ message: 'Thu Hồi Thẻ Thành Công !!!' }),
        );
    }
}

module.exports = new ControllerAdmin();