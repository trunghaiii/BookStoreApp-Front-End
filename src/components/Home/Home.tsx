import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import './Home.scss';

import { AiOutlineReload, AiOutlineFilter } from 'react-icons/ai';

import { useNavigate } from "react-router-dom";

import {
    Col, Row, Checkbox, Divider,
    InputNumber, Button, Tabs, Card, Pagination, Form
} from 'antd';

import type { TabsProps } from 'antd';

import { getHomeBookPagination } from '../../services/api';
import FilterDrawer from './FilterDrawer';

const Home = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false)

    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(4)
    const [total, setTotal] = useState<number>()
    const [bookData, setBookData] = useState([])

    const [query, setQuery] = useState<string>("")
    const [queryPrice, setQueryPrice] = useState<string>("")

    const searchBar = useSelector((state) => state.searchbar)


    const genreOptions = ['Arts', 'Business', 'Teen', 'Cooking', "Entertainment",
        "History", "Music", "Sports", "Travelling"];

    const onFinish = (values: any) => {
        console.log('Success:', values);
        if (values.rangefrom || values.rangeto) {
            let queryInput = `&fromPrice=${values.rangefrom || ''}&toPrice=${values.rangeto || ''}`
            setQueryPrice(queryInput)

        }
    };

    const handleFilter = (changedValues: any, allValues: any) => {
        // console.log("changedValues", changedValues);
        console.log("allValues", allValues);
        if (allValues.checkboxFilter) {
            let queryInput = `&genreList=${allValues.checkboxFilter.join(",")}`
            setQuery(queryInput)

        }


    }

    const handlePaginationChange = (page: any, pageSize: any) => {
        if (page !== current) setCurrent(page)
        if (pageSize !== pageSize) setPageSize(pageSize)


    }

    const handleReload = () => {
        form.resetFields();
        setQuery("")
        setQueryPrice("")
    }

    const handleShowBookPage = (book: any) => {
        //console.log("book detai", book);
        navigate(`/book/${book._id}`)

    }

    const fetchBookPagination = async (current, pageSize) => {

        //console.log(searchBar.searchText);

        let fullQuery: string = `current=${current}&pageSize=${pageSize}&name=${searchBar.searchText}`
        if (query) fullQuery += query;
        if (queryPrice) fullQuery += queryPrice;

        console.log("fullquerry", fullQuery);

        let response = await getHomeBookPagination(fullQuery)

        if (response && response.errorCode === 0) {
            setTotal(response.data.meta.total)
            setBookData(response.data.result)
        }

    }

    useEffect(() => {
        fetchBookPagination(current, pageSize)
    }, [current, pageSize, query, queryPrice, searchBar])


    return (
        <div className="homepage-container">
            <Row style={{ height: "100%" }} gutter={[20, 20]}>
                <Col md={4} sm={0} xs={0}>
                    <div className="homepage-leftside">
                        <div className='header'>
                            <div style={{ fontWeight: "600" }}>Search Filter</div>
                            <div onClick={() => handleReload()} style={{ fontSize: "20px", cursor: "pointer" }}>
                                <AiOutlineReload />
                            </div>
                        </div>
                        <Form
                            form={form}
                            name="basic"
                            autoComplete="off"
                            onFinish={onFinish}
                            onValuesChange={(changedValues, allValues) => handleFilter(changedValues, allValues)}
                        >

                            <div className='checkbox-filter'>
                                <p style={{ fontWeight: "600" }}>Genre List</p>
                                <Form.Item

                                    name="checkboxFilter"
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

                                        name="rangefrom"
                                    ><InputNumber placeholder='from' min={1} max={100000} /></Form.Item>
                                    <div>-</div>
                                    <Form.Item

                                        name="rangeto"
                                    ><InputNumber placeholder='to' min={1} max={100000} /></Form.Item>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                    <Button onClick={() => form.submit()} type='primary'>Apply</Button>
                                </div>
                            </div>
                        </Form>


                    </div>
                </Col>
                <Col md={0} sm={4} xs={4}>
                    <span
                        onClick={() => setShowFilterDrawer(true)}
                        style={{ fontSize: "30px", color: "blue" }}>
                        <AiOutlineFilter /></span>
                </Col>
                <Col md={20} sm={24} xs={24}>
                    <div className="homepage-rightside">
                        <div className='book-list'>
                            {bookData && bookData.length !== 0

                                ?
                                bookData.map((book) => {
                                    return (
                                        <Card onClick={() => handleShowBookPage(book)} style={{ width: 200, height: 250 }}>
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
                <FilterDrawer
                    showFilterDrawer={showFilterDrawer}
                    setShowFilterDrawer={setShowFilterDrawer}
                    handleReload={handleReload}
                    onFinish={onFinish}
                    handleFilter={handleFilter}
                    genreOptions={genreOptions}
                />
            </Row>
        </div>
    )
}

export default Home