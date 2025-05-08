import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import request from '../../../../config/Connect';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

function ModalHeader({ show, setShow }) {
    const [maSinhVien, setMaSinhVien] = useState('');
    const token = document.cookie;
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setMaSinhVien(decoded.masinhvien);
        }
    }, []);

    const handleClose = () => setShow(false);

    // const handlePostCart = () => {
    //     try {
    //         request
    //             .post('/api/handleCart', {
    //                 maSinhVien,
    //             })
    //             .then((res) => toast.success(res.data.message));
    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //     }
    // };

    const handlePostCart = async () => {
        try {
            const res = await request.post('/api/handleCart', {
                maSinhVien,
            });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra!');
        }
    };
    

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Gửi Yêu Cầu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Gửi Yêu Cầu Cho Admin Cấp Thẻ
                    <div className="form-floating mt-3">
                        <input
                            onChange={(e) => setMaSinhVien(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={maSinhVien}
                        />
                        <label htmlFor="floatingInput">Mã Sinh Viên</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handlePostCart}>
                        Gửi Yêu Cầu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalHeader;
