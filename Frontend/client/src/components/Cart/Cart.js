import './Cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, clearCart, deleteProductCart } from "../../redux/slices/cartSlice";
import { useEffect, useState } from 'react';
import { addOrder } from '../../redux/slices/orderSlice';
import { addOrderDetail } from '../../redux/slices/orderDetailSlice';
import numeral from 'numeral';

const Cart = () => {

    const disPatch = useDispatch();

    const cart = useSelector((state) => state.cart.cart);
    const amount = useSelector((state) => state.cart.amount);
    const quantityFromCart = useSelector((state) => state.cart.quantity);
    const user = useSelector((state) => state.user.user);

    const [address, setAddress] = useState(user.address);
    const [phone, setPhone] = useState(user.phone);
    const [totalAmout, setTotalAmout] = useState(amount);
    const [shipping, setShipping] = useState();
    const [error, setError] = useState(true);
    const [orderSuccess, setOrderSuccess] = useState(true);
    const [active, setActive] = useState(false);

    console.log('check cart', cart);


    const handleDeleteProduct = async (idProduct) => {
        await disPatch(deleteProductCart(idProduct));
    };

    const increase = async (productId) => {
        await disPatch(increaseQuantity(productId));
    }

    const decrease = async (productId) => {
        await disPatch(decreaseQuantity(productId));
    };

    const handleQuantity = async (quantity) => {

    };

    const handleOnChangeAddress = async (newAddress) => {
        setAddress(newAddress);
    };

    const handleOnChangePhone = async (newPhone) => {
        setPhone(newPhone);
    };

    const handleTotalAmout = async (shipping) => {
        if (shipping === '1') {
            setShipping(30000);
            setTotalAmout(amount + 30000);
        } else if (shipping === '2') {
            setShipping(50000);
            setTotalAmout(amount + 50000);
        } else if (shipping === '3') {
            setShipping(80000);
            setTotalAmout(amount + 80000);
        } else {
            setShipping();
            setTotalAmout(amount);
        }
    };

    const handleClickOrder = async (data) => {
        if (!shipping || !address || !phone) {
            setError(false);
            setTimeout(() => {
                setError(true);
            }, 5000);
            return;
        } else {
            await disPatch(addOrder({ userId: user.id, address, phone, shipping, totalAmout }));
            await disPatch(addOrderDetail({ userId: user.id, products: cart }));
            await disPatch(clearCart());
            setTotalAmout(0);
            setOrderSuccess(false);
            setTimeout(() => {
                setOrderSuccess(true);
            }, 5000);
        }
    }

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
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
                                                                        src={item.images[0]}
                                                                        className="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                                    <h6 className="text-black mb-0" style={{ fontSize: '16px' }}>{item.name}</h6>
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                    <button className="btn btn-link px-2">
                                                                        <i className="fa fa-minus" aria-hidden="true" style={{ fontSize: '16px' }}
                                                                            onClick={() => decrease(item.id)}
                                                                        ></i>
                                                                    </button>

                                                                    <input min="0" name="quantity" value={item.quantity} type="text"
                                                                        onChange={(e) => handleQuantity(e.target.value)}
                                                                        className="form-control form-control-sm" />

                                                                    <button className="btn btn-link px-2">
                                                                        <i className="fa fa-plus" aria-hidden="true" style={{ fontSize: '16px' }}
                                                                            onClick={(e) => increase(item.id)}
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                    <span className="mb-0" style={{ fontSize: '16px' }}>{formatNumber(item.price * item.quantity)} đ</span>
                                                                </div>
                                                                <div role='button' className=" col-md-1 col-lg-1 col-xl-1 text-end" onClick={() => handleDeleteProduct(item.id)} >
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

                                                <div className="mb-4 pb-2 d-flex justify-content-between">
                                                    <select className="select p-1" onChange={(e) => handleTotalAmout(e.target.value)}>
                                                        <option value="0">Chọn phương thức giao hàng</option>
                                                        <option value="1">Giao bình thường</option>
                                                        <option value="2">Giao hàng nhanh</option>
                                                        <option value="3">Giao hàng siêu tốc</option>
                                                    </select>
                                                    <span>{formatNumber(shipping)} đ</span>
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

                                                <span className="text-uppercase mb-3">Số điện thoại</span>

                                                <div className="mb-3">
                                                    <div className="form-outline">
                                                        <input type="text" id="form3Examplea2" placeholder='Số điện thoại' className="form-control form-control-md" value={phone}
                                                            onChange={(e) => handleOnChangePhone(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='text-danger' hidden={error}>Bạn chưa điền đủ thông tin để thanh toán!!</div>
                                                <hr className="my-4" />
                                                <div>
                                                    <span className="text-uppercase mb-3">Mã giảm giá</span>

                                                    <div class="input-group mb-3">
                                                        <input type="text" class="form-control" placeholder="Tìm kiếm" />
                                                        <button class="btn btn-success" type="submit">Go</button>
                                                    </div>
                                                </div>

                                                <hr className="my-4" />
                                                <div className='payment-method'>
                                                    <span className="text-uppercase mb-3">Phương thức thanh toán</span>

                                                    <div class="input-group mb-3">
                                                        <span class="payment m-1 p-2" >Nhận hàng thanh toán</span>
                                                        <span class="payment m-1 p-2">ZaloPay</span>
                                                        <span class="payment m-1 p-2">VNPay</span>

                                                    </div>
                                                </div>



                                                <hr className="my-4" />
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span className="text-uppercase">Tổng giảm giá</span>
                                                    <span>{formatNumber(totalAmout)} đ</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span className="text-uppercase">Tổng phí vận chuyển</span>
                                                    <span>{formatNumber(totalAmout)} đ</span>
                                                </div>

                                                <div className="d-flex justify-content-between mb-5">
                                                    <span className="text-uppercase">Tổng thanh toán</span>
                                                    <span>{formatNumber(totalAmout)} đ</span>
                                                </div>

                                                <div className='text-success' hidden={orderSuccess}>Đặt hàng thành công</div>

                                                <div style={{ position: 'relative' }}>
                                                    <button type="button" className="btn btn-primary p-2 "
                                                        onClick={() => handleClickOrder(cart)}
                                                        data-mdb-ripple-color="dark"
                                                        style={{ fontWeight: '500', position: 'absolute', right: '-20px', minWidth: '150px' }}
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
            </section>
        </>
    )
}

export default Cart;