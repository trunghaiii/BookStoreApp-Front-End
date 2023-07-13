
import { useSelector } from "react-redux";
import "./CartContent.scss"
import { Button } from "antd";

const CartContent = () => {

    const cart = useSelector(state => state.order.cart);

    return (
        <div className="cart-container">
            <div className="cart-item">
                <img src="https://picsum.photos/id/1018/1000/600/" alt="cart-img" />
                <div className="book-name">
                    Sorry! I am just A Hooker
                </div>
                <div className="book-price">
                    59$
                </div>
            </div>
            <div className="cart-item">
                <img src="https://picsum.photos/id/1018/1000/600/" alt="cart-img" />
                <div className="book-name">
                    Sorry! I am just A Hooker
                </div>
                <div className="book-price">
                    59$
                </div>
            </div>
            <Button type="primary">View Shopping Cart</Button>
        </div>
    )
}

export default CartContent;