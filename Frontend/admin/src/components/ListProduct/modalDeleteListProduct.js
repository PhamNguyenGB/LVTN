import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteListProduct } from '../../api/listProductAPIs';
import { toast } from 'react-toastify';


const ModalDeleteListProduct = (props) => {

    const confirmDeleteLP = async () => {
        let response = await deleteListProduct(props.dataModel.id);
        if (response.status === 0) {
            props.handleCloseModalDelete();
            toast.success(response.mess);
        }
    }

    return (
        <>
            <Modal show={props.isShowModalDelete} onHide={props.handleCloseModalDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa tên danh mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn muốn xóa tên danh mục này:
                    <h5 className='text-danger'>{props.dataModel?.name} ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModalDelete}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteLP}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteListProduct;