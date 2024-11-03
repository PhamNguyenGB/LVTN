import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import numeral from 'numeral';
import { getOrderDetail } from "../../api/orderAPIs";
import { createReviewAndComment } from "../../api/commentReviewAPIs";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaStar } from "react-icons/fa";

const OrderDetail = () => {
    const history = useHistory();
    // const disPatch = useDispatch();
    const { id } = useParams();

    const [data, setData] = useState('');
    const [order, setOrder] = useState('');
    const [show, setShow] = useState(false);

    const [star, setStar] = useState(5);
    const [content, setContent] = useState('');
    const [productId, setProductId] = useState();
    const [OrDId, setOrDId] = useState();

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        console.log('item', item);

        setShow(true);
        setProductId(item.Product.id);
        setOrDId(item.id);
    }

    const GoBack = () => {
        history.goBack();
    }

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
    }

    const review = (values) => {
        setStar(values);
    }

    const getAllYourOrderDetail = async () => {
        const request = await getOrderDetail(id);
        if (request.status === 0) {
            const getAllProducts = [];
            request.data.forEach(item => {
                const images = JSON.parse(item.Product.images);
                getAllProducts.push({
                    ...item, Product: {
                        ...item.Product,
                        images: images
                    }
                });
            });
            setData(getAllProducts);
            setOrder(request?.data[0].Order);
        }
    }

    const handleReview = async () => {
        await createReviewAndComment({ productId, content, star, OrDId });
        getAllYourOrderDetail();
        setShow(false);
    };

    useEffect(() => {
        getAllYourOrderDetail();
    }, []);

    return (
        <>
            <section className=" gradient-custom-2">
                <div className=" py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-10 col-lg-8 col-xl-6">
                            <div className="card card-stepper" style={{ borderRadius: "16px" }}>
                                <div className="card-header p-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div style={{ fontSize: '16px', color: "#f37a27" }} onClick={GoBack} role="button">
                                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                                            Trở về
                                        </div>
                                        <div>
                                            <p className="text-muted mb-2">Mã đơn hàng <span className="fw-bold text-body">{order.orderCode}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    {data && data?.map((item, index) => {
                                        return (
                                            <div key={`dt-${index}`}>
                                                <div className="d-flex flex-row mb-1 pb-2">
                                                    <div className="flex-fill">
                                                        <div className="bold">Tên: {item.Product.name}</div>
                                                        <div className="text-muted"> Số lượng: {item.quantity}</div>
                                                        <div className="mb-3">Giá tiền: {formatNumber(item.totalCost)} đ</div>
                                                        <div>Thương hiệu: {item.Product.brand}</div>

                                                    </div>
                                                    <div>
                                                        <img className="align-self-center img-fluid"
                                                            src={item.Product.images[0]} width="250" alt="lỗi ảnh" />
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end mb-3">
                                                    <button
                                                        className="btn m-1"
                                                        disabled={item.evaluated === false ? (order.status === 'Đã giao' ? false : true) : true}
                                                        style={{ backgroundColor: '#f37a27', color: '#fff', padding: '8px 20px' }}
                                                        onClick={() => handleShow(item)}
                                                    >
                                                        Đánh giá
                                                    </button>
                                                    <button className="btn m-1" style={{ backgroundColor: '#f37a27', color: '#fff', padding: '8px 20px' }}>Xem trực tiếp</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='review'>
                            <div className="mb-5">
                                <span >Chất lượng sản phẩm: </span>
                                <FaStar color={star >= 1 ? '#ffb81e' : ''} value="1" fontSize={30} onClick={(e) => review(e.currentTarget.getAttribute('value'))} />
                                <FaStar color={star >= 2 ? '#ffb81e' : ''} value="2" fontSize={30} onClick={(e) => review(e.currentTarget.getAttribute('value'))} />
                                <FaStar color={star >= 3 ? '#ffb81e' : ''} value="3" fontSize={30} onClick={(e) => review(e.currentTarget.getAttribute('value'))} />
                                <FaStar color={star >= 4 ? '#ffb81e' : ''} value="4" fontSize={30} onClick={(e) => review(e.currentTarget.getAttribute('value'))} />
                                <FaStar color={star > 4 ? '#ffb81e' : ''} value="5" fontSize={30} onClick={(e) => review(e.currentTarget.getAttribute('value'))} />
                            </div>
                            <div className='form-inputs'>
                                <div className='input-box'>
                                    <label>Nội dung đánh giá:</label>
                                    <textarea
                                        className="form-control form-control-user input-field"
                                        style={{ minHeight: '200px' }}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    >

                                    </textarea>

                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleReview}>
                        Đánh giá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default OrderDetail;