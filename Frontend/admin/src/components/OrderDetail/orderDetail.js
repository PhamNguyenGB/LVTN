import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './orderDetail.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { updateStatusOrder } from '../../store/slice/orderSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import numeral from 'numeral';
import { getOrderDetail } from '../../api/orderDetailAPIs';

const OrderDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { id } = useParams();

    // const products_OD = useSelector((state) => state.orderDetail.products);
    const shipping = useSelector((state) => state.orderDetail.shipping);
    const status = useSelector((state) => state.orderDetail.status);
    const totalAmout = useSelector((state) => state.orderDetail.totalAmout);
    const staff = useSelector((state) => state.staff.staff);

    const [products_OD, setProductOD] = useState('');
    const [info, setInfo] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchOrderDetail = async () => {
        const data = await getOrderDetail(id);
        if (data.status === 0) {

            setInfo(data.data[0].Order)
            const getAllProducts = [];
            let total = 0;
            data.data.forEach(item => {
                if (item.Product.discount && item.Product.discount > 0) {
                    total += item.Product.discount * item.quantity;
                } else {
                    total += item.Product.price * item.quantity;
                }


                const images = JSON.parse(item.Product.images);
                getAllProducts.push({
                    ...item, Product: {
                        ...item.Product,
                        images: images
                    }
                });
            });
            setTotalPrice(total);
            setProductOD(getAllProducts);
        }
    }

    useEffect(() => {
        setTotalPrice(0);
        fetchOrderDetail();
    }, [id])



    const handleGoBack = () => {
        history.goBack();
    };

    const handleConfirmOrder = (action) => {
        const data = { orderId: id, status: action }
        dispatch(updateStatusOrder({ data, access_token: staff.access_token }));
        history.goBack();
    };

    const handleCancelOrder = (action) => {
        const data = { orderId: id, status: action }
        dispatch(updateStatusOrder({ data, access_token: staff.access_token }));
        history.goBack();
    };

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
    }

    console.log('check product', info);


    return (
        <>
            <div class="order-detail">

                {/* <!-- Page Wrapper --> */}
                <div class="wrapper">

                    {/* <!-- Content Wrapper --> */}
                    <div style={{ width: '100%' }} className="content-wrapper d-flex flex-column">

                        {/* <!-- Main Content --> */}
                        <section className="gradient-custom py-5">
                            <div className="box row d-flex justify-content-center align-items-center">
                                <div className="col-lg-10 col-12">
                                    <div className="card" style={{ borderRadius: "10px" }}>
                                        <div className="card-header px-4 py-5">
                                            <NavLink to='#' style={{ color: '#d59476', textDecoration: 'none' }}
                                                onClick={() => handleGoBack()}
                                            > <i className="fa fa-arrow-left" aria-hidden="true"></i> Trở về</NavLink>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <p className="lead fw-normal mb-0" style={{ color: "#d59476" }}>Thông tin</p>
                                            </div>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <span>Địa chỉ giao hàng: </span>
                                                    <span>{info.address}</span>
                                                </div>
                                                <div className='col-12'>
                                                    <span>Số điện thoại: </span>
                                                    <span>{info.phone}</span>
                                                </div>
                                                <div className='col-12'>
                                                    <div>Ghi chú của khách hàng: </div>
                                                    <div>{info.note}</div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <p className="lead fw-normal mb-0" style={{ color: "#d59476" }}>Chi tiết</p>
                                            </div>
                                            {products_OD ?
                                                <>
                                                    {products_OD.map((item, index) => {
                                                        return (
                                                            <div className="card shadow-0 border mb-4" key={`orderDetail-${index}`}>
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-2">
                                                                            <img src={item.Product.images[0]}
                                                                                className="img-fluid" alt="Lỗi" />
                                                                        </div>
                                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-muted mb-0">{item.Product.name}</p>
                                                                        </div>
                                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-danger mb-0 small">
                                                                                Giá: {item.Product.discount ? formatNumber(item.Product.discount) : formatNumber(item.Product.price)} đ
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-muted mb-0 small">Thương hiệu: {item.Product.brand}</p>
                                                                        </div>
                                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-muted mb-0 small">S Lượng: {item.quantity}</p>
                                                                        </div>
                                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-danger mb-0 small">
                                                                                Tổng: {item.Product.discount ? formatNumber(item.Product.discount * item.quantity) : formatNumber(item.Product.price * item.quantity)} đ
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                                :
                                                <>
                                                    ...isLoading
                                                </>
                                            }
                                            <div className="row d-flex align-items-center">
                                                <div className="col-md-2">
                                                    <p className="text-muted mb-0 small">Quá trình vận chuyển</p>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="progress" style={{ height: "6px", borderRadius: "16px" }}>
                                                        <div className="progress-bar" role="progressbar"
                                                            style={{ width: "65%", borderRadius: "16px", backgroundColor: "#d59476" }} aria-valuenow="65"
                                                            aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                    <div className="d-flex justify-content-around mb-1">
                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Gửi hàng</p>
                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Đang vận chuyển</p>
                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Đang giao</p>
                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Đã giao</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between pt-2">
                                                <p className="fw-bold mb-0"></p>
                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Tiền hàng</span>{formatNumber(totalPrice)} đ</p>
                                            </div>
                                            <div className="d-flex justify-content-between pt-2">
                                                <p className="fw-bold mb-0"></p>
                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Giảm giá</span>{info.Event ? formatNumber(totalPrice * (info.Event.discount / 100)) : 0} đ</p>
                                            </div>

                                            <div className="d-flex justify-content-between pt-2">
                                                <p className="fw-bold mb-0"></p>
                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Dùng Coin</span> 0 đ</p>
                                            </div>

                                            <div className="d-flex justify-content-between pt-2  mb-5">
                                                <p className="fw-bold mb-0"></p>
                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Phí vận chuyển</span>{info ? formatNumber(info.Region.deliveryFee) : 0} đ</p>
                                            </div>

                                        </div>
                                        <div className="card-footer border-0 px-4 py-5"
                                            style={{ backgroundColor: " #d59476 ", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                                            <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Tổng
                                                tiền: <span className="h2 mb-0 ms-2">{formatNumber(info.totalCost)} vnđ</span></h5>
                                            {info.status === 'Chưa xác nhận' ?
                                                <div className='d-flex justify-content-end mt-3'>
                                                    <button className='btn btn-success m-2 mb-0' onClick={() => handleConfirmOrder('Đã xác nhận')}>Xác nhận đơn</button>
                                                    <button className='btn btn-danger m-2 mb-0' onClick={handleShow}>Hủy đơn</button>
                                                </div>
                                                :
                                                <div className='d-flex justify-content-end mt-3 text-white'>
                                                    {info.status}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* <!-- End of Main Content --> */}
                    </div>
                    {/* <!-- End of Content Wrapper --> */}

                </div>
                {/* <!-- End of Page Wrapper --> */}

                {/* <!-- Scroll to Top Button--> */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>

                {show === true ?
                    <>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Xác nhận hủy đơn hàng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Bạn chắc chắn muốn hủy đơn?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                                <Button variant="danger" onClick={() => handleCancelOrder('Đã hủy đơn')}>
                                    Hủy đơn
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    :
                    <></>
                }
            </div >
        </>
    )
}

export default OrderDetail;