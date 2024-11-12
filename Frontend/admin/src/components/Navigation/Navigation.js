import React from 'react'
import { NavLink } from 'react-router-dom';
import { MdOutlineEventNote, MdOutlineRateReview } from "react-icons/md";
import { FaBorderAll } from "react-icons/fa6";
import { TbBrandProducthunt } from "react-icons/tb";
import { FcStatistics } from "react-icons/fc";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { FaRegFilePowerpoint, FaUserCog } from "react-icons/fa";
import { PiTrainRegionalFill } from "react-icons/pi";
import { AiFillProduct } from "react-icons/ai";
import { SiLevelsdotfyi } from "react-icons/si";
import { IoHome } from "react-icons/io5";

const Navigation = () => {
    return (
        <>
            {/* <!-- Sidebar --> */}
            < ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" >

                {/* <!-- Sidebar - Brand --> */}
                <a a className="sidebar-brand d-flex align-items-center justify-content-center" href="#" >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Model Page</div>
                </a >

                {/* <!-- Divider --> */}
                < hr className="sidebar-divider my-0" />

                {/* <!-- Nav Item - Dashboard --> */}
                <li li className="nav-item active" >
                    <NavLink className="nav-link" to="/">
                        <FcStatistics fontSize={18} color='white' />
                        <span className='ml-1'>Thống kê</span></NavLink>
                </li >

                {/* <!-- Divider --> */}
                < hr className="sidebar-divider my-0" />

                {/* <!-- Products --> */}
                <li li className="nav-item active" >
                    <NavLink className="nav-link" to="/product">
                        <TbBrandProducthunt fontSize={18} />
                        <span className='ml-1'>Quản lý sản phẩm</span></NavLink>
                </li >

                <hr className="sidebar-divider my-0" />

                {/* <!-- Order --> */}
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/order">
                        <FaBorderAll fontSize={18} />
                        <span className='ml-1'>Quản lý đơn hàng</span></NavLink>
                </li>

                <hr className="sidebar-divider my-0" />

                {/* <!-- Event --> */}
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/event">
                        <MdOutlineEventNote fontSize={18} />
                        <span className='ml-1'>Quản lý sự kiện</span></NavLink>
                </li>

                <hr className="sidebar-divider my-0" />

                {/* <!-- ListProduct --> */}
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/listProduct">
                        <HiMiniClipboardDocumentList fontSize={18} />
                        <span className='ml-1'>Quản lý danh mục sản phẩm</span></NavLink>
                </li>

                <hr className="sidebar-divider my-0" />

                {/* <!-- Point --> */}
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/point">
                        <FaRegFilePowerpoint fontSize={18} />
                        <span className='ml-1'>Quản lý mốc điểm thưởng</span></NavLink>
                </li>

                <hr className="sidebar-divider my-0" />

                {/* <!-- Region --> */}
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/region">
                        <PiTrainRegionalFill fontSize={18} />
                        <span className='ml-1'>Quản lý địa chỉ giao hàng</span></NavLink>
                </li>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <NavLink className="nav-link" to="/review">
                        <MdOutlineRateReview fontSize={18} />
                        <span className='ml-1'>Quản lý đánh giá</span></NavLink>
                </li>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <NavLink className="nav-link" to="/user">
                        <FaUserCog fontSize={18} />
                        <span className='ml-1'>Quản lý người dùng</span></NavLink>
                </li>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <NavLink className="nav-link" to="/sold/product">
                        <AiFillProduct fontSize={18} />
                        <span className='ml-1'>Sản phẩm đã bán</span></NavLink>
                </li>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <NavLink className="nav-link" to="/level">
                        <SiLevelsdotfyi fontSize={18} />
                        <span className='ml-1'>Quản lý cấp bậc</span></NavLink>
                </li>

                <hr className="sidebar-divider my-0" />
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/image/home">
                        <IoHome fontSize={18} />
                        <span className='ml-1'>Hình ảnh trang chủ</span></NavLink>
                </li>

                <hr className="sidebar-divider my-0" />
                {/* <!-- Nav Item - Pages Collapse Menu --> */}
                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Components</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Components:</h6>
                            <a className="collapse-item" href="buttons.html">Buttons</a>
                            <a className="collapse-item" href="cards.html">Cards</a>
                        </div>
                    </div>
                </li> */}

                {/* <!-- Nav Item - Utilities Collapse Menu --> */}
                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Utilities</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Utilities:</h6>
                            <a className="collapse-item" href="utilities-color.html">Colors</a>
                            <a className="collapse-item" href="utilities-border.html">Borders</a>
                            <a className="collapse-item" href="utilities-animation.html">Animations</a>
                            <a className="collapse-item" href="utilities-other.html">Other</a>
                        </div>
                    </div>
                </li> */}

                {/* <!-- Divider --> */}
                {/* <hr className="sidebar-divider" /> */}

                {/* <!-- Heading --> */}
                {/* <div className="sidebar-heading">
                    Addons
                </div> */}

                {/* <!-- Nav Item - Pages Collapse Menu --> */}
                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                        aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Login Screens:</h6>
                            <a className="collapse-item" href="login.html">Login</a>
                            <a className="collapse-item" href="register.html">Register</a>
                            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                            <div className="collapse-divider"></div>
                            <h6 className="collapse-header">Other Pages:</h6>
                            <a className="collapse-item" href="404.html">404 Page</a>
                            <a className="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
                </li> */}

                {/* <!-- Nav Item - Charts --> */}
                {/* <li className="nav-item">
                    <a className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></a>
                </li> */}

                {/* <!-- Nav Item - Tables --> */}
                {/* <li className="nav-item">
                    <a className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tables</span></a>
                </li> */}

                {/* <!-- Divider --> */}
                {/* <hr className="sidebar-divider d-none d-md-block" /> */}

            </ul >
            {/* <!-- End of Sidebar --> */}
        </>
    )
}

export default Navigation
