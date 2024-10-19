import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Register.scss';
import welcome from '../../assets/images/welcome-6482989_640.png';
import { FaUser, FaAngleDown, FaAddressCard } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { CgMail } from "react-icons/cg";
import { MdPhoneIphone } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { sendOTP, register } from '../../api/userAPIs';
import { ThreeDots } from 'react-loader-spinner'

const Register = () => {
    const history = useHistory();

    const [fullname, setFullname] = useState("");
    const [sex, setSex] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    const [show, setShow] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);

    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setTimeLeft(60);
        setShow(true);
    }

    const defaulValidInput = {
        isValidFullname: true,
        isValidStaffEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
        isValidPhone: true,
        isValidAddress: true,
        isValidSex: true,
    }

    const [objCheckInput, setObjCheckInput] = useState(defaulValidInput);
    const [messError, setMessError] = useState('');

    const isValidateInputs = () => {
        setObjCheckInput(defaulValidInput);
        console.log('check 123', fullname, email);
        if (!fullname) {
            setMessError('Vui lòng nhập vào họ và tên');
            setObjCheckInput({ ...defaulValidInput, isValidFullname: false });
            return false;
        }
        if (!email) {
            setMessError('Vui lòng nhập vào email');
            setObjCheckInput({ ...defaulValidInput, isValidStaffEmail: false });
            return false;
        }
        if (!password) {
            setMessError('Vui lòng nhập vào mật khẩu');
            setObjCheckInput({ ...defaulValidInput, isValidPassword: false });
            return false;
        }
        if (password !== confirmPassword) {
            setMessError('Nhập lại mật khẩu chưa chính xác');
            setObjCheckInput({ ...defaulValidInput, isValidConfirmPassword: false });
            return false;
        }
        if (!phone) {
            setMessError('Vui lòng nhập vào số điện thoại');
            setObjCheckInput({ ...defaulValidInput, isValidPhone: false });
            return false;
        }
        if (!address) {
            setMessError('Vui lòng nhập vào địa chỉ');
            setObjCheckInput({ ...defaulValidInput, isValidAddress: false });
            return false;
        }
        if (!sex) {
            setMessError('Vui lòng chọn giới tính');
            setObjCheckInput({ ...defaulValidInput, isValidSex: false });
            return false;
        }

        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const check = isValidateInputs();
        if (check === true) {
            setIsLoading(true);
            try {
                await sendOTP({ email, phone, type: 'user' }).then((res) => {
                    if (res.status === 0 && res.mess === 'Mã OTP đã được gửi đến email của bạn!!!') {
                        handleShow();
                        toast.success(res.mess);
                        setIsLoading(false);
                        return;
                    }
                    else if (res.status === 0) {
                        toast.error(res.mess);
                        setIsLoading(false);
                        return;
                    }
                })
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                return;
            }
        }
        setIsLoading(false);
        return;
    };

    const handleVerifyOTP = async () => {
        try {
            const dataUser = { fullname, email, password, confirmPassword, phone, address, sex, otp };
            await register(dataUser).then((res) => {
                if (res.status === 0 && res.mess === 'Tạo tài khoản thành công') {
                    toast.success(res.mess);
                    setTimeout(() => {
                        history.goBack();
                    }, 1000);
                    return;
                } else if (res.status === 0) {
                    toast.error(res.mess);
                    return;
                }
            })
        } catch (error) {
            console.log(error);
            return;
        }
    };

    useEffect(() => {
        let timer;
        if (show && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timer);  // Ngừng đếm ngược khi hết thời gian
        }

        return () => clearInterval(timer);  // Hủy bộ đếm khi modal đóng
    }, [show, timeLeft]);

    return (

        <div className='register-form'>
            <div className='body'>
                <div className='form-container'>
                    <div className='column column-1'>
                        <div className='image-layer'>
                            <img alt='' src={welcome} className='form-image-main' />
                        </div>
                        <p className='featured-words'>Chào mừng bạn đã đến <span>TOYMODEL</span> các loại mô hình</p>
                    </div>

                    <div className='colums column-2'>
                        <form>
                            <div className='form-register'>
                                <div className='form-title'>
                                    <span>Đăng ký</span>
                                </div>
                                <div className='form-inputs'>
                                    <div className='input-box'>
                                        <input
                                            type='text' placeholder='Họ và tên' required
                                            className={objCheckInput.isValidFullname ?
                                                "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                            value={fullname}
                                            onChange={(e) => setFullname(e.target.value)}
                                        />
                                        <FaUser className='icon' size={16} />
                                    </div>
                                    <div hidden={objCheckInput.isValidFullname} className='text-danger' style={{ fontSize: "14px" }}>{messError}</div>
                                    <div className='input-box'>
                                        <input
                                            type='email' placeholder='email' required
                                            className={objCheckInput.isValidStaffEmail ?
                                                "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <CgMail className='icon' size={20} />
                                    </div>
                                    <div hidden={objCheckInput.isValidStaffEmail} className='text-danger' style={{ fontSize: "14px" }}>{messError}</div>
                                    <div className='input-box'>
                                        <input
                                            type='password' placeholder='Nhập vào password' required autoComplete={password}
                                            className={objCheckInput.isValidPassword ?
                                                "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <RiLockPasswordFill className='icon' size={16} />
                                    </div>
                                    <div hidden={objCheckInput.isValidPassword} className='text-danger' style={{ fontSize: "14px" }}>{messError}</div>
                                    <div className='input-box'>
                                        <input
                                            type='password' placeholder='Nhập lại password' required autoComplete={password}
                                            className={objCheckInput.isValidConfirmPassword ?
                                                "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <RiLockPasswordFill className='icon' size={16} />
                                    </div>
                                    <div hidden={objCheckInput.isValidConfirmPassword} className='text-danger' style={{ fontSize: "14px" }}>{messError}</div>
                                    <div className='input-box'>
                                        <input
                                            type='text' placeholder='Số điện thoại' required
                                            className={objCheckInput.isValidPhone ?
                                                "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <MdPhoneIphone className='icon' size={16} />
                                    </div>
                                    <div hidden={objCheckInput.isValidPhone} className='text-danger' style={{ fontSize: "14px" }}>{messError}</div>
                                    <div className='input-box'>
                                        <input
                                            type='text' placeholder='Địa chỉ' required
                                            className={objCheckInput.isValidAddress ?
                                                "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <FaAddressCard className='icon' size={16} />
                                    </div>
                                    <div hidden={objCheckInput.isValidAddress} className='text-danger' style={{ fontSize: "14px" }}>{messError}</div>
                                    <div className='input-box'>
                                        <select
                                            className={objCheckInput.isValidSex ?
                                                "form-select  input-field" : "form-select is-invalid input-field"}
                                            aria-label="Default select example"
                                            onChange={(e) => setSex(e.target.value)}
                                            style={{ fontSize: "16px" }}
                                        >
                                            <option className='text-black' value="">Giới tính</option>
                                            <option className='text-black' value="1">Nam</option>
                                            <option className='text-black' value="2">Nữ</option>
                                            <option className='text-black' value="0">Khác</option>
                                        </select>
                                        <FaAngleDown className='icon' size={16} />
                                    </div>
                                    <div hidden={objCheckInput.isValidSex} className='text-danger' style={{ fontSize: "14px" }}>{messError}</div>
                                    <div className='input-box'>
                                        <button
                                            className={isLoading === true ? "btn btn-primary btn-user btn-block input-submit disabled" : "btn btn-primary btn-user btn-block input-submit"}
                                            type='submit'
                                            onClick={(e) => handleRegister(e)}
                                        >
                                            <span>
                                                {isLoading === true ?
                                                    <ThreeDots
                                                        visible={true}
                                                        height="50"
                                                        width="50"
                                                        color="#000"
                                                        radius="9"
                                                        ariaLabel="three-dots-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                    />
                                                    :
                                                    'Đăng ký'
                                                }
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {show === true ?
                <Modal show={show} onHide={handleClose} centered >
                    <Modal.Header closeButton>
                        <Modal.Title>Vui lòng nhập mã xác thực</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Mã xác thực đã được gửi tới email mà bạn đã nhập!!!</h6>
                        <input
                            type='text' placeholder='Mã xác thực OTP' value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <br />
                        <span className='text-secondary'>{timeLeft === 0 ? 'OTP đã hết hạn' : `${timeLeft}s nữa OTP hết hạn`}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={handleVerifyOTP}>
                            Xác thực
                        </Button>
                    </Modal.Footer>
                </Modal>
                :
                <></>
            }
        </div>
    );
};

export default Register;