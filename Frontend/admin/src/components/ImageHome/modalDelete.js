import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteImgHome } from '../../api/imgHomeAPIs';
import { toast } from 'react-toastify';


const ModalDelete = (props) => {

    const confirmDeleteEvent = async () => {
        let response = await deleteImgHome(props.dataModelDelete.id);
        if (response.status === 0) {
            props.handleCloseModalDelete();
            toast.success(response.mess);
        }
    }

    return (
        <>
            <Modal show={props.isShowModalDelete} onHide={props.handleCloseModalDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa hình ảnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn muốn xóa hình ảnh này ?
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
export default ModalDelete;