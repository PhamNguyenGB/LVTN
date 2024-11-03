import { fetAllOrder } from '../../api/OrderAPIs';
import Navigation from '../Navigation/Navigation';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import numeral from 'numeral';
import moment from 'moment';
import FilterCol from '../Filter/FilterCol';
import { FaSort, FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import Pagination from '../Pagination/Pagination';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';

const formatNumber = (number) => {
    return numeral(number).format('0,0');
}

const columns = [
    {
        accessorKey: 'index',
        header: 'STT',
        size: 10,
        enableSorting: false,
        cell: (props) => <p>{props.row.index + 1}</p>,
        searchHidden: true,
    },
    {
        accessorKey: 'orderCode',
        header: 'Mã đơn hàng',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: false,
    },
    {
        accessorKey: 'payOnlineCode',
        header: 'Mã thanh toán',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: false,
    },
    {
        accessorKey: 'User',
        header: 'Người đặt hàng',
        cell: (props) => <p>{props.getValue().email}</p>,
        searchHidden: false,
    },
    {
        accessorKey: 'Region',
        header: 'Phí vận chuyển',
        cell: (props) => <p>{formatNumber(props.getValue().deliveryFee)}</p>,
        searchHidden: true,
    },
    {
        accessorKey: 'point',
        header: 'Coin',
        cell: (props) => <p>{formatNumber(props.getValue())}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'paymentMethod',
        header: 'Phương thức thanh toán',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'Shipper',
        header: 'Người giao hàng',
        cell: (props) => <p>{props.getValue()?.email}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'Event',
        header: 'Giảm giá',
        cell: (props) => <p>{props.getValue()?.discount ? props.getValue().discount + '%' : ''}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'totalCost',
        header: 'Tổng tiền',
        cell: (props) => <p>{formatNumber(props.getValue())}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'statusPay',
        header: 'Trạng thái thanh toán',
        cell: (props) => <p>
            {props.getValue() === 'true' ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </p>,
        searchHidden: true,

    },
    {
        accessorKey: 'status',
        header: 'Trạng thái đơn',
        cell: (props) => <p
            className={props.getValue() === 'Chưa xác nhận' ? 'text-danger' :
                (props.getValue() === 'Hoàn thành' ? 'text-success' : '')}
        >
            {props.getValue()}
        </p>,
        searchHidden: true,

    },
    {
        accessorKey: 'Staff',
        header: 'Nhân viên nhận đơn',
        cell: (props) => <p>{props.getValue()?.email}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'createdAt',
        header: 'Ngày lập đơn',
        cell: (props) => <p>{moment(props.getValue()).format('DD/MM/YYYY HH:mm:ss')}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'updatedAt',
        header: 'Ngày cập nhật',
        cell: (props) => <p>{moment(props.getValue()).format('DD/MM/YYYY HH:mm:ss')}</p>,
        searchHidden: true,

    },
]

const Order = () => {

    // const dispatch = useDispatch();
    const history = useHistory();

    // const orders = useSelector((state) => state.order.orders);
    // const staff = useSelector((state) => state.staff.staff);
    const [data, setData] = useState('');

    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    const GetAllOrder = async () => {
        try {
            await fetAllOrder().then((res) => {
                if (res.status === 0)
                    setData(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        GetAllOrder();
    }, []);

    // const GetOrderDetail = async (orderId, shipping, status) => {
    //     await dispatch(getOrderDetail({ orderId, shipping, status }));
    // }

    const tableInstance = useReactTable({
        columns,
        data,
        defaultColumn: {
            minSize: 60,
            maxSize: 800,
        },
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnFilters,
            pagination,
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    });

    const handleViewDetail = (order) => {
        console.log('check order', order);
        history.push(`/orderDetail/${order.id}`)
    };

    return (
        <>
            <div id="page-top position-relative">

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
                                <h1 className="h3 mb-2 text-gray-800">QUẢN LÍ ĐƠN HÀNG</h1>

                                {/* <!-- DataTales Example --> */}
                                <div className="card shadow mb-4 mt-5">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Đơn hàng</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    {tableInstance.getHeaderGroups().map(headerGroup => (
                                                        <tr key={headerGroup.id}>
                                                            {headerGroup.headers.map(header => (
                                                                <th style={{ width: header.getSize() }} key={header.id}>
                                                                    {header.isPlaceholder
                                                                        ? null
                                                                        : flexRender(
                                                                            header.column.columnDef.header,
                                                                            header.getContext()
                                                                        )}
                                                                    {header.column.getCanSort() &&
                                                                        <FaSort
                                                                            fontSize={14}
                                                                            onClick={header.column.getToggleSortingHandler()}
                                                                            type='button'
                                                                            className='m-1'
                                                                        />
                                                                    }
                                                                    {
                                                                        {
                                                                            asc: <FaSortAmountDownAlt />,
                                                                            desc: <FaSortAmountDown />
                                                                        }[header.column.getIsSorted()]
                                                                    }
                                                                    <FilterCol
                                                                        columnFilters={columnFilters}
                                                                        setColumnFilters={setColumnFilters}
                                                                        hidden={header.column.columnDef.searchHidden}
                                                                        nameInput={header.column.columnDef.accessorKey}

                                                                    />
                                                                    <span
                                                                        onMouseDown={header.getResizeHandler()}
                                                                        onTouchStart={header.getResizeHandler()}
                                                                        className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                                                                    ></span>
                                                                </th>

                                                            ))}
                                                        </tr>
                                                    ))}

                                                    {/* </tr> */}
                                                </thead>
                                                <tfoot>
                                                    {tableInstance.getHeaderGroups().map(headerGroup => (
                                                        <tr key={headerGroup.id}>
                                                            {headerGroup.headers.map(header => (
                                                                <th key={header.id}>
                                                                    {header.isPlaceholder
                                                                        ? null
                                                                        : flexRender(
                                                                            header.column.columnDef.header,
                                                                            header.getContext()
                                                                        )}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                    {/* </tr> */}
                                                </tfoot>
                                                <tbody>
                                                    {tableInstance.getRowModel().rows ?
                                                        <>
                                                            {tableInstance.getRowModel().rows?.map(row => (
                                                                <tr key={row.id}>
                                                                    {row.getVisibleCells().map(cell => (
                                                                        <td style={{ width: cell.column?.getSize() }} key={cell.id}>
                                                                            {flexRender(cell.column.columnDef?.cell, cell?.getContext())}
                                                                        </td>
                                                                    ))}
                                                                    <td style={{ width: "200px" }}>
                                                                        <span>
                                                                            <button className=" btn btn-success ml-5" onClick={() => handleViewDetail(row.original)}>
                                                                                Xem chi tiết
                                                                            </button>
                                                                        </span>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </>
                                                        :
                                                        <tr>
                                                            <td> ...isLoading</td>
                                                        </tr>
                                                    }

                                                </tbody>
                                            </table>
                                            <Pagination table={tableInstance} />

                                        </div>
                                    </div>
                                </div>

                            </div>



                            {/* <!-- /.container-fluid --> */}

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
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary" href="login.html">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Order;