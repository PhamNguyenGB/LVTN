import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { loginStaff } from '../../store/slice/userSlice';
import { toast } from 'react-toastify';
import './Login.scss';
import robot from '../../assets/images/robot-2027195_640.png';
import hello from '../../assets/images/hello-828211_640.png';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useGoogleLogin } from '@react-oauth/google';
import { loginGoogle } from '../../api/userAPIs';
import { loginUser, loginForm } from '../../redux/slices/userSlice';
import FacebookLogin from 'react-facebook-login';

const Login = () => {
    const history = useHistory();

    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading, error } = useSelector((state) => state.user);

    const defaultObjInput = {
        isValidStaffEmail: true,
        isValidPassword: true,
        isValidLogin: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultObjInput);
    const dispatch = useDispatch();

    // const { loading, error } = useSelector((state) => state.staff)

    const handleStaffEmail = (data) => {
        setEmail(data);
    };

    const handlePassword = (data) => {
        setPassword(data);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setObjCheckInput(defaultObjInput)
        if (!Email) {
            setObjCheckInput({ ...defaultObjInput, isValidStaffEmail: false })
            return;
        }
        if (!password) {
            setObjCheckInput({ ...defaultObjInput, isValidPassword: false })
            return;

        }
        let userCredentials = {
            email: Email,
            password,
        }
        const res = await dispatch(loginForm(userCredentials));
        if (res.payload.status !== 0) {
            setObjCheckInput({ ...defaultObjInput, isValidLogin: false });
            return;
        }
        if (res.payload.mess === 'Đăng nhập thành công') {
            toast.success(res.payload.mess);
        }
        if (res.payload.mess === 'Tài khoản hoặc mật khẩu không chính xác') {
            toast.error(res.payload.mess);
            return;
        }
        setEmail('');
        setPassword('');
        history.push('/');

        return;
    }



    const loginFromGoogle = useGoogleLogin({
        onSuccess: async (response) => {
            // Gửi auth_code này về backend để đổi lấy access_token và id_token
            const res = await loginGoogle(response.code);
            // const data = await res.json();
            if (res.data.status === 0) {
                toast.success(res.data.mess);

                const userCredentials = {
                    email: res.data.data.email,
                    name: res.data.data.name,
                    picture: res.data.data.picture,
                }

                await dispatch(loginUser(userCredentials));

                history.push('/');
            }
        },
        flow: 'auth-code', // Sử dụng auth-code flow để tăng bảo mật
    });

    const handleLoginFacebook = (response) => {
        console.log('check facebook', response);

    }

    return (
        <div className='login-form'>
            <div className='body'>
                <div className='form-container'>
                    <div className='column column-1'>
                        <div className='image-layer'>
                            <img src={robot} className='form-image-main' style={{ width: '200px' }} />
                            <img src={hello} className='form-image robot' />
                        </div>
                        <p className='featured-words'>Chào mừng bạn đã đến <span>TOYMODEL</span> các loại mô hình</p>
                    </div>

                    <div className='colums column-2'>
                        <div className='login-form'>
                            <div className='form-title'>
                                <span>Đăng nhập</span>
                            </div>
                            <form>
                                <div className='form-inputs'>
                                    <div className='input-box'>
                                        <input
                                            type='email' placeholder='email'
                                            className={objCheckInput.isValidStaffEmail ?
                                                "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                            value={Email}
                                            onChange={(e) => handleStaffEmail(e.target.value)}
                                        />
                                        <FaUser color='dark' className='icon' />
                                    </div>
                                    <div className='text-danger' hidden={objCheckInput.isValidStaffEmail}>Bạn chưa nhập vào email</div>


                                    <div className='input-box'>
                                        <input
                                            type='password' placeholder='password' autoComplete="current-password"
                                            className={objCheckInput.isValidPassword ?
                                                "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                            value={password}
                                            onChange={(e) => handlePassword(e.target.value)}
                                        />
                                        <RiLockPasswordFill color='dark' className='icon' />
                                    </div>

                                    <div className='text-danger' hidden={objCheckInput.isValidPassword}>Bạn chưa nhập vào password</div>
                                    <div className='forgot-pass'>
                                        <a href='#' className='text-dark'>Quên mật khâu?</a>
                                    </div>
                                    <div className='input-box'>
                                        <button className="btn btn-primary btn-user btn-block input-submit" type='submit'
                                            onClick={(e) => handleLogin(e)}
                                        >
                                            <span> {loading ? "Đăng nhập..." : "Đăng nhập"}</span>
                                        </button>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <p className="mt-5 mb-5 text-dark">Hoặc đăng nhập với</p>
                                            <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                                                <div>
                                                    <a
                                                        href="#!"
                                                        className="btn btn-lg btn-outline-danger p-3 lh-1"
                                                        onClick={() => loginFromGoogle()} // Kích hoạt login khi nhấn vào button
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="28"
                                                            height="28"
                                                            fill="currentColor"
                                                            className="bi bi-google"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;