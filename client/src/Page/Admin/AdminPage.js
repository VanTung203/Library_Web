import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { toast } from "react-toastify";
import request from "../../config/Connect";
const cx = classNames.bind(styles);

function AdminPage() {
    const handleLogout = () => {
        request.post("/api/logout").then((res) => console.log(res.data.message));
        toast.success("Đăng xuất thành công!")
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h4>Trang Quản Trị</h4>
                <h4>HỆ THỐNG QUẢN LÝ THƯ VIỆN</h4>
                {/* <span>Xin Chào: <strong>Admin</strong></span> */}
                <div class="dropdown">
                    <button class="btn text-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        Xin chào: <strong>Admin</strong>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" href="/homePage">Trang chủ</a></li>
                        <li>
                            <button className="dropdown-item" onClick={handleLogout}>
                                Đăng xuất
                            </button>
                        </li>
                    </ul>
                </div>
            </header>

            <div className={cx('main-page')}>
                <div className={cx('slide-bar')}>
                    <ul className="p-0">
                        <li><NavLink to="books" className={({ isActive }) => cx({ active: isActive })}>Quản Lý Sách</NavLink></li>
                        <li><NavLink to="requests" className={({ isActive }) => cx({ active: isActive })}>Quản Lý Thẻ</NavLink></li>
                        <li><NavLink to="users" className={({ isActive }) => cx({ active: isActive })}>Quản Lý Người Dùng</NavLink></li>
                        <li><NavLink to="handle" className={({ isActive }) => cx({ active: isActive })}>Mượn Trả Sách</NavLink></li>
                        <li><NavLink to="stats" className={({ isActive }) => cx({ active: isActive })}>Báo Cáo - Thống Kê</NavLink></li>
                    </ul>
                </div>

                <div className={cx('home-page p-3')}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminPage;