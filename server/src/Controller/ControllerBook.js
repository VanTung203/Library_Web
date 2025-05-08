const ModelBook = require('../Model/ModelBook');
const ModelRequestBook = require('../Model/ModelRequestBook');
const ModelHandleBook = require('../Model/ModelHandleBook');

class ControllerBook {
    async AddBook(req, res) {
        try {
            const { masach, img, tensach, tacgia, nhaxuatban, mota, tinhtrang } = req.body;
            
            // Tạo một sách mới với các trường được truyền từ request body
            const book = new ModelBook({
                masach,
                img,
                tensach,
                tacgia,
                nhaxuatban,
                mota,
                tinhtrang: tinhtrang || false,
            });
    
            // Lưu sách vào database
            await book.save();
            
            return res.status(200).json({ message: 'Thêm Sách Thành Công' });
        } catch (error) {
            console.error(error); // In lỗi ra console để dễ dàng debug
            return res.status(403).json({ message: 'Đã Xảy Ra Lỗi Vui Lòng Thử Lại' });
        }
    }    

    async GetBooks(req, res) {
        ModelBook.find({}).then((dataBooks) => res.status(200).json(dataBooks));
    }

    async DeleteBook(req, res) {
        ModelBook.deleteOne({ _id: req.body.id }).then((data) =>
            res.status(200).json({ message: 'Xóa Sách Thành Công', data }),
        );
    }

    async  UpdateBook(req, res) {
        try {
            const { id, masach, img, tensach, tacgia, nhaxuatban, mota, tinhtrang } = req.body;
    
            const dataBook = await ModelBook.findOne({ _id: id });
    
            if (!dataBook) {
                return res.status(404).json({ message: 'Sách không tìm thấy' });
            }
    
            await dataBook.updateOne({
                masach: masach || dataBook.masach,
                img: img || dataBook.img,
                tensach: tensach || dataBook.tensach,
                tacgia: tacgia || dataBook.tacgia,
                nhaxuatban: nhaxuatban || dataBook.nhaxuatban,
                mota: mota || dataBook.mota,
                tinhtrang: typeof tinhtrang === 'boolean' ? tinhtrang : dataBook.tinhtrang,
            });
    
            return res.status(200).json({ message: 'Chỉnh Sửa Thành Công' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Đã Xảy Ra Lỗi Vui Lòng Thử Lại' });
        }
    }
      
    async HandleRequestBook(req, res) {
        const newRequestBook = new ModelRequestBook({
            iduser: req.body.iduser,
            tensach: req.body.tensach,
            ngaycap: req.body.ngaycap,
            ngayhethan: req.body.ngayhethan,
        });
        newRequestBook.save();
    }

    async SearchProduct(req, res) {
        const keyword = req.query.nameBook;
    
        try {
            const dataProducts = await ModelBook.find({
                $or: [
                    { masach: { $regex: keyword, $options: 'i' } },
                    { tensach: { $regex: keyword, $options: 'i' } },
                    { tacgia: { $regex: keyword, $options: 'i' } },
                    { nhaxuatban: { $regex: keyword, $options: 'i' } },
                ],
            });
    
            if (dataProducts.length <= 0) {
                return res.status(200).json([
                    {
                        img: 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
                        nameBook: 'Không Tìm Thấy Sản Phẩm !!!',
                        price: 0,
                    },
                ]);
            } else {
                return res.status(200).json(dataProducts);
            }
        } catch (err) {
            return res.status(500).json({ error: 'Lỗi máy chủ!' });
        }
    }
    
    // Gia hạn sách
    async ExtendsBook(req, res) {
        try {
            const data = await ModelHandleBook.findOne({ _id: req.body.id });
            if (data) {
                // Cập nhật ngày hết hạn và trạng thái
                await data.updateOne({ ngayhethan: req.body.date, trangthai: 'dang_gia_han' });
                res.status(200).json({ message: 'Cập nhật thành công', data });
            } else {
                return res.status(404).json({ message: 'Không tìm thấy yêu cầu mượn sách' });
            }
        } catch (error) {
            console.error('Lỗi cập nhật gia hạn:', error);
            return res.status(500).json({ message: 'Lỗi server' });
        }
    }
    

    // Huỷ yêu cầu
    DeleteBooks(req, res) {
        ModelHandleBook.deleteOne({ _id: req.body.id }).then((data) => {
            return res.status(200).json({ message: 'Hủy Thành Công !!!' });
        });
    }
}

module.exports = new ControllerBook();
