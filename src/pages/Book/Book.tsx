
import { useParams } from 'react-router-dom';
import "./Book.scss"

import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";

import { InputNumber, Button, Rate } from 'antd';

import { BsCartCheck } from 'react-icons/Bs';


const Book = () => {

    let { bookId } = useParams();
    console.log("bookId", bookId);

    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

    const onChange = (value: number) => {
        console.log('changed', value);
    };


    return (
        <div className='book-detail-wrapper'>
            <div className='book-detail-container'>
                <div className='image-group'>
                    <ImageGallery
                        items={images}
                        autoPlay={true}
                        showPlayButton={false}

                    />
                </div>
                <div className='content'>
                    <div className='author'>Author: <span style={{ color: "#0A6DCA" }}>Hai Tran</span></div>
                    <div className='title'>Sorry! I am just a hooker</div>
                    <div className='rate-and-sold'>
                        <span className='rate'><Rate defaultValue={5} /> </span>
                        <span>Sold: 112</span>
                    </div>
                    <div className='price'>1500 $</div>
                    <div className='quantity'>
                        Quantity: <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                    </div>
                    <div className='button-group'>
                        <Button
                            style={{ backgroundColor: "#C9E5FF", color: "#2584DD", border: "1px solid #2584DD" }}
                            size='large' type="primary">
                            <BsCartCheck />  Add to Cart
                        </Button>
                        <Button style={{ marginLeft: "5px" }} size='large' type="primary">Buy Now</Button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Book;