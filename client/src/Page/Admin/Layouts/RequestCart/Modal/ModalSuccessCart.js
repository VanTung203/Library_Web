import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import request from '../../../../../config/Connect';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalSuccessCart({ show, setShow, id }) {
    const handleClose = () => setShow(false);

    const [date1, setDate1] = useState('');
    const [idthe, setIdthe] = useState('');

    const convertDateToDDMMYYYY = (date) => {
        // Chuyển đổi từ yyyy-mm-dd sang dd/mm/yyyy
        const [year, month, day] = date.split('-');
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    };

    const handleSuccessCart = () => {
        if (!date1) {
            toast.error('Vui lòng nhập ngày hết hạn!');
            return;
        }

        const formattedDate = convertDateToDDMMYYYY(date1);

        request
            .post('/api/editcart', {
                ngayhethan: formattedDate,  // Gửi định dạng dd/mm/yyyy
                idthe: idthe,
                id: id,
            })
            .then((res) => toast.success(res.data.message))
            .catch((err) => toast.error('Có lỗi xảy ra!'));
        
        window.location.reload();
    };

    return (
        <>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Duyệt Thẻ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-3">
                        {/* Giữ type date nhưng khi thay đổi sẽ chuyển đổi ngày */}
                        <input
                            type="date"
                            value={date1}
                            onChange={(e) => setDate1(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                        />
                        <label htmlFor="floatingInput">Ngày Hết Hạn</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setIdthe(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="Nhập mã thẻ"
                        />
                        <label htmlFor="floatingInput">Mã Thẻ</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSuccessCart}>
                        Lưu Lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalSuccessCart;