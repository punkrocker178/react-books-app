import React from "react";
import { useSelector } from "react-redux";
import { getBookById } from "../../selectors/selectors";
import { RootState } from "../../store/store";
import { Book } from "../BookList/BookList";
import bookIcon from '../../assets/images/open-book.png';

export const BookDetail = (props: any) => {
	const id = props.bookId;
	const selectBook = (state: RootState) => getBookById(state, id);
	const bookDetail: Book = useSelector(selectBook);

	return (<div>
		<p>{bookDetail.volumeInfo['title']}</p>
		<img
			className={`img-fluid ${!bookDetail.volumeInfo['imageLinks'] ? 'bookIcon' : ''}`}
			src={bookDetail.volumeInfo['imageLinks'] ? bookDetail.volumeInfo['imageLinks']['thumbnail'] : bookIcon}></img>
	</div>);
}

export default BookDetail;