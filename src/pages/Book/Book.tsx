import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Book.scss"

import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";

import { InputNumber, Button, Rate } from 'antd';

import { BsCartCheck } from 'react-icons/Bs';

import { getBookDetail } from "../../services/api"

import Comment from './Comment';

const Book = () => {

    let { bookId } = useParams();
    const [bookDetailData, setBookDetailData] = useState({})
    const [imageSlider, setImageSlider] = useState([])

    const [showComment, setShowComment] = useState<boolean>(false)

    // const images = [
    //     {
    //         original: 'https://picsum.photos/id/1018/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1018/250/150/',
    //         originalHeight: 300
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1015/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1015/250/150/',
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1019/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1019/250/150/',
    //     },
    // ];

    const onChange = (value: number) => {
        console.log('changed', value);
    };

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
                        Quantity: <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                    </div>
                    <div className='button-group'>
                        <Button
                            style={{ backgroundColor: "#C9E5FF", color: "#2584DD", border: "1px solid #2584DD" }}
                            size='large' type="primary">
                            <BsCartCheck />  Add to Cart
                        </Button>
                        <Button style={{ marginLeft: "5px" }} size='large' type="primary">Buy Now</Button>
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
            />
        </div>

    )
}

export default Book;