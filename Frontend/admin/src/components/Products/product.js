import { useEffect, useState } from "react";
import Navigation from '../Navigation/Navigation';
import ModalProduct from './modalProduct';
import numeral from 'numeral';
import ModalDeleteProduct from './modalDeleteProduct';
import { fetAllProducts } from '../../api/productAPI';
import './product.scss';
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
        accessorKey: 'List_Product',
        header: 'Loại',
        cell: (props) => <p>{props.getValue().name}</p>,
        searchHidden: false,
    },
    {
        accessorKey: 'images',
        header: 'Hình ảnh',
        cell: (props) => {
            const data = props.getValue();
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
        accessorKey: 'name',
        header: 'Tên sản phẩm',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'quantity',
        header: 'Số lượng',
        cell: (props) => <p className='text-center'>{props.getValue()}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'brand',
        header: 'Hãng xe',
        cell: (props) => <p className='text-center'>{props.getValue()}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'origin',
        header: 'Nhà sản xuất',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: false,

    },
    {
        accessorKey: 'price',
        header: 'Giá',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'size',
        header: 'kích cỡ',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'discount',
        header: 'Giảm giá',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: true,

    },
    {
        accessorKey: 'star',
        header: 'Đánh giá (*)',
        cell: (props) => <p>{props.getValue()}</p>,
        searchHidden: true,

    },
]

const Product = () => {

    // const dispatch = useDispatch();

    // const loading = useSelector((state) => state.products.loading);
    // const products = useSelector((state) => state.products.products);
    // const error = useSelector((state) => state.products.error);
    // const user = useSelector((state) => state.staff.staff);

    const [isShowModalProduct, setIsShowModalProduct] = useState(false);
    const [actionModalProduct, setActionModalProduct] = useState("CREATE");
    const [dataModelProduct, setDataModelProduct] = useState({});
    const [data, setData] = useState('');
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    })

    // Delete modal 
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModel, setDataModel] = useState({});

    const getAllProducts = () => {
        try {
            fetAllProducts().then((res) => {
                if (res.status === 0) {
                    setData(res.data);
                }
            });
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    const onHideModalProduct = async () => {
        setIsShowModalProduct(false);
        setDataModelProduct({});
        getAllProducts();
    };

    const handleUpdateProduct = (product) => {
        setActionModalProduct("UPDATE");
        setDataModelProduct(product);
        setIsShowModalProduct(true);
    };

    const handleCloseModalDelete = () => {
        setIsShowModalDelete(false);
        setDataModel({});
        getAllProducts();
    }

    const handleDeleteProduct = (product) => {
        setIsShowModalDelete(true);
        setDataModel(product);
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
                                <h1 className="h3 mb-2 text-gray-800">QUẢN LÍ SẢN PHẨM</h1>
                                <div className="row">
                                    <div className="col-10"></div>
                                    <button className="col-2 m-3 btn btn-primary" style={{ width: "200px" }}
                                        onClick={() => {
                                            setIsShowModalProduct(true);
                                            setActionModalProduct("CREATE");
                                        }}
                                    >+Thêm mới sản phẩm</button>
                                </div>

                                {/* <!-- DataTales Example --> */}
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Sản phẩm</h6>
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
                                                                            <button className=" btn btn-success ml-5" onClick={() => handleUpdateProduct(row.original)}>
                                                                                <i className="fa fa-solid fa-pencil"></i>
                                                                            </button>
                                                                            <button className=" btn btn-danger ml-3" onClick={() => handleDeleteProduct(row.original)}>
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

            {isShowModalProduct === true ?
                <>
                    <ModalProduct
                        isShowModalProduct={isShowModalProduct}
                        onHide={onHideModalProduct}
                        action={actionModalProduct}
                        dataModelProduct={dataModelProduct}
                    />
                </>
                :
                <></>
            }

            {
                isShowModalDelete === true ?
                    <>
                        <ModalDeleteProduct
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

export default Product;
