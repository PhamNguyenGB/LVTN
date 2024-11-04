import { useEffect, useState } from "react";
import { monthlyRevenueReport, orderStatistics } from '../../api/statistic';
import moment from 'moment';
import numeral from 'numeral';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { RotatingLines } from 'react-loader-spinner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const StatisticMoneyTable = (props) => {
    const currentYear = new Date().getFullYear();

    const action = props.actionTableMoney;

    const [dataStatistic, setDataStatistic] = useState('');
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setYear(currentYear);
        handleData();

    }, [action]);

    const [year, setYear] = useState(currentYear);

    const formattedDate = (date) => {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }

    const handleSelectChangeYear = (event) => {
        setYear(parseInt(event.target.value));
    };

    const handleData = async () => {
        try {
            setTotal(0);
            if (action === 'revenue') {
                const totalRevenue = [];

                const request = await monthlyRevenueReport(year);
                request.forEach((item) => {
                    totalRevenue.push(item.totalRevenue);
                    setTotal(total => total += item.totalRevenue);
                });

                setDataStatistic(totalRevenue);
            } else {
                const totalRevenue = [];

                const request = await orderStatistics(year);
                request.forEach((item) => {
                    totalRevenue.push(item.totalOrder);
                    setTotal(total => total += item.totalOrder);
                });

                setDataStatistic(totalRevenue);
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);

        handleData();

    }, [year]);


    // useEffect(() => {
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 500);


    // }, [year, action]);

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Biểu đồ ${action === 'revenue' ? 'doanh thu' : 'đơn hàng'}`,
            },
        },
    };

    const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Thánng 10', 'Thánng 11', 'Thánng 12'];

    const data = {
        labels,
        datasets: [
            {
                label: `${action === 'revenue' ? 'Doanh thu' : 'Đơn hàng'}`,
                data: dataStatistic,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            // {
            //     label: 'Dataset 2',
            //     data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
        ],
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter')
            console.log('abc');

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
                                <h1 className={action === 'revenue' ? "h3 mb-2 text-primary" : "h3 mb-2 text-success"}>
                                    THỐNG KÊ {action === 'revenue' ? 'DOANH THU' : 'ĐƠN HÀNG'}
                                </h1>

                                {/* <!-- DataTales Example --> */}
                                <div className="card shadow mb-4 mt-5">
                                    <div className="card-header py-3 row">
                                        <div className=' col-6 d-flex'>
                                            <h6 className={action === 'revenue' ? "mr-2 font-weight-bold text-primary" : "mr-2 font-weight-bold text-success"}>Năm: </h6>
                                            <div className='position-relative'>
                                                <input
                                                    type='number'
                                                    className='form-input'
                                                    value={year}
                                                    onChange={handleSelectChangeYear}
                                                    onKeyDown={handleKeyPress}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-6 justify-content-end d-flex'>
                                            <h6 className={action === 'revenue' ? "text-primary" : "text-success"}>
                                                Tổng {action === 'revenue' ? `doanh thu` : `đơn hàng`}:
                                            </h6>
                                            <h6 className='ml-1 text-dark'>{formatNumber(total)}</h6>
                                        </div>
                                    </div>
                                    {isLoading === true ?
                                        <div className='text-center mt-5' style={{ minHeight: '500px' }}>
                                            <RotatingLines
                                                visible={true}
                                                height="96"
                                                width="96"
                                                color="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                ariaLabel="rotating-lines-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                            />

                                        </div>
                                        :
                                        <div className="card-body">
                                            {/* <div className="table-responsive">
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
                                                        // <>
                                                        //     {statisticMoney?.map((item, index) => {
                                                        //         return (
                                                        //             <tr key={`statisticMoney-${index}`}>
                                                        //                 <td>{index + 1}</td>
                                                        //                 <td>
                                                        //                     {item.User.username}
                                                        //                 </td>
                                                        //                 <td>1222528743{item.id}</td>
                                                        //                 <td>{formatNumber(item.totalCost)} đ</td>
                                                        //                 <td>{formattedDate(item.createdAt)}</td>
                                                        //             </tr>
                                                        //         )
                                                        //     })}
                                                        // </>
                                                        <></>
                                                    }
                                                </tbody>
                                            </table>
                                        </div> */}
                                            <Bar options={options} data={data} />
                                        </div>

                                    }
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