// import { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { jwtDecode } from 'jwt-decode';
// import request from '../../../../../config/Connect';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ModalRequestBook({ show, setShow, nameBook, idBook }) {
//     const handleClose = () => setShow(false);

//     const [idUser, setIdUser] = useState('');
//     const [masinhvien, setMasinhvien] = useState('');
//     const [date1, setDate1] = useState('');
//     const [date2, setDate2] = useState('');

//     // Format ngày từ yyyy-mm-dd sang dd/mm/yyyy
//     const formatDate = (isoDate) => {
//         const [year, month, day] = isoDate.split('-');
//         return `${day}/${month}/${year}`;
//     };

//     const token = document.cookie;
//     useEffect(() => {
//         if (token) {
//             const decoded = jwtDecode(token);
//             setIdUser(decoded.id);
//             setMasinhvien(decoded.masinhvien);
//         }
//     }, [token]);

//     const handleRequestBook = async () => {
//         if (!date1 || !date2) {
//             toast.error('Vui lòng chọn ngày mượn và ngày trả!');
//             return;
//         }

//         const ngaycap = formatDate(date1);
//         const ngayhethan = formatDate(date2);

//         try {
//             const res = await request.post('/api/requestbookuser', {
//                 ngaycap,
//                 ngayhethan,
//                 maSinhVien: masinhvien,
//                 nameBook: nameBook,
//                 idBook: idBook,
//             });
//             toast.success(res.data.message);
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Lỗi khi gửi yêu cầu');
//         }
//     };

//     return (
//         <>
//             <ToastContainer />
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Yêu Cầu Mượn Sách</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div className="form-floating mb-3">
//                         <input
//                             value={idUser}
//                             className="form-control"
//                             id="userId"
//                             disabled
//                         />
//                         <label htmlFor="userId">ID Người Dùng</label>
//                     </div>

//                     <div className="form-floating mb-3">
//                         <input
//                             value={nameBook}
//                             className="form-control"
//                             id="bookName"
//                             disabled
//                         />
//                         <label htmlFor="bookName">Tên Sách</label>
//                     </div>

//                     <div className="form-floating mb-3">
//                         <input
//                             type="date"
//                             className="form-control"
//                             id="borrowDate"
//                             onChange={(e) => setDate1(e.target.value)}
//                         />
//                         <label htmlFor="borrowDate">Ngày Mượn Sách</label>
//                     </div>

//                     <div className="form-floating mb-3">
//                         <input
//                             type="date"
//                             className="form-control"
//                             id="returnDate"
//                             onChange={(e) => setDate2(e.target.value)}
//                         />
//                         <label htmlFor="returnDate">Ngày Trả Sách</label>
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Đóng
//                     </Button>
//                     <Button variant="primary" onClick={handleRequestBook}>
//                         Gửi Yêu Cầu
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default ModalRequestBook;


import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { jwtDecode } from 'jwt-decode';
import request from '../../../../../config/Connect';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalRequestBook({ show, setShow, nameBook, idBook }) {
    const handleClose = () => setShow(false);

    const [idUser, setIdUser] = useState('');
    const [masinhvien, setMasinhvien] = useState('');
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');

    // Format ngày từ yyyy-mm-dd sang dd/mm/yyyy
    const formatDate = (isoDate) => {
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    };

    const token = document.cookie;
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setIdUser(decoded.id);
            setMasinhvien(decoded.masinhvien);
        }
    }, [token]);

    const handleRequestBook = async () => {
        if (!date1 || !date2) {
            toast.error('Vui lòng chọn ngày mượn và ngày trả!');
            return;
        }

        const today = new Date();
        const borrowDate = new Date(date1);
        const returnDate = new Date(date2);

        // Xử lý phần so sánh ngày
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // reset về đầu ngày để so sánh chính xác

        if (borrowDate < todayStart) {
            toast.error('Ngày mượn phải từ hôm nay trở đi!');
            return;
        }

        if (returnDate <= borrowDate) {
            toast.error('Ngày trả phải sau ngày mượn!');
            return;
        }

        const ngaycap = formatDate(date1);
        const ngayhethan = formatDate(date2);

        try {
            const res = await request.post('/api/requestbookuser', {
                ngaycap,
                ngayhethan,
                maSinhVien: masinhvien,
                nameBook: nameBook,
                idBook: idBook,
            });
            toast.success(res.data.message);
            handleClose(); // đóng modal sau khi thành công
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi khi gửi yêu cầu');
        }
    };

    return (
        <>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Yêu Cầu Mượn Sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-3">
                        <input
                            value={idUser}
                            className="form-control"
                            id="userId"
                            disabled
                        />
                        <label htmlFor="userId">ID Người Dùng</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            value={nameBook}
                            className="form-control"
                            id="bookName"
                            disabled
                        />
                        <label htmlFor="bookName">Tên Sách</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="date"
                            className="form-control"
                            id="borrowDate"
                            onChange={(e) => setDate1(e.target.value)}
                        />
                        <label htmlFor="borrowDate">Ngày Mượn Sách</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="date"
                            className="form-control"
                            id="returnDate"
                            onChange={(e) => setDate2(e.target.value)}
                        />
                        <label htmlFor="returnDate">Ngày Trả Sách</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleRequestBook}>
                        Gửi Yêu Cầu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalRequestBook;