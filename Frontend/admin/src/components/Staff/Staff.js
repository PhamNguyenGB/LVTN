import { useEffect, useState } from "react";
import Navigation from '../Navigation/Navigation';
import numeral from 'numeral';
import FilterCol from '../Filter/FilterCol';
import { FaSort, FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import Pagination from '../Pagination/Pagination';
import { getAllStaffs, deleteRole, resetRole } from "../../api/staffAPIs";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetAllLevels } from "../../api/levelAPIs";
import { updateLevel } from "../../api/userAPIs";
import { FaDeleteLeft } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { toast } from 'react-toastify';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';

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
        accessorKey: 'fullname',
        header: 'Họ và tên',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'email',
        header: 'email',
        cell: (props) => <p className='text-center'>{props.getValue()}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'phone',
        header: 'Số điện thoại',
        cell: (props) => <p className='text-center'>{props.getValue()}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'sex',
        header: 'Giới tính',
        cell: (props) => <p className='text-center'>{props.getValue()}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'address',
        header: 'Địa chỉ',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'birthdate',
        header: 'Ngày sinh',
        cell: (props) => <p>{moment(props.getValue()).format('DD-MM-YYYY')}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'role',
        header: 'Cấp bậc',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: false,
        enableSorting: false,
    },
    {
        accessorKey: 'createdAt',
        header: 'Ngày tạo',
        cell: (props) => <p>{moment(props.getValue()).format('DD-MM-YYYY')}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'updatedAt',
        header: 'Ngày cập nhật',
        cell: (props) => <p>{moment(props.getValue()).format('DD-MM-YYYY')}</p>,
        searchHidden: false,

    },
]

const Staff = () => {

    const [data, setData] = useState('');
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    })
    const [show, setShow] = useState(false);
    const [action, setAction] = useState('');
    const [staffId, setStaffId] = useState();
    const [level, setLevel] = useState('');
    const [upLevel, setUpLevel] = useState();
    const [idUser, setIdUser] = useState();

    const handleCloseModal = () => { setShow(false) };

    const fetchAllStaffs = () => {
        try {
            getAllStaffs().then((res) => {
                if (res.status === 0) {
                    setData(res.data);
                }
            });
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchAllStaffs();
    }, []);


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

    const formatNumber = (number) => {
        return numeral(number).format('0,0');
    }

    const handleShowModal = (id, action) => {
        setShow(true);
        setStaffId(id);
        setAction(action);
    }

    const handleDeleteRole = async () => {
        const request = await deleteRole({ staffId });
        if (request.status === 0) {
            toast.success(request.mess);
            fetchAllStaffs();
            setShow(false);
        }
    }

    const handleResetRole = async () => {
        const request = await resetRole({ staffId });
        if (request.status === 0) {
            toast.success(request.mess);
            fetchAllStaffs();
            setShow(false);
        }
    }

    const handleUpdateLevel = async () => {
        if (upLevel) {
            const data = await updateLevel({ userId: idUser, levelId: upLevel });
            if (data.status === 0)
                toast.success(data.mess);
        }
        setShow(false);
        fetchAllStaffs();
    }

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
                                <h1 className="h3 mb-2 text-gray-800">QUẢN LÍ NHÂN VIÊN</h1>

                                {/* <!-- DataTales Example --> */}
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Nhân viên</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            {/* style={{ width: tableInstance.getTotalSize() }} */}
                                            <table className="table table-bordered" id="dataTable" cellSpacing="0">
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
                                                                            <button className={row.original.role === 'staff' ? "d-none" : "btn btn-warning ml-5"} onClick={() => handleShowModal(row.original.id, 'reset')}>
                                                                                <GrPowerReset />
                                                                            </button>
                                                                            <button className={row.original.role === 'staff' ? "btn btn-danger ml-5" : "d-none"} onClick={() => handleShowModal(row.original.id, 'delete')}>
                                                                                <FaDeleteLeft />
                                                                            </button>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                        :
                                                        <>
                                                            ...isLoading
                                                        </>
                                                    }

                                                </tbody>
                                            </table>
                                            {/* <div>
                                                {tableInstance.getState().pagination.pageIndex}
                                                {tableInstance.getPageCount()}
                                            </div> */}
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
                                    <span>TOYMODEL XIN CHÀO BẠN</span>
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

            <Modal size="lg" show={show} className='modal-user' onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{action === 'delete' ? 'Xóa quyền truy cập' : 'Cấp quyền truy cập'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {action === 'delete' ? 'Bạn có chắc chắn xóa quyền truy cập nhân viên này ?' : 'Cấp quyền truy cập cho nhân viên này ?'}
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                    <Button variant="danger" className={action === 'delete' ? '' : 'd-none'} onClick={handleDeleteRole}>
                        Xóa
                    </Button>
                    <Button variant="warning" className={action === 'delete' ? 'd-none' : ''} onClick={handleResetRole}>
                        Cấp quyền
                    </Button>
                </Modal.Footer>
            </Modal >

        </>

    );
}

export default Staff;
