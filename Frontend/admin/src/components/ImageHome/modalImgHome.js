import { useState, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { createLevel, updateLevel } from '../../api/levelAPIs';
import { toast } from 'react-toastify';
import { createImgHome } from '../../api/imgHomeAPIs';

const ModalImgHome = (props) => {

    const { action, dataModel } = props;

    const defaultEvent = {
        description: '',
    }

    const validInputDefaults = {
        url: true,
        description: true,
    };

    const [validInput, setValidInput] = useState(validInputDefaults);
    const [file, setFile] = useState('');
    const [description, setDescription] = useState('');
    const [eventData, setEventData] = useState(defaultEvent);
    const [error, setError] = useState(true);


    const handleCloseModalEvent = () => {
        setEventData(defaultEvent);
        setValidInput(validInputDefaults);
        props.onHide();
    };

    const handleConfirmEvent = async () => {
        if (file === '' || description === '') {
            setError(false);
            return;
        }
        if (action === 'CREATE') {
            console.log('cchek fiel', file);

            const formData = new FormData();
            formData.append('image', file[0]);
            formData.append('description', description);

            const data = await createImgHome(formData);
            if (data.status === 0)
                toast.success(data.mess);

        } else if (action === 'UPDATE') {
            const data = await updateLevel(eventData);
            if (data.status === 0)
                toast.success(data.mess);
        }

        setEventData(defaultEvent);
        props.onHide();


    };

    useEffect(() => {
        if (action === 'UPDATE') {
            setEventData({ ...dataModel });
        }
    }, [dataModel]);

    return (
        <>
            <Modal size="lg" show={props.isShowModal} className='modal-user' onHide={handleCloseModalEvent} centered>
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
                                className={validInput.url ? 'form-control' : 'form-control is-invalid'}
                                type='file'
                                onChange={(event) => setFile(event.target.files)}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Mô tả </label>
                            <textarea
                                className={validInput.description ? 'form-control' : 'form-control is-invalid'}
                                id="w3review" name="w3review" rows="4" cols="50"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
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

export default ModalImgHome;