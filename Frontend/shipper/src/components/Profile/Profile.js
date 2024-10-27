import './Profile.scss';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import imgUser from '../../assets/images/user.webp';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { updateAvatar, updateInfo } from '../../redux/slices/userSlice';

const Profile = () => {
    const [show, setShow] = useState(false);
    const fileInputRef = useRef(null);
    const [file, setFile] = useState('');

    const shipper = useSelector((state) => state.shipper.shipper);

    const [fullname, setFullname] = useState(shipper.fullname);
    const [phone, setPhone] = useState(shipper.phone);
    const [address, setAddress] = useState(shipper.address);

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
        // dispath(updateAvatar(formData));
        toast.success('Cập nhật ảnh đại diện thành công');
    }

    useEffect(() => {
        if (file) {
            handleUpdateAvatar();
        }
    }, [file]);

    const UpdateInfo = () => {
        // dispath(updateInfo({ fullname, phone, address }));
        toast.success('Cập nhật thông tin thành công');
        setShow(false);
    };

    return (
        <>
            <div className='container'>
                <div class="frame mt-5">
                    <div class="center m-2 row">
                        <div class="profile col-12 col-lg-4">
                            <div class="image">
                                <div class="circle-1"></div>
                                <div class="circle-2"></div>
                                <img
                                    src={shipper.avatar ? shipper.avatar : imgUser}
                                    alt=""
                                    style={{ objectFit: 'cover', width: '70px', height: '70px' }}
                                />
                            </div>

                            <div class="name">{shipper.fullname}</div>
                            <div class="job">Khách hàng</div>

                            <div class="actions">
                                <button class="btn">10 Coin</button>
                                <button class="btn" onClick={handleFileUpload}>Đổi ảnh</button>
                            </div>
                            <input
                                onChange={(e) => setFile(e.target.files)}
                                ref={fileInputRef} type='file' hidden={true}
                            />
                        </div>

                        {/* <div class="stats">
                            <div class="box">
                                <span class="value">1</span>
                                <span class="parameter">Posts</span>
                            </div>
                            <div class="box">
                                <span class="value">100</span>
                                <span class="parameter">Likes</span>
                            </div>
                            <div class="box">
                                <span class="value">3</span>
                                <span class="parameter">Follower</span>
                            </div>
                        </div> */}
                        <div className='m-2 info col-lg-8 col-12'>
                            <div class="container">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="card mb-4">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Họ và tên</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        <p class="text-muted mb-0">{shipper.fullname}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Email</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        <p class="text-muted mb-0">{shipper.email}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Số điện thoại</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        <p class="text-muted mb-0">{shipper.phone}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Địa chỉ</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        <p class="text-muted mb-0">{shipper.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                    <div className='update-info btn col-1 m-2' onClick={handleShow} >Cập nhật</div>
                                </div >
                            </div >
                        </div >
                    </div>
                </div >
            </div >
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
                                        className={"form-control form-control-shipper input-field"}
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </div>
                                <br />
                                <div className='input-box'>
                                    <label>Số điện thoại:</label>
                                    <input
                                        type='text' placeholder='Số điện thoại' required
                                        className={"form-control form-control-shipper input-field"}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}

                                    />
                                </div>
                                <br />
                                <div className='input-box'>
                                    <label>Địa chỉ:</label>
                                    <input
                                        type='text' placeholder='Địa chỉ' required
                                        className={"form-control form-control-shipper input-field"}
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
        </>
    )
};

export default Profile;