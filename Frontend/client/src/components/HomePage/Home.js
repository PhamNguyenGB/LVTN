import './Home.scss';
import './assets/css/style.css';
import './assets/css/responsive.css';
import img1 from '../../assets/images/hinh-nen-3d-xe-moto_025907885.jpg';
import img2 from '../../assets/images/4057698.jpg';
import img3 from '../../assets/images/synth-wave-jet-creative-illustration-ai-generate_250484-7158.avif';
import { MdStarRate } from "react-icons/md";
import HomePage from './HomePage';
import { fetchNew4Products } from '../../api/productAPIs';
import { useEffect, useState } from 'react';

const Home = () => {

    const [newFourProducts, setNewFourProducts] = useState('');

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

    useEffect(() => {
        getNew4Products();
    }, []);
    console.log('check products', newFourProducts);

    return (
        <>
            <div className="home-page ">
                {/* <!--welcome-hero start --> */}
                <section id="home" className="welcome-hero">

                    <div id="carouselExampleFade" className="carousel slide carousel-fade d-md-none d-block">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={img1} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={img2} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={img3} className="d-block w-100" alt="..." />
                            </div>
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

                    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <HomePage />
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
                                                    <button className='btn add-cart'>Thêm vào giỏ</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn btn-link font-18">
                            <h6 style={{ color: '#d59073' }}>Xem thêm</h6>
                        </button>
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
                            <div className="row">
                                <div className="card-p-home col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-featured-cars">
                                        <div className="featured-img-box">
                                            <div className="featured-cars-img">
                                                <img src="assets/images/featured-cars/fc4.png" alt="cars" />
                                            </div>
                                        </div>
                                        <div className="featured-cars-txt p-2 text-white">
                                            <h2>infiniti <span>z5</span></h2>
                                            <h3>$36,850</h3>
                                            <button className='btn add-cart'>Thêm vào giỏ</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-p-home col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-featured-cars">
                                        <div className="featured-img-box">
                                            <div className="featured-cars-img">
                                                <img src="assets/images/featured-cars/fc5.png" alt="cars" />
                                            </div>
                                        </div>
                                        <div className="featured-cars-txt p-2 text-white">
                                            <h2>porsche <span>718</span> cayman</h2>
                                            <div>
                                                <MdStarRate />
                                                <MdStarRate />
                                                <MdStarRate />
                                                <MdStarRate />
                                                <MdStarRate />
                                            </div>
                                            <h3>$48,500</h3>
                                            <button className='btn add-cart'>Thêm vào giỏ</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-p-home col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-featured-cars">
                                        <div className="featured-img-box">
                                            <div className="featured-cars-img">
                                                <img src="assets/images/featured-cars/fc7.png" alt="cars" />
                                            </div>
                                        </div>
                                        <div className="featured-cars-txt p-2 text-white">
                                            <h2><span>bmw 8-</span>series coupe</h2>
                                            <h3>$56,000</h3>
                                            <button className='btn add-cart'>Thêm vào giỏ</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-p-home col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-featured-cars">
                                        <div className="featured-img-box">
                                            <div className="featured-cars-img">
                                                <img src="assets/images/featured-cars/fc8.png" alt="cars" />
                                            </div>
                                        </div>
                                        <div className="featured-cars-txt p-2 text-white">
                                            <h2 >BMW <span> x</span>series-6</h2>
                                            <h3>$75,800</h3>
                                            <button className='btn add-cart'>Thêm vào giỏ</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-p-home col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-featured-cars">
                                        <div className="featured-img-box">
                                            <div className="featured-cars-img">
                                                <img src="assets/images/featured-cars/fc8.png" alt="cars" />
                                            </div>
                                        </div>
                                        <div className="featured-cars-txt p-2 text-white">
                                            <h2 >BMW <span> x</span>series-6</h2>
                                            <h3>$75,800</h3>
                                            <button className='btn add-cart'>Thêm vào giỏ</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-p-home col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-featured-cars">
                                        <div className="featured-img-box">
                                            <div className="featured-cars-img">
                                                <img src="assets/images/featured-cars/fc8.png" alt="cars" />
                                            </div>
                                        </div>
                                        <div className="featured-cars-txt p-2 text-white">
                                            <h2 >BMW <span> x</span>series-6</h2>
                                            <h3>$75,800</h3>
                                            <button className='btn add-cart'>Thêm vào giỏ</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-p-home col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-featured-cars">
                                        <div className="featured-img-box">
                                            <div className="featured-cars-img">
                                                <img src="assets/images/featured-cars/fc8.png" alt="cars" />
                                            </div>
                                        </div>
                                        <div className="featured-cars-txt p-2 text-white">
                                            <h2 >BMW <span> x</span>series-6</h2>
                                            <h3>$75,800</h3>
                                            <button className='btn add-cart'>Thêm vào giỏ</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-p-home col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-featured-cars">
                                        <div className="featured-img-box">
                                            <div className="featured-cars-img">
                                                <img src="assets/images/featured-cars/fc8.png" alt="cars" />
                                            </div>
                                        </div>
                                        <div className="featured-cars-txt p-2 text-white">
                                            <h2 >BMW <span> x</span>series-6</h2>
                                            <h3>$75,800</h3>
                                            <button className='btn add-cart'>Thêm vào giỏ</button>

                                        </div>
                                    </div>
                                </div>
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