import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteRegion } from '../../api/regionAPIs';
import { toast } from 'react-toastify';


const ModalDeleteRegion = (props) => {

    const confirmDeleteRegion = async () => {
        let response = await deleteRegion(props.dataModel.id);
        if (response.status === 0) {
            props.handleCloseModalDelete();
            toast.success(response.mess);
        }
    }

    return (
        <>
            <Modal show={props.isShowModalDelete} onHide={props.handleCloseModalDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa địa chỉ vận chuyển</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn muốn xóa địa chỉ này:
                    <h5 className='text-danger'>{props.dataModel?.name} ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModalDelete}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteRegion}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteRegion;