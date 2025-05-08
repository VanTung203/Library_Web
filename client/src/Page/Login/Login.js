import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import request from '../../config/Connect';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await request.post('/api/login', { email, password });
            toast.success(res.data.message);
            setTimeout(() => {
                window.location.href = "/homepage";
            }, 1000);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className={cx('wrapper')}>
                <h1 style={{ textAlign: 'center' }}>Đăng Nhập</h1>

                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <button className="btn btn-primary" onClick={handleLogin}>
                        Đăng Nhập
                    </button>
                    <span>
                        Đăng ký tài khoản <Link to="/reg">Đăng Ký</Link>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Login;
