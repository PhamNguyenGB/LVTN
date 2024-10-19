import './Header.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypeProduct, searchProducts } from '../../redux/slices/productSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from '../../redux/slices/userSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { PiCraneDuotone } from "react-icons/pi";
import { IoCarSportSharp } from "react-icons/io5";
import { FaMotorcycle } from "react-icons/fa6";
import { SlPlane } from "react-icons/sl";
import { MdFiberNew } from "react-icons/md";
import logo from './wdnwdf10.png';
import { FaBars } from "react-icons/fa6";
import imgUser from '../../assets/images/user.webp';
import { toast } from 'react-toastify';


const Header = () => {
    const user = useSelector((state) => state.user.user);
    const quantity = useSelector((state) => state.cart.quantity);
    const [search, setSearch] = useState('');
    const [btnToggle, setBtnToggle] = useState('d-none');
    const disPatch = useDispatch();
    const history = useHistory();

    const handleClickNameProduct = async (type) => {
        await disPatch(getTypeProduct(type));
    }

    const handleLogout = async () => {
        await disPatch(logout());
        localStorage.setItem('persist:root', null);
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        history.push('/');
        toast.success('Đăng xuất thành công');
    };

    const handleClickYourOrder = async () => {
        history.push('/order')
    }

    const handleClickProfile = async () => {
        history.push('/profile')
    }

    const handleSearch = async () => {
        disPatch(searchProducts({ name: search }));
        history.push(`/search/${search}`);
    };

    const handlePressEnter = (event) => {
        if (event.keyCode === 13 && event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    }

    const handleBtnToggle = () => {
        if (btnToggle === 'd-none')
            setBtnToggle('d-block');
        else {
            setBtnToggle('d-none');
        }
    };

    return (
        <>
            <header className="section-header">


                {/* <!-- header-top-light.// --> */}

                <section className="header-main border-bottom bg-white">
                    <div className="container-fluid">
                        <div className="row p-2 pt-3 pb-3">
                            <div className="col-md-3 col-6">
                                <Link to='/'>
                                    <img className='logo' alt='logo' src={logo} />
                                </Link>
                            </div>
                            <div className="col-md-5 col-6">
                                <form className="d-flex form-inputs">
                                    <input
                                        onChange={(e) => setSearch(e.target.value)} value={search}
                                        className="form-control search-header" type="text" placeholder="Tìm kiếm sản phẩm..."
                                        onKeyDown={(event) => handlePressEnter(event)}
                                    />
                                    <i onClick={handleSearch} className="fa fa-search icon-search" aria-hidden="true"></i>
                                </form>
                            </div>
                            <div className='col-xl-1 d-none d-xl-block'>
                                <div className='phone-button'>
                                    <i className="fa fa-phone text-white" style={{ fontSize: '20px' }} aria-hidden="true"></i>
                                </div>
                                <h5 className='text-primary mt-2' style={{ fontSize: '18px' }}>02877770049</h5>
                            </div>

                            <div className='d-md-none col-6'></div>

                            <div className="col-md-3 col-6 info-web">
                                <div className="d-flex d-md-flex flex-row align-items-center">
                                    <span className="login-res">
                                        {user ?
                                            <div style={{ display: 'flex' }}>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ fontSize: '16px' }}>
                                                        <span className='m-2'>  {user.fullname}</span>
                                                        <img className='m-2' src={user.avatar ? user.avatar : (user.imgGG ? user.imgGG : imgUser)} style={{ width: '30px', borderRadius: '50%' }} />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu style={{ width: '200px' }}>
                                                        <Dropdown.Item className='item-drop' onClick={() => handleClickProfile()}>Thông tin</Dropdown.Item>
                                                        <Dropdown.Item className='item-drop' onClick={() => handleClickYourOrder()}>Đơn hàng của bạn</Dropdown.Item>
                                                        <hr />
                                                        <Dropdown.Item className='item-drop' onClick={() => handleLogout()}>Đăng xuất</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            :
                                            <>
                                                <Link to='/login' className='login' >Đăng nhập /</Link>
                                                <Link to='/register' className='register'> Đăng ký</Link>
                                            </>
                                        }
                                    </span>
                                    <div className="d-flex flex-column ms-2">
                                        <Link className="qty" to='/cart' style={{ color: "#000" }}>
                                            <i className="fa fa-shopping-cart icon-shopping-cart position-relative" aria-hidden="true">
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "12px" }}>
                                                    {quantity !== 0 ? quantity : ''}
                                                </span>
                                            </i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row p-2 pt-3 pb-3 d-flex justify-content-around">
                            <div className='col-1  header-product'>
                                <Link to='/product/new' className="product-name " onClick={() => handleClickNameProduct('Mercedes')}>
                                    <MdFiberNew style={{ fontSize: '24px' }} />
                                    <br />
                                    Hàng mới về
                                </Link>

                                {/* <Link to='/product/Mercedes' className="product-name" onClick={() => handleClickNameProduct('Mercedes')}>Mercedes</Link> */}
                            </div>
                            <div className='col-1 header-product'>
                                <Link to='/product/car' className="product-name " onClick={() => handleClickNameProduct('Mercedes')}>
                                    <IoCarSportSharp style={{ fontSize: '24px' }} />
                                    <br />
                                    Ô Tô
                                </Link>

                                {/* <Link to='/product/Mercedes' className="product-name" onClick={() => handleClickNameProduct('Mercedes')}>Mercedes</Link> */}
                            </div>
                            <div className='col-1 header-product'>
                                <Link to='/product/BMW' className="product-name" onClick={() => handleClickNameProduct('BMW')}>
                                    <PiCraneDuotone style={{ fontSize: '28px' }} />
                                    <br />
                                    Xe Chuyên Dụng
                                </Link>
                            </div>
                            <div className='col-1 header-product'>
                                <Link to='/product/motor' className="product-name" onClick={() => handleClickNameProduct('Bugatti')}>
                                    <FaMotorcycle style={{ fontSize: '24px' }} />
                                    <br />
                                    Mô Tô
                                </Link>
                            </div>
                            <div className='col-1 header-product'>
                                <Link to='/product/plane' className="product-name" onClick={() => handleClickNameProduct('Rolls-Royce')}>
                                    <SlPlane style={{ fontSize: '22px' }} />
                                    <br />
                                    Máy Bay
                                </Link>
                            </div>
                            {/* <div className='col-1 header-product'>
                                <br />
                                <Link to='/product/Porsche' className="product-name" onClick={() => handleClickNameProduct('Porsche')}>Porsche</Link>
                            </div> */}
                            <div className="col-2 info-web-2">
                                <div className='toggle-btn'
                                    onClick={() => handleBtnToggle()}
                                >
                                    <FaBars size={24} />
                                </div>
                                <div className="d-flex d-md-flex flex-row align-items-center info-user">
                                    <span className="login-res">
                                        {user ?
                                            <>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ fontSize: '16px' }}>
                                                        {user.username}
                                                        <i className="fa fa-user" variant="success" id="dropdown-basic" style={{ marginLeft: '10px' }}></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu style={{ width: '200px' }}>
                                                        <Dropdown.Item className='item-drop' onClick={() => handleClickProfile()}>Thông tin</Dropdown.Item>
                                                        <Dropdown.Item className='item-drop' onClick={() => handleClickYourOrder()}>Đơn hàng của bạn</Dropdown.Item>
                                                        <hr />
                                                        <Dropdown.Item className='item-drop' onClick={() => handleLogout()}>Đăng xuất</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </>
                                            :
                                            <>
                                                <Link to='/login' className='login' >Đăng nhập /</Link>
                                                <Link to='/register' className='register'> Đăng ký</Link>
                                            </>
                                        }
                                    </span>
                                    <div className="d-flex flex-column ms-2">
                                        <Link className="qty" to='/cart' style={{ color: "#000" }}>
                                            <i className="fa fa-shopping-cart icon-shopping-cart position-relative" aria-hidden="true">
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "12px" }}>
                                                    {quantity !== 0 ? quantity : ''}
                                                </span>
                                            </i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`dropdown_menu ${btnToggle}`}>
                            <li>
                                <div className=''>
                                    <Link to='/product/Mercedes' className="product-name " onClick={() => handleClickNameProduct('Mercedes')}>
                                        <MdFiberNew style={{ fontSize: '24px' }} className='m-1' />
                                        Hàng mới về
                                    </Link>

                                    {/* <Link to='/product/Mercedes' className="product-name" onClick={() => handleClickNameProduct('Mercedes')}>Mercedes</Link> */}
                                </div>
                            </li>
                            <li>
                                <div className=''>
                                    <Link to='/product/Mercedes' className="product-name " onClick={() => handleClickNameProduct('Mercedes')}>
                                        <IoCarSportSharp style={{ fontSize: '24px' }} className='m-1' />
                                        Ô Tô
                                    </Link>

                                    {/* <Link to='/product/Mercedes' className="product-name" onClick={() => handleClickNameProduct('Mercedes')}>Mercedes</Link> */}
                                </div>
                            </li>
                            <li>
                                <div className=''>
                                    <Link to='/product/BMW' className="product-name" onClick={() => handleClickNameProduct('BMW')}>
                                        <PiCraneDuotone style={{ fontSize: '28px' }} className='m-1' />
                                        Xe Chuyên Dụng
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className=''>
                                    <Link to='/product/Bugatti' className="product-name" onClick={() => handleClickNameProduct('Bugatti')}>
                                        <FaMotorcycle style={{ fontSize: '24px' }} className='m-1' />
                                        Mô Tô
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className=''>
                                    <Link to='/product/Rolls-Royce' className="product-name" onClick={() => handleClickNameProduct('Rolls-Royce')}>
                                        <SlPlane style={{ fontSize: '22px' }} className='m-1' />
                                        Máy Bay
                                    </Link>
                                </div>
                            </li>
                        </div>
                    </div>
                </section >


            </header >
        </>
    )
};

export default Header;