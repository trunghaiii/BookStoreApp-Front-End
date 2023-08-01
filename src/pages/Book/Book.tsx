import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Book.scss"

import { useDispatch } from 'react-redux'

import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";

import { InputNumber, Button, Rate } from 'antd';

import { BsCartCheck, BsPlusLg } from 'react-icons/bs';
import { AiOutlineMinus } from 'react-icons/ai';

import { getBookDetail } from "../../services/api"

import Comment from './Comment';

import { doCartAction } from '../../redux/slices/orderSlice';

const Book = () => {

    const dispatch = useDispatch()
    let { bookId } = useParams();

    const [bookDetailData, setBookDetailData] = useState({})
    const [imageSlider, setImageSlider] = useState([])

    const [showComment, setShowComment] = useState<boolean>(false)

    const [quantity, setQuantity] = useState<number>(1)

    const handleQuantityClick = (operator: string) => {

        if (operator === "MINUS" && quantity > 1) {
            setQuantity(quantity - 1);
        } else if (operator === "PLUS" && quantity < +bookDetailData.quantity) {
            setQuantity(quantity + 1);
        }

    }

    const handleChangeQuantity = (changeQuantity: any) => {
        if (!isNaN(+changeQuantity)) {
            if (+changeQuantity > 0 && +changeQuantity <= +bookDetailData.quantity) {
                setQuantity(+changeQuantity)
            }
        }


    }

    const fetchBookDetail = async () => {
        let response = await getBookDetail(bookId)

        console.log("response ddd", response);
        if (response && response.errorCode === 0) {
            setBookDetailData(response.data)

            let images: any = []
            response.data.slider.forEach((imageUrl: any) => {
                images.push({
                    original: imageUrl,
                    thumbnail: imageUrl,
                    originalHeight: 300,
                    originalWidth: 400,
                    thumbnailHeight: 100
                })
            })

            setImageSlider(images)
        }

    }

    const handleComment = () => {
        setShowComment(true)
    }

    const handleAddCart = (quantity: any, book: any) => {
        dispatch(doCartAction({ quantity, _id: book._id, detail: book }))
    }

    useEffect(() => {
        fetchBookDetail()
    }, [bookId])

    // console.log("imageSlider", imageSlider);
    // console.log("bookDetailData", bookDetailData);

    return (
        <div className='book-detail-wrapper'>
            <div className='book-detail-container'>
                <div className='image-group'>
                    <ImageGallery
                        items={imageSlider}
                        autoPlay={true}
                        showPlayButton={false}

                    />
                </div>
                <div className='content'>
                    <div className='author'>Author: <span style={{ color: "#0A6DCA" }}>{bookDetailData.author}</span></div>
                    <div className='title'>{bookDetailData.bookName}</div>
                    <div className='rate-and-sold'>
                        <span className='rate'><Rate defaultValue={5} /> </span>
                        <span>Sold: {bookDetailData.sold}</span>
                    </div>
                    <div className='price'>{bookDetailData.price} $</div>
                    <div className='quantity'>
                        Quantity{`(${bookDetailData.quantity})`}:
                        <span className='quantity-input'>
                            <Button onClick={() => handleQuantityClick("MINUS")}><AiOutlineMinus /></Button>
                            <input onChange={(event) => handleChangeQuantity(event.target.value)} value={quantity} />
                            <Button onClick={() => handleQuantityClick("PLUS")}><BsPlusLg /></Button>
                        </span>
                    </div>
                    <div className='button-group'>
                        <Button
                            onClick={() => handleAddCart(quantity, bookDetailData)}
                            style={{ backgroundColor: "#C9E5FF", color: "#2584DD", border: "1px solid #2584DD" }}
                            size='large' type="primary">
                            <BsCartCheck />  Add to Cart
                        </Button>
                        <Button
                            style={{ marginLeft: "5px" }}
                            size='large'
                            type="primary"
                            onClick={() => handleComment()}
                        >Comments</Button>
                    </div>
                </div>
            </div>
            <Comment
                showComment={showComment}
                setShowComment={setShowComment}
                bookId={bookId}
            />
        </div>

    )
}

export default Book;