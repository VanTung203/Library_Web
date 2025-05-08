import { useEffect, useState } from 'react';
import request from '../../../../config/Connect';
import classNames from 'classnames/bind';
import styles from './HandleBooks.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);
const PENALTY_PER_DAY = 500;

function HandleBook() {
    const [data, setData] = useState([]);
    const [overdueDays, setOverdueDays] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalAction, setModalAction] = useState(() => () => {});
    const [searchTerm, setSearchTerm] = useState(''); // Trạng thái cho ô tìm kiếm

    const reloadData = () => {
        request.get('/api/datacart')
            .then((res) => setData(res.data))
            .catch(() => toast.error('Không thể tải dữ liệu.'));
    };

    useEffect(() => {
        reloadData();
    }, []);

    const openModal = (content, action) => {
        setModalContent(content);
        setModalAction(() => action);
        setShowModal(true);
    };

    const confirmAction = () => {
        modalAction();
        setShowModal(false);
    };

    const handleSuccess = (id) => {
        request.post('/api/editdatacart', {
            id,
            trangthaiMoi: 'da_xac_nhan',
        })
        .then(() => {
            toast.success('Duyệt yêu cầu thành công!');
            reloadData();
        })
        .catch(() => toast.error('Duyệt yêu cầu thất bại.'));
    };

    const deleteBook = (id) => {
        openModal('Bạn có chắc muốn hủy yêu cầu mượn sách này không?', () => {
            request.post('/api/deletebooks', { id })
                .then(() => {
                    toast.success('Đã hủy yêu cầu mượn sách.');
                    reloadData();
                })
                .catch(() => toast.error('Không thể hủy yêu cầu.'));
        });
    };

    const handleBookUser = (email) => {
        request.post('/api/email', { email })
            .then(() => toast.success('Đã gửi thông báo cho người dùng.'))
            .catch(() => toast.error('Gửi email thất bại.'));
    };

    const handleReturned = (id, overdue) => {
        const updateStatus = () => {
            request.post('/api/editdatacart', {
                id,
                trangthaiMoi: 'da_tra',
            })
            .then(() => {
                toast.success('Xác nhận trả sách thành công!');
                reloadData();
            })
            .catch(() => toast.error('Lỗi khi xác nhận trả sách.'));
        };

        if (overdue > 0) {
            const penalty = overdue * PENALTY_PER_DAY;
            openModal(
                `Người dùng trả sách trễ ${overdue} ngày.\nTiền phạt: ${penalty.toLocaleString()} VNĐ.\nBạn đã thu tiền phạt chưa?`,
                updateStatus
            );
        } else {
            updateStatus();
        }
    };

    useEffect(() => {
        const calculateOverdueDays = () => {
            const currentDate = new Date();

            const daysOverdue = data.map((item) => {
                const parseDate = (dateStr) => {
                    const [day, month, year] = dateStr.split('/').map(Number);
                    return new Date(year, month - 1, day);
                };

                const expiryDate = parseDate(item.ngayhethan);
                const timeDifference = currentDate - expiryDate;
                const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                return daysDifference > 0 ? daysDifference : 0;
            });

            setOverdueDays(daysOverdue);
        };

        calculateOverdueDays();
    }, [data]);

    // Hàm lọc dữ liệu theo mã sinh viên hoặc tên sách
    const filteredData = data.filter((item) =>
        item.masinhvien.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nameBook.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="m-4 text-center">
                <h2 className="fw-bold text-dark">Quản Lý Mượn Trả Sách</h2>
            </div>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Mã sv + tên sách"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
                style={{ width: 'auto' }}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Tên Sách</th>
                        <th scope="col">Ngày Mượn Sách</th>
                        <th scope="col">Ngày Hết Hạn</th>
                        <th scope="col">Tình Trạng</th>
                        <th scope="col">Số Ngày Quá Hạn</th>
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={item._id}>
                            <th scope="row">{item.masinhvien}</th>
                            <td>{item.nameBook}</td>
                            <td>{item.ngaymuon}</td>
                            <td>{item.ngayhethan}</td>
                            <td>
                                {item.trangthai === 'da_xac_nhan' ? (
                                    <>
                                        <FontAwesomeIcon style={{ color: 'green' }} icon={faCheck} />
                                        <span style={{ paddingLeft: '10px' }}>Đang Mượn</span>
                                    </>
                                ) : item.trangthai === 'da_tra' ? (
                                    <>
                                        <FontAwesomeIcon style={{ color: 'blue' }} icon={faCheck} />
                                        <span style={{ paddingLeft: '10px' }}>Đã Trả</span>
                                    </>
                                ) : item.trangthai === 'dang_gia_han' ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                        <span style={{ paddingLeft: '10px', color: 'red' }}>Đang Gia Hạn</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                        <span style={{ paddingLeft: '10px', color: 'red' }}>Đang Xử Lý</span>
                                    </>
                                )}
                            </td>
                            <td style={{ color: overdueDays[index] > 0 ? 'red' : 'black' }}>
                                {overdueDays[index]} Ngày
                            </td>
                            <td style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                <button
                                    onClick={() => handleBookUser(item.masinhvien)}
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                >
                                    Gửi mail TB
                                </button>

                                {item.trangthai === 'da_tra' ? null : item.trangthai === 'da_xac_nhan' ? (
                                    <button
                                        onClick={() => handleReturned(item._id, overdueDays[index])}
                                        type="button"
                                        className="btn btn-warning btn-sm"
                                    >
                                        Xác Nhận Đã Trả
                                    </button>
                                ) : item.trangthai === 'chua_xac_nhan' || 'dang_gia_han' ? (
                                    <button
                                        onClick={() => handleSuccess(item._id)}
                                        type="button"
                                        className="btn btn-success btn-sm"
                                    >
                                        Duyệt
                                    </button>
                                ) : null}

                                {item.trangthai !== 'da_xac_nhan' && (
                                    <button
                                        onClick={() => deleteBook(item._id)}
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                    >
                                        Hủy
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal xác nhận */}
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

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default HandleBook;