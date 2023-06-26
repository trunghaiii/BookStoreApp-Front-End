
import './BookSearch.scss';
import { Button, Form, Input } from "antd"

const BookSearch = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };


    return (
        <div className="book-search">
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                //wrapperCol={{ span: 24 }}
                // style={{ width: "1000px" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className='search-input-group'>
                    <Form.Item
                        className='search-input'
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the book name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className='search-input'
                        label="Author"
                        name="author"
                        rules={[{ required: true, message: 'Please input the author!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className='search-input'
                        label="Genre"
                        name="genre"
                        rules={[{ required: true, message: 'Please input the Genre!' }]}
                    >
                        <Input />
                    </Form.Item>
                </div>

                <div className='search-button-group'>
                    <Form.Item className='search-button'>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button style={{ marginLeft: "5px" }} htmlType="submit">
                            Reload
                        </Button>
                    </Form.Item>
                </div>

            </Form>
        </div>
    )
}

export default BookSearch;