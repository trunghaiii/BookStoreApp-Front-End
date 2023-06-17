import React from 'react';
import './UserSearch.scss';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};


const UserSearch = () => {
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
            >
                <div className='user-search-input-group'>
                    <Form.Item
                        className='user-search-input'
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='user-search-input'
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='user-search-input'
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input phone number!' }]}
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
                            <Button className='btn-clear' htmlType="submit" >
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