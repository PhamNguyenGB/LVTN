import { useState, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import { loginStaff } from '../../store/slice/userSlice';
import { IoIosClose } from "react-icons/io";
import { createEvent, updateEvent } from '../../api/eventAPIs';
import { toast } from 'react-toastify';
import { fetAllLevels } from '../../api/levelAPIs';

const ModalEvent = (props) => {

    const { action, dataModelEvent } = props;

    const defaultEvent = {
        name: '',
        description: '',
        discount: '',
        expiryDate: '',
        maximum: '',
    }

    const validInputDefaults = {
        name: true,
        description: true,
        discount: true,
        expiryDate: true,
        maximum: true,
    };

    const [validInput, setValidInput] = useState(validInputDefaults);
    const [eventData, setEventData] = useState(defaultEvent);
    const [error, setError] = useState(true);
    const [dataLevels, setDataLevels] = useState('');
    const [level, setLevel] = useState('');


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
        let arr = ['name', 'description', 'discount', 'expiryDate', 'maximum'];
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

    const ClickLevels = (data) => {
        setLevel(prevSelected => {
            if (prevSelected.includes(data)) {
                return prevSelected.filter(item => item !== data);
            } else {
                return [...prevSelected, data];
            }
        })

    }

    const handleConfirmEvent = async () => {
        let check = checkValidInputs();
        if (check === true) {
            if (action === 'CREATE') {

                const data = await createEvent({ eventData, level });
                if (data.status === 0)
                    toast.success(data.mess);

            } else if (action === 'UPDATE') {
                const data = await updateEvent(eventData);
                if (data.status === 0)
                    toast.success(data.mess);
            }

            setEventData(defaultEvent);
            props.onHide();
        } else {
            setError(false);
        }

    };

    const fetAllLevel = async () => {
        fetAllLevels().then((res) => {
            if (res.status === 0) {
                setDataLevels(res.data);
            }
        });
    }

    useEffect(() => {
        fetAllLevel();
    }, [])

    useEffect(() => {
        if (action === 'UPDATE') {
            setEventData({ ...dataModelEvent });
        }
    }, [dataModelEvent]);

    return (
        <>
            <Modal size="lg" show={props.isShowModalEvent} className='modal-user' onHide={handleCloseModalEvent} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{action === 'CREATE' ? 'Thêm mới sản phẩm' : 'Cập nhật sản phẩm'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row '>
                        <div className='col-12 form-group'>
                            <label>Tên sự kiện </label>
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
                        <div className='col-4 form-group'>
                            <label>Giảm bao nhiêu (%) </label>
                            <input
                                className={validInput.discount ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={eventData.discount}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'discount')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Ngày hết hạn </label>
                            <input
                                className={validInput.expiryDate ? 'form-control' : 'form-control is-invalid'}
                                type='date'
                                value={eventData.expiryDate}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'expiryDate')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tối đa </label>
                            <input
                                className={validInput.maximum ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={eventData.maximum}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'maximum')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Các cấp bậc sử dụng: </label>
                            {dataLevels && dataLevels?.map((item, index) => {
                                return (
                                    <div key={`lv-${index}`}>
                                        <input
                                            type='checkbox'
                                            value={item.id}
                                            onChange={(event) => ClickLevels(event.target.value)}
                                        />
                                        <span className='ml-2'>{item.name}</span>
                                    </div>
                                )
                            })}

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

export default ModalEvent;