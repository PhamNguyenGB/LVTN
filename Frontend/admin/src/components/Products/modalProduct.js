import { useState, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import './modalProduct.scss';
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import { loginStaff } from '../../store/slice/userSlice';
import { IoIosClose } from "react-icons/io";
import { createProduct, updateProduct } from '../../api/productAPI';
import { toast } from 'react-toastify';

const ModalProduct = (props) => {
    const { action, dataModelProduct } = props;

    const staff = useSelector((state) => state.staff.staff);
    const disPatch = useDispatch();
    const [show, setShow] = useState(false);
    const [deleteimg, setDeleteImg] = useState('');

    const handleClose = () => {
        setShow(false);
        setDeleteImg('');

    };
    const deleteImgeOld = (img) => {
        setDeleteImg(img);
        setShow(true);
    };

    const defaultProducts = {
        name: '',
        description: '',
        quantity: '',
        brand: '',
        price: '',
        size: '',
        origin: '',
        listProductId: '',
        images: '',
        disCount: '',
    }

    const validInputDefaults = {
        name: true,
        description: true,
        quantity: true,
        brand: true,
        price: true,
        size: true,
        origin: true,
        listProductId: true,
        // images: true,
        disCount: true,
    };

    // const previewImageObj = {
    //     url: '',
    //     name: '',
    //     size: '',
    // }

    const [validInput, setValidInput] = useState(validInputDefaults);
    const [productData, setProductData] = useState(defaultProducts);
    const [previewImage, setPreviewImage] = useState([]);
    const [previewImageOld, setPreviewImageOld] = useState([]);
    const [getFile, setGetFile] = useState([]);
    const [error, setError] = useState(true);


    const handleCloseModalProduct = () => {
        setProductData(defaultProducts);
        setValidInput(validInputDefaults);
        props.onHide();
    };

    const handleOnchangeInput = (value, name) => {
        let _productData = _.cloneDeep(productData);
        _productData[name] = value;
        setProductData(_productData);
    };

    const checkValidInputs = () => {
        setValidInput(validInputDefaults);
        let arr = ['name', 'listProductId', 'description', 'quantity', 'brand', 'price', 'size', 'origin'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!productData[arr[i]]) {
                let _validInput = _.cloneDeep(validInputDefaults);
                _validInput[arr[i]] = false;
                setValidInput(_validInput);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleOnchangeImage = async (files) => {
        try {
            if (files) {
                const newPreviewImages = [];
                const newGetFiles = [];

                for (let i = 0; i < files.length; i++) {
                    let objectUrl = URL.createObjectURL(files[i]);
                    // let pre = {
                    //     url: objectUrl,
                    //     name: files[i].name,
                    //     size: files[i].size,
                    // }
                    newPreviewImages.push(objectUrl);
                    newGetFiles.push(files[i]);
                }
                setPreviewImage([...newPreviewImages]);
                setGetFile([...newGetFiles]);
            }
        } catch (error) {
            console.log(error);

        }
    };

    const removePreviewImage = (prevImageOld) => {
        const newFiles = [];
        for (let i = 0; i < previewImageOld.length; i++) {
            if (previewImageOld[i] !== prevImageOld) {
                newFiles.push(previewImageOld[i]);
            }
        }
        setPreviewImageOld([...newFiles]);
        setShow(false);
        setDeleteImg('');
    };

    const handleConfirmProduct = async () => {
        let check = checkValidInputs();
        if (check === true) {
            if (action === 'CREATE') {

                const formData = new FormData();
                formData.append('brand', productData.brand);
                formData.append('description', productData.description);
                formData.append('disCount', productData.disCount);
                formData.append('listProductId', productData.listProductId);
                formData.append('name', productData.name);
                formData.append('origin', productData.origin);
                formData.append('price', productData.price);
                formData.append('quantity', productData.quantity);
                formData.append('size', productData.size);
                getFile.forEach((file) => {
                    formData.append('images', file);
                });

                const data = await createProduct(formData);
                if (data.status === 0)
                    toast.success(data.mess);

            } else if (action === 'UPDATE') {
                const formData = new FormData();

                formData.append('id', productData.id);
                formData.append('brand', productData.brand);
                formData.append('description', productData.description);
                formData.append('disCount', productData.disCount);
                formData.append('listProductId', productData.listProductId);
                formData.append('name', productData.name);
                formData.append('origin', productData.origin);
                formData.append('price', productData.price);
                formData.append('quantity', productData.quantity);
                formData.append('size', productData.size);

                formData.append('imgOld', previewImageOld);

                getFile.forEach((file) => {
                    formData.append('images', file);
                });

                const data = await updateProduct(formData);
                if (data.status === 0)
                    toast.success(data.mess);
            }

            setProductData(defaultProducts);
            props.onHide();
            setPreviewImage([]);
        } else {
            setError(false);
        }

    };

    useEffect(() => {
        if (action === 'UPDATE') {
            const images = JSON.parse(dataModelProduct.images);
            const preview = [];
            for (let i = 0; i < images.length; i++) {
                preview.push(images[i]);
            }
            setPreviewImageOld([...preview]);
            setProductData({ ...dataModelProduct });
        }
    }, [dataModelProduct]);

    const PreImages = useMemo(() => {
        return (
            <div className='col-12 check-image'>
                {previewImage.length > 0 && previewImage.map((item, index) =>
                    <span
                        className='position-relative'
                        key={`pre-${index}`}
                    >
                        <img
                            className='border border-1 border-dark'
                            src={item}
                        />
                    </span>
                )}

            </div>
        )
    }, [previewImage]);

    const PreImagesOld = useMemo(() => {
        return (
            <div className='col-12 check-image'>
                <h4>Hình ảnh cũ</h4>
                {previewImageOld.length > 0 && previewImageOld.map((item, index) =>
                    <>
                        <span
                            className='position-relative'
                            key={`pre-${index}`}
                        >
                            <img
                                className='border border-1 border-dark'
                                src={item}
                            />
                            <span
                                className='position-absolute'
                                style={{ bottom: '35px', right: '10px' }}
                                type='button'
                                onClick={() => deleteImgeOld(item)}
                            >
                                <IoIosClose size={18} />
                            </span>
                        </span>
                    </>
                )}
                <Modal show={show} centered onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Bạn muốn xóa ảnh này</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            className='border border-1 border-dark'
                            src={deleteimg}
                            style={{ width: '400px', height: 'auto' }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Không
                        </Button>
                        <Button variant="danger" onClick={() => removePreviewImage(deleteimg)}                        >
                            Xóa ngay
                        </Button>
                    </Modal.Footer>
                </Modal >
            </div >
        )
    }, [previewImageOld, show]);

    return (
        <>
            <Modal size="lg" show={props.isShowModalProduct} className='modal-user' onHide={handleCloseModalProduct} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{action === 'CREATE' ? 'Thêm mới sản phẩm' : 'Cập nhật sản phẩm'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row '>
                        <div className='col-12 form-group'>
                            <label>Tên sản phẩm: </label>
                            <input
                                className={validInput.name ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.name}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'name')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(event) => handleOnchangeInput(event.target.value, 'listProductId')}
                            >
                                <option selected>Loại sản phẩm</option>
                                <option value={1}>Xe Ô Tô</option>
                                <option value={2}>Xe Chuyên dụng</option>
                                <option value={3}>Máy Bay</option>
                                <option value={4}>Mô Tô</option>
                            </select>
                            {/* <input
                                className={validInput.name ? 'form-control' : 'form-control is-invalid'}
                                type='select'
                                value={productData.name}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'name')}
                            /> */}
                        </div>
                        <div className='col-12 form-group'>
                            <label>Mô tả </label>
                            {/* <input
                                className={validInput.destruction ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.destruction}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'destruction')}
                            /> */}
                            <textarea
                                className={validInput.description ? 'form-control' : 'form-control is-invalid'}
                                id="w3review" name="w3review" rows="4" cols="50"
                                value={productData.description}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'description')}
                            >
                                {productData.description}
                            </textarea>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Số lượng </label>
                            <input
                                className={validInput.quantity ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.quantity}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'quantity')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tên hãng xe </label>
                            <input
                                className={validInput.brand ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.brand}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'brand')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Giá bán </label>
                            <input
                                className={validInput.price ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.price}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'price')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Kích cỡ</label>
                            <input
                                className={validInput.size ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.size}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'size')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Nhà sản xuất</label>
                            <input
                                className={validInput.origin ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.origin}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'origin')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Giảm giá</label>
                            <input
                                className={validInput.disCount ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={productData.disCount}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'disCount')}
                            />
                        </div>
                        <div className=' form-image'>
                            <form encType="multipart/form-data">
                                <div className=' form-group col-6'>
                                    <label>Hình ảnh</label>
                                    <input
                                        className={'form-control'}
                                        type='file'
                                        multiple='multiple'
                                        onChange={(event) => handleOnchangeImage(event.target.files)}
                                    />
                                </div>
                                {PreImages}
                                <hr />
                                {PreImagesOld}
                            </form>
                        </div>
                        <div className='col-12 form-group' hidden={error}>
                            <div className='text-danger'>bạn chưa nhập đủ thông tin!!</div>
                        </div>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalProduct()}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmProduct()}>
                        {action === "CREATE" ? "Tạo mới" : "Cập nhật"}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalProduct;