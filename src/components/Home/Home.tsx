
import './Home.scss';

import { AiOutlineReload } from 'react-icons/Ai';

import {
    Col, Row, Checkbox, Divider,
    InputNumber, Button, Tabs, Card, Pagination, Form
} from 'antd';

import type { TabsProps } from 'antd';

const Home = () => {

    const [form] = Form.useForm();

    const genreOptions = ['Arts', 'Business', 'Teen', 'Cooking', "Entertainment",
        "History", "Music", "Sports", "Travelling"];

    const handleFilter = (changedValues: any, allValues: any) => {
        // console.log("changedValues", changedValues);
        console.log("allValues", allValues);

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
                            <Card style={{ width: 200, height: 250 }}>
                                <div>
                                    <img style={{ width: "100%", height: "150px" }} src="https://res.cloudinary.com/dbljsakpb/image/upload/v1688174013/BookStoreApp/lyux9lmifowtlsfupxip.jpg" alt="book-image" />
                                </div>
                                <div>Sorry! I am just a hooker</div>
                                <div>200 $US</div>
                            </Card>
                            <Card style={{ width: 200, height: 250 }}>
                                <div>
                                    <img style={{ width: "100%", height: "150px" }} src="https://res.cloudinary.com/dbljsakpb/image/upload/v1688174012/BookStoreApp/fblvj0lzlv3dipgzb3hu.png" alt="book-image" />
                                </div>
                                <div>Ronaldo And Messi</div>
                                <div>100 $US</div>
                            </Card>
                            <Card style={{ width: 200, height: 250 }}>
                                <div>
                                    <img style={{ width: "100%", height: "150px" }} src="https://res.cloudinary.com/dbljsakpb/image/upload/v1688174013/BookStoreApp/lyux9lmifowtlsfupxip.jpg" alt="book-image" />
                                </div>
                                <div>Sorry! I am just a hooker</div>
                                <div>200 $US</div>
                            </Card>
                            <Card style={{ width: 200, height: 250 }}>
                                <div>
                                    <img style={{ width: "100%", height: "150px" }} src="https://res.cloudinary.com/dbljsakpb/image/upload/v1688174012/BookStoreApp/fblvj0lzlv3dipgzb3hu.png" alt="book-image" />
                                </div>
                                <div>Ronaldo And Messi</div>
                                <div>100 $US</div>
                            </Card>
                            <Card style={{ width: 200, height: 250 }}>
                                <div>
                                    <img style={{ width: "100%", height: "150px" }} src="https://res.cloudinary.com/dbljsakpb/image/upload/v1688174013/BookStoreApp/lyux9lmifowtlsfupxip.jpg" alt="book-image" />
                                </div>
                                <div>Sorry! I am just a hooker</div>
                                <div>200 $US</div>
                            </Card>
                            <Card style={{ width: 200, height: 250 }}>
                                <div>
                                    <img style={{ width: "100%", height: "150px" }} src="https://res.cloudinary.com/dbljsakpb/image/upload/v1688174012/BookStoreApp/fblvj0lzlv3dipgzb3hu.png" alt="book-image" />
                                </div>
                                <div>Ronaldo And Messi</div>
                                <div>100 $US</div>
                            </Card>

                        </div>
                        <div className='pagination'>
                            <Pagination defaultCurrent={1} total={50} />
                        </div>

                    </div>
                </Col>

            </Row>
        </div>
    )
}

export default Home