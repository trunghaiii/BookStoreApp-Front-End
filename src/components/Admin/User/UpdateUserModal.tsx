
import React, { useState, useEffect } from 'react';
// import './index.css';
import { Button, Modal, Form, Input, Select, message, notification } from 'antd';
import { putUpdateUser } from '../../../services/api';

interface IProps {
    showUpdateUser: boolean;
    setShowUpdateUser: any;
    updateData: object;
    fetchUserPagination: any
}
const UpdateUserModal = (props: IProps) => {

    const { showUpdateUser, setShowUpdateUser, fetchUserPagination, updateData } = props
    const [isUpdated, setIsUpdated] = useState<boolean>(false)

    const { Option } = Select;

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const { _id, fullName, email, phone, role } = values

        setIsUpdated(true)
        let response = await putUpdateUser(_id, fullName, email, phone, role)
        setIsUpdated(false)

        if (response && response.errorCode === 0) {
            message.success(response.errorMessage)
            handleCancel()
            fetchUserPagination("")
        } else {
            notification.error({
                message: `Notification`,
                description: response.errorMessage,
                duration: 5
            });
        }


    };

    const handleOk = () => {
        form.submit()
        // setShowUpdateUser(false);
    };

    const handleCancel = () => {
        setShowUpdateUser(false);
    };

    useEffect(() => {
        form.setFieldsValue(updateData)
    }, [updateData])


    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal
                title="Basic Modal"
                open={showUpdateUser}
                // onOk={handleOk} 
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={isUpdated} onClick={handleOk}>
                        Update
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        hidden
                        label="id"
                        name="_id"
                        rules={[{ required: true, message: 'Please input the Name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input the Name!' }]}
                    >
                        <Input />
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
                        rules={[{ required: true, message: 'Please input the Phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a Role"
                            allowClear
                        >
                            <Option value="ADMIN">ADMIN</Option>
                            <Option value="USER">USER</Option>
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default UpdateUserModal;