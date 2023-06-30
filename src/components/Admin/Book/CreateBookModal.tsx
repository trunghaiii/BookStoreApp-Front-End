
import React, { useState } from 'react';
import './CreateBookModal.scss';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, InputNumber, Select, Upload, message, notification } from 'antd';

import { postCreateBook, postUploadBookImage } from "../../../services/api"

interface Iprops {
    showCreateBookModal: boolean;
    setShowCreateBookModal: any;
    fetchBookPagination: any
}

const CreateBookModal = (props: Iprops) => {
    const [form] = Form.useForm();

    const { showCreateBookModal, setShowCreateBookModal, fetchBookPagination } = props;

    const [isCreate, setIsCreate] = useState<boolean>(false)

    const onFinish = async (values: any) => {
        setIsCreate(true)
        console.log('Success:', values);
        const { name, author, genre, price, quantity, sold, bookImageFileList } = values;

        //1. build imageFiles array:
        let imageFiles: any = []
        if (bookImageFileList && bookImageFileList.fileList) {
            bookImageFileList.fileList.forEach((file: any) => {
                imageFiles.push(file.originFileObj)
            })
        }

        // 2. upload all image to cloudinary and get all coresponding image urls
        let imageUrlArray: string[] = []
        for (let i = 0; i < imageFiles.length; i++) {
            let response = await postUploadBookImage(imageFiles[i])
            console.log(response);

            if (response && response.errorCode === 0) {
                imageUrlArray.push(response.data)
            } else {
                return;
            }
        }


        // console.log(imageUrlArray);

        // 3. call api to upload data to database

        let response = await postCreateBook(name, author, genre, price, quantity, sold, imageUrlArray);
        setIsCreate(false)
        if (response && response.errorCode === 0) {
            message.success(response.errorMessage)
            handleCancel()
            fetchBookPagination("")
            // fetchUserPagination("")
        } else {
            notification.error({
                message: `Notification`,
                description: response.errorMessage,
                duration: 5
            });
        }

    };

    const handleCancel = () => {
        setShowCreateBookModal(false);
        form.resetFields()
    };

    return (
        <div className='create-book-modal-container'>
            <Modal
                width="50%"
                className='create-book-modal'
                title="Create a New Book"
                open={showCreateBookModal}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancell
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={isCreate}
                        onClick={() => form.submit()}>
                        Create
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    // style={{ maxWidth: 900 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <div className='text-input-group'>
                        <Form.Item
                            className='text-input'
                            label="Book Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input Book Name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className='text-input'
                            label="Author"
                            name="author"
                            rules={[{ required: true, message: 'Please input Author!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div className='number-input-group'>
                        <Form.Item
                            className='number-input'
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input Price!' }]}
                        >
                            <InputNumber addonAfter="$" min={1} max={100000} />
                        </Form.Item>

                        <Form.Item
                            className='number-input'
                            label="Genre"
                            name="genre"
                            rules={[{ required: true, message: 'Please input Genre!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a genre"
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
                            className='number-input'
                            label="Quantity"
                            name="quantity"
                            rules={[{ required: true, message: 'Please input Quantity!' }]}
                        >
                            <InputNumber style={{ width: "100%" }} min={1} max={100000} />
                        </Form.Item>
                        <Form.Item
                            className='number-input'
                            label="Sold"
                            name="sold"
                            rules={[{ required: true, message: 'Please input Sold number!' }]}
                        >
                            <InputNumber style={{ width: "100%" }} min={1} max={100000} />
                        </Form.Item>
                    </div>

                    <div className='upload-input-group'>
                        <Form.Item label="Upload Images" name="bookImageFileList">
                            <Upload listType="picture-card">
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </div>

                </Form>
            </Modal>
        </div>
    )
}

export default CreateBookModal