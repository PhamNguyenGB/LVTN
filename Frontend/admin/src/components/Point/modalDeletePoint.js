import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deletePoint } from '../../api/pointAPIs';
import { toast } from 'react-toastify';


const ModalDeletePoint = (props) => {

    const confirmDeletePoint = async () => {
        let response = await deletePoint(props.dataModel.id);
        if (response.status === 0) {
            props.handleCloseModalDelete();
            toast.success(response.mess);
        }
    }

    return (
        <>
            <Modal show={props.isShowModalDelete} onHide={props.handleCloseModalDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa mốc điểm thưởng</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn muốn xóa mốc điểm thưởng này:
                    <h5 className='text-danger'>{props.dataModel?.price} ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModalDelete}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={confirmDeletePoint}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeletePoint;