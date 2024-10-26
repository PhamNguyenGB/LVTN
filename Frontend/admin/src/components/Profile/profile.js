import './profile.scss';
import imgUser from '../../assets/images/user.webp';
import Navigation from '../Navigation/Navigation';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar, updateInfo } from '../../store/slice/userSlice';
import { toast } from 'react-toastify';

const Profile = () => {
    const [show, setShow] = useState(false);
    const fileInputRef = useRef(null);
    const [file, setFile] = useState('');

    const staff = useSelector((state) => state.staff.staff);

    const [fullname, setFullname] = useState(staff.fullname);
    const [phone, setPhone] = useState(staff.phone);
    const [address, setAddress] = useState(staff.address);

    const dispath = useDispatch();

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
    }

    const handleFileUpload = () => {
        fileInputRef.current.click();
    }

    const handleUpdateAvatar = () => {
        const formData = new FormData();
        formData.append('image', file[0]);
        dispath(updateAvatar(formData));
        toast.success('Cập nhật ảnh đại diện thành công');
    }

    useEffect(() => {
        if (file) {
            handleUpdateAvatar();
        }
    }, [file]);

    const UpdateInfo = () => {
        dispath(updateInfo({ fullname, phone, address }));
        toast.success('Cập nhật thông tin thành công');
        setShow(false);
    };

    return (
        <div id="wrapper">
            <Navigation />
            <div className='profile'>
                <div className='wrapper'>
                    <div className='left'>
                        <div className='img'>
                            <img src={staff.avatar ? staff.avatar : imgUser} alt='avatar' />
                        </div>
                        <h5 className='mt-4'>{staff.fullname}</h5>
                        <button id='uploadButton' className='btn-avatar' onClick={handleFileUpload}>
                            Thay ảnh mới
                        </button>
                        <input
                            onChange={(e) => setFile(e.target.files)}
                            ref={fileInputRef} type='file' hidden={true}
                        />
                    </div>
                    <div className='right'>
                        <div className='info'>
                            <h3>Thông tin</h3>
                            <div className='infoData'>
                                <div className='data'>
                                    <h4>Email</h4>
                                    <p>{staff?.email}</p>
                                </div>
                                <div className='data '>
                                    <h4>Số điện thoại</h4>
                                    <p>{staff?.phone}</p>
                                </div>
                                <div className='data'>
                                    <h4>Địa chỉ</h4>
                                    <p>{staff.address}</p>
                                </div>
                                <div className='data '>
                                    <h4>Giới tính</h4>
                                    <p>{staff.sex}</p>
                                </div>
                                <div className='data '>
                                    <h4>Sinh nhật</h4>
                                    <p>{staff.birthday}</p>
                                </div>
                                <div className='data '>
                                    <h4>Cấp bậc</h4>
                                    <p>{staff.role === 'staff' ? 'Nhân viên' : 'Chủ cửa hàng'}</p>
                                </div>
                            </div>
                            <button className='btn-information' onClick={() => handleShow()}>Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='update-profile'>
                            <div className='form-inputs'>
                                <div className='input-box'>
                                    <label>Họ và tên:</label>
                                    <input
                                        type='text' placeholder='Họ và tên' required
                                        className={"form-control form-control-user input-field"}
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </div>
                                <br />
                                <div className='input-box'>
                                    <label>Số điện thoại:</label>
                                    <input
                                        type='text' placeholder='Số điện thoại' required
                                        className={"form-control form-control-user input-field"}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}

                                    />
                                </div>
                                <br />
                                <div className='input-box'>
                                    <label>Địa chỉ:</label>
                                    <input
                                        type='text' placeholder='Địa chỉ' required
                                        className={"form-control form-control-user input-field"}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={UpdateInfo}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Profile;
