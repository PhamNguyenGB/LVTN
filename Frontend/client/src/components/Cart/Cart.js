import './Cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, clearCart, deleteProductCart } from "../../redux/slices/cartSlice";
import { useEffect, useMemo, useState } from 'react';
// import { addOrder } from '../../redux/slices/orderSlice';
// import { addOrderDetail } from '../../redux/slices/orderDetailSlice';
import numeral from 'numeral';
import { fetchAllRegion } from '../../api/regionAPIs';
import { IoIosCheckmark } from "react-icons/io";
import { findEventByName } from '../../api/eventAPIs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { pointsRedemption } from '../../api/pointAPIs';
import { addOrder, addOrderDetail } from '../../api/orderAPIs';
import { zaloPay } from '../../api/paymentOnlineAPIs';

const Cart = () => {

    const disPatch = useDispatch();

    const cart = useSelector((state) => state.cart.cart);
    const amount = useSelector((state) => state.cart.amount);
    const quantityFromCart = useSelector((state) => state.cart.quantity);
    const user = useSelector((state) => state.user.user);

    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [phone, setPhone] = useState('');

    const [totalAmout, setTotalAmout] = useState(amount);
    const [shipping, setShipping] = useState(0);
    const [idShipping, setIdShipping] = useState('');

    const [orderSuccess, setOrderSuccess] = useState(true);

    const [active, setActive] = useState('');

    const [event, setEvent] = useState('');
    const [nameEvent, setNameEvent] = useState('');
    const [eventId, setEventId] = useState(null);

    const [totalDiscount, setTotalDiscount] = useState(0);

    const [tickPoint, setTickPoint] = useState(false);
    const [usePoint, setUsePoint] = useState(0);

    const [show, setShow] = useState(false);
    const [currency, setCurrency] = useState();

    const handleClose = () => setShow(false);

    const handleShow = async () => {
        if (shipping === 0 || address === '' || phone === '' || active === '') {
            toast.error('Bạn chưa điền đủ thông tin');
            return;

        } else {
            setTotalAmout(amount - ((totalDiscount * amount) + usePoint));
            const total = amount - ((totalDiscount * amount) + usePoint);
            const data = await pointsRedemption(total);

            if (data.status === 0)
                setCurrency(data.data);

            setShow(true);
        }
    }


    const [region, setRegion] = useState('');

    const getAllRegion = async () => {
        const data = await fetchAllRegion();
        setRegion(data);
    };

    useEffect(() => {
        getAllRegion();
    }, []);

    const handleDeleteProduct = async (idProduct) => {
        await disPatch(deleteProductCart(idProduct));
    };

    const increase = async (productId) => {
        await disPatch(increaseQuantity(productId));
    }

    const decrease = async (productId) => {
        await disPatch(decreaseQuantity(productId));
    };

    const handleQuantity = (quantity) => {

    };

    const handleOnChangeAddress = (newAddress) => {
        setAddress(newAddress);
    };

    const handleOnChangePhone = (newPhone) => {
        setPhone(newPhone);
    };

    const handleTotalAmout = (value) => {
        const selectedRegion = JSON.parse(value);

        setShipping(selectedRegion.deliveryFee);
        setIdShipping(selectedRegion.id);

    };

    const handleClickOrder = async () => {
        let payOnlineCode = null;
        if (active === 'zaloPay') {
            const request = await zaloPay({ totalAmout });
            payOnlineCode = request.payCode;
            window.open(request.data.order_url, '_blank');
        }

        await addOrder({ address, phone, regionId: idShipping, totalAmout, point: currency, paymentMethod: active, eventId, note, payOnlineCode });
        await addOrderDetail({ products: cart });
        await disPatch(clearCart());
        setTotalAmout(0);
        setShow(false);
        setOrderSuccess(false);
        setTimeout(() => {
            setOrderSuccess(true);
        }, 5000);

    }

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
    }

    const deliveryFee = useMemo(() => {
        return (
            <div>{formatNumber(shipping)} đ</div>
        )
    }, [shipping]);

    const clickPaymentMethod = (paymentMethod) => {
        setActive(paymentMethod);
    }

    const handleClickEvent = async (nameEvent) => {
        const data = await findEventByName(nameEvent);
        if (data.status === 0) {
            setEvent(data);
            if (data.data) {
                setTotalDiscount(data.data.discount / 100);
                setEventId(data.data.id);
            } else {
                setEventId(null);
                setTotalDiscount(0);
            }

        }
    }

    const handleUsePoint = async (value) => {
        if (tickPoint === false) {
            setTickPoint(true);
            setUsePoint(value);
        } else {
            setTickPoint(false);
            setUsePoint(0);
        }

    }


    return (
        <>
            <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff", fontSize: '16px' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h2 className="fw-bold mb-0 text-black">Giỏ hàng</h2>
                                                    <h6 className="mb-0 text-muted" style={{ fontSize: '16px' }}>{quantityFromCart} sản phẩm</h6>
                                                </div>
                                                <hr className="my-4" />

                                                {cart.map((item, index) => {
                                                    return (
                                                        <div key={`cart-${index}`}>
                                                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                                <div className="col-md-2 col-lg-2 col-xl-2">
                                                                    <img
                                                                        src={item?.images ? item.images[0] : ''}
                                                                        className="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                                    <h6 className="text-black mb-0" style={{ fontSize: '16px' }}>{item.name}</h6>
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                    <button className="btn px-2" style={{ color: '#e54b00' }}
                                                                        onClick={() => decrease(item.id)}
                                                                    >
                                                                        <i className="fa fa-minus" aria-hidden="true" style={{ fontSize: '16px' }}

                                                                        ></i>
                                                                    </button>

                                                                    <input min="0" name="quantity" value={item.quantity} type="text"
                                                                        onChange={(e) => handleQuantity(e.target.value)}
                                                                        className="form-control form-control-sm"
                                                                        style={{ width: '60px' }}
                                                                    />

                                                                    <button className="btn  px-2" style={{ color: '#e54b00' }}
                                                                        onClick={(e) => increase(item.id)}
                                                                    >
                                                                        <i className="fa fa-plus" aria-hidden="true" style={{ fontSize: '16px' }}

                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                    <span
                                                                        className="mb-0"
                                                                        style={{ fontSize: '16px' }}
                                                                    >
                                                                        {item.discount && item.discount > 0 ?
                                                                            formatNumber(item.discount * item.quantity)
                                                                            :
                                                                            formatNumber(item.price * item.quantity)
                                                                        } đ
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    role='button'
                                                                    className=" col-md-1 col-lg-1 col-xl-1 text-end"
                                                                    onClick={() => handleDeleteProduct(item.id)}
                                                                    style={{ color: '#dc3545' }}
                                                                >
                                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                                </div>
                                                            </div>

                                                            <hr className="my-4" />
                                                        </div>
                                                    )
                                                })}

                                                <div className="pt-5">
                                                    <h6 className="mb-0"><Link to='/' className="text-body">Trang chủ</Link></h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 bg-grey">
                                            <div className="p-5">
                                                <h4 className="fw-bold mb-5 mt-2 pt-1">Thanh toán</h4>
                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-4">
                                                    <span className="text-uppercase">Tổng tiền hàng ({quantityFromCart})</span>
                                                    <span>{formatNumber(amount)} đ</span>
                                                </div>

                                                <span className="text-uppercase mb-3">Khu vực giao hàng </span>

                                                <div className="mb-1 pb-2 d-flex justify-content-between">
                                                    <select className="select p-1" onChange={(e) => handleTotalAmout(e.target.value)}>
                                                        <option value="0">Chọn khu vực</option>
                                                        {
                                                            region ? region.map((item, index) => {
                                                                return (
                                                                    <option key={`regionFee-${index}`} value={JSON.stringify(item)} >{item.name}</option>
                                                                )
                                                            })
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                    </select>
                                                    {deliveryFee}
                                                </div>

                                                <span className="text-uppercase mb-3">Địa chỉ giao hàng</span>

                                                <div className="mb-3">
                                                    <div className="form-outline">
                                                        <textarea name="message" className='form-control form-control-md' rows="4" cols="50"
                                                            placeholder="Địa chỉ cụ thể"
                                                            value={address}
                                                            onChange={(e) => handleOnChangeAddress(e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <span className="text-uppercase mb-3">Ghi chú</span>

                                                <div className="mb-3">
                                                    <div className="form-outline">
                                                        <textarea name="message" className='form-control form-control-md' rows="4" cols="50"
                                                            placeholder="Ghi chú cho người giao hàng"
                                                            value={note}
                                                            onChange={(e) => setNote(e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <span className="text-uppercase mb-3">Số điện thoại</span>

                                                <div className="mb-3">
                                                    <div className="form-outline">
                                                        <input type="text" id="form3Examplea2" placeholder='Số điện thoại' className="form-control form-control-md" value={phone}
                                                            onChange={(e) => handleOnChangePhone(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <hr className="my-4" />
                                                <div className='mb-3'>
                                                    <span className="text-uppercase mb-3">Mã giảm giá</span>

                                                    <div className="input-group mb-1">
                                                        <input type="text" className="form-control" placeholder="Tìm kiếm" value={nameEvent} onChange={(e) => setNameEvent(e.target.value)} />
                                                        <button onClick={() => handleClickEvent(nameEvent)} className="btn" style={{ backgroundColor: '#e54b00', color: '#FFF' }} type="submit">Nhập</button>
                                                    </div>
                                                    <span className={event.data ? 'text-success' : 'text-danger'}>{event.data ? `Đơn hàng được giảm giá ${event.data.discount}%` : event.mess}</span>
                                                </div>

                                                <div>
                                                    <span className="text-uppercase mb-3">Số điểm của bạn</span>

                                                    <div className="input-group mb-3 justify-content-between">
                                                        <span>{user.point} Coin</span>
                                                        <input
                                                            disabled={user.point === 0 ? true : false}
                                                            type="checkbox"
                                                            className='form-checkbox'
                                                            value={tickPoint}
                                                            onChange={() => handleUsePoint(user.point)}
                                                        />
                                                    </div>
                                                </div>

                                                <hr className="my-4" />
                                                <div className='payment-method'>
                                                    <span className="text-uppercase mb-3">Phương thức thanh toán</span>

                                                    <div className="input-group mb-3">
                                                        <span
                                                            className={active === 'home' ? "payment m-1 p-2 active" : "payment m-1 p-2"}
                                                            onClick={() => clickPaymentMethod('home')}
                                                        >
                                                            Nhận hàng thanh toán
                                                            {active === 'home' ? <IoIosCheckmark className='tick' fontSize={18} /> : <></>}

                                                        </span>
                                                        <span
                                                            className={active === 'zaloPay' ? "payment m-1 p-2 active" : "payment m-1 p-2"}
                                                            onClick={() => clickPaymentMethod('zaloPay')}
                                                        >
                                                            ZaloPay
                                                            {active === 'zaloPay' ? <IoIosCheckmark className='tick' fontSize={18} /> : <></>}
                                                        </span>
                                                        <span
                                                            className={active === 'vnPay' ? "payment m-1 p-2 active" : "payment m-1 p-2"}
                                                            onClick={() => clickPaymentMethod('vnPay')}
                                                        >
                                                            VNPay
                                                            {active === 'vnPay' ? <IoIosCheckmark className='tick' fontSize={18} /> : <></>}

                                                        </span>

                                                    </div>
                                                </div>



                                                <hr className="my-4" />
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span className="text-uppercase">Tổng giảm giá</span>
                                                    <span>{formatNumber((totalDiscount * amount) + usePoint)} đ</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span className="text-uppercase">Tổng phí vận chuyển</span>
                                                    <span>{formatNumber(shipping)} đ</span>
                                                </div>

                                                <div className="d-flex justify-content-between mb-5">
                                                    <span className="text-uppercase">Tổng thanh toán</span>
                                                    <span>{formatNumber(amount - ((totalDiscount * amount) + usePoint))} đ</span>
                                                </div>

                                                <div className='text-success' hidden={orderSuccess}>Đặt hàng thành công</div>

                                                <div style={{ position: 'relative' }}>
                                                    <button type="button" className="btn p-2 "
                                                        onClick={() => handleShow()}
                                                        data-mdb-ripple-color="dark"
                                                        style={{ fontWeight: '500', position: 'absolute', right: '-20px', minWidth: '150px', backgroundColor: '#e54b00', color: '#fff' }}
                                                    >
                                                        Đặt hàng
                                                    </button>
                                                </div>
                                                <br />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {show === true ?
                <Modal show={show} onHide={handleClose} centered >
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận mua hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Bạn sẽ được cộng thêm {formatNumber(currency)} Coin vào tài khoản sau khi nhận hàng và đánh giá</span>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={() => handleClickOrder(cart)} >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
                :
                <></>
            }
        </>
    )
}

export default Cart;