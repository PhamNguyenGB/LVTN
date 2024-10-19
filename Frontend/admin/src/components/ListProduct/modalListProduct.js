import { useState, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import { loginStaff } from '../../store/slice/userSlice';
import { IoIosClose } from "react-icons/io";
import { createEvent, updateEvent } from '../../api/eventAPIs';
import { createListProduct, updateListProduct } from '../../api/listProductAPIs';
import { toast } from 'react-toastify';

const ModalListProduct = (props) => {

    const { action, dataModelLP } = props;

    const defaultEvent = {
        name: '',
        description: '',
    }

    const validInputDefaults = {
        name: true,
        description: true,
    };

    const [validInput, setValidInput] = useState(validInputDefaults);
    const [LPData, setLPData] = useState(defaultEvent);
    const [error, setError] = useState(true);


    const handleCloseModalLP = () => {
        setLPData(defaultEvent);
        setValidInput(validInputDefaults);
        props.onHide();
    };

    const handleOnchangeInput = (value, name) => {
        let _productData = _.cloneDeep(LPData);
        _productData[name] = value;
        setLPData(_productData);
    };

    const checkValidInputs = () => {
        setValidInput(validInputDefaults);
        let arr = ['name', 'description'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!LPData[arr[i]]) {
                let _validInput = _.cloneDeep(validInputDefaults);
                _validInput[arr[i]] = false;
                setValidInput(_validInput);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleConfirmLP = async () => {
        let check = checkValidInputs();
        if (check === true) {
            if (action === 'CREATE') {
                const data = await createListProduct(LPData);
                if (data.status === 0)
                    toast.success(data.mess);

            } else if (action === 'UPDATE') {
                const data = await updateListProduct(LPData);
                if (data.status === 0)
                    toast.success(data.mess);
            }

            setLPData(defaultEvent);
            props.onHide();
        } else {
            setError(false);
        }

    };

    useEffect(() => {
        if (action === 'UPDATE') {
            setLPData({ ...dataModelLP });
        }
    }, [dataModelLP]);

    return (
        <>
            <Modal size="lg" show={props.isShowModalLP} className='modal-user' onHide={handleCloseModalLP} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{action === 'CREATE' ? 'Thêm mới sản phẩm' : 'Cập nhật sản phẩm'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row '>
                        <div className='col-12 form-group'>
                            <label>Tên danh mục </label>
                            <input
                                className={validInput.name ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Viết hoa chữ cái đầu'
                                type='text'
                                value={LPData.name}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'name')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Mô tả danh mục </label>
                            <textarea
                                className={validInput.description ? 'form-control' : 'form-control is-invalid'}
                                id="w3review" name="w3review" rows="4" cols="50"
                                value={LPData.description}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'description')}
                            >
                                {LPData.description}
                            </textarea>
                        </div>
                        <div className='col-12 form-group' hidden={error}>
                            <div className='text-danger'>bạn chưa nhập đủ thông tin!!</div>
                        </div>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalLP()}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmLP()}>
                        {action === "CREATE" ? "Tạo mới" : "Cập nhật"}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalListProduct;