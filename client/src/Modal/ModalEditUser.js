import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import request from '../config/Connect';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';

function ModalEditUser({ showModalEditUser, setShowModalEditUser, idUser }) {
    const [username, setusername] = useState('');
    const [address, setaddress] = useState('');
    const [birthday, setbirthday] = useState('');
    const [email, setemail] = useState('');
    const handleClose = () => setShowModalEditUser(false);

    const handleEditUser = async () => {
        try {
            const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})$/;

            if (!dateRegex.test(birthday)) {
                toast.error('Vui lòng nhập đúng ngày tháng năm!');
                return;
            }
            const res = await request.post('/api/edituser', {
                id: idUser,
                username: username,
                address: address,
                birthday: birthday,
                email: email,
            });
            toast.success(res.data.message);
            window.location.reload();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <Modal show={showModalEditUser} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Người Dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                            Họ Và Tên
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => setusername(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text"></div>
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                            Địa Chỉ
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => setaddress(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text"></div>
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                            Ngày Sinh
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => setbirthday(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleEditUser}>
                        Chỉnh Sửa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;
