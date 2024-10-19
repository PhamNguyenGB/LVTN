import { NavLink } from 'react-router-dom';
import { fetAllUsers } from '../../store/slice/statisticSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import moment from 'moment';


const StatisticUserTable = (props) => {

    const disPatch = useDispatch();

    const staff = useSelector((state) => state.staff.staff);

    useEffect(() => {
        disPatch(fetAllUsers())
    }, []);

    const users = useSelector((state) => state.statistic.users?.data);

    const formattedDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    }

    return (
        <>
            <div id="page-top position-relative" hidden={props.showTableUser}>
                {/* <!-- Page Wrapper --> */}
                <div id="wrapper">
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/* <!-- Main Content --> */}
                        <div id="content">

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">

                                {/* <!-- Page Heading --> */}
                                <h1 className="h3 mb-2 text-info">THỐNG KÊ NGƯỜI DÙNG</h1>

                                {/* <!-- DataTales Example --> */}
                                <div className="card shadow mb-4 mt-5">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Người dùng</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
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

export default StatisticUserTable;