
import { useEffect, useState } from "react";
import "./OrderPayment.scss"
import { InputNumber, Button, Form, Input, Checkbox, Divider } from 'antd';
import { useSelector, useDispatch } from "react-redux";
const { TextArea } = Input;
const OrderPayment = (props) => {

    const [form] = Form.useForm();
    const cart = useSelector((state) => state.order.cart)
    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const handleTotalPrice = () => {
        let result: number = 0;

        for (let i = 0; i < cart.length; i++) {

            result += (cart[i].quantity * cart[i].detail.price)
        }

        setTotalPrice(result)
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    useEffect(() => {
        // console.log("effect gg");

        handleTotalPrice()
    }, [])

    return (
        <div className="order-payment-container">
            <div className="order-list">
                {cart && cart.length > 0
                    ?
                    cart.map((bookOrder) => {
                        return (
                            <div className="order">
                                <img src={bookOrder.detail.slider[0]} alt="" />

                                <div className="book-name">
                                    {bookOrder.detail.bookName}
                                </div>
                                <div className="price">
                                    {bookOrder.detail.price}$/item
                                </div>
                                <div className="quantity-input">
                                    <InputNumber
                                        style={{ width: "60px" }}
                                        min={1}
                                        max={bookOrder.detail.quantity}
                                        value={bookOrder.quantity}
                                    />
                                </div>
                                <div className="total-price">
                                    Total: {bookOrder.quantity * bookOrder.detail.price}$
                                </div>
                            </div>
                        )
                    })
                    :
                    <div></div>
                }

            </div>
            <div className="order-payment-detail">
                <div className="customer-info">
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your Name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your Address!' }]}
                        >
                            <TextArea rows={2} />
                        </Form.Item>

                        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item> */}
                    </Form>
                </div>
                {/* <Divider /> */}
                <div className="payment-method">
                    <h5>Payment Method</h5>
                    <Checkbox checked>Pay when received order</Checkbox>
                </div>
                <Divider />
                <div className="total-amount">
                    <h4>Total Amount:</h4>
                    <span>{totalPrice}$</span>
                </div>
                {/* <Divider /> */}
                <div className="confirm-order">
                    <Button
                        onClick={() => form.submit()}
                        type="primary"
                    >Confirm Order</Button>
                </div>
            </div>
        </div>
    )
}

export default OrderPayment;