import { useEffect, useState } from 'react';
import './Home.scss';

import { AiOutlineReload } from 'react-icons/Ai';

import {
    Col, Row, Checkbox, Divider,
    InputNumber, Button, Tabs, Card, Pagination, Form
} from 'antd';

import type { TabsProps } from 'antd';

import { getBookPagination } from '../../services/api';

const Home = () => {

    const [form] = Form.useForm();

    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(4)
    const [total, setTotal] = useState<number>()
    const [bookData, setBookData] = useState([])



    const genreOptions = ['Arts', 'Business', 'Teen', 'Cooking', "Entertainment",
        "History", "Music", "Sports", "Travelling"];

    const handleFilter = (changedValues: any, allValues: any) => {
        // console.log("changedValues", changedValues);
        console.log("allValues", allValues);

    }

    const handlePaginationChange = (page: any, pageSize: any) => {
        if (page !== current) setCurrent(page)
        if (pageSize !== pageSize) setPageSize(pageSize)


    }

    const fetchBookPagination = async (current, pageSize) => {

        let response = await getBookPagination(`current=${current}&pageSize=${pageSize}`)

        if (response && response.errorCode === 0) {
            setTotal(response.data.meta.total)
            setBookData(response.data.result)
        }

    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Popular`,
            children: <></>,
        },
        {
            key: '2',
            label: `New`,
            children: <></>,
        },
        {
            key: '3',
            label: `Cheap to Expensive`,
            children: <></>,
        },
        {
            key: '4',
            label: `Expensive to Cheap`,
            children: <></>,
        },
    ];

    useEffect(() => {
        fetchBookPagination(current, pageSize)
    }, [current, pageSize])


    return (
        <div className="homepage-container">
            <Row style={{ height: "100%" }} gutter={[20, 20]}>
                <Col md={4} sm={0} xs={0}>
                    <div className="homepage-leftside">
                        <div className='header'>
                            <div style={{ fontWeight: "600" }}>Search Filter</div>
                            <div onClick={() => form.resetFields()} style={{ fontSize: "20px", cursor: "pointer" }}>
                                <AiOutlineReload />
                            </div>
                        </div>
                        <Form
                            form={form}
                            name="basic"
                            autoComplete="off"
                            onValuesChange={(changedValues, allValues) => handleFilter(changedValues, allValues)}
                        >

                            <div className='checkbox-filter'>
                                <p style={{ fontWeight: "600" }}>Genre List</p>
                                <Form.Item

                                    name="checkbox-filter"
                                >
                                    <Checkbox.Group
                                        style={{ display: "flex", flexDirection: "column", gap: "5px", marginLeft: "5px" }}
                                        options={genreOptions}
                                    />
                                </Form.Item>
                            </div>
                            <Divider />
                            <div className='range-filter'>
                                <p style={{ fontWeight: "600" }}>Price Range</p>
                                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                                    <Form.Item

                                        name="range-from"
                                    ><InputNumber placeholder='from' min={1} max={100000} /></Form.Item>
                                    <div>-</div>
                                    <Form.Item

                                        name="range-to"
                                    ><InputNumber placeholder='to' min={1} max={100000} /></Form.Item>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                    <Button type='primary'>Apply</Button>
                                </div>
                            </div>
                        </Form>


                    </div>
                </Col>
                <Col md={20} sm={24} xs={24}>
                    <div className="homepage-rightside">
                        <div className='filter'>
                            <Tabs defaultActiveKey="1" items={items} />
                        </div>
                        <div className='book-list'>
                            {bookData && bookData.length !== 0

                                ?
                                bookData.map((book) => {
                                    return (
                                        <Card style={{ width: 200, height: 250 }}>
                                            <div>
                                                <img
                                                    style={{ width: "100%", height: "150px" }}
                                                    src={book.slider[0]}
                                                    alt="book-image" />
                                            </div>
                                            <div>{book.bookName}</div>
                                            <div>{book.price} $</div>
                                        </Card>
                                    )
                                })

                                :
                                <div>No data</div>
                            }


                        </div>
                        <div className='pagination'>
                            <Pagination
                                current={current}
                                pageSize={pageSize}
                                total={total}
                                onChange={(page, pageSize) => handlePaginationChange(page, pageSize)}
                            />
                        </div>

                    </div>
                </Col>

            </Row>
        </div>
    )
}

export default Home