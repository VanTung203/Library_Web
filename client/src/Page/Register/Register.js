import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import request from '../../config/Connect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(styles);

function Register() {
    const [username, setusername] = useState('');

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [masinhvien, setMasinhvien] = useState('');

    const handleRegister = async () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        try {
            const checkEmail = emailPattern.test(email);
            if (checkEmail === false) {
                toast.error('Email không đúng định dạng');
                return;
            }
            const res = await request.post('/api/register', {
                name: username,

                email: email,
                password: password,
                masinhvien,
            });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className={cx('wrapper')}>
                <h1 style={{ textAlign: 'center' }}>Đăng Ký</h1>
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
                        Mã Sinh Viên
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => setMasinhvien(e.target.value)}
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
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <button className="btn btn-primary" onClick={handleRegister}>
                        Đăng Ký
                    </button>
                    <span>
                        Đăng Nhập tài khoản <Link to="/">Đăng Nhập</Link>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Register;
