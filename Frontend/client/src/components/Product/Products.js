import { Link, useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import './Products.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getSimilarProduct, productsFilterPrice } from "../../redux/slices/productSlice";
import { addCart } from "../../redux/slices/cartSlice";
import numeral from 'numeral';
import { IoMdSearch } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa6";
import { IoMdResize } from "react-icons/io";
import { fetchAllListProducts, filterProductsByBrandAndSize } from "../../api/productAPIs";
// import { fetchAllListProducts } from "../../redux/slices/productSlice";
import ReactPaginate from "react-paginate";
import notFoundProduct from '../../assets/images/no_product.png';
import { MdStarRate } from "react-icons/md";


const Products = () => {
    const { type } = useParams();
    const [products, setProducts] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [sizeFilter, setSizeFilter] = useState('');
    const [dataBrandFilter, setDataBrandFilter] = useState('');
    const [dataSizeFilter, setDataSizeFilter] = useState('');

    const productSlice = useSelector(state => state.product.products);

    const history = useHistory();
    const disPatch = useDispatch();

    const [btnToggleType, setBtnToggleType] = useState('d-none');
    const [btnToggleSize, setBtnToggleSize] = useState('d-none');

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(12);
    const [totalPages, setTotalPages] = useState(0);


    const handleClickCart = async (idProduct) => {
        history.push(`/product/${type}/${idProduct}`);
        // await disPatch(getSimilarProduct({ type, idProduct }));
    };

    const handleClickAddCart = async (product) => {
        await disPatch(addCart({ product, quantity: 1 }));
    };

    const handleFillterBrand = async (data) => {
        setDataBrandFilter(prevSelected => {
            if (prevSelected.includes(data)) {
                return prevSelected.filter(item => item !== data);
            } else {
                return [...prevSelected, data];
            }
        })
    };

    const handleFillterSize = async (data) => {
        setDataSizeFilter(prevSelected => {
            if (prevSelected.includes(data)) {
                return prevSelected.filter(item => item !== data);
            } else {
                return [...prevSelected, data];
            }
        })
    };

    const filterProductsBrandAndSize = async () => {
        let listId;
        if (type === 'car') {
            listId = 1
        } else if (type === 'motor') {
            listId = 2
        } else if (type === 'plane') {
            listId = 3
        } else {
            listId = 0
        }
        const product = await filterProductsByBrandAndSize(dataBrandFilter, dataSizeFilter, currentPage, currentLimit, listId);
        setTotalPages(product.totalPages);
        const getAllProducts = [];
        product.products.forEach(item => {
            const images = JSON.parse(item.images);
            getAllProducts.push({ ...item, images: images });
        });
        setProducts(getAllProducts);

    };

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
    }

    const handleBtnToggleType = () => {
        setBtnToggleSize('d-none');
        if (btnToggleType === 'd-none')
            setBtnToggleType('d-block');
        else {
            setBtnToggleType('d-none');
        }
    };

    const handleBtnToggleSize = () => {
        setBtnToggleType('d-none');
        if (btnToggleSize === 'd-none')
            setBtnToggleSize('d-block');
        else {
            setBtnToggleSize('d-none');
        }
    };

    const fetAllProducts = async () => {
        try {
            let listId;
            if (type === 'car') {
                listId = 1
            } else if (type === 'motor') {
                listId = 2
            } else if (type === 'plane') {
                listId = 3
            } else {
                listId = 0
            }
            const product = await fetchAllListProducts(listId, currentPage, currentLimit);
            setTotalPages(product.totalPages);
            const getAllProducts = [];
            product.products.forEach(item => {
                const images = JSON.parse(item.images);
                getAllProducts.push({ ...item, images: images });
            });
            setProducts(getAllProducts);

            const GetAllBrand = [];
            const GetAllSize = [];
            product.brandAndSize.forEach(item => {
                if (!GetAllBrand.includes(item.brand)) {
                    GetAllBrand.push(item.brand);
                }
                if (!GetAllSize.includes(item.size)) {
                    GetAllSize.push(item.size);
                }
            });
            setBrandFilter(GetAllBrand);
            setSizeFilter(GetAllSize);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (dataBrandFilter || dataSizeFilter)
            filterProductsBrandAndSize();
        else
            fetAllProducts();
    }, [type, currentPage, dataBrandFilter, dataSizeFilter]);

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    return (
        <>
            <div className="container mt-3 body-content">
                <Link to='/' className="home ">Trang chủ</Link>
                <span style={{ fontSize: '16px', color: '#ccc' }}>/</span>
                <span className="type" >{type}</span>
                <div className={`img-${type}`} style={{ width: '100%' }}>
                </div>
                <div className="mt-4 row">
                    <div className="row col-12 col-md-6 col-lg-9">
                        <div className="filter">
                            <span>Xếp theo:</span>
                            <span className="option">
                                <input type="radio" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                <label style={{ fontSize: '12px' }}>Mặc định</label>
                            </span>
                            <span className="option">
                                <input type="radio" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                <label style={{ fontSize: '12px' }}>Giá tăng</label>
                            </span>
                            <span className="option">
                                <input type="radio" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                <label style={{ fontSize: '12px' }}>Giá giảm</label>
                            </span>
                            <span className="option">
                                <input type="radio" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                <label style={{ fontSize: '12px' }}>Tiêu đề A-Z</label>
                            </span>
                            <span className="option">
                                <input type="radio" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                <label style={{ fontSize: '12px' }}>Tiêu đề Z-A</label>
                            </span>
                            <span className="option-phone">
                                <FaClipboardList size={16} type="button"
                                    onClick={() => handleBtnToggleType()}
                                />
                                <label style={{ fontSize: '12px' }}>Thương hiệu</label>

                                <div className={`dropdown_type ${btnToggleType}`}>
                                    <li>
                                        <div className='filter-type-phone'>
                                            <input type="checkbox" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                            <label>BWM</label>
                                        </div>
                                    </li>
                                    <hr />
                                    <li>
                                        <div className='filter-type-phone'>
                                            <input type="checkbox" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                            <label>Mercedes</label>
                                        </div>
                                    </li>
                                    <hr />
                                    <li>
                                        <div className='filter-type-phone'>
                                            <input type="checkbox" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                            <label>Rolls Royce</label>
                                        </div>
                                    </li>
                                    <hr />
                                    <li>
                                        <div className='filter-type-phone'>
                                            <input type="checkbox" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                            <label>Porsche</label>
                                        </div>
                                    </li>
                                    <hr />
                                    <li>
                                        <div className='filter-type-phone'>
                                            <input type="checkbox" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                            <label>Toyota</label>
                                        </div>
                                    </li>
                                </div>
                            </span>
                            <span className="option-phone">
                                <IoMdResize size={16} type="button"
                                    onClick={() => handleBtnToggleSize()}
                                />
                                <label style={{ fontSize: '12px' }}>Tỷ lệ</label>
                                <div className={`dropdown_size ${btnToggleSize}`}>
                                    <li>
                                        <div className='filter-type-phone'>
                                            <input type="checkbox" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                            <label>1:18</label>
                                        </div>
                                    </li>
                                    <hr />
                                    <li>
                                        <div className='filter-type-phone'>
                                            <input type="checkbox" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                            <label>1:30</label>
                                        </div>
                                    </li>
                                    <hr />
                                    <li>
                                        <div className='filter-type-phone'>
                                            <input type="checkbox" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                            <label>1:25</label>
                                        </div>
                                    </li>
                                    <hr />
                                    <li>
                                        <div className='filter-type-phone'>
                                            <input type="checkbox" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                            <label>1:20</label>
                                        </div>
                                    </li>
                                    <hr />
                                    <li>
                                        <div className='filter-type-phone'>
                                            <input type="checkbox" name="sỉze" className="m-2" autocomplete="on" defaultValue={500000} onClick={(e) => handleFillterBrand(e.target.defaultValue)} />
                                            <label>1:16</label>
                                        </div>
                                    </li>
                                </div>
                            </span>
                        </div>

                        {products && products.length !== 0 ?
                            <>
                                {products?.map((item, index) => {
                                    return (
                                        <div className="card card-product col-3 m-1" key={`product-${index}`}>
                                            <img role="button" src={item.images[0]} className="card-img-top" alt="..." onClick={() => handleClickCart(item.id)} />
                                            <div className="card-body" onClick={() => handleClickCart(item.id)}>
                                                <h6 className="card-title" role="button" style={{ fontSize: "16px" }}>{item.name}</h6>
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
                                                <p role="button" className="card-text text-primary">{formatNumber(item.price)} đ</p>
                                            </div>
                                            <button className="btn btn-primary add-cart" style={{ fontSize: "1rem", width: 'auto', fontWeight: 500 }} onClick={() => handleClickAddCart(item)}> Thêm vào giỏ</button>
                                        </div>
                                    )
                                })}
                            </>
                            :
                            <div className="not-found">
                                <img className="img-not-f" src={notFoundProduct}
                                    style={{}}
                                />
                                <span>Không tìm thấy sản phẩm</span>
                            </div>
                        }

                    </div>

                    <div className="col-3">
                        <div className='filter-product card col-3 m-3'>
                            <h4 className="m-2">THƯƠNG HIỆU/LOẠI</h4>
                            <div className="search-type">
                                <input className="search" autocomplete="on" placeholder="Tên thương hiệu..." type="search" />
                                <IoMdSearch size={22} className="icon-search-type" />
                            </div>
                            <div className="row">
                                {
                                    brandFilter ? brandFilter.map((item, index) => {
                                        return (
                                            <div className="col-lg-6 col-12" key={`brand-${index}`}>
                                                <input type="checkbox" autocomplete="on" name="brand" className="m-2" value={item} onChange={() => handleFillterBrand(item)} />
                                                <label style={{ fontSize: '14px', color: '#1ea6e8' }}>{item}</label>
                                            </div>
                                        )
                                    })
                                        :
                                        <>
                                        </>
                                }
                            </div>
                            <hr />
                            <h4 className="m-2">TỶ LỆ</h4>
                            <div className="row">
                                {
                                    sizeFilter ? sizeFilter.map((item, index) => {
                                        return (
                                            <div className="col-lg-6 col-12" key={`size-${index}`}>
                                                <input type="checkbox" name="sỉze" autocomplete="on" className="m-2" value={item} onChange={() => handleFillterSize(item)} />
                                                <label style={{ fontSize: '14px', color: '#1ea6e8' }}>{item}</label>
                                            </div>
                                        )
                                    })
                                        :
                                        <>
                                        </>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                {totalPages > 1 &&
                    <div className="pagination mt-5">
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
            </div >
        </>
    )
};

export default Products;