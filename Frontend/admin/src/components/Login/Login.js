// import '../sb-admin-2.min.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStaff } from '../../store/slice/userSlice';
import { toast } from 'react-toastify';
import './Login.scss';
import car from '../../assets/images/car-4025379_640.png';
import star from '../../assets/images/stars.png';
import cloud from '../../assets/images/cloud.png';
import aeroplane from '../../assets/images/aeroplane.png';
import tree from '../../assets/images/tree.png';
import sun from '../../assets/images/sun.png';
import whiteOutline from '../../assets/images/white-outline.png';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
    const history = useHistory();

    const [staffEmail, setStaffEmail] = useState('');
    const [password, setPassword] = useState('');

    const defaultObjInput = {
        isValidStaffEmail: true,
        isValidPassword: true,
        isValidLogin: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultObjInput);
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.staff);

    const handleStaffEmail = (data) => {
        setStaffEmail(data);
    };

    const handlePassword = (data) => {
        setPassword(data);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setObjCheckInput(defaultObjInput)
        if (!staffEmail) {
            setObjCheckInput({ ...defaultObjInput, isValidStaffEmail: false })
            return;
        }
        if (!password) {
            setObjCheckInput({ ...defaultObjInput, isValidPassword: false })
            return;

        }
        let userCredentials = {
            email: staffEmail,
            password,
        }
        const res = await dispatch(loginStaff(userCredentials));
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
        setStaffEmail('');
        setPassword('');
        history.push('/');

        return;
    }

    //     <div className="mt-5">

    //     <div className="container">

    //         {/* <!-- Outer Row --> */}
    //         <div className="row justify-content-center">

    //             <div className="col-xl-10 col-lg-12 col-md-9 bg-gradient-primary">

    //                 <div className="card o-hidden border-0 shadow-lg my-5">
    //                     <div className="card-body p-0">
    //                         {/* <!-- Nested Row within Card Body --> */}
    //                         <div className="row">
    //                             <div className="col-lg-6 d-none d-lg-block">
    //                             </div>
    //                             <div className="col-lg-6">
    //                                 <div className="p-5">
    //                                     <div className="text-center">
    //                                         <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
    //                                     </div>
    //                                     <form className="user">
    //                                         <div className="form-group">
    //                                             <input type="email"
    //                                                 className={objCheckInput.isValidStaffEmail ? "form-control form-control-user" : "form-control form-control-user is-invalid"}
    //                                                 id="exampleInputEmail" aria-describedby="emailHelp"
    //                                                 placeholder="Enter email"
    //                                                 value={staffEmail}
    //                                                 onChange={(e) => handleStaffEmail(e.target.value)}
    //                                             />
    //                                             <div className='text-danger' hidden={objCheckInput.isValidStaffEmail}>Bạn chưa nhập vào email</div>
    //                                         </div>
    //                                         <div className="form-group">
    //                                             <input type="password"
    //                                                 className={objCheckInput.isValidPassword ? "form-control form-control-user" : "form-control form-control-user is-invalid"}
    //                                                 id="exampleInputPassword" placeholder="Password" value={password}
    //                                                 onChange={(e) => handlePassword(e.target.value)}
    //                                             />
    //                                             <div className='text-danger' hidden={objCheckInput.isValidPassword}>Bạn chưa nhập vào password</div>
    //                                         </div>
    //                                         <div className="form-group">
    //                                             <div className="custom-control custom-checkbox small">
    //                                                 <input type="checkbox" className="custom-control-input" id="customCheck" />
    //                                                 <label className="custom-control-label" htmlFor="customCheck">Remember
    //                                                     Me</label>
    //                                             </div>
    //                                         </div>
    //                                         <div className='text-danger' hidden={objCheckInput.isValidLogin}>{error}</div>
    //                                         <button className="btn btn-primary btn-user btn-block" type='submit' onClick={(e) => handleLogin(e)}>
    //                                             {loading ? "Loading..." : "Login"}
    //                                         </button>
    //                                     </form>
    //                                     <hr />
    //                                     <div className="text-center">
    //                                         <a className="small" href="forgot-password.html">Forgot Password?</a>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //             </div>

    //         </div>

    //     </div>

    // </div>

    return (
        <>
            <div className='login-form'>
                <div className='body'>
                    <div className='form-container'>
                        <div className='column column-1'>
                            <div className='image-layer'>
                                <img src={whiteOutline} className='form-image-main' />
                                <img src={cloud} className='form-image cloud' />
                                <img src={aeroplane} className='form-image plane' style={{ width: '200px' }} />
                                <img src={tree} className='form-image tree' style={{ width: '150px' }} />
                                <img src={sun} className='form-image sun' style={{ width: '150px' }} />
                                <img src={car} className='form-image car' />
                                <img src={star} className='form-image stars' />
                            </div>
                            <p className='featured-words'>Welcome to the <span>TOYMODEL</span> Administration Page</p>
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
                                                type='email' placeholder='Nhập vào email'
                                                className={objCheckInput.isValidStaffEmail ?
                                                    "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                                value={staffEmail}
                                                onChange={(e) => handleStaffEmail(e.target.value)}
                                            />
                                            <FaUser color='white' className='icon' />
                                        </div>
                                        <div className='text-danger' hidden={objCheckInput.isValidStaffEmail}>Bạn chưa nhập vào email</div>


                                        <div className='input-box'>
                                            <input
                                                type='password' placeholder='Nhập vào password' autoComplete={password}
                                                className={objCheckInput.isValidPassword ?
                                                    "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                                value={password}
                                                onChange={(e) => handlePassword(e.target.value)}
                                            />
                                            <RiLockPasswordFill color='white' className='icon' />
                                        </div>

                                        <div className='text-danger' hidden={objCheckInput.isValidPassword}>Bạn chưa nhập vào password</div>
                                        <div className='forgot-pass'>
                                            <a href='#'>Quên mật khâu?</a>
                                        </div>
                                        <div className='input-box'>
                                            <button className="btn btn-primary btn-user btn-block input-submit" type='submit' onClick={(e) => handleLogin(e)}>
                                                <span> {loading ? "Đăng nhập..." : "Đăng nhập"}</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;