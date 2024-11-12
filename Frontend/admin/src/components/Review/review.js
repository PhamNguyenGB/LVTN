import { useEffect, useState } from "react";
import Navigation from '../Navigation/Navigation';
import numeral from 'numeral';
import { fetAllReview, repComment } from "../../api/reviewAPIs";
import FilterCol from '../Filter/FilterCol';
import { FaSort, FaSortAmountDown, FaSortAmountDownAlt, FaReply } from "react-icons/fa";
import Pagination from '../Pagination/Pagination';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import moment from "moment";
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
        accessorKey: 'Product',
        header: 'Hình ảnh',
        cell: (props) => {
            const data = props.getValue().images;
            const imageArr = JSON.parse(data);
            return (
                <img src={imageArr[[0]]} alt="Product" style={{ width: '100px', height: 'auto', marginRight: '10px' }} />

            )

        },
        // <img src={props.getValue()} alt="Product" style={{ width: '100px', height: 'auto' }} />
        enableSorting: false,
        searchHidden: true,

    },
    {
        accessorKey: 'Product',
        header: 'Thương hiệu',
        cell: (props) => <p>{props.getValue().brand}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'star',
        header: 'Số sao',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'Comment',
        header: 'Lời đánh giá',
        cell: (props) => <p className='text-center'>{props.getValue().content}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'User',
        header: 'Người đánh giá',
        cell: (props) => <p className='text-center'>{props.getValue().email}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'Rep_Comment',
        header: 'Trả lời',
        cell: (props) => <p>{props.getValue()?.note}</p>,
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

const Review = () => {

    const [data, setData] = useState('');
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [note, setNote] = useState('Cảm ơn bạn đã đánh giá tốt sản phẩm ạ');
    const [reviewId, setReviewId] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setShow(true);
        setReviewId(item.id);

    }

    const getAllPoint = async () => {
        try {
            await fetAllReview().then((res) => {
                if (res.status === 0) {
                    setData(res.data);
                }
            });
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getAllPoint();
    }, []);

    const repCommentUser = async () => {
        const request = await repComment({ note, reviewId });
        if (request.status === 0)
            toast.success(request.mess);
        getAllPoint();
        setShow(false);
    }

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
                                <h1 className="h3 mb-2 text-gray-800">QUẢN LÍ ĐÁNH GIÁ</h1>

                                {/* <!-- DataTales Example --> */}
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Điểm thưởng</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            {/* style={{ width: tableInstance.getTotalSize() }} */}
                                            <table className="table table-bordered" id="dataTable" cellSpacing="0">
                                                <thead>
                                                    {tableInstance.getHeaderGroups().map(headerGroup => (
                                                        <tr key={`1-${headerGroup.id}`}>
                                                            {headerGroup.headers.map(header => (
                                                                <th style={{ width: header.getSize() }} key={`2-${header.id}`}>
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
                                                        <tr key={`3-${headerGroup.id}`}>
                                                            {headerGroup.headers.map(header => (
                                                                <th key={`4-${header.id}`}>
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
                                                                            <button disabled={row.original.repCommentId !== null ? true : false} className=" btn btn-success ml-5" onClick={() => handleShow(row.original)}>
                                                                                <FaReply />
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

            <Modal size="md" show={show} className='modal-user' onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span></span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-inputs'>
                        <div className='input-box'>
                            <label>Trả lời đánh giá:</label>
                            <textarea
                                className="form-control form-control-user input-field"
                                style={{ minHeight: '200px' }}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            >

                            </textarea>

                        </div>
                    </div>

                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary">
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={repCommentUser}>
                        Trả lời
                    </Button>
                </Modal.Footer>
            </Modal >
        </>

    );
}

export default Review;
