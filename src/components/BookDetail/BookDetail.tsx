import { getBookById } from "../../selectors/selectors";
import { RootState } from "../../store/store";
import { Book } from "../BookList/BookList";
import bookIcon from '../../assets/images/open-book.png';
import { removeId } from "../../features/books/bookReducer";
import styles from "./BookDetail.module.css";
import leftArrow from '../../assets/images/left-arrow.png';
import starIcon from '../../assets/images/star.png';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export const BookDetail = (props: any) => {
	const dispatch = useAppDispatch();
	const id = props.bookId;
	const selectBook = (state: RootState) => getBookById(state, id);
	const bookDetail = useAppSelector<Book>(selectBook);

	const goBack = () => dispatch(removeId());

	return (<div className={styles['book-detail']}>

		<div className={styles['title-section']}>
			<button onClick={goBack} className={styles['flex-btn']}>
				<img className={styles['back-icon']} src={leftArrow}></img></button>
			<h5>{bookDetail.volumeInfo['title']}</h5>
		</div>

		<div className={styles['book-info']}>

			<div className={styles['image']}>
				<img
					className={`img-fluid ${!bookDetail.volumeInfo['imageLinks'] ? 'bookIcon' : ''}`}
					src={bookDetail.volumeInfo['imageLinks'] ? bookDetail.volumeInfo['imageLinks']['thumbnail'] : bookIcon} />
			</div>

			<div className={styles['info']}>

				<div className={styles['info-item']}>
					<h6>Categories: </h6>
					<span>
						{bookDetail.volumeInfo['categories'] ? bookDetail.volumeInfo['categories'].join(', ') : '-'}
					</span>
				</div>

				<div className={styles['info-item']}>
					<h6>Authors: </h6>
					<span>{bookDetail.volumeInfo['authors'] ? bookDetail.volumeInfo['authors'].join(', ') : '-'}</span>
				</div>

				<div className={styles['info-item']}>
					<h6>Rating: </h6>
					<span className={styles['ratings']}>
						{bookDetail.volumeInfo['averageRating'] ? bookDetail.volumeInfo['averageRating'] : '-'}
						<img className={styles['star-icon']} src={starIcon}></img>
						</span>
				</div>

				<div className={styles['info-item']}>
					<h6>Published Date: </h6>
					<span>{bookDetail.volumeInfo['publishedDate'] ? bookDetail.volumeInfo['publishedDate'] : '-'}</span>
				</div>

				<div className={styles['info-item']}>
					<h6>Publisher:</h6>
					<span>{bookDetail.volumeInfo['publisher'] ? bookDetail.volumeInfo['publisher'] : '-'}</span>
				</div>
			</div>

		</div>

		{bookDetail.volumeInfo['description'] ? (<div>
			<h5>Description</h5>
			<p>{bookDetail.volumeInfo['description']}</p>
		</div>) : null}
	</div>);
}

export default BookDetail;