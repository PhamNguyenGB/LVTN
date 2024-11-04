import { NavLink } from 'react-router-dom';
import { fetAllUsers } from '../../store/slice/statisticSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import moment from 'moment';
import { getOrderStatusStatistics } from '../../api/statistic';
import { RotatingLines } from 'react-loader-spinner';
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);


const StatisticStatusOrder = (props) => {

    const disPatch = useDispatch();

    const staff = useSelector((state) => state.staff.staff);

    const [isLoading, setIsLoading] = useState(false);


    const [unconfirmed, setUnconfirmed] = useState(0);
    const [confirmed, setConfirmed] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [delivered, setDelivered] = useState(0);

    const handeData = async () => {
        setUnconfirmed(0);
        setConfirmed(0);
        setShipping(0);
        setDelivered(0);

        const request = await getOrderStatusStatistics();
        request.forEach((item) => {
            if (item.status === 'Chưa xác nhận')
                setUnconfirmed(item.count);
            if (item.status === 'Đã xác nhận')
                setConfirmed(item.count);
            if (item.status === 'Đang vận chuyển')
                setShipping(item.count);
            if (item.status === 'Đã giao')
                setDelivered(item.count);
        })

    }


    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        handeData();
    }, []);

    const users = useSelector((state) => state.statistic.users?.data);

    const formattedDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    }

    const data1 = {
        labels: ['Chưa xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Đã giao'],
        datasets: [
            {
                label: '# of Votes',
                data: [
                    unconfirmed,
                    confirmed,
                    shipping,
                    delivered,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div id="page-top position-relative" hidden={props.showStatusOrder}>
                {/* <!-- Page Wrapper --> */}
                <div id="wrapper">
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/* <!-- Main Content --> */}
                        <div id="content">

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">

                                {/* <!-- Page Heading --> */}
                                <h1 className="h3 mb-2 text-warning">THỐNG KÊ TRẠNG THÁI ĐƠN HÀNG</h1>

                                {/* <!-- DataTales Example --> */}
                                <div className="card shadow mb-4 mt-5">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-warning">ĐƠN HÀNG</h6>
                                    </div>
                                    <div className="card-body row">
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
                                            <div className='' style={{ position: 'relative', margin: '0 auto', width: '600px', height: '600px' }}>
                                                <Doughnut data={data1} />
                                                <div className='text-center'>Biểu đồ năm</div>
                                            </div>
                                        }
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

export default StatisticStatusOrder;