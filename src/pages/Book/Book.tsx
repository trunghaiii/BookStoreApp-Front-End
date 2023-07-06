
import { useParams } from 'react-router-dom';
import "./Book.scss"

import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";

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
                    content
                </div>
            </div>
        </div>

    )
}

export default Book;