import React, { useState } from 'react';
// import './index.css';
import { Button, Modal, Form, Input, Upload, notification, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { postCreateUser } from "../../../services/api"

interface IProps {
    showCreateUser: boolean;
    setShowCreateUser: any
}


const CreateNewUserModal = (props: IProps) => {

    const [form] = Form.useForm();

    const { showCreateUser, setShowCreateUser } = props

    const showModal = () => {
        setShowCreateUser(true);
    };

    const handleCancel = () => {
        form.resetFields()
        setShowCreateUser(false);
    };

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const { name, password, email, phone, imageFile } = values

        let response = await postCreateUser(name, password, email, phone, imageFile.file.originFileObj)
        if (response && response.errorCode === 0) {
            message.success(response.errorMessage)
            handleCancel()
        } else {
            notification.error({
                message: `Notification`,
                description: response.errorMessage,
                duration: 5
            });
        }


    };
    return (
        <Modal title="Create A New User"
            open={showCreateUser}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancell
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={false}
                    onClick={() => form.submit()}>
                    Create
                </Button>,
            ]}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the Name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input the Password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input the Email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input the Phone Number!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Avatar Upload" name="imageFile">
                    <Upload listType="picture-card" maxCount={1}>
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}
            </Form>
        </Modal>
    )
}

export default CreateNewUserModal;