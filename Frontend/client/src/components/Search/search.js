import './search.scss';
import { Link, useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSimilarProduct, productsFilterPrice } from "../../redux/slices/productSlice";
import { addCart } from "../../redux/slices/cartSlice";
import numeral from 'numeral';
import { IoMdSearch } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa6";
import { IoMdResize } from "react-icons/io";
import { fetchAllListProducts, filterProductsByBrandAndSize, searchProducts } from "../../api/productAPIs";
import ReactPaginate from "react-paginate";
import notFoundProduct from '../../assets/images/no_product.png';
import { MdStarRate } from "react-icons/md";
import { RotatingLines } from 'react-loader-spinner';

const Search = () => {
    const { name } = useParams();
    // const products = useSelector((state) => state.product.products?.Data)

    // const history = useHistory();
    // const disPatch = useDispatch();

    // const handleClickCart = async (type, idProduct) => {
    //     history.push(`/product/${type}/${idProduct}`);
    //     // await disPatch(getProductByID(idProduct));
    //     await disPatch(getSimilarProduct({ type, idProduct }));
    // };

    // const handleClickAddCart = async (product) => {
    //     await disPatch(addCart({ product, quantity: 1 }));
    // };

    const handleFillterPrice = async (priceFilter) => {
        await disPatch(productsFilterPrice({ type: 'All', price: priceFilter }));
    };

    // useEffect(() => { }, [products]);

    const { type } = useParams();
    const [products, setProducts] = useState('');

    const [brandFilter, setBrandFilter] = useState('');
    const [brand, setBrand] = useState('');
    const [sizeFilter, setSizeFilter] = useState('');
    const [dataBrandFilter, setDataBrandFilter] = useState('');
    const [dataSizeFilter, setDataSizeFilter] = useState('');

    const [isLoadingFilter, setIsLoadingFilter] = useState(false);

    const history = useHistory();
    const disPatch = useDispatch();

    const [btnToggleType, setBtnToggleType] = useState('d-none');
    const [btnToggleSize, setBtnToggleSize] = useState('d-none');

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(12);
    const [totalPages, setTotalPages] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);


    const handleClickCart = async (idProduct) => {
        history.push(`/product/${type}/${idProduct}`);
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

    const handleSortProducts = async (value) => {
        const sortedProducts = [...products];

        // setIsLoadingFilter(true);
        // setTimeout(() => {
        //     setIsLoadingFilter(false);

        // }, 700);

        switch (value) {
            case 'increase':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'decrease':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'A-Z':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Z-A':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                sortedProducts.sort((a, b) => a.id - b.id);
                break;
        }
        setProducts(sortedProducts); // Cập nhật lại danh sách sản phẩm
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
            listId = 1;
        } else if (type === 'specializedVehicle') {
            listId = 2;
        } else if (type === 'plane') {
            listId = 3;
        } else if (type === 'motor') {
            listId = 4;
        } else {
            listId = 0;
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
            } else if (type === 'specializedVehicle') {
                listId = 2
            } else if (type === 'plane') {
                listId = 3
            } else if (type === 'motor') {
                listId = 4
            } else {
                listId = 0
            }
            const product = await searchProducts(name);
            console.log('check product', product);

            const getAllProducts = [];
            product.forEach(item => {
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
            setBrand(GetAllBrand);
            setSizeFilter(GetAllSize);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setProducts('');
        setIsLoadingFilter(true);
        setTimeout(() => {
            fetAllProducts();
            setIsLoadingFilter(false);

        }, 700);
    }, [type]);

    useEffect(() => {
        setProducts('');
        setIsLoadingFilter(true);
        setTimeout(() => {
            if (dataBrandFilter || dataSizeFilter)
                filterProductsBrandAndSize();
            else
                fetAllProducts();
            setIsLoadingFilter(false);

        }, 700);
    }, [type, currentPage, dataBrandFilter, dataSizeFilter]);

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleSearchBrand = async (value) => {
        setSearchTerm(value);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            // Thực hiện tìm kiếm sau khi ngừng gõ 0,5s
            performSearch(value);
        }, 500);

        setTimeoutId(newTimeoutId);

    }

    const performSearch = (query) => {
        if (query) {
            const data = brandFilter.filter(brand => brand.toLowerCase().includes(query.toLowerCase()));
            setBrandFilter(data);
        } else {
            setBrandFilter(brand);
        }
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
                                <input type="radio" name="sỉze" className="m-2" autocomplete="on" defaultValue={'none'} onClick={(e) => handleSortProducts(e.target.defaultValue)} />
                                <label style={{ fontSize: '12px' }}>Mặc định</label>
                            </span>
                            <span className="option">
                                <input type="radio" name="sỉze" className="m-2" autocomplete="on" defaultValue={'increase'} onClick={(e) => handleSortProducts(e.target.defaultValue)} />
                                <label style={{ fontSize: '12px' }}>Giá tăng</label>
                            </span>
                            <span className="option">
                                <input type="radio" name="sỉze" className="m-2" autocomplete="on" defaultValue={'decrease'} onClick={(e) => handleSortProducts(e.target.defaultValue)} />
                                <label style={{ fontSize: '12px' }}>Giá giảm</label>
                            </span>
                            <span className="option">
                                <input type="radio" name="sỉze" className="m-2" autocomplete="on" defaultValue={'A-Z'} onClick={(e) => handleSortProducts(e.target.defaultValue)} />
                                <label style={{ fontSize: '12px' }}>Tiêu đề A-Z</label>
                            </span>
                            <span className="option">
                                <input type="radio" name="sỉze" className="m-2" autocomplete="on" defaultValue={'Z-A'} onClick={(e) => handleSortProducts(e.target.defaultValue)} />
                                <label style={{ fontSize: '12px' }}>Tiêu đề Z-A</label>
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
                                                <div className="mb-3">
                                                    <span className={item.discount ? 'text-decoration-line-through' : ''} style={{ fontSize: '18px', color: '#ff1414' }}>{formatNumber(item.price)} đ</span>
                                                    <span className={item.discount ? 'd-block' : 'd-none'} style={{ fontSize: '18px', color: '#ff1414' }}>{formatNumber(item.discount)} đ</span>

                                                </div>
                                            </div>
                                            <button className="btn btn-primary add-cart" style={{ fontSize: "1rem", width: 'auto', fontWeight: 500 }} onClick={() => handleClickAddCart(item)}> Thêm vào giỏ</button>
                                        </div>
                                    )
                                })}
                            </>
                            :
                            <div className="not-found mt-5">
                                {
                                    isLoadingFilter === true ?
                                        <>
                                            <RotatingLines
                                                visible={true}
                                                height="96"
                                                width="96"
                                                color="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                ariaLabel="rotating-lines-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                            />
                                        </>
                                        :
                                        <>
                                            <img className="img-not-f" src={notFoundProduct}
                                                style={{}}
                                            />
                                            <span>Không tìm thấy sản phẩm</span>
                                        </>
                                }
                            </div>
                        }

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

export default Search;