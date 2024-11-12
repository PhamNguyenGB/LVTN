import './Home.scss';
import './assets/css/style.css';
import './assets/css/responsive.css';
import img1 from '../../assets/images/hinh-nen-3d-xe-moto_025907885.jpg';
import img2 from '../../assets/images/4057698.jpg';
import img3 from '../../assets/images/synth-wave-jet-creative-illustration-ai-generate_250484-7158.avif';
import { MdStarRate } from "react-icons/md";
import HomePage from './HomePage';
import { fetchNew4Products, topSellingProducts } from '../../api/productAPIs';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetAllImgHome } from '../../api/userAPIs';

const Home = () => {

    const [newFourProducts, setNewFourProducts] = useState('');
    const [topProducts, setTopProducts] = useState('');
    const [imgHome, setImgHome] = useState('');

    const history = useHistory();

    const getNew4Products = async () => {
        try {
            const data = await fetchNew4Products();
            const getProducts = [];
            data.forEach(item => {

                const images = JSON.parse(item.images);
                getProducts.push({ ...item, images: images });
            });
            setNewFourProducts(getProducts);
        } catch (error) {
            console.log(error);

        }
    }

    const getTopSellingProducts = async () => {
        try {
            const data = await topSellingProducts();
            const Products = [];
            data.forEach(item => {

                const images = JSON.parse(item.Product.images);
                Products.push({ ...item.Product, images: images });
            });
            setTopProducts(Products);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllImgHome = async () => {
        const data = await fetAllImgHome();
        setImgHome(data.data);
    }

    const handleClickCart = async (listProductId, idProduct) => {
        let type = '';
        if (listProductId === 1) {
            type = 'car';
        } else if (listProductId === 2) {
            type = 'specializedVehicle';
        } else if (listProductId === 3) {
            type = 'plane';
        } else if (listProductId === 4) {
            type = 'motor';
        }

        history.push(`/product/${type}/${idProduct}`);
    };

    useEffect(() => {
        getNew4Products();
        getTopSellingProducts();
        getAllImgHome();
    }, []);

    return (
        <>
            <div className="home-page ">
                {/* <!--welcome-hero start --> */}
                <section id="home">

                    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <HomePage />
                        </div>
                    </div>

                    <div className='container' >
                        <div id="carouselExampleFade" className="carousel slide mt-5 justify-content-center">
                            <div className="carousel-inner" style={{ maxWidth: '1300px', height: '700px' }}>
                                {imgHome && imgHome.length > 0 ?
                                    imgHome.map((item, index) => {
                                        return (
                                            <div className="carousel-item active" key={`img-h-${index}`}>
                                                <img src={item.url} className="d-block w-100" alt="..." />
                                            </div>
                                        )
                                    })
                                    :
                                    <>
                                    </>
                                }

                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                </section>


                {/* <!--featured-cars start --> */}
                <section id="featured-cars" className="featured-cars">
                    <div className="container">
                        <div className="section-header">
                            <h2 style={{ color: '#d59073' }}><MdStarRate /> SẢN PHẨM MỚI <MdStarRate /></h2>
                        </div>
                        {/* <!--/.section-header--> */}
                        <div className="featured-cars-content">
                            <div className="row">
                                {newFourProducts && newFourProducts.map((item, index) => {
                                    return (
                                        <div key={`new4-${index}`} className="card-p-home col-lg-3 col-md-4 col-sm-6">
                                            <div className="single-featured-cars">
                                                <div className="featured-img-box">
                                                    <div className="featured-cars-img">
                                                        <img src={item.images[0]} alt="cars" />
                                                    </div>
                                                </div>
                                                <div className="featured-cars-txt p-2 text-white">
                                                    <h5 className='name-cars'>{item.name}</h5>
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
                                                    <h3>{item.price}</h3>
                                                    <button className='btn add-cart' onClick={() => handleClickCart(item.listProductId, item.id)}>Xem chi tiết</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link to='/product/new'>
                            <h6 style={{ color: '#d59073' }}>Xem thêm</h6>
                        </Link>
                    </div>
                    {/* <!--/.container--> */}

                </section>
                {/* <!--/.featured-cars--> */}

                {/* <!--featured-cars end --> */}




                {/* <!--featured-cars start --> */}
                <section id="featured-cars" className="featured-cars">
                    <div className="container">
                        <div className="section-header">
                            <h2 style={{ color: '#d59073' }}><MdStarRate /> SẢN PHẨM NỔI BẬT <MdStarRate /></h2>
                        </div>
                        {/* <!--/.section-header--> */}
                        <div className="featured-cars-content">
                            <div className='row'>
                                {topProducts && topProducts.map((item, index) => {
                                    return (
                                        <div key={`new4-${index}`} className="card-p-home col-lg-3 col-md-4 col-sm-6">
                                            <div className="single-featured-cars">
                                                <div className="featured-img-box">
                                                    <div className="featured-cars-img">
                                                        <img src={item.images[0]} alt="cars" />
                                                    </div>
                                                </div>
                                                <div className="featured-cars-txt p-2 text-white">
                                                    <h5 className='name-cars'>{item.name}</h5>
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
                                                    <h3>{item.price}</h3>
                                                    <button className='btn add-cart' onClick={() => handleClickCart(item.listProductId, item.id)}>Xem chi tiết</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* <!--/.container--> */}

                </section>
                {/* <!--/.featured-cars--> */}

                {/* <!--featured-cars end --> */}

                {/* <!--blog start --> */}
                <section id="blog" className="blog"></section>
                {/* <!--/.blog--> */}

                {/* <!--blog end --> */}
            </div>

        </>
    )
};

export default Home;