import React, { useState } from 'react'
import { GiSpiderAlt } from "react-icons/gi";
import { TiThMenu } from "react-icons/ti";
import './Sidebar.scss';
import imgUser from '../../assets/images/user.webp';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BsFillGrid3X3GapFill, BsFillCartCheckFill, BsCartFill } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaUserCog } from "react-icons/fa";
import { toast } from 'react-toastify';
import { logout } from '../../store/slices/shipperSlice';
import { useDispatch } from 'react-redux';

const Sidebar = ({ onToggleSidebar }) => {
    const [active, setActive] = useState(false);

    const dispath = useDispatch();
    const history = useHistory();

    const handldeClickBtn = () => {
        setActive(!active);
        onToggleSidebar(!active);
    }

    const handleLogout = async () => {
        await dispath(logout());
        localStorage.setItem('persist:root', null);
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        toast.success('Đăng xuất thành công');
    };


    return (
        <>
            <div className={active === true ? 'sidebar active-sidebar' : 'sidebar'}>
                <div className='top'>
                    <div className='logo'>
                        <GiSpiderAlt fontSize={40} style={{ marginRight: '5px' }} />
                        <span>Ship Spider</span>
                    </div>
                    <TiThMenu id='btn' onClick={handldeClickBtn} />
                </div>
                <div className='user'>
                    <img src={imgUser} alt='' className='user-img' />
                    <div>
                        <p className='bold'>Clint B.</p>
                        <p>Shipper</p>
                    </div>
                </div>
                <ul>
                    <li>
                        <NavLink to='/'>
                            <BsFillGrid3X3GapFill />
                            <span className='nav-item'>Đơn hàng</span>
                        </NavLink>
                        <span className='toolTip'>Đơn hàng</span>
                    </li>
                    <li>
                        <NavLink to='/received'>
                            <BsCartFill />
                            <span className='nav-item'>Đơn đã nhận</span>
                        </NavLink>
                        <span className='toolTip'>Đơn đã nhận</span>

                    </li>
                    <li>
                        <NavLink to='/delivered'>
                            <BsFillCartCheckFill />
                            <span className='nav-item'>Đơn đã giao</span>
                        </NavLink>
                        <span className='toolTip'>Đơn đã giao</span>

                    </li>
                    <li>
                        <NavLink to='/profile'>
                            <FaUserCog />
                            <span className='nav-item'>Trang cá nhân</span>
                        </NavLink>
                        <span className='toolTip'>Trang cá nhân</span>

                    </li>
                    <li>
                        <NavLink to='/login' onClick={handleLogout}>
                            <RiLogoutBoxLine />
                            <span className='nav-item'>Đăng xuất</span>
                        </NavLink>
                        <span className='toolTip'>Đăng xuất</span>
                    </li>
                </ul>
            </div>
            {/* <div className='main-content'>
            </div> */}
        </>
    )
}

export default Sidebar;
