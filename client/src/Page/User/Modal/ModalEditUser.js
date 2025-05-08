import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import request from '../../../config/Connect';
import { toast, ToastContainer } from 'react-toastify';

export function ModalEditUser({ show, setShow }) {
    const handleClose = () => setShow(false);

    const [newPass, setNewPass] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const handleChangePasswrod = async (e) => {
        if (newPass.length > 0) {
            const res = await request.post('/api/changepass', { newPass });
            toast.success(res.data.message);
        } else if (newEmail.length > 0) {
            const res = await request.post('/api/changeemail', { newEmail });
            toast.success(res.data.message);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Thay Đổi Thông Tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            New Email
                        </span>
                        <input type="email" className="form-control" onChange={(e) => setNewEmail(e.target.value)} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            New PassWord
                        </span>
                        <input type="password" className="form-control" onChange={(e) => setNewPass(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleChangePasswrod}>
                        Change
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
