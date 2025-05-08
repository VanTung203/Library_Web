import classNames from 'classnames/bind';
import styles from './ManagementUser.module.scss';
import request from '../../../../config/Connect';

import { useEffect, useState } from 'react';
import ModalEditUser from '../../../../Modal/ModalEditUser';
import ModalDeleteUser from '../../../../Modal/ModalDeleteUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function ManagementUser() {
    const [dataUser, setDataUser] = useState([]);
    const [showModalEditUser, setShowModalEditUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [valueSearch, setValueSearch] = useState('');

    const [idUser, setIdUser] = useState('');
    const handleModalEditUser = (id) => {
        setShowModalEditUser(!showModalEditUser);
        setIdUser(id);
    };

    const handleModalDeleteUser = (id) => {
        setShowModalDeleteUser(!showModalDeleteUser);
        setIdUser(id);
    };

    const handleThuHoiThe = async (masinhvien) => {
        const res = await request.post('/api/thuthe', { masinhvien });
        toast.success(res.data.message);
    };

    useEffect(() => {
        request.get('/api/getalluser').then((res) => setDataUser(res.data));
    }, [showModalEditUser, showModalDeleteUser]);

    useEffect(() => {
        if (valueSearch === '') return;
        request.get('/api/searchuser2', { params: { valueSearch } }).then((res) => setDataUser(res.data));
    }, [valueSearch]);

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('header')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 className="fw-bold text-dark">Quản Lý Người Dùng</h2>
                <form className="d-flex" style={{ width: '100%' }}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Tìm Kiếm Người Dùng"
                        aria-label="Search"
                        onChange={(e) => setValueSearch(e.target.value)}
                        style={{ width: 'auto' }}
                    />
                </form>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Họ Và Tên</th>
                        <th scope="col">Địa Chỉ</th>
                        <th scope="col">Ngày Sinh</th>
                        <th scope="col">Email</th>
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {dataUser.map((item) => (
                        <tr key={item._id}>
                            <th scope="row">{item.masinhvien}</th>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>{item.birthday}</td>
                            <td>{item.email}</td>
                            <td style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <button
                                    onClick={() => handleModalEditUser(item._id)}
                                    type="button"
                                    className="btn btn-warning btn-sm"
                                >
                                    <i className="bi bi-pencil-square"></i> Sửa
                                </button>
                                <button
                                    onClick={() => handleModalDeleteUser(item._id)}
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                >
                                    <i className="bi bi-trash"></i> Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalEditUser
                idUser={idUser}
                showModalEditUser={showModalEditUser}
                setShowModalEditUser={setShowModalEditUser}
            />
            <ModalDeleteUser
                showModalDeleteUser={showModalDeleteUser}
                setShowModalDeleteUser={setShowModalDeleteUser}
                idUser={idUser}
            />
        </div>
    );
}

export default ManagementUser;
