
import { useParams } from 'react-router-dom';
import "./Book.scss"
const Book = () => {

    let { bookId } = useParams();
    console.log("bookId", bookId);

    return (
        <div className='book-detail-wrapper'>
            <div className='book-detail-container'>
                <div className='image-group'>
                    image group
                </div>
                <div className='content'>
                    content
                </div>
            </div>
        </div>

    )
}

export default Book;