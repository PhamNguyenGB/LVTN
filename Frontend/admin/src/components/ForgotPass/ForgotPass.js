import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { forgotPass } from '../../api/staffAPIs';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ForgotPass = () => {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const handleClose = () => setShow(false);
    const history = useHistory();

    const handleShow = () => {
        if (email === '') {
            setError(true);
            setTimeout(() => {
                setError(false);

            }, 3000)
        }
        else
            setShow(true);
    }

    const resetPassword = async () => {
        const request = await forgotPass({ email });
        if (request.status === 0) {
            if (request.mess === 'Cập nhật mật khẩu thành công') {
                toast.success(request.mess);
                history.push('/login');
            }
            else
                toast.error(request.mess);
        }
        setShow(false);
    }

    return (
        <div className=''>
            <form>
                <div className='mt-5' style={{ width: '500px', background: '#ccc', border: '3px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                    <div className='form-inputs m-3'>
                        <div className='input-box'>
                            <label>Nhập vào địa chỉ email:</label>
                            <input
                                type='email' required
                                className={"form-control form-control-user input-field"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={error === true ? 'text-danger d-block' : 'd-none'}>Vui lòng nhập vào email</div>
                        <span onClick={handleShow} className='btn btn-primary mt-4' style={{ marginLeft: '350px' }}>Xác nhận</span>
                    </div>
                </div>
            </form>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Mật khẩu mới sẽ được gửi về email của bạn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn gửi mật khẩu mới ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={resetPassword}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ForgotPass
