import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getDataStatisticMoneyYear, getDataStatisticMoneyMonth } from '../../store/slice/statisticSlice';
import moment from 'moment';
import numeral from 'numeral';

const StatisticMoneyTable = (props) => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const action = props.actionTableMoney;

    const disPatch = useDispatch();

    const staff = useSelector((state) => state.staff.staff);

    useEffect(() => {
        setMonth(currentMonth);
        setYear(currentYear);
    }, [action]);

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const formattedDate = (date) => {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }

    const handleSelectChangeMonth = (event) => {
        setMonth(parseInt(event.target.value));
    };

    const handleSelectChangeYear = (event) => {
        setYear(parseInt(event.target.value));
    };

    useEffect(() => {
        action === 'month' ?
            disPatch(getDataStatisticMoneyMonth({ month, access_token: staff.access_token }))
            :
            disPatch(getDataStatisticMoneyYear({ year, access_token: staff.access_token }))
    }, [month, year, action]);

    const statisticMoney = useSelector((state) => state.statistic.statisticMoney?.data);
    const totalMoney = useSelector((state) => state.statistic.totalMoney);

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
    }

    return (
        <>
            <div id="page-top position-relative" hidden={props.showTableMoney}>
                {/* <!-- Page Wrapper --> */}
                <div id="wrapper">
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/* <!-- Main Content --> */}
                        <div id="content">

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">

                                {/* <!-- Page Heading --> */}
                                <h1 className={action === 'month' ? "h3 mb-2 text-primary" : "h3 mb-2 text-success"}>
                                    THỐNG KÊ DOANH THU {action === 'month' ? 'THÁNG' : 'NĂM'}
                                </h1>

                                {/* <!-- DataTales Example --> */}
                                <div className="card shadow mb-4 mt-5">
                                    <div className="card-header py-3 row">
                                        <h6 className="m-0 font-weight-bold text-primary col-1">Doanh thu</h6>
                                        {action === 'month' ?
                                            <select className="select col-1" value={month} onChange={handleSelectChangeMonth}>
                                                <option value="1">Tháng 1</option>
                                                <option value="2">Tháng 2</option>
                                                <option value="3">Tháng 3</option>
                                                <option value="4">Tháng 4</option>
                                                <option value="5">Tháng 5</option>
                                                <option value="6">Tháng 6</option>
                                                <option value="7">Tháng 7</option>
                                                <option value="8">Tháng 8</option>
                                                <option value="9">Tháng 9</option>
                                                <option value="10">Tháng 10</option>
                                                <option value="11">Tháng 11</option>
                                                <option value="12">Tháng 12</option>
                                            </select>
                                            :
                                            <select className="select col-1" value={year} onChange={handleSelectChangeYear}>
                                                <option value="2020">Năm 2020</option>
                                                <option value="2021">Năm 2021</option>
                                                <option value="2022">Năm 2022</option>
                                                <option value="2023">Năm 2023</option>
                                                <option value="2024">Năm 2024</option>
                                                <option value="2025">Năm 2025</option>
                                                <option value="2026">Năm 2026</option>
                                                <option value="2027">Năm 2027</option>
                                                <option value="2028">Năm 2028</option>
                                                <option value="2029">Năm 2029</option>
                                                <option value="2030">Năm 2030</option>
                                            </select>
                                        }
                                        <div className='col-7'>

                                        </div>
                                        <div className='col-3 row'>
                                            <h6 className={action === 'month' ? "text-primary col-8" : "text-success col-8"}>
                                                Tổng doanh thu {action === 'month' ? `tháng ${month}` : `năm ${year}`}:
                                            </h6>
                                            <h6 className='col-4 text-dark'>{formatNumber(totalMoney)} đ</h6>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Username</th>
                                                        <th>Mã đơn hàng</th>
                                                        <th>Tổng tiền</th>
                                                        <th>Ngày đặt</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Username</th>
                                                        <th>Mã đơn hàng</th>
                                                        <th>Tổng tiền</th>
                                                        <th>Ngày đặt</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {statisticMoney?.length === 0 ?
                                                        <tr>
                                                            <td>Không có dữ liệu</td>
                                                        </tr>
                                                        :
                                                        <>
                                                            {statisticMoney?.map((item, index) => {
                                                                return (
                                                                    <tr key={`statisticMoney-${index}`}>
                                                                        <td>{index + 1}</td>
                                                                        <td>
                                                                            {item.User.username}
                                                                        </td>
                                                                        <td>1222528743{item.id}</td>
                                                                        <td>{formatNumber(item.totalCost)} đ</td>
                                                                        <td>{formattedDate(item.createdAt)}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* <!-- /.container-fluid --> */}

                        </div>
                        {/* <!-- End of Main Content --> */}

                    </div>
                    {/* <!-- End of Content Wrapper --> */}

                </div>
            </div >
        </>
    )
}

export default StatisticMoneyTable;