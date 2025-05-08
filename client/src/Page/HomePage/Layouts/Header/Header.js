import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalHeader from "../Modal/ModalHeader";
import { jwtDecode } from "jwt-decode";
import request from "../../../../config/Connect";
import { toast } from "react-toastify";
import Logo from "../../../../asset/img/logo.png";

const cx = classNames.bind(styles);

function Header({ setSearchValue }) {
    const [show, setShow] = useState(false);
    const [checkAdmin, setCheckAdmin] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    const token = document.cookie.slice(6, 9999);
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.admin) {
                setCheckAdmin(true);
            }
        }
    }, [token]);

    const handleLogout = () => {
        request.post("/api/logout").then((res) => console.log(res.data.message));
        toast.success("Đăng xuất thành công!")
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    };

    return (
        <header className={cx("header")}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
                <div className="container">
                    {/* Logo */}
                    <Link className="navbar-brand d-flex align-items-center" to="/homepage">
                        <img src={Logo} alt="Logo" className={cx("logo")} width={100} height={100} />
                        <span className="ms-2 fw-bold text-primary fs-4">Thư Viện SGU</span>
                    </Link>

                    {/* Tìm kiếm */}
                    <form className="d-flex ms-auto me-3">
                        <input
                            className="form-control me-2 border rounded-pill px-3"
                            type="search"
                            placeholder="Tìm kiếm sách..."
                            aria-label="Search"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </form>

                    {/* Dropdown menu */}
                    <div className="dropdown">
                        <button
                            className="btn btn-outline-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Cài Đặt
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li>
                                <Link to="/info" className="dropdown-item">
                                    📌 Thông Tin Tài Khoản
                                </Link>
                            </li>
                            {checkAdmin && (
                                <li>
                                    <Link to="/admin/books" className="dropdown-item">
                                        🔧 Trang Quản Trị Admin
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link to="/history" className="dropdown-item">
                                    📖 Lịch Sử Mượn Sách
                                </Link>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={handleShow}>
                                    🏷️ Gửi Yêu Cầu Cấp Thẻ
                                </button>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button className="dropdown-item text-danger" onClick={handleLogout}>
                                    🚪 Đăng Xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Modal */}
            <ModalHeader show={show} setShow={setShow} />
        </header>
    );
}

export default Header;