import './ProductDetail.scss';
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { getSimilarProduct } from '../../redux/slices/productSlice';
import { getProductByID } from "../../api/productAPIs";
import { addCart } from "../../redux/slices/cartSlice";
import numeral from 'numeral';
import { LiaCcVisa } from "react-icons/lia";
import { FaShippingFast } from "react-icons/fa";
import { FcShipped } from "react-icons/fc";
import { GiCardExchange } from "react-icons/gi";
import { CiStar } from "react-icons/ci";
import { GrNext, GrPrevious } from "react-icons/gr";
import { toast } from 'react-toastify';
import { MdStar } from "react-icons/md";
import { getAllCommentById } from '../../api/commentReviewAPIs';
import { getProductsSimilar } from '../../api/productAPIs';
import imgUser from '../../assets/images/user.webp';
import ReactPaginate from "react-paginate";
import { MdStarRate } from "react-icons/md";



const ProductDetail = () => {
    const { id, name } = useParams();
    const similarProducts = useSelector((state) => state.product.similarProducts);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState('');
    const [productSimilar, setProductSimilar] = useState('');

    const [commentReview, setCommentReview] = useState('');

    const [currentPageReview, setCurrentPageReview] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);


    const history = useHistory();
    const disPatch = useDispatch();

    const GetProductById = async () => {
        const data = await getProductByID(id);
        const parseImages = [];
        const images = JSON.parse(data.images);

        parseImages.push({ ...data, images: images });

        setProduct(parseImages);

        const getAllProducts = [];
        const similar = await getProductsSimilar({ brand: data.brand, id, listProductId: data.listProductId });
        similar.forEach(item => {
            const images = JSON.parse(item.images);
            getAllProducts.push({ ...item, images: images });
        });
        setProductSimilar(getAllProducts);
    };

    const GetAllReviewById = async () => {
        const comment = await getAllCommentById(id, currentPageReview, currentLimit);
        if (comment.status === 0) {
            setTotalPages(comment.data.data.totalPages);
            setCommentReview(comment?.data);
        }
    }


    useEffect(() => {
        GetProductById();
    }, [id]);

    useMemo(() => {
        GetAllReviewById();
    }, [id, currentPageReview])

    const handleClickCart = async (idProduct) => {
        history.push(`/product/${name}/${idProduct}`);
        // await disPatch(getProductByID(idProduct));
        // await disPatch(getSimilarProduct({ type, idProduct }));
        setQuantity(1);
    };

    const handleClickPlus = () => {
        setQuantity(quantity + 1);
    };

    const handleClickMinus = () => {
        if (quantity <= 2) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1);
        }
    };

    const handleClickAddCart = async (product) => {
        if (quantity > product.quantity) {
            toast.error('Sản phẩm không đủ số lượng');
            return;
        } else {
            await disPatch(addCart({ product, quantity: quantity }));
            toast.success('Thêm vào giỏ hàng thành công');
            return;
        }
    };

    const goBack = () => {
        history.goBack();
    };

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
    }

    const handlePageClick = async (event) => {
        setCurrentPageReview(+event.selected + 1);
    };


    return (
        <>
            {product ?
                <>
                    <div className='container'>
                        <Link to='/' className="home ">Trang chủ</Link>
                        <span style={{ fontSize: '16px', color: '#ccc' }}>/ </span>
                        <span onClick={goBack} className='home' role='button' style={{ fontSize: '16px' }}> Trở về</span>
                        <span style={{ fontSize: '16px', color: '#ccc' }}>/</span>
                        <span className="type" >{product[0].name}</span>
                    </div>
                    <section className="py-5">
                        <div className="container product-detail">
                            <div className="row gx-5">
                                <aside className="col-lg-8">
                                    <div className="box-image border rounded-4 mb-3 d-flex justify-content-center">
                                        {/* <img style={{ maxWidth: "65vh", maxHeight: "100vh", margin: "auto" }} className="rounded-4 fit" src={product[0].images[0]} /> */}
                                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                            {/* <div className="carousel-indicators">
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                            </div> */}
                                            <div className="carousel-inner">
                                                {
                                                    product[0].images && product[0].images.map((item, index) => {
                                                        return (
                                                            <div className={index === 0 ? "carousel-item active" : "carousel-item "} key={`product-detail-${index}`}>
                                                                <img src={item} className="d-block rounded-4 fit" alt="..." />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                            <GrPrevious color='#000' fontSize={28} />
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <GrNext color='#000' fontSize={28} />
                                        </button>
                                    </div>
                                    {/* <!-- thumbs-wrap.// --> */}
                                    {/* <!-- gallery-wrap .end// --> */}
                                    <div className='description-1'>
                                        <div className=' mt-2'>
                                            <h2 className="title text-dark">
                                                {product[0].name}
                                            </h2>
                                            <p style={{ fontSize: '16px' }}>
                                                {product[0].description}
                                            </p>
                                            <div className=" rounded-4 mb-3 justify-content-center">
                                                <img style={{ margin: "auto", width: 'auto' }} className="" src={product[0].images[0]} />
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                                <main className="col-lg-4">
                                    <div className="ps-lg-3">
                                        <h4 className="title text-dark font-20">
                                            {product[0].name}
                                        </h4>
                                        <div className="d-flex flex-row my-1">
                                            <div className="mb-1 font-20">
                                                {product[0].star > 0 ?
                                                    <>
                                                        {
                                                            Array.from({ length: Math.round(product[0].star) }).map((_, i) => (
                                                                <MdStar color='yellow' />
                                                            ))
                                                        }
                                                        {
                                                            Array.from({ length: 5 - Math.round(product[0].star) }).map((_, i) => (
                                                                <MdStar />
                                                            ))
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        <MdStar />
                                                        <MdStar />
                                                        <MdStar />
                                                        <MdStar />
                                                        <MdStar />
                                                    </>
                                                }
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-muted font-20 "><i className="me-1 fa fa-shopping-basket"></i>Còn {product[0].quantity} sản phẩm</span>
                                        </div>

                                        <div className="mb-3">
                                            <span className={product[0].discount ? 'text-decoration-line-through' : ''} style={{ fontSize: '24px', color: '#ff1414' }}>{formatNumber(product[0].price)} đ</span>
                                            <span className={product[0].discount ? 'd-block' : 'd-none'} style={{ fontSize: '24px', color: '#ff1414' }}>{formatNumber(product[0].discount)} đ</span>

                                        </div>

                                        {/* <h3 className='text-danger'>Tích lũy: 1 điểm vào ví của bạn</h3> */}

                                        <div className="row" style={{ fontSize: '16px' }}>
                                            <dt className="col-5">Thương hiệu:</dt>
                                            <dd className="col-7">{product[0].brand}</dd>
                                        </div>

                                        {/* <div className="row" style={{ fontSize: '16px' }}>
                                            <dt className="col-4">Chức năng:</dt>
                                            <dd className="col-8">{product.type}</dd>
                                        </div> */}

                                        <div className="row" style={{ fontSize: '16px' }}>
                                            <dt className="col-5">kích cỡ:</dt>
                                            <dd className="col-7">{product[0].size}</dd>
                                        </div>

                                        <div className="row" style={{ fontSize: '16px' }}>
                                            <dt className="col-5">hãng sản xuất:</dt>
                                            <dd className="col-7">{product[0].origin}</dd>
                                        </div>

                                        <hr />

                                        <div className="row mb-4 font-20">
                                            {/* <!-- col.// --> */}
                                            <div className="col-md-4 col-6 mb-3">
                                                <label className="mb-2 d-block">Số lượng</label>
                                                <div className="input-group mb-3" style={{ width: "170px" }}>
                                                    <button
                                                        className="btn btn-white border border-secondary px-3" type="button"
                                                        id="button-addon1" data-mdb-ripple-color="dark"
                                                        onClick={() => handleClickMinus()}
                                                    >
                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                    </button>
                                                    <input type="text"
                                                        className="form-control text-center border border-secondary font-20"
                                                        aria-label="Example text with button addon" aria-describedby="button-addon1"
                                                        value={quantity}
                                                        onChange={(event) => setQuantity(event.target.value)}
                                                    />
                                                    <button
                                                        className="btn btn-white border border-secondary px-3" type="button"
                                                        id="button-addon2" data-mdb-ripple-color="dark"
                                                        onClick={() => handleClickPlus()}
                                                    >
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-primary shadow-0 font-20 m-2 p-3 "
                                            disabled={product[0].quantity === 0 ? true : false}
                                            style={{ width: '100%' }}
                                            onClick={() => handleClickAddCart(product[0])}
                                        >
                                            {product[0].quantity === 0 ? 'Sản phẩm đã hết hàng' : 'Thêm vào giỏ hàng'}
                                        </button>

                                        <br />
                                        <br />

                                        <div style={{ border: '1px solid red', padding: '5px' }}>
                                            <div className='row'>
                                                <div className='col-2'>
                                                    <LiaCcVisa style={{ fontSize: '50px', color: '#388e3c' }} />
                                                </div>
                                                <div className='col-10 row'>
                                                    <div className='col-12'>
                                                        <h4>THANH TOÁN TIỆN LỢI</h4>
                                                    </div>
                                                    <div className='col-12'>
                                                        <p> Chấp nhận thanh toán online bằng VNPay và ZaloPay</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-2'>
                                                    <FaShippingFast style={{ fontSize: '50px', color: '#388e3c' }} />
                                                </div>
                                                <div className='col-10 row'>
                                                    <div className='col-12'>
                                                        <h4>GIAO HÀNG TOÀN QUỐC</h4>
                                                    </div>
                                                    <div className='col-12'>
                                                        <p> Giao hàng trên toàn quốc tiện lợi</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-2'>
                                                    <FcShipped style={{ fontSize: '50px' }} />
                                                </div>
                                                <div className='col-10 row'>
                                                    <div className='col-12'>
                                                        <h4>GIAO HÀNG SIÊU NHANH</h4>
                                                    </div>
                                                    <div className='col-12'>
                                                        <p> Giao hàng siêu nhanh tại các khu vực lân cận</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-2'>
                                                    <GiCardExchange style={{ fontSize: '50px', color: '#388e3c' }} />
                                                </div>
                                                <div className='col-10 row'>
                                                    <div className='col-12'>
                                                        <h4>HỖ TRỢ ĐỔI TRẢ NHANH</h4>
                                                    </div>
                                                    <div className='col-12'>
                                                        <p> Hỗ trợ đổi trả khi sản phẩm bị lỗi hoặc không đúng mẫu</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </div>
                            <div className='description-2 row'>
                                <div className=' col-12 mt-2'>
                                    <h2 className="title text-dark">
                                        {product[0].name}
                                    </h2>
                                    <p style={{ fontSize: '16px' }}>
                                        {product[0].description}
                                    </p>
                                    <div className=" rounded-4 mb-3 justify-content-center">
                                        <img style={{ margin: "auto" }} className="" src={product[0].images[0]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <!-- content --> */}
                    <div className='container review'>
                        <hr />

                        <p className="display-6">Đánh giá sản phẩm</p>
                        {
                            commentReview.data && commentReview.data.review.length > 0 ?
                                <>
                                    {commentReview.data.review.map((item, index) => {
                                        return (
                                            <>
                                                <div className='row' key={`comment-${index}`}>
                                                    <img src={imgUser} className='col-6 avatar' />
                                                    <div className='col-6 row'>
                                                        <span className='col-12 fw-bold' style={{ fontSize: '16px' }}>{item.User.fullname}</span>
                                                        <div className='col-12'>
                                                            {
                                                                Array.from({ length: Math.round(item.star) }).map((_, i) => (
                                                                    <MdStar color='yellow' />
                                                                ))
                                                            }
                                                            {
                                                                Array.from({ length: 5 - Math.round(item.star) }).map((_, i) => (
                                                                    <MdStar />
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='col-12 comment' style={{ fontSize: '16px' }}>{item.Comment.content}</div>

                                                    {
                                                        item.Rep_Comment ?
                                                            <div className='col-12 rep-comment'>
                                                                <div style={{ fontSize: '18px', fontWeight: '500' }}>Phản hồi của người bán</div>
                                                                <div style={{ fontSize: '16px' }}>
                                                                    {item.Rep_Comment ? `${item.Rep_Comment.note}` : ''}
                                                                </div>
                                                            </div>
                                                            :
                                                            <>
                                                            </>
                                                    }
                                                </div>
                                                <br />
                                                <hr />
                                            </>
                                        )
                                    })}
                                </>
                                :
                                <>
                                </>
                        }
                        {totalPages > 1 &&
                            <div className=" pagination">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=">"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={0}
                                    pageCount={totalPages}
                                    previousLabel="<"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        }
                    </div>

                    <div className="container similar-products my-4">
                        <p className="display-5">Sản phẩm tương tự</p>

                        <div className="row">
                            {productSimilar ?
                                <>
                                    {productSimilar.map((item, index) => {
                                        return (
                                            <>
                                                <div className="card card-product col-3 m-1" key={`product-${index}`} onClick={() => handleClickCart(item.id)}>
                                                    <img role="button" src={item.images[0]} className="card-img-top" alt="..." onClick={() => handleClickCart(item.id)} />
                                                    <div className="card-body" onClick={() => handleClickCart(item.id)}>
                                                        <h6 className="card-title" role="button" style={{ fontSize: "16px" }} >{item.name}</h6>
                                                        <div className='mb-2'>
                                                            {item.star > 0 ?
                                                                <>
                                                                    {
                                                                        Array.from({ length: Math.round(item.star) }).map((_, i) => (
                                                                            <MdStarRate color='yellow' />
                                                                        ))
                                                                    }
                                                                    {
                                                                        Array.from({ length: 5 - Math.round(item.star) }).map((_, i) => (
                                                                            <MdStarRate />
                                                                        ))
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                    <MdStarRate />
                                                                    <MdStarRate />
                                                                    <MdStarRate />
                                                                    <MdStarRate />
                                                                    <MdStarRate />
                                                                </>
                                                            }
                                                        </div>
                                                        <div className="mb-3">
                                                            <span className={product[0].discount ? 'text-decoration-line-through' : ''} style={{ fontSize: '18px', color: '#ff1414' }}>{formatNumber(product[0].price)} đ</span>
                                                            <span className={product[0].discount ? 'd-block' : 'd-none'} style={{ fontSize: '18px', color: '#ff1414' }}>{formatNumber(product[0].discount)} đ</span>

                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary add-cart" style={{ fontSize: "1rem", width: 'auto', fontWeight: 500 }} onClick={() => handleClickAddCart(item)}> Thêm vào giỏ</button>
                                                </div>
                                            </>

                                        )
                                    })}
                                </>
                                :
                                <>
                                    ...isLoading
                                </>
                            }
                        </div>
                    </div>
                </>
                :
                <>
                    ...isLoading
                </>
            }
        </>
    )
};

export default ProductDetail;