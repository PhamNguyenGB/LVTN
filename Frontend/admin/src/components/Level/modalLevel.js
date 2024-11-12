import { useState, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { createLevel, updateLevel } from '../../api/levelAPIs';
import { toast } from 'react-toastify';

const ModalLevel = (props) => {

    const { action, dataModelLevel } = props;

    const defaultEvent = {
        name: '',
        description: '',
    }

    const validInputDefaults = {
        name: true,
        description: true,
    };

    const [validInput, setValidInput] = useState(validInputDefaults);
    const [eventData, setEventData] = useState(defaultEvent);
    const [error, setError] = useState(true);


    const handleCloseModalEvent = () => {
        setEventData(defaultEvent);
        setValidInput(validInputDefaults);
        props.onHide();
    };

    const handleOnchangeInput = (value, name) => {
        let _productData = _.cloneDeep(eventData);
        _productData[name] = value;
        setEventData(_productData);
    };

    const checkValidInputs = () => {
        setValidInput(validInputDefaults);
        let arr = ['name', 'description'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!eventData[arr[i]]) {
                let _validInput = _.cloneDeep(validInputDefaults);
                _validInput[arr[i]] = false;
                setValidInput(_validInput);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleConfirmEvent = async () => {
        let check = checkValidInputs();
        if (check === true) {
            if (action === 'CREATE') {
                const data = await createLevel(eventData);
                if (data.status === 0)
                    toast.success(data.mess);

            } else if (action === 'UPDATE') {
                const data = await updateLevel(eventData);
                if (data.status === 0)
                    toast.success(data.mess);
            }

            setEventData(defaultEvent);
            props.onHide();
        } else {
            setError(false);
        }

    };

    useEffect(() => {
        if (action === 'UPDATE') {
            setEventData({ ...dataModelLevel });
        }
    }, [dataModelLevel]);

    return (
        <>
            <Modal size="lg" show={props.isShowModalLevel} className='modal-user' onHide={handleCloseModalEvent} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{action === 'CREATE' ? 'Thêm mới sản phẩm' : 'Cập nhật sản phẩm'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row '>
                        <div className='col-12 form-group'>
                            <label>Tên cấp bậc </label>
                            <input
                                className={validInput.name ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={eventData.name}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'name')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Mô tả </label>
                            <textarea
                                className={validInput.description ? 'form-control' : 'form-control is-invalid'}
                                id="w3review" name="w3review" rows="4" cols="50"
                                value={eventData.description}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'description')}
                            >
                                {eventData.description}
                            </textarea>
                        </div>
                        <div className='col-12 form-group' hidden={error}>
                            <div className='text-danger'>bạn chưa nhập đủ thông tin!!</div>
                        </div>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalEvent()}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmEvent()}>
                        {action === "CREATE" ? "Tạo mới" : "Cập nhật"}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalLevel;