
import React, { useState } from 'react';
// import './index.css';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, InputNumber, Select, Upload } from 'antd';

interface Iprops {
    showCreateBookModal: boolean;
    setShowCreateBookModal: any;
}

const CreateBookModal = (props: Iprops) => {
    const [form] = Form.useForm();

    const { showCreateBookModal, setShowCreateBookModal } = props;

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const handleOk = () => {
        form.submit()
        setShowCreateBookModal(false);
    };

    const handleCancel = () => {
        setShowCreateBookModal(false);
    };

    return (
        <Modal title="Create a New Book" open={showCreateBookModal} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Book Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input Book Name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Author"
                    name="author"
                    rules={[{ required: true, message: 'Please input Author!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input Price!' }]}
                >
                    <InputNumber addonAfter="$" min={1} max={100000} />
                </Form.Item>

                <Form.Item
                    label="Genre"
                    name="genre"
                    rules={[{ required: true, message: 'Please input Genre!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: 'Arts',
                                label: 'Arts',
                            },
                            {
                                value: 'Business',
                                label: 'Business',
                            },
                            {
                                value: 'Teen',
                                label: 'Teen',
                            },
                            {
                                value: 'Cooking',
                                label: 'Cooking',
                            },
                            {
                                value: 'Entertainment',
                                label: 'Entertainment',
                            },
                            {
                                value: 'History',
                                label: 'History',
                            },
                            {
                                value: 'Music',
                                label: 'Music',
                            },
                            {
                                value: 'Sports',
                                label: 'Sports',
                            },
                            {
                                value: 'Travelling',
                                label: 'Travelling',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[{ required: true, message: 'Please input Quantity!' }]}
                >
                    <InputNumber min={1} max={100000} />
                </Form.Item>
                <Form.Item
                    label="Sold"
                    name="sold"
                    rules={[{ required: true, message: 'Please input Sold number!' }]}
                >
                    <InputNumber min={1} max={100000} />
                </Form.Item>

                <Form.Item label="ThumbNail Images" name="bookImageFile">
                    <Upload maxCount={1} listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item label="Slider Images" name="bookImageFileList">
                    <Upload listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default CreateBookModal