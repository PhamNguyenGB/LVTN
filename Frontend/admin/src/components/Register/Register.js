// import '../sb-admin-2.min.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Register.scss';
import robot from '../../assets/images/robot.png';
import motorcycle from '../../assets/images/motorcycle.png';
import speech from '../../assets/images/speech.png';
import book from '../../assets/images/book.png';
import victorian from '../../assets/images/victorian.png';
import { FaUser, FaAngleDown, FaAddressCard } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { CgMail } from "react-icons/cg";
import { MdPhoneIphone } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { sendOTP, registerStaff } from '../../api/staffAPIs';

const Register = () => {
    const history = useHistory();

    const [fullname, setFullname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [sex, setSex] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    const [show, setShow] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);

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
        isValidBirthday: true,
    }

    const [objCheckInput, setObjCheckInput] = useState(defaulValidInput);
    const [messError, setMessError] = useState('');


    const goBack = () => {
        history.goBack();
    };

    const isValidateInputs = () => {
        setObjCheckInput(defaulValidInput)
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
        if (!birthday) {
            setMessError('Vui lòng chọn ngày sinh');
            setObjCheckInput({ ...defaulValidInput, isValidBirthday: false });
            return false;
        }

        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        let check = isValidateInputs();
        if (check === true) {
            await sendOTP({ email, phone, type: 'staff' }).then((res) => {
                console.log('check', res);
                if (res.status === 0 && res.mess === 'Mã OTP đã được gửi đến email của bạn!!!') {
                    handleShow();
                    toast.success(res.mess);
                    return;
                }
                else if (res.status === 0) {
                    toast.error(res.mess);
                    return;
                }
            })
            return;
        }
        return;
    };

    const handleVerifyOTP = async () => {
        try {
            const dataStaff = { fullname, email, password, confirmPassword, phone, address, sex, birthday, otp };
            await registerStaff(dataStaff).then((res) => {
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
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timer);  // Ngừng đếm ngược khi hết thời gian
        }

        return () => clearInterval(timer);  // Hủy bộ đếm khi modal đóng
    }, [show, timeLeft]);

    return (
        <>
            <div className='register-form'>
                <div className='body'>
                    <div className='form-container'>
                        <div className='column column-1'>
                            <div className='image-layer'>
                                <img alt='' src={victorian} className='form-image-main' />
                                <img alt='' src={speech} className='form-image plane' style={{ width: '200px' }} />
                                <img alt='' src={book} className='form-image tree' style={{ width: '150px' }} />
                                <img alt='' src={robot} className='form-image car' />
                                <img alt='' src={motorcycle} className='form-image stars' style={{ width: '150px' }} />
                            </div>
                            <p className='featured-words'>Welcome to the <span>TOYMODEL</span> Administration Page</p>
                        </div>

                        <div className='colums column-2'>
                            <div className='text-white'>
                                <button className='back' onClick={() => goBack()}>
                                    <IoArrowBackCircle size={24} />
                                    <span>Trở về</span>
                                </button>
                            </div>
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
                                            <FaUser className='icon' />
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
                                                type='password' placeholder='Nhập vào password' required autocomplete={password}
                                                className={objCheckInput.isValidPassword ?
                                                    "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <RiLockPasswordFill className='icon' />
                                        </div>
                                        <div hidden={objCheckInput.isValidPassword} className='text-danger' style={{ fontSize: "14px" }}>{messError}</div>
                                        <div className='input-box'>
                                            <input
                                                type='password' placeholder='Nhập lại password' required autocomplete={password}
                                                className={objCheckInput.isValidConfirmPassword ?
                                                    "form-control form-control-user input-field" : "form-control form-control-user is-invalid input-field"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <RiLockPasswordFill className='icon' />
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
                                            <MdPhoneIphone className='icon' size={18} />
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
                                            <FaAddressCard className='icon' />
                                        </div>
                                        <div hidden={objCheckInput.isValidAddress} className='text-danger' style={{ fontSize: "14px" }}>{messError}</div>
                                        <div className='input-box'>
                                            <select
                                                className={objCheckInput.isValidSex ?
                                                    "form-select  input-field" : "form-select is-invalid input-field"}
                                                aria-label="Default select example"
                                                onChange={(e) => setSex(e.target.value)}
                                            >
                                                <option className='text-black' selected>Giới tính</option>
                                                <option className='text-black' value="1">Nam</option>
                                                <option className='text-black' value="2">Nữ</option>
                                                <option className='text-black' value="0">Khác</option>
                                            </select>
                                            <FaAngleDown className='icon' />
                                        </div>
                                        <div hidden={objCheckInput.isValidSex} className='text-danger' style={{ fontSize: "14px" }}>{messError}</div>
                                        <div className='input-box' isValidBirthday>
                                            <input
                                                className={objCheckInput.isValidSex ?
                                                    "text-white  input-field" : "text-white is-invalid input-field"}
                                                type='date'
                                                onChange={(e) => setBirthday(e.target.value)}
                                            />
                                        </div>
                                        <div hidden={objCheckInput.isValidBirthday} className='text-danger' style={{ fontSize: "14px" }}>{messError}</div>
                                        <div className='input-box'>
                                            <button className="btn btn-primary btn-user btn-block input-submit" type='submit' onClick={(e) => handleRegister(e)}>
                                                <span> Đăng ký</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {show === true ?
                        <Modal show={show} onHide={handleClose} centered>
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
            </div>
        </>
    );
};

export default Register;