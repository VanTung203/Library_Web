import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import request from '../config/Connect';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalDeleteBook({ showModalDeleteBook, setShowModalDeleteBook, idBook }) {
    const handleClose = () => setShowModalDeleteBook(false);

    const handleDeleteBook = async () => {
        try {
            const res = await request.post('/api/deletebook', { id: idBook });
            toast.success(res.data.message);
            handleClose(); 
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <Modal show={showModalDeleteBook} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Xóa Sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn muốn xóa sách có mã sách : {idBook}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleDeleteBook}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteBook;
