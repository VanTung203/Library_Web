import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import request from '../config/Connect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalExtendBook({ show, setShow, id, ngayhethan }) {
    const handleClose = () => setShow(false);
    const [date, setDate] = useState('');

    const formatDateToString = (inputDate) => {
        const [year, month, day] = inputDate.split('-');
        return `${day}/${month}/${year}`;
    };

    const parseNgayHetHan = (ngay) => {
        const [day, month, year] = ngay.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const handleExtendsBook = async () => {
        if (!date) {
            toast.error('Vui lòng chọn ngày!');
            return;
        }

        const ngayISO = parseNgayHetHan(ngayhethan);
        const selected = new Date(date);
        const hethan = new Date(ngayISO);
        const maxDate = new Date(ngayISO);
        maxDate.setDate(maxDate.getDate() + 7);

        if (selected < hethan) {
            toast.error('Ngày gia hạn không được trước ngày hết hạn!');
            return;
        }

        if (selected > maxDate) {
            toast.error('Ngày gia hạn không được quá 7 ngày so với ngày hết hạn!');
            return;
        }

        const formattedDate = formatDateToString(date);

        try {
            await request.post('/api/extendsbook', {
                date: formattedDate,
                id,
            });
            toast.success('Yêu cầu gia hạn đã được gửi!');
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            toast.error('Lỗi khi gửi yêu cầu gia hạn!');
        }
    };

    const ngayISO = ngayhethan ? parseNgayHetHan(ngayhethan) : '';
    const hethan = ngayISO ? new Date(ngayISO) : null;
    const maxDateObj = hethan ? new Date(hethan.getTime() + 7 * 24 * 60 * 60 * 1000) : null;
    const minDate = hethan ? hethan.toISOString().split('T')[0] : '';
    const maxDate = maxDateObj ? maxDateObj.toISOString().split('T')[0] : '';

    return (
        <>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Gia Hạn Sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-3">
                        <input
                            type="date"
                            className="form-control"
                            id="extend-date"
                            onChange={(e) => setDate(e.target.value)}
                            min={minDate}
                            max={maxDate}
                        />
                        <label htmlFor="extend-date">Gia Hạn Đến Ngày</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleExtendsBook}>
                        Gửi Yêu Cầu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalExtendBook;