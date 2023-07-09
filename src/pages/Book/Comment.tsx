import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import './Comment.scss';
import { Modal, Rate, Button, Form, Input, message, notification } from 'antd';
import { getComment, postComment, deleteComment } from "../../services/api"

interface IProps {
    showComment: boolean;
    setShowComment: any;
    bookId: string;
}

const { TextArea } = Input;

const Comment = (props: IProps) => {

    const account = useSelector((state) => state.account)
    const [form] = Form.useForm();

    const { showComment, setShowComment, bookId } = props

    const [commentDetail, setCommentDetail] = useState([])

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        let content: string = ""
        let rate: number = 1
        if (values.comment) content = values.comment;
        if (values.rate) rate = values.rate;
        let response = await postComment(bookId, account.user.id, content, rate)

        if (response && response.errorCode === 0) {
            form.resetFields()
            fetchCommentDetail()
            message.success(response.errorMessage)
        } else {
            notification.error({
                message: `Notification`,
                description: response.errorMessage,
                duration: 5
            });
        }

    };

    const handleCancel = () => {
        setShowComment(false);
    };

    const handleDeleteComment = async (commentID) => {
        let response = await deleteComment(commentID, bookId)

        if (response && response.errorCode === 0) {
            fetchCommentDetail()
            message.success(response.errorMessage)
        } else {
            notification.error({
                message: `Notification`,
                description: response.errorMessage,
                duration: 5
            });
        }

    }

    const fetchCommentDetail = async () => {
        let response = await getComment(bookId)

        if (response && response.errorCode === 0) {
            setCommentDetail(response.data)
        }

    }

    useEffect(() => {
        fetchCommentDetail()
    }, [bookId])

    // console.log("commentDetail", commentDetail);
    // console.log(account.user.id);

    //console.log("account", account);

    return (
        <Modal
            title="Basic Modal"
            width={"70%"}
            open={showComment}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Close
                </Button>
            ]}
        >

            <div className='comment-container'>

                {commentDetail && commentDetail.map((comment) => {
                    return (
                        <div className='comment-content'>
                            <div className='user-info'>
                                <img src={comment.ownerAvatar} alt="" />
                                <span>{comment.ownerName}</span>
                                <div className='star-rate'><Rate defaultValue={comment.rate} /></div>
                            </div>
                            <div className='content'>
                                {comment.content}
                            </div>

                            {account.user.id === comment.ownerId
                                ?
                                <Button
                                    onClick={() => handleDeleteComment(comment.commentId)}
                                    size='small'
                                    type="primary"
                                    danger>
                                    Delete
                                </Button>
                                :
                                <div></div>
                            }


                        </div>
                    )
                })}

                {account && account.isAuthenticated === true
                    ?
                    <div className='comment-form'>
                        <Form
                            form={form}
                            name="basic"
                            wrapperCol={{ span: 24 }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="rate"
                            >
                                <Rate />
                            </Form.Item>

                            <Form.Item
                                name="comment"
                            >
                                <TextArea placeholder='Write some comment' rows={4} />
                            </Form.Item>


                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    :
                    <div></div>
                }

            </div>
        </Modal>
    )
}

export default Comment; 