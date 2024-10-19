import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getOrderDetail } from '../../redux/slices/orderDetailSlice';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import numeral from 'numeral';

const OrderDetail = (props) => {
    const history = useHistory();
    const disPatch = useDispatch();
    const id = useParams();
    const products = useSelector((state) => state.orderDetail.products);

    const GoBack = () => {
        history.goBack();
    }

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
    }

    useEffect(() => {
        disPatch(getOrderDetail(id));
    }, [])

    return (
        <>
            <section className="vh-100 gradient-custom-2">
                <div className="container py-5 h-100">
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
                                            <p className="text-muted mb-2"> Order ID <span className="fw-bold text-body">{`1222528743${id.id}`}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    {products?.map((item, index) => {
                                        return (
                                            <div className="d-flex flex-row mb-4 pb-2">
                                                <div className="flex-fill">
                                                    <h4 className="bold">{item.Product.name}</h4>
                                                    <h4 className="text-muted"> SL: {item.quantity}</h4>
                                                    <h4 className="mb-3"> {formatNumber(item.price)} đ</h4>
                                                    <h4>Loại xe: {item.Product.type}</h4>

                                                </div>
                                                <div>
                                                    <img className="align-self-center img-fluid"
                                                        src={item.Product.image} width="250" />
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
        </>
    )
};

export default OrderDetail;