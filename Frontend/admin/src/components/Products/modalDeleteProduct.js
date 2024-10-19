import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteProduct } from '../../api/productAPI';
import { toast } from 'react-toastify';


const ModalDeleteProduct = (props) => {

    const confirmDeleteProduct = async () => {
        let response = await deleteProduct(props.dataModel.id);
        if (response.status === 0) {
            props.handleCloseModalDelete();
            toast.success(response.mess);
        }
    }

    return (
        <>
            <Modal show={props.isShowModalDelete} onHide={props.handleCloseModalDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa mô hình</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn muốn xóa mô hình:
                    <h5 className='text-danger'>{props.dataModel?.name} ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModalDelete}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteProduct}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteProduct;