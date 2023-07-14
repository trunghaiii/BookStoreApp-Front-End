
import { useSelector } from "react-redux";
import "./CartContent.scss"
import { Button } from "antd";

const CartContent = () => {

    const cart = useSelector(state => state.order.cart);

    return (
        <div className="cart-container">

            {cart && cart.length > 0

                ?
                cart.map((order: any) => {
                    return (
                        <div className="cart-item">
                            <img src={order.detail.slider[0]} alt="cart-img" />
                            <div className="book-name">
                                {`${order.detail.bookName}(${order.quantity})`}
                            </div>
                            <div className="book-price">
                                {order.detail.price * order.quantity}$
                            </div>
                        </div>
                    )
                })
                :
                <div>Your cart is Empty</div>
            }


            <Button type="primary">View Shopping Cart</Button>
        </div>
    )
}

export default CartContent;