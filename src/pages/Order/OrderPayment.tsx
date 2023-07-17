
import "./OrderPayment.scss"
import { InputNumber, Button } from 'antd';
import { RiDeleteBin6Line } from 'react-icons/Ri';
import { useSelector, useDispatch } from "react-redux";

const OrderPayment = (props) => {

    const cart = useSelector((state) => state.order.cart)
    const dispatch = useDispatch()


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

            </div>
        </div>
    )
}

export default OrderPayment;