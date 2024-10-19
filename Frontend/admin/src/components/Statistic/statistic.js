import './sb-admin-2.min.css';
import { NavLink } from 'react-router-dom';
import { statisticUsers, statisticMoneyMonth, statisticMoneyYear, getTotalQuantity } from '../../store/slice/statisticSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from "react";
import StatisticUserTable from './statisticUsersTable';
import StatisticMoneyTable from './statisticMoneyTable';
import numeral from 'numeral';
import Navigation from '../Navigation/Navigation';

function Statistic() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const staff = useSelector((state) => state.staff.staff);

    const dispatch = useDispatch();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    //show table
    const [showTableUser, setShowTableUser] = useState(true);
    const [showTableMoney, setShowTableMoney] = useState(true);
    const [actionTableMoney, setActionTableMoney] = useState("");

    const handleClickShowTableUser = () => {
        setShowTableMoney(true);
        setShowTableUser(false);
    }

    const handleClickShowTableMoney = (action) => {
        setShowTableUser(true);
        setShowTableMoney(false);
        if (action === 'month') {
            setActionTableMoney('month');
        } else {
            setActionTableMoney('year');
        }
    }

    useMemo(() => {
        dispatch(statisticUsers());
        dispatch(statisticMoneyMonth({ month }));
        dispatch(statisticMoneyYear({ year }));
        dispatch(getTotalQuantity());
    }, []);

    const users = useSelector((state) => state.statistic.totalUsers?.totalUsers);
    const moneyMonth = useSelector((state) => state.statistic.moneyMonth?.Data);
    const moneyYear = useSelector((state) => state.statistic.moneyYear?.Data);
    const totalQuantity = useSelector((state) => state.statistic.totalQuantity?.totalQuantity);

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
    }

    return (
        <>
            <div id="page-top">

                {/* <!-- Page Wrapper --> */}
                <div id="wrapper">

                    <Navigation />
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/* <!-- Main Content --> */}
                        <div id="content">

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid mt-5">

                                {/* <!-- Page Heading --> */}
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">THỐNG KÊ</h1>
                                    {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                        className="fas fa-download fa-sm text-white-50"></i> Generate Report</a> */}
                                </div>

                                {/* <!-- Content Row --> */}
                                <div className="row">

                                    {/* <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4" onClick={() => handleClickShowTableMoney('month')} role='button'>
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                            Doanh thu (tháng {currentMonth})</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{formatNumber(moneyMonth)} đ</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4" onClick={() => handleClickShowTableMoney('year')} role='button'>
                                        <div className="card border-left-success shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                            Doanh thu (năm {currentYear})</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{formatNumber(moneyYear)} đ</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4" role='button' onClick={() => handleClickShowTableUser()}>
                                        <div className="card border-left-info shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tổng số người dùng
                                                        </div>
                                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{formatNumber(users)}</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fa fa-user fa-2x text-gray-300" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Pending Requests Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-warning shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                            Tổng sản phẩm đã bán</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{formatNumber(totalQuantity)}</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fa fa-car fa-2x text-gray-300" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Content Row --> */}

                            </div>
                            {/* <!-- /.container-fluid --> */}
                            <StatisticUserTable
                                showTableUser={showTableUser}
                            />
                            <StatisticMoneyTable
                                showTableMoney={showTableMoney}
                                actionTableMoney={actionTableMoney}
                            />

                        </div>
                        {/* <!-- End of Main Content --> */}

                        {/* <!-- Footer --> */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; Your Website 2021</span>
                                </div>
                            </div>
                        </footer>
                        {/* <!-- End of Footer --> */}

                    </div>
                    {/* <!-- End of Content Wrapper --> */}

                </div>
                {/* <!-- End of Page Wrapper --> */}

                {/* <!-- Scroll to Top Button--> */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>

            </div >

        </>

    );
}

export default Statistic;
