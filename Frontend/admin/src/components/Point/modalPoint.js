import { useState, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { createPoint, updatePoint } from '../../api/pointAPIs';
import { toast } from 'react-toastify';

const ModalPoint = (props) => {

    const { action, dataModelPoint } = props;

    const defaultEvent = {
        price: '',
        point: '',
        description: '',
    }

    const validInputDefaults = {
        price: true,
        point: true,
        description: true,
    };

    const [validInput, setValidInput] = useState(validInputDefaults);
    const [pointData, setPointData] = useState(defaultEvent);
    const [error, setError] = useState(true);


    const handleCloseModalPoint = () => {
        setPointData(defaultEvent);
        setValidInput(validInputDefaults);
        props.onHide();
    };

    const handleOnchangeInput = (value, name) => {
        let _productData = _.cloneDeep(pointData);
        _productData[name] = value;
        setPointData(_productData);
    };

    const checkValidInputs = () => {
        setValidInput(validInputDefaults);
        let arr = ['price', 'point', 'description'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!pointData[arr[i]]) {
                let _validInput = _.cloneDeep(validInputDefaults);
                _validInput[arr[i]] = false;
                setValidInput(_validInput);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleConfirmPoint = async () => {
        let check = checkValidInputs();
        if (check === true) {
            if (action === 'CREATE') {
                const data = await createPoint(pointData);
                if (data.status === 0)
                    toast.success(data.mess);

            } else if (action === 'UPDATE') {
                const data = await updatePoint(pointData);
                if (data.status === 0)
                    toast.success(data.mess);
            }

            setPointData(defaultEvent);
            props.onHide();
        } else {
            setError(false);
        }

    };

    useEffect(() => {
        if (action === 'UPDATE') {
            setPointData({ ...dataModelPoint });
        }
    }, [dataModelPoint]);

    return (
        <>
            <Modal size="lg" show={props.isShowModalPoint} className='modal-user' onHide={handleCloseModalPoint} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{action === 'CREATE' ? 'Thêm mới sản phẩm' : 'Cập nhật sản phẩm'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row '>
                        <div className='col-12 form-group'>
                            <label>Giá tiền đổi điểm </label>
                            <input
                                className={validInput.price ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={pointData.price}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'price')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Điểm tích lũy </label>
                            <input
                                className={validInput.point ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={pointData.point}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'point')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Mô tả </label>
                            <textarea
                                className={validInput.description ? 'form-control' : 'form-control is-invalid'}
                                id="w3review" name="w3review" rows="4" cols="50"
                                value={pointData.description}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'description')}
                            >
                                {pointData.description}
                            </textarea>
                        </div>
                        <div className='col-12 form-group' hidden={error}>
                            <div className='text-danger'>bạn chưa nhập đủ thông tin!!</div>
                        </div>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalPoint()}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmPoint()}>
                        {action === "CREATE" ? "Tạo mới" : "Cập nhật"}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalPoint;