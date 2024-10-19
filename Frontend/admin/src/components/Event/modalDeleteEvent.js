import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteEvent } from '../../api/eventAPIs';
import { toast } from 'react-toastify';


const ModalDeleteEvent = (props) => {

    const confirmDeleteEvent = async () => {
        let response = await deleteEvent(props.dataModel.id);
        if (response.status === 0) {
            props.handleCloseModalDelete();
            toast.success(response.mess);
        }
    }

    return (
        <>
            <Modal show={props.isShowModalDelete} onHide={props.handleCloseModalDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa sự kiện</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn muốn xóa sự kiện này:
                    <h5 className='text-danger'>{props.dataModel?.name} ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModalDelete}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteEvent}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteEvent;