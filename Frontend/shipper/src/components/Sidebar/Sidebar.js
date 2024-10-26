import React, { useState } from 'react'
import { GiSpiderAlt } from "react-icons/gi";
import { TiThMenu } from "react-icons/ti";
import './Sidebar.scss';
import imgUser from '../../assets/images/user.webp';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
const Sidebar = ({ onToggleSidebar }) => {
    const [active, setActive] = useState(false);

    const handldeClickBtn = () => {
        setActive(!active);
        onToggleSidebar(!active);
    }

    return (
        <>
            <div className={active === true ? 'sidebar active' : 'sidebar'}>
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
                        <NavLink to='/order'>
                            <BsFillGrid3X3GapFill />
                            <span className='nav-item'>Đơnhàng</span>
                        </NavLink>
                        <span className='toolTip'>Đơn hàng</span>
                    </li>
                    <li>
                        <NavLink to='#'>
                            <BsFillGrid3X3GapFill />
                            <span className='nav-item'>Products</span>
                        </NavLink>
                        <span className='toolTip'>Products</span>

                    </li>
                    <li>
                        <NavLink to='#'>
                            <BsFillGrid3X3GapFill />
                            <span className='nav-item'>Categories</span>
                        </NavLink>
                        <span className='toolTip'>Categories</span>

                    </li>
                    <li>
                        <NavLink to='#'>
                            <BsFillGrid3X3GapFill />
                            <span className='nav-item'>Orders</span>
                        </NavLink>
                        <span className='toolTip'>Orders</span>

                    </li>
                    <li>
                        <NavLink to='#'>
                            <RiLogoutBoxLine />
                            <span className='nav-item'>Logout</span>
                        </NavLink>
                        <span className='toolTip'>Logout</span>

                    </li>
                </ul>
            </div>
            {/* <div className='main-content'>
            </div> */}
        </>
    )
}

export default Sidebar;
