import { NavLink } from 'react-router-dom';
import { fetAllUsers } from '../../store/slice/statisticSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import moment from 'moment';
import { ListCarStatistics, ListPlaneStatistics, ListSpecializedVehicleStatistics } from '../../api/statistic';
import { RotatingLines } from 'react-loader-spinner';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const StatisticListProduct = (props) => {

    const currentYear = new Date().getFullYear();

    const disPatch = useDispatch();

    const staff = useSelector((state) => state.staff.staff);

    const [year, setYear] = useState(currentYear);
    const [isLoading, setIsLoading] = useState(false);

    //statistic months
    const [listCar, setListCar] = useState('');
    const [listPlane, setListPlane] = useState('');
    const [listSpecializedVehicle, setListSpecializedVehicle] = useState('');

    //statistic year
    const [totalListCar, setTotalListCar] = useState(0);
    const [totalListPlane, setTotalListPlane] = useState(0);
    const [totalListSpecializedVehicle, setTotalListSpecializedVehicle] = useState(0);

    const handeData = async () => {

        setTotalListCar(0);
        setTotalListPlane(0);
        setTotalListSpecializedVehicle(0);

        const ltCar = [];
        const car = await ListCarStatistics(year);
        car.forEach((item) => {
            ltCar.push(item.totalListCar);
            setTotalListCar(total => total += item.totalListCar);
        });
        setListCar(ltCar);

        const ltPlane = [];
        const plane = await ListPlaneStatistics(year);
        plane.forEach((item) => {
            ltPlane.push(item.totalListCar);
            setTotalListSpecializedVehicle(total => total += item.totalListCar);
        });
        setListPlane(ltPlane);

        const ltSpecializedVehicle = [];
        const specializedVehicle = await ListSpecializedVehicleStatistics(year);
        specializedVehicle.forEach((item) => {
            ltSpecializedVehicle.push(item.totalListCar);
            setTotalListPlane(total => total += item.totalListCar);

        });
        setListSpecializedVehicle(ltSpecializedVehicle);
    }

    const handleSelectChangeYear = (event) => {
        setYear(parseInt(event.target.value));
    };

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        handeData();
    }, [year]);

    const users = useSelector((state) => state.statistic.users?.data);

    const formattedDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    }

    const data1 = {
        labels: ['Xe hơi', 'Máy bay', 'Xe chuyên dụng'],
        datasets: [
            {
                label: '# of Votes',
                data: [totalListCar, totalListPlane, totalListSpecializedVehicle],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Biểu đồ tháng',
            },
        },
    };

    const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    const data2 = {
        labels,
        datasets: [
            {
                label: 'Xe hơi',
                data: listCar,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Xe chuyên dụng',
                data: listSpecializedVehicle,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
                label: 'Máy bay',
                data: listPlane,
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
            },
        ],
    };

    return (
        <>
            <div id="page-top position-relative" hidden={props.showStatisticLP}>
                {/* <!-- Page Wrapper --> */}
                <div id="wrapper">
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/* <!-- Main Content --> */}
                        <div id="content">

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">

                                {/* <!-- Page Heading --> */}
                                <h1 className="h3 mb-2 text-info">THỐNG KÊ SẢN PHẨM BÁN THEO DANH MỤC</h1>

                                {/* <!-- DataTales Example --> */}
                                <div className="card shadow mb-4 mt-5">
                                    <div className="card-header py-3">
                                        <div className=' col-6 d-flex'>
                                            <h6 className="mr-2 font-weight-bold text-info">Năm: </h6>
                                            <div className='position-relative'>
                                                <input
                                                    type='number'
                                                    className='form-input'
                                                    value={year}
                                                    onChange={handleSelectChangeYear}
                                                />
                                            </div>
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
                                        <div className="card-body row">
                                            {/* <div className="table-responsive col-xl-6 col-12">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Username</th>
                                                        <th>Address</th>
                                                        <th>Phone</th>
                                                        <th>Ngày tạo</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Username</th>
                                                        <th>Address</th>
                                                        <th>Phone</th>
                                                        <th>Ngày tạo</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {users ?
                                                        <>
                                                            {users?.length !== 0 ?
                                                                <>
                                                                    {users?.map((item, index) => {
                                                                        return (
                                                                            <tr key={`user-${index}`}>
                                                                                <td>{index + 1}</td>
                                                                                <td>
                                                                                    {item.username}
                                                                                </td>
                                                                                <td>{item.address}</td>
                                                                                <td>{item.phone}</td>
                                                                                <td>{formattedDate(item.createdAt)}</td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </>
                                                                :
                                                                <>
                                                                    ...isLoading
                                                                </>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            ...isLoading
                                                        </>
                                                    }

                                                </tbody>
                                            </table>
                                        </div> */}
                                            <div className='col-xl-6 col-12'>
                                                <Bar options={options} data={data2} />
                                            </div>
                                            <div className='col-xl-6 col-12' style={{ position: 'relative', margin: '0 auto', width: '500px', height: '500px' }}>
                                                <Doughnut data={data1} />
                                                <div className='text-center'>Biểu đồ năm</div>
                                            </div>
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

export default StatisticListProduct;