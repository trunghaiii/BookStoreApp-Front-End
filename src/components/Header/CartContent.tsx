
import { useSelector } from "react-redux";
import "./CartContent.scss"
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const CartContent = () => {

    const cart = useSelector(state => state.order.cart);
    const navigate = useNavigate();

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


            <Button onClick={() => navigate("/order")} type="primary">View Shopping Cart</Button>
        </div>
    )
}

export default CartContent;