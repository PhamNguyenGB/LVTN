import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteLevel } from '../../api/levelAPIs';
import { toast } from 'react-toastify';


const ModalDeleteLevel = (props) => {

    const confirmDeleteEvent = async () => {
        let response = await deleteLevel(props.dataModel.id);
        if (response.status === 0) {
            props.handleCloseModalDelete();
            toast.success(response.mess);
        }
    }

    return (
        <>
            <Modal show={props.isShowModalDelete} onHide={props.handleCloseModalDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa cấp bậc</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn muốn xóa cấp bậc này:
                    <h5 className='text-danger'>{props.dataModel?.name} ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModalDelete}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteEvent}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteLevel;