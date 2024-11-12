import { useEffect, useState } from "react";
import Navigation from '../Navigation/Navigation';
import ModalEvent from './modalEvent';
import numeral from 'numeral';
import ModalDeleteEvent from './modalDeleteEvent';
import { fetAllEvents } from "../../api/eventAPIs";
import FilterCol from '../Filter/FilterCol';
import { FaSort, FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import Pagination from '../Pagination/Pagination';
import moment from 'moment';
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
        accessorKey: 'name',
        header: 'Tên sự kiện',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'description',
        header: 'Mô tả sự kiện',
        cell: (props) => <p className='text-center'>{props.getValue()}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'discount',
        header: 'Giảm giá bao nhiêu (%)',
        cell: (props) => <p className='text-center'>{props.getValue()}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'maximum',
        header: 'Tối đa',
        cell: (props) => <p className='text-center'>{formatNumber(props.getValue())}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'Levels',
        header: 'Các cấp bậc sử dụng',
        cell: (props) => <p className='text-center'>{props.getValue()?.map((item, index) => {
            return (
                <span key={`lll-${index}`}>{item.name},</span>
            )
        })}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'expiryDate',
        header: 'Thời gian hết hạn',
        cell: (props) => <p className='text-center'>{moment(props.getValue()).format('DD-MM-YYYY')}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'Staff',
        header: 'Người sửa đổi cuối cùng',
        cell: (props) => <p>{props.getValue()?.email}</p>,
        searchHidden: false,

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

const Event = () => {

    const [isShowModalEvent, setIsShowModalEvent] = useState(false);
    const [actionModalEvent, setActionModalEvent] = useState("CREATE");
    const [dataModelEvent, setDataModelEvent] = useState({});
    const [data, setData] = useState('');
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    })

    // Delete modal 
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModel, setDataModel] = useState({});

    const getAllEvents = () => {
        try {
            fetAllEvents().then((res) => {
                if (res.status === 0) {
                    setData(res.data);
                }
            });
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getAllEvents();
    }, []);

    const onHideModalEvent = async () => {
        setIsShowModalEvent(false);
        setDataModelEvent({});
        getAllEvents();
    };

    const handleUpdateEvent = (event) => {
        setActionModalEvent("UPDATE");
        setDataModelEvent(event);
        setIsShowModalEvent(true);
    };

    const handleCloseModalDelete = () => {
        setIsShowModalDelete(false);
        setDataModel({});
        getAllEvents();
    }

    const handleDeleteEvent = (event) => {
        setIsShowModalDelete(true);
        setDataModel(event);
    };

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
                                <h1 className="h3 mb-2 text-gray-800">QUẢN LÍ SỰ KIỆN</h1>
                                <div className="row">
                                    <div className="col-10"></div>
                                    <button className="col-2 m-3 btn btn-primary" style={{ width: "200px" }}
                                        onClick={() => {
                                            setIsShowModalEvent(true);
                                            setActionModalEvent("CREATE");
                                        }}
                                    >+Thêm mới sự kiện</button>
                                </div>

                                {/* <!-- DataTales Example --> */}
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Sự kiện</h6>
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
                                                                            {/* <button className=" btn btn-success ml-5" onClick={() => handleUpdateEvent(row.original)}>
                                                                                <i className="fa fa-solid fa-pencil"></i>
                                                                            </button> */}
                                                                            <button className=" btn btn-danger ml-3" onClick={() => handleDeleteEvent(row.original)}>
                                                                                <i className="fa fa-solid fa-trash"></i>
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

            {isShowModalEvent === true ?
                <>
                    <ModalEvent
                        isShowModalEvent={isShowModalEvent}
                        onHide={onHideModalEvent}
                        action={actionModalEvent}
                        dataModelEvent={dataModelEvent}
                    />
                </>
                :
                <></>
            }

            {
                isShowModalDelete === true ?
                    <>
                        <ModalDeleteEvent
                            isShowModalDelete={isShowModalDelete}
                            handleCloseModalDelete={handleCloseModalDelete}
                            dataModel={dataModel}

                        />
                    </>
                    :
                    <></>
            }

        </>

    );
}

export default Event;
