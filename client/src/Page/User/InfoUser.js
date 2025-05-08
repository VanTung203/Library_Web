import classNames from "classnames/bind";
import styles from "./InfoUser.module.scss";
import Header from "../HomePage/Layouts/Header/Header";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { ModalEditUser } from "./Modal/ModalEditUser";

const cx = classNames.bind(styles);

function InfoUser() {
    const [dataUser, setDataUser] = useState({});
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    const token = document.cookie;

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setDataUser(decoded);
        }
    }, [token]);

    return (
        <div>
            <Header />
            <div className={cx("container")}>
                <div className={cx("profile-card")}>
                    <div className={cx("profile-header")}>
                        <img
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                            alt="User Avatar"
                            className={cx("avatar")}
                        />
                        <div className={cx("user-info")}>
                            <h2>{dataUser?.dataUser?.fullname || "Người dùng"}</h2>
                            <p>{dataUser?.email}</p>
                            <span className={cx("role-badge")}>
                                {dataUser?.isAdmin ? "Admin" : "User"}
                            </span>
                        </div>
                    </div>

                    <div className={cx("info-account")}>
                        <h3>Thông Tin Tài Khoản</h3>
                        <div className={cx("input-group")}>
                            <label>Username:</label>
                            <input value={dataUser?.name || "Chưa cập nhật"} type="text" readOnly />
                        </div>

                        <div className={cx("input-group")}>
                            <label>Email:</label>
                            <input value={dataUser?.email || "Chưa cập nhật"} type="text" readOnly />
                        </div>

                        <div className={cx("input-group")}>
                            <label>Mật khẩu:</label>
                            <input value="*********" type="password" readOnly />
                        </div>

                        <button className={cx("btn-edit")} onClick={handleShow}>
                            Thay Đổi Thông Tin
                        </button>
                    </div>
                </div>
                <ModalEditUser show={show} setShow={setShow} />
            </div>
        </div>
    );
}

export default InfoUser;