
import './BookSearch.scss';
import { Button, Form, Input } from "antd"

const BookSearch = (props: any) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);

        let { name, author, genre } = values;
        if (!name) name = ""
        if (!author) author = ""
        if (!genre) genre = ""

        let query = `&name=${name}&author=${author}&genre=${genre}`

        props.handleSearch(query)
    };

    const handleClear = () => {
        form.resetFields();
        props.handleSearch("")
    }
    return (
        <div className="book-search">
            <Form
                form={form}
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
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className='search-input'
                        label="Author"
                        name="author"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className='search-input'
                        label="Genre"
                        name="genre"
                    >
                        <Input />
                    </Form.Item>
                </div>

                <div className='search-button-group'>
                    <Form.Item className='search-button'>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button onClick={() => handleClear()} style={{ marginLeft: "5px" }} htmlType="submit">
                            Reload
                        </Button>
                    </Form.Item>
                </div>

            </Form>
        </div>
    )
}

export default BookSearch;