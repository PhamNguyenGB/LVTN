import './sb-admin-2.min.css';
import { NavLink } from 'react-router-dom';
import { statisticUsers, statisticMoneyMonth, statisticMoneyYear, getTotalQuantity } from '../../store/slice/statisticSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from "react";
import StatisticListProduct from './statisticListProduct';
import StatisticMoneyTable from './statisticRevenuaOrder';
import StatisticStatusOrder from './statisticStatusOrder';
import numeral from 'numeral';
import Navigation from '../Navigation/Navigation';
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { GrStatusUnknown } from "react-icons/gr";

function Statistic() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const staff = useSelector((state) => state.staff.staff);

    const dispatch = useDispatch();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    //show table
    const [showStatisticLP, setShowStatisticLP] = useState(true);
    const [showStatusOrder, setShowStatusOrder] = useState(true);
    const [showTableMoney, setShowTableMoney] = useState(true);
    const [actionTableMoney, setActionTableMoney] = useState("");

    const handleClickShowTableUser = () => {
        setShowTableMoney(true);
        setShowStatisticLP(false);
        setShowStatusOrder(true);
    }

    const handleShowStatusOrder = () => {
        setShowTableMoney(true);
        setShowStatisticLP(true);
        setShowStatusOrder(false);
    }

    const handleClickShowTableMoney = (action) => {
        setShowStatisticLP(true);
        setShowTableMoney(false);
        if (action === 'revenue') {
            setActionTableMoney('revenue');
        } else {
            setActionTableMoney('order');
        }
    }

    useMemo(() => {
        dispatch(statisticUsers());
        dispatch(statisticMoneyMonth({ month }));
        dispatch(statisticMoneyYear({ year }));
        dispatch(getTotalQuantity());
    }, []);

    // const users = useSelector((state) => state.statistic.totalUsers?.totalUsers);
    // const moneyMonth = useSelector((state) => state.statistic.moneyMonth?.Data);
    // const moneyYear = useSelector((state) => state.statistic.moneyYear?.Data);
    // const totalQuantity = useSelector((state) => state.statistic.totalQuantity?.totalQuantity);

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
                                    <div className="col-xl-3 col-md-6 mb-4" onClick={() => handleClickShowTableMoney('revenue')} role='button'>
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body p-4">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-lg font-weight-bold text-primary text-uppercase mb-1">
                                                            Doanh thu
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4" onClick={() => handleClickShowTableMoney('order')} role='button'>
                                        <div className="card border-left-success shadow h-100 py-2">
                                            <div className="card-body p-4">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-lg font-weight-bold text-success text-uppercase mb-1">
                                                            Đơn hàng
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <FaBoxArchive fontSize={30} color='#ccc' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4" role='button' onClick={() => handleClickShowTableUser()}>
                                        <div className="card border-left-info shadow h-100 py-2">
                                            <div className="card-body p-4">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-lg font-weight-bold text-info text-uppercase mb-1">
                                                            Danh mục sản phẩm
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <MdPlaylistAddCheckCircle fontSize={30} color='#ccc' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Pending Requests Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4" role='button' onClick={() => handleShowStatusOrder()}>
                                        <div className="card border-left-warning shadow h-100 py-2">
                                            <div className="card-body p-4">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-lg font-weight-bold text-warning text-uppercase mb-1">
                                                            Trạng thái đơn hàng
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <GrStatusUnknown fontSize={30} color='#ccc' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Content Row --> */}

                            </div>
                            {/* <!-- /.container-fluid --> */}
                            <StatisticListProduct
                                showStatisticLP={showStatisticLP}
                            />
                            <StatisticMoneyTable
                                showTableMoney={showTableMoney}
                                actionTableMoney={actionTableMoney}
                            />
                            <StatisticStatusOrder
                                showStatusOrder={showStatusOrder}
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
