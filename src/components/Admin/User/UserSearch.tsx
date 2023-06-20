import React from 'react';
import './UserSearch.scss';
import { Button, Checkbox, Form, Input } from 'antd';

const UserSearch = (props: any) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        let { name, email, phone } = values;
        if (!name) name = ""
        if (!email) email = ""
        if (!phone) phone = ""

        let query = `&name=${name}&email=${email}&phone=${phone}`

        props.handleSearch(query)


    };

    const handleClear = () => {
        form.resetFields();
        props.handleSearch("")
    }
    return (
        <div className='user-search-container'>
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                // wrapperCol={{ span: 16 }}
                // style={{ maxWidth: 2500 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <div className='user-search-input-group'>
                    <Form.Item
                        className='user-search-input'
                        label="Name"
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='user-search-input'
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='user-search-input'
                        label="Phone"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>

                </div>


                <div className='user-search-button-group'>
                    <div>
                        <Form.Item >
                            <Button className='btn-search' type="primary" htmlType="submit" >
                                Search
                            </Button>
                            <Button onClick={() => handleClear()} className='btn-clear' >
                                Clear
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default UserSearch;