import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RequestCart.module.scss';

import request from '../../../../config/Connect';
import ModalSuccessCart from './Modal/ModalSuccessCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';

const cx = classNames.bind(styles);

function RequestCart() {
    const [dataCart, setDataCart] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState('');
    const [valueSearch, setValueSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalAction, setModalAction] = useState(() => () => {});

    const openModal = (content, action) => {
        setModalContent(content);
        setModalAction(() => action);
        setShowModal(true);
    };

    const confirmAction = () => {
        modalAction();
        setShowModal(false);
    };

    useEffect(() => {
        request.get('/api/getcart').then((res) => setDataCart(res.data));
    }, [show]);

    const handleShow = (idUser) => {
        setShow(!show);
        setId(idUser);
    };

    const handleThuHoiThe = async (id) => {
        openModal('Bạn có chắc chắn muốn thu hồi thẻ này không?', async () => {
            const res = await request.post('/api/thuthe', { id });
            toast.success(res.data.message);
            request.get('/api/getcart').then((res) => setDataCart(res.data)); // reload lại data
        });
    };

    useEffect(() => {
        request.get('/api/searchuser', { params: { valueSearch } }).then((res) => setDataCart(res.data));
    }, [valueSearch]);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="m-4 text-center">
                    <h2 className="fw-bold text-dark">Quản Lý Thẻ</h2>
                </div>
                <form className="d-flex" style={{ width: '100%' }}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Tìm theo mã sinh viên"
                        aria-label="Search"
                        onChange={(e) => setValueSearch(e.target.value)}
                        style={{ width: 'auto' }}
                    />
                </form>
            </div>
            <table className="table">
                <ToastContainer />

                <thead>
                    <tr>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Mã Thẻ</th>
                        <th scope="col">Ngày Cấp</th>
                        <th scope="col">Ngày Hết Hạn</th>
                        <th scope="col">Trạng Thái Thẻ</th>
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>

                <tbody>
                    {dataCart.map((item) => (
                        <tr key={item._id}>
                            <th scope="row">{item.masinhvien}</th>
                            <th scope="row">{item.idthe}</th>
                            <td>{item.ngaycap}</td>
                            <td>{item.ngayhethan}</td>
                            <td>
                                {item.tinhtrang ? (
                                    <>
                                        <FontAwesomeIcon style={{ color: 'green' }} icon={faCheck} />
                                        <span style={{ paddingLeft: '10px' }}>Active</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                                        <span style={{ paddingLeft: '10px', color: 'red' }}>Đang Xử Lý</span>
                                    </>
                                )}
                            </td>
                            <td>
                                {item.tinhtrang ? (
                                    <>
                                        <button
                                            onClick={() => handleThuHoiThe(item._id)}
                                            type="button"
                                            className="btn btn-danger btn-sm mx-1"
                                        >
                                            Thu Hồi Thẻ
                                        </button>
                                        <button
                                            onClick={() => handleShow(item._id)}
                                            type="button"
                                            className="btn btn-warning btn-sm"
                                        >
                                            Sửa Thẻ
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleShow(item._id)}
                                            type="button"
                                            className="btn btn-primary btn-sm mx-1"
                                        >
                                            Duyệt
                                        </button>
                                        <button
                                            onClick={() => handleThuHoiThe(item._id)}
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                        >
                                            Hủy
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ModalSuccessCart show={show} setShow={setShow} id={id} />

            {/* Modal xác nhận thu hồi */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{modalContent}</pre>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={confirmAction}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RequestCart;
