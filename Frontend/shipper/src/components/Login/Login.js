import './Login.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginShipper } from '../../store/slices/shipperSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const defaultObjInput = {
        isValidStaffEmail: true,
        isValidPassword: true,
        isValidLogin: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultObjInput);
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.shipper);

    const handleLogin = async () => {
        setObjCheckInput(defaultObjInput)
        if (!email) {
            setObjCheckInput({ ...defaultObjInput, isValidStaffEmail: false })
            return;
        }
        if (!password) {
            setObjCheckInput({ ...defaultObjInput, isValidPassword: false })
            return;

        }
        let userCredentials = {
            email,
            password,
        }
        const res = await dispatch(loginShipper(userCredentials));
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter')
            handleLogin();

    }

    return (
        <div className='login'>
            <div className="box">
                <div className="container">
                    <div className="top-header">
                        <header>Đăng nhập</header>
                    </div>
                    <div className="input-Field m-2">
                        <input type="text"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email" required
                            onKeyDown={handleKeyPress}
                        />
                        <i className="bx bx-user"></i>
                    </div>
                    <div className='text-danger' hidden={objCheckInput.isValidStaffEmail}>Bạn chưa nhập vào email</div>

                    <div className="input-Field m-2">
                        <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu" required
                            onKeyDown={handleKeyPress}
                        />
                        <i className="bx bx-lock-alt"></i>
                    </div>
                    <div className='text-danger' hidden={objCheckInput.isValidPassword}>Bạn chưa nhập vào password</div>
                    <div className="input-Field">
                        <button
                            className="submit"
                            onClick={(e) => handleLogin(e)}
                        >
                            Đăng nhập</button>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            {/* <input type="checkbox" id="check" />
                            <label for="check"> Remember Me</label> */}
                        </div>
                        <div className="right">
                            <label><a href="#">Quên mật khẩu?</a></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
