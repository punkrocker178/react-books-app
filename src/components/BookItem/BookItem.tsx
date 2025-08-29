import React from 'react';
import styles from './BookItem.module.css';
import bookIcon from '../../assets/images/open-book.png';
import { Book } from '../BookList/BookList';
import { setId } from '../../features/books/bookReducer';
import { useAppDispatch } from '../../hooks/hooks';

function BookItem(props: any) {
	const dispatch = useAppDispatch();
	
	const viewDetail = (event: any) => {
		dispatch(setId(book.id));
	};

	const book: Book = props.book;
	return <div onClick={viewDetail} className={`${styles['book-container']}`}>
		<h6 className={`${styles['text']} ${styles['truncate-height']}`}>{book.volumeInfo['title']}</h6>
		<div className={`crop-height ${styles['image-container']}`}>
			<img className={`img-fluid ${!book.volumeInfo['imageLinks'] ? styles['bookIcon'] : ''}`} src={book.volumeInfo['imageLinks'] ? book.volumeInfo['imageLinks']['thumbnail'] : bookIcon}></img>
		</div>
		{
			book.volumeInfo['authors'] && book.volumeInfo['authors'].length > 0 ?
				<span className={`${styles['text']} ${styles['truncate-height']}`}>{book.volumeInfo['authors'].join(', ')}</span> : null
		}

	</div>
}

export default BookItem;