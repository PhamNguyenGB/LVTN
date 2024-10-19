import './order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getOrderById } from '../../redux/slices/orderSlice';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import numeral from 'numeral';

const Order = () => {

    const history = useHistory();
    const disPatch = useDispatch();
    const user = useSelector((state) => state.user.user);



    useEffect(() => {
        disPatch(getOrderById(user.access_token));
    }, []);

    const yourOrder = useSelector((state) => state.order.yourOrder);

    const formattedDate = (date) => {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }

    const isEmpty = (arr) => {
        return Array.isArray(arr) && arr.length === 0;
    }

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
    }


    return (
        <>
            {yourOrder ?
                <>
                    {isEmpty(yourOrder) === false ?
                        <>
                            {yourOrder?.map((item, index) => {
                                return (
                                    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                                        <div className="container py-5 h-100">
                                            <div className="row d-flex justify-content-center align-items-center h-100">
                                                <div className="col-lg-8 col-xl-6">
                                                    <div className="card border-top border-bottom border-3" style={{ borderColor: "#f37a27 !important" }}>
                                                        <div className="card-body p-5">

                                                            <p className="lead fw-bold mb-5" style={{ color: "#f37a27" }}>Purchase Reciept</p>

                                                            <div className="row">
                                                                <div className="col mb-3">
                                                                    <p className="small text-muted mb-1">Date</p>
                                                                    <p>{formattedDate(item.createdAt)}</p>
                                                                </div>
                                                                <div className="col mb-3">
                                                                    <p className="small text-muted mb-1">Order No.</p>
                                                                    <p>012j1gvs356c</p>
                                                                </div>
                                                            </div>

                                                            <div className="mx-n5 px-5 py-4" style={{ backgroundColor: "#f2f2f2" }}>
                                                                <div className="row">
                                                                    <div className="col-md-8 col-lg-9">
                                                                        <p>Tổng giá tiền của sản phẩm</p>
                                                                    </div>
                                                                    <div className="col-md-4 col-lg-3">
                                                                        <p>{formatNumber(item.totalCost - item.pay)} đ</p>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-8 col-lg-9">
                                                                        <p className="mb-0">Shipping</p>
                                                                    </div>
                                                                    <div className="col-md-4 col-lg-3">
                                                                        <p className="mb-0">{formatNumber(item.pay)} đ</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row my-4">
                                                                <div className="row">
                                                                    <div className="col-md-8 col-lg-9">
                                                                        <p className="mb-0 fw-bold lead text-dark">Tổng tiền</p>
                                                                    </div>
                                                                    <div className="col-md-4 col-lg-3">
                                                                        <p className="mb-0 fw-bold lead text-dark" >{formatNumber(item.totalCost)} đ</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <p className="lead fw-bold mb-4 pb-2 text-dark">Địa chỉ: {item.address}</p>
                                                            <p className="lead fw-bold mb-4 pb-2 text-dark">Số điện thoại: {item.phone}</p>
                                                            <p className="lead fw-bold mb-4 pb-2 text-dark">{item.status}</p>

                                                            <div className="row">
                                                                <div className="col-lg-12">

                                                                    <div className="horizontal-timeline">

                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <p className="mt-4 pt-2 mb-0">
                                                                <NavLink to={`/order/${item.id}`} style={{ color: "#f37a27" }}>Xem chi tiết</NavLink>
                                                            </p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section >
                                )
                            })}
                        </>
                        :
                        <h1 className='order-empty'>
                            Bạn chưa có đơn hàng nào
                        </h1>

                    }
                </>
                :
                <>
                    ...isLoading
                </>
            }
        </>
    )
}

export default Order;