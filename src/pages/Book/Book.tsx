
import { useParams } from 'react-router-dom';

const Book = () => {

    let { bookId } = useParams();
    console.log("bookId", bookId);

    return (
        <div>Book</div>
    )
}

export default Book;