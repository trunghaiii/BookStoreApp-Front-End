import React, { useState, useEffect } from 'react';
// import './index.css';
import { Table, Button, Popconfirm, message, notification } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

import BookSearch from './BookSearch';
import ShowBook from './ShowBook';
import CreateBookModal from './CreateBookModal';
import UpdateBookModal from './UpdateBookModal';

import { AiOutlinePlusCircle } from 'react-icons/ai';

import { getBookPagination, deleteBook } from '../../../services/api';

interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}



const BookTable = () => {

    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(3);
    const [bookData, setBookData] = useState<[]>([]);
    const [total, setTotal] = useState<number>(0)

    const [query, setQuery] = useState<string>("")
    const [isTableLoading, setIsTableLoading] = useState<boolean>(false)

    const [showBook, setShowBook] = useState<boolean>(false)
    const [bookShowData, setBookShowData] = useState<object>({})

    const [showCreateBookModal, setShowCreateBookModal] = useState<boolean>(false)

    const [showUpdateBookModal, setShowUpdateBookModal] = useState<boolean>(false)
    const [updateData, setUpdateData] = useState<object>({})



    const columns: ColumnsType<DataType> = [
        {
            title: 'Book ID(Click id to view detail)',
            // dataIndex: '_id',
            render: (text, record, index) => {
                // console.log("recoed", record);
                return (
                    <a onClick={() => handleShowBook(record)}>{record._id}</a>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'bookName',
        },
        // {
        //     title: 'Genre',
        //     dataIndex: 'category',
        // },
        // {
        //     title: 'Author',
        //     dataIndex: 'author',
        // },
        // {
        //     title: 'Price ($)',
        //     dataIndex: 'price',
        // },
        {
            title: 'Action',
            dataIndex: '',
            render: (text, record, index) => {
                return (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Popconfirm
                            placement="leftTop"
                            title="Are you Sure to delete this Book?"
                            description=""
                            onConfirm={() => handleDeleteBook(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button size='small'>Delete</Button>
                        </Popconfirm>
                        <Button
                            size='small'
                            type='primary'
                            onClick={() => handleUpdateBook(record)}
                        >Update</Button>
                    </div>
                )
            }
        },
    ];
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination.current !== current) {
            setCurrent(pagination.current)
        }

        if (pagination.pageSize !== pageSize) {
            setCurrent(1)
            setPageSize(pagination.pageSize)
        }

    };

    const fetchBookPagination = async (filterQuerry: string) => {
        let query = `pageSize=${pageSize}&current=${current}`
        if (filterQuerry) {
            query += filterQuerry
        }

        setIsTableLoading(true)
        let response = await getBookPagination(query);
        setIsTableLoading(false)

        if (response && response.errorCode === 0) {

            setTotal(response.data.meta.total)
        }

        if (response && response.errorCode === 0) {

            setBookData(response.data.result)
        }

    }

    const handleSearch = (query: object) => {
        setQuery(query)
        fetchBookPagination(query)
    }

    const handleShowBook = (bookDataa: object) => {
        setBookShowData(bookDataa)
        setShowBook(true)
    }

    const handleCreateBook = () => {
        setShowCreateBookModal(true)
    }

    const handleUpdateBook = (bookDetail: object) => {
        setUpdateData(bookDetail)

        setShowUpdateBookModal(true)
    }

    const handleDeleteBook = async (bookDetail: any) => {
        // console.log("bookDetail", bookDetail);

        let response = await deleteBook(bookDetail._id)

        if (response && response.errorCode === 0) {
            message.success(response.errorMessage)
            fetchBookPagination("")
        } else {
            notification.error({
                message: `Notification`,
                description: response.errorMessage,
                duration: 5
            });
        }
    };


    useEffect(() => {
        //console.log("gugu");

        fetchBookPagination(query)
    }, [pageSize, current])

    const BookTableHeader = () => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }} className='book-table-header'>
                <div>
                    Book List:
                </div>
                <div>
                    <Button
                        type="primary"
                        icon={<AiOutlinePlusCircle />}
                        onClick={() => handleCreateBook()}
                    >
                        New Book
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <BookSearch handleSearch={handleSearch} />
            <Table
                columns={columns}
                dataSource={bookData}
                onChange={onChange}
                title={BookTableHeader}
                loading={isTableLoading}
                pagination={{
                    total: total,
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true
                }}
            />
            <ShowBook
                showBook={showBook}
                setShowBook={setShowBook}
                bookShowData={bookShowData}
            />
            <CreateBookModal
                showCreateBookModal={showCreateBookModal}
                setShowCreateBookModal={setShowCreateBookModal}
                fetchBookPagination={fetchBookPagination}
            />
            <UpdateBookModal
                showUpdateBookModal={showUpdateBookModal}
                setShowUpdateBookModal={setShowUpdateBookModal}
                updateData={updateData}
                fetchBookPagination={fetchBookPagination}
            />
        </div>
    )
}


export default BookTable;