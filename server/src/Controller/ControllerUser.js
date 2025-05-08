const ModelUser = require('../Model/ModelUser');
const ModelBook = require('../Model/ModelBook');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ModelCart = require('../Model/ModalCart');
const ModelHandleBook = require('../Model/ModelHandleBook');
const { jwtDecode } = require('jwt-decode');

const moment = require('moment');

class ControllerUser {
    async Register(req, res) {
        const { name, address, birthday, password, email, masinhvien } = req.body;
        const saltRounds = 10;
        const myPlaintextPassword = password;
        try {
            const dataUser = await ModelUser.findOne({ masinhvien: masinhvien, email: email });
            if (dataUser) {
                return res.status(403).json({ message: 'Người Dùng Đã Tồn Tại !!!' });
            } else {
                bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
                    const newUser = new ModelUser({
                        name,
                        address,
                        password: hash,
                        email,
                        birthday,
                        masinhvien: req.body.masinhvien,
                    });
                    await newUser.save();
                    return res.status(200).json({ message: 'Đăng Ký Thành Công !!!' });
                });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Đã xảy ra lỗi !!!' });
        }
    }

    async Login(req, res, next) {
        const { password, email } = req.body;
        const dataUser = await ModelUser.findOne({ email });
        if (!dataUser) {
            return res.status(401).json({ message: 'Email Hoặc Mật Không Chính Xác !!!' });
        }
        const match = await bcrypt.compare(password, dataUser.password);
        if (match) {
            const id = dataUser._id;
            const admin = dataUser.isAdmin;
            const name = dataUser.name;
            const masinhvien = dataUser.masinhvien;
            const token = jwt.sign({ email, admin, id, name, masinhvien }, process.env.JWT_SECRET, {
                expiresIn: process.env.EXPIRES_IN,
            });
            res.setHeader('Set-Cookie', `Token=${token}  ; max-age=3600 ;path=/`).json({
                message: 'Đăng Nhập Thành Công !!!',
            });
        } else {
            return res.status(401).json({ message: 'Email Hoặc Mật Khẩu Không Chính Xác !!!' });
        }
    }

    // Yêu cầu cấp thẻ
    // async handleCart(req, res) {
    //     const newData = new ModelCart({
    //         masinhvien: req.body.maSinhVien,
    //         idthe: req.body.idthe,
    //         masinhvien: req.body.maSinhVien,
    //         ngaycap: moment().format('DD/MM/YYYY'),
    //         ngayhethan: '',
    //         tinhtrang: false,
    //     });
    //     await newData.save();
    //     return res.status(200).json({ message: 'Gửi Yêu Cầu Thành Công !!!' });
    // }

    async handleCart(req, res) {
        try {
            const newData = new ModelCart({
                masinhvien: req.body.maSinhVien,
                idthe: req.body.idthe,
                masinhvien: req.body.maSinhVien,
                ngaycap: moment().format('DD/MM/YYYY'),
                ngayhethan: '',
                tinhtrang: false,
            });
    
            const existing = await ModelCart.findOne({ masinhvien: req.body.maSinhVien });
    
            if (existing) {
                if (existing.tinhtrang === true) {
                    return res.status(409).json({ message: 'Bạn đã có thẻ thư viện!' });
                } else {
                    return res.status(409).json({ message: 'Bạn đã gửi yêu cầu trước đó, vui lòng chờ duyệt!' });
                }
            }
    
            // ✅ Lưu vào DB nếu tất cả đều hợp lệ
            await newData.save();
            return res.status(200).json({ message: 'Gửi Yêu Cầu Cấp Thẻ Thành Công!' });
    
        } catch (error) {
            console.error('Lỗi trong handleCart:', error);
            return res.status(500).json({ message: 'Đã xảy ra lỗi khi xử lý yêu cầu.' });
        }
    }

    async GetCart(req, res) {
        const data = await ModelCart.find({});
        return res.status(200).json(data);
    }

    // Yêu cầu mượn sách
    async HandleBook(req, res) {
        try {
            // Tìm sách theo mã sách
            const book = await ModelBook.findOne({ masach: req.body.idBook });
    
            if (!book) {
                return res.status(404).json({ message: 'Sách không tồn tại' });
            }
    
            if (book.tinhtrang === false) { // Sách chưa được mượn
    
                // Kiểm tra sinh viên đã có thẻ chưa
                const data = await ModelCart.findOne({ masinhvien: req.body.maSinhVien });
    
                if (!data) {
                    return res.status(403).json({ message: 'Vui Lòng Gửi Yêu Cầu Cấp Thẻ Với Admin !!!' });
                }
    
                // ✅ Kiểm tra đã từng gửi yêu cầu mượn sách này chưa
                const existingRequest = await ModelHandleBook.findOne({
                    masinhvien: req.body.maSinhVien,
                    nameBook: req.body.nameBook,
                    trangthai: { $ne: 'da_tra' },
                });
    
                if (existingRequest) {
                    return res.status(409).json({ message: 'Bạn đã từng gửi yêu cầu mượn sách này!' });
                }
    
                // Tạo yêu cầu mượn sách
                const handleBookRequest = new ModelHandleBook({
                    masinhvien: req.body.maSinhVien,
                    nameBook: req.body.nameBook,
                    ngaymuon: req.body.ngaycap,
                    ngayhethan: req.body.ngayhethan,
                });
    
                await handleBookRequest.save();
    
                return res.status(200).json({
                    message: 'Gửi Yêu Cầu Thành Công !!!',
                });
    
            } else {
                return res.status(400).json({ message: 'Sách đã được mượn rồi!' });
            }
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
        }
    }
    
    // 
    // async GetBooks(req, res) {
    //     const dataBooks = await ModelHandleBook.findOne({ masinhvien: req.query.masinhvien });
    //     return res.status(200).json([dataBooks]);
    // }

    // Lấy tất cả sách đã mượn của một sinh viên
    async GetBooks(req, res) {
        try {
            const dataBooks = await ModelHandleBook.find({ masinhvien: req.query.masinhvien });
            return res.status(200).json(dataBooks);
        } catch (error) {
            console.error('Lỗi lấy sách của sinh viên:', error);
            return res.status(500).json({ message: 'Lỗi server' });
        }
    }


    // 
    Logout(req, res) {
        res.setHeader('Set-Cookie', `Token=${''};max-age=0 ;path=/`).json({});
    }

    // 
    async ChangePass(req, res, next) {
        const token = req.cookies;
        const decoded = jwtDecode(token.Token);
        const dataUser = await ModelUser.findOne({ email: decoded.email });
        if (dataUser) {
            const saltRounds = 10;
            const myPlaintextPassword = req.body.newPass;
            bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
                dataUser.updateOne({ password: hash }).then();
                return res.status(200).json({ message: 'Change Password Success' });
            });
        } else {
            return res.status(403).json({ message: 'error !!!' });
        }
    }
    async EditProfile(req, res) {
        try {
            const token = req.cookies.Token;
            const decoded = jwtDecode(token);
            const updateUser = await ModelUser.findOne({ email: decoded.email });

            if (updateUser) {
                const updatedUser = await ModelUser.updateOne(
                    { email: decoded.email },
                    {
                        email: req.body.newEmail || updateUser.email,
                        phone: req.body.phone || updateUser.phone,
                    },
                );

                const admin = updateUser.isAdmin;
                const newToken = jwt.sign(
                    { email: req.body.newEmail || updateUser.email, admin },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.EXPIRES_IN },
                );

                res.setHeader('Set-Cookie', `Token=${newToken}; Max-Age=3600; Path=/`);
                return res.status(200).json({ message: 'Cập nhật hồ sơ thành công' });
            } else {
                return res.status(403).json({ message: 'Lỗi !!!' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
    SearchUser(req, res) {
        const keyword = req.query.valueSearch;
        ModelCart.find({ masinhvien: { $regex: keyword, $options: 'i' } }).then((dataProducts) => {
            return res.status(200).json(dataProducts);
        });
    }

    // Tìm user
    SearchUser2(req, res) {
        const keyword = req.query.valueSearch;
        ModelUser.find({ masinhvien: { $regex: keyword, $options: 'i' } }).then((dataProducts) => {
            return res.status(200).json(dataProducts);
        });
    }
}

module.exports = new ControllerUser();
