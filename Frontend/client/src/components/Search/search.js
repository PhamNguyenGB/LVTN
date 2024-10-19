import { Link, useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import './search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getSimilarProduct, productsFilterPrice } from "../../redux/slices/productSlice";
import { addCart } from "../../redux/slices/cartSlice";

const Search = () => {
    const { name } = useParams();
    const products = useSelector((state) => state.product.products?.Data)

    const history = useHistory();
    const disPatch = useDispatch();

    const handleClickCart = async (type, idProduct) => {
        history.push(`/product/${type}/${idProduct}`);
        // await disPatch(getProductByID(idProduct));
        await disPatch(getSimilarProduct({ type, idProduct }));
    };

    const handleClickAddCart = async (product) => {
        await disPatch(addCart({ product, quantity: 1 }));
    };

    const handleFillterPrice = async (priceFilter) => {
        await disPatch(productsFilterPrice({ type: 'All', price: priceFilter }));
    };

    useEffect(() => { }, [products]);

    return (
        <>
            <div className="container mt-3 body-content">
                <Link to='/' className="home ">Trang chủ</Link>
                <span style={{ fontSize: '16px', color: '#ccc' }}>/</span>
                <span className="type" >{name}</span>
                <div className="mt-4 row">
                    <div className="row col-9">

                        {products ?
                            <>
                                {products?.map((item, index) => {
                                    return (
                                        <div className="card col-3 m-3" style={{ width: "30rem" }} key={`product-${index}`}>
                                            <img role="button" src={item.image} className="card-img-top" alt="..." onClick={() => handleClickCart(item.type, item.id)} />
                                            <div className="card-body" onClick={() => handleClickCart(item.type, item.id)}>
                                                <h5 className="card-title" role="button" style={{ fontSize: "2rem" }}>{item.name}</h5>
                                                <p role="button" className="card-text text-primary">{item.price} đ</p>
                                            </div>
                                            <button className="btn btn-primary add-cart" style={{ fontSize: "2rem" }} onClick={() => handleClickAddCart(item)}> Thêm vào giỏ</button>
                                        </div>
                                    )
                                })}
                            </>
                            :
                            <>
                                ...isLoading
                            </>}

                    </div>

                    <div className="col-3">
                        <div className='size-product card col-1 m-3' style={{ width: "39rem" }}>
                            <h4 className="m-2">Giá</h4>
                            <div className="row">
                                <div className="col-5 m-2">
                                    <input type="radio" name="sỉze" className="m-2" defaultValue={500000} onClick={(e) => handleFillterPrice(e.target.defaultValue)} />
                                    <label style={{ fontSize: '14px', color: '#1ea6e8' }}>&lt; 500.000 đ</label>
                                </div>
                                <div className="col-5 m-2">
                                    <input type="radio" name="sỉze" className="m-2" defaultValue={1000000} onClick={(e) => handleFillterPrice(e.target.defaultValue)} />
                                    <label style={{ fontSize: '14px', color: '#1ea6e8' }}>500k - 1M</label>
                                </div>
                                <div className="col-5 m-2">
                                    <input type="radio" name="sỉze" className="m-2" defaultValue={2000000} onClick={(e) => handleFillterPrice(e.target.defaultValue)} />
                                    <label style={{ fontSize: '14px', color: '#1ea6e8' }}>1M - 2M</label>
                                </div>
                                <div className="col-5 m-2">
                                    <input type="radio" name="sỉze" className="m-2" defaultValue={3000000} onClick={(e) => handleFillterPrice(e.target.defaultValue)} />
                                    <label style={{ fontSize: '14px', color: '#1ea6e8' }}>2M - 3M</label>
                                </div>
                                <div className="col-5 m-2">
                                    <input type="radio" name="sỉze" className="m-2" defaultValue={5000000} onClick={(e) => handleFillterPrice(e.target.defaultValue)} />
                                    <label style={{ fontSize: '14px', color: '#1ea6e8' }}>3M - 5M</label>
                                </div>
                                <div className="col-5 m-2">
                                    <input type="radio" name="sỉze" className="m-2" defaultValue={1000000000} onClick={(e) => handleFillterPrice(e.target.defaultValue)} />
                                    <label style={{ fontSize: '14px', color: '#1ea6e8' }}>Tất cả</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
};

export default Search;