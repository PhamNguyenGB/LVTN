import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import imgUser from '../../assets/images/user.webp';


const Nav = () => {
    const staff = useSelector((state) => state.staff.staff);

    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('staff');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.setItem('persist:root', null);
        history.push('/login');
    };
    return (
        <>
            <div id="page-top">

                {/* <!-- Topbar --> */}
                <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">

                    {/* <!-- Topbar Navbar --> */}
                    <ul className="navbar-nav ml-auto">

                        {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                        <li className="nav-item dropdown no-arrow d-sm-none">
                            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-search fa-fw"></i>
                            </a>
                            {/* <!-- Dropdown - Messages --> */}
                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <div className='m-4 '>
                                <span className="">{staff ? staff.fullname : ''}</span>

                            </div>
                        </li>

                        <div className="topbar-divider d-none d-sm-block"></div>

                        {/* <!-- Nav Item - User Information --> */}
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="img-profile rounded-circle"
                                    src={staff.avatar ? staff.avatar : imgUser} />
                            </a>
                            {/* <!-- Dropdown - User Information --> */}
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <NavLink className="dropdown-item" to='/profile'>
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Trang cá nhân
                                </NavLink>
                                <NavLink to='/register' className={staff && staff.role === 'admin' ? 'dropdown-item' : 'dropdown-item d-none'}>
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Đăng ký
                                </NavLink>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Activity Log
                                </a>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" data-toggle="modal" data-target="#logoutModal">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Đăng xuất
                                </button>
                            </div>
                        </li>

                    </ul>

                </nav>
                {/* <!-- End of Topbar --> */}

                {/* <!-- Logout Modal--> */}
                <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Bạn muốn đăng xuất khỏi hệ thống?.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                                <button className="btn btn-danger" type="button" data-dismiss="modal" onClick={() => handleLogout()}>Đăng xuất</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Nav;