import { useState, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import { loginStaff } from '../../store/slice/userSlice';
import { IoIosClose } from "react-icons/io";
import { createRegion, updateRegion } from '../../api/regionAPIs';
import { toast } from 'react-toastify';

const ModalRegion = (props) => {

    const { action, dataModelRegion } = props;

    const defaultRegion = {
        name: '',
        deliveryFee: '',
    }

    const validInputDefaults = {
        name: true,
        deliveryFee: true,
    };

    const [validInput, setValidInput] = useState(validInputDefaults);
    const [regionData, setRegionData] = useState(defaultRegion);
    const [error, setError] = useState(true);


    const handleCloseModalRegion = () => {
        setRegionData(defaultRegion);
        setValidInput(validInputDefaults);
        props.onHide();
    };

    const handleOnchangeInput = (value, name) => {
        let _productData = _.cloneDeep(regionData);
        _productData[name] = value;
        setRegionData(_productData);
    };

    const checkValidInputs = () => {
        setValidInput(validInputDefaults);
        let arr = ['name', 'deliveryFee'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!regionData[arr[i]]) {
                let _validInput = _.cloneDeep(validInputDefaults);
                _validInput[arr[i]] = false;
                setValidInput(_validInput);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleConfirmRegion = async () => {
        let check = checkValidInputs();
        if (check === true) {
            if (action === 'CREATE') {
                const data = await createRegion(regionData);
                if (data.status === 0)
                    toast.success(data.mess);

            } else if (action === 'UPDATE') {
                const data = await updateRegion(regionData);
                if (data.status === 0)
                    toast.success(data.mess);
            }

            setRegionData(defaultRegion);
            props.onHide();
        } else {
            setError(false);
        }

    };

    useEffect(() => {
        if (action === 'UPDATE') {
            setRegionData({ ...dataModelRegion });
        }
    }, [dataModelRegion]);

    return (
        <>
            <Modal size="lg" show={props.isShowModalRegion} className='modal-user' onHide={handleCloseModalRegion} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{action === 'CREATE' ? 'Thêm mới sản phẩm' : 'Cập nhật sản phẩm'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row '>
                        <div className='col-12 form-group'>
                            <label>Tên địa chỉ </label>
                            <input
                                className={validInput.name ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={regionData.name}
                                onChange={(Region) => handleOnchangeInput(Region.target.value, 'name')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Phí vận chuyển </label>
                            <input
                                className={validInput.deliveryFee ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={regionData.deliveryFee}
                                onChange={(Region) => handleOnchangeInput(Region.target.value, 'deliveryFee')}
                            />
                        </div>
                        <div className='col-12 form-group' hidden={error}>
                            <div className='text-danger'>bạn chưa nhập đủ thông tin!!</div>
                        </div>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalRegion()}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmRegion()}>
                        {action === "CREATE" ? "Tạo mới" : "Cập nhật"}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalRegion;