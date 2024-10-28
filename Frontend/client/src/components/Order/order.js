import './order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
// import { getOrderById } from '../../redux/slices/orderSlice';
import { getOrderById } from '../../api/orderAPIs';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import numeral from 'numeral';

const Order = () => {

    // const history = useHistory();
    // const disPatch = useDispatch();
    // const user = useSelector((state) => state.user.user);

    const [yourOrder, setYourOrder] = useState('');

    const fetchAllOrderById = async () => {
        try {
            const data = await getOrderById();
            if (data.status === 0)
                setYourOrder(data.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchAllOrderById();
    }, []);


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
        <div style={{ minHeight: '400px', backgroundColor: "#eee" }}>
            {yourOrder ?
                <>
                    {isEmpty(yourOrder) === false ?
                        <>
                            {yourOrder?.map((item, index) => {
                                return (
                                    <section className=" h-custom" >
                                        <div className="container mt-5">
                                            <div className="row d-flex justify-content-center align-items-center h-100">
                                                <div className="col-lg-8 col-xl-6" style={{ width: '100%' }}>
                                                    <div className="card border-top border-bottom border-3" style={{ borderColor: "#f37a27 !important" }}>
                                                        <div className="card-body p-5">
                                                            <p className="lead fw-bold" style={{ color: "#f37a27" }}>Đơn hàng</p>

                                                            <div className="row">
                                                                <div className="col">
                                                                    <p className=" mb-1">Ngày mua</p>
                                                                    <p>{formattedDate(item.createdAt)}</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p className=" mb-1">Mã đơn</p>
                                                                    <p>{item.orderCode}</p>
                                                                </div>
                                                            </div>

                                                            {/* <div className="mx-n5 px-5 py-2" style={{ backgroundColor: "#f2f2f2" }}>
                                                                <div className="row">
                                                                    <div className="col-md-8 col-lg-9">
                                                                        <p>Tổng giá tiền của sản phẩm</p>
                                                                    </div>
                                                                    <div className="col-md-4 col-lg-3">
                                                                        <p>{formatNumber(item.totalCost)} đ</p>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-8 col-lg-9">
                                                                        <p className="mb-0">Trạng thái thanh toán</p>
                                                                    </div>
                                                                    <div className="col-md-4 col-lg-3">
                                                                        <p className="mb-0">{item.statusPay === 'true' ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                                                                    </div>
                                                                </div>
                                                            </div> */}

                                                            <div className=" my-1">
                                                                <div className="">
                                                                    <div className="">
                                                                        <p className="mb-0 fw-bold lead text-dark">Tổng tiền: {formatNumber(item.totalCost)} đ</p>
                                                                    </div>
                                                                    {/* <div className="col-md-4 col-lg-3">
                                                                        <p className="mb-0 fw-bold lead text-dark" ></p>
                                                                    </div> */}
                                                                </div>
                                                            </div>

                                                            <div className=" my-1">
                                                                <div className="">
                                                                    <div className="">
                                                                        <p className="mb-0 fw-bold lead text-dark">Địa chỉ: {item.address}</p>
                                                                    </div>
                                                                    {/* <div className="col-md-4 col-lg-3">
                                                                        <p className="mb-0 fw-bold lead text-dark" ></p>
                                                                    </div> */}
                                                                </div>
                                                            </div>

                                                            <div className=" my-1">
                                                                <div className="">
                                                                    <div className="">
                                                                        <p className="mb-0 fw-bold lead text-dark">Số điện thoại: {item.phone}</p>
                                                                    </div>
                                                                    {/* <div className="col-md-4 col-lg-3">
                                                                        <p className="mb-0 fw-bold lead text-dark" ></p>
                                                                    </div> */}
                                                                </div>
                                                            </div>

                                                            <div className=" my-1">
                                                                <div className="">
                                                                    <div className="">
                                                                        <p className="mb-0 fw-bold lead text-dark">{item.status}</p>
                                                                    </div>
                                                                    {/* <div className="col-md-4 col-lg-3">
                                                                        <p className="mb-0 fw-bold lead text-dark" ></p>
                                                                    </div> */}
                                                                </div>
                                                            </div>



                                                            <p className="mt-1 pt-2">
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
        </div>
    )
}

export default Order;