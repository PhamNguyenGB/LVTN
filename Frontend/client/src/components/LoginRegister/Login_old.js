import './Login_old.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/userSlice';

const Login = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const defaultObjInput = {
        isValidUsername: true,
        isValidPassword: true,
        isValidLogin: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultObjInput);
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.user)

    const handleUsername = (data) => {
        setUsername(data);
    };

    const handlePassword = (data) => {
        setPassword(data);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setObjCheckInput(defaultObjInput)
        if (!username) {
            setObjCheckInput({ ...defaultObjInput, isValidUsername: false })
            return;
        }
        if (!password) {
            setObjCheckInput({ ...defaultObjInput, isValidPassword: false })
            return;

        }
        let userCredentials = {
            username,
            password,
        }
        const res = await dispatch(login(userCredentials));
        if (+res.payload.ErrC !== 0) {
            setObjCheckInput({ ...defaultObjInput, isValidLogin: false });

            return;
        }
        setUsername('');
        setPassword('');
        history.push('/');

        return;
    }

    return (
        <>
            {/* <!-- Login 7 - Bootstrap Brain Component --> */}
            <section className="bg-light p-3 p-md-4 p-xl-5 login img-login">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                            <div className="card border border-light-subtle rounded-4">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-5">
                                                <div className="text-center mb-4">
                                                    <h1>Đăng nhập</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <form action="#!">
                                        <div className="row gy-3 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3 h5">
                                                    <input type="text"
                                                        className="form-control" style={{ height: '45px', fontSize: '16px' }}
                                                        placeholder="username" required value={username}
                                                        onChange={(event) => handleUsername(event.target.value)}
                                                    />
                                                    <label for="username" className="form-label">Tên đăng nhập</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3 h5">
                                                    <input type="password"
                                                        className="form-control" style={{ height: '45px', fontSize: '16px' }} name="password"
                                                        id="password" value={password} placeholder="Password" required
                                                        onChange={(event) => handlePassword(event.target.value)}
                                                    />
                                                    <label for="password" className="form-label">Mật khẩu</label>
                                                </div>
                                            </div>
                                            {/* <div className="col-12">
                                                <div className="form-check font-13">
                                                    <input className="form-check-input" type="checkbox" value="" name="remember_me" id="remember_me" />
                                                    <label className="form-check-label text-secondary" for="remember_me">
                                                        Nhớ đăng nhập
                                                    </label>
                                                </div>
                                            </div> */}
                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <button className="btn bsb-btn-xl btn-primary" type="submit" style={{ fontSize: '16px' }}
                                                        onClick={(event) => handleLogin(event)}
                                                    >Đăng nhập ngay</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="row">
                                        <div className="col-12">
                                            <hr className="mt-5 mb-4 border-secondary-subtle" />
                                            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                                                <a href="/register" className="link">Đăng ký</a>
                                                <a href="#" className="link">quên mật khẩu?</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <p className="mt-5 mb-5">Hoặc đăng nhập với</p>
                                            <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                                                <a href="#!" className="btn btn-lg btn-outline-danger p-3 lh-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                                    </svg>
                                                </a>
                                                <a href="#!" className="btn btn-lg btn-outline-primary p-3 lh-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default Login;