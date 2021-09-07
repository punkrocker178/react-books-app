import React from 'react';
import styles from './BookItem.module.css';
import bookIcon from '../../assets/images/open-book.png';

interface Book {
    accessInfo: any,
    etag: string,
    id: string,
    saleInfo: any,
    searchInfo: any,
    selfLink: string,
    volumeInfo: any
}

function BookItem(props: any) {
    const book: Book = props.book;
    return <div className={`${styles['book-container']}`}>
        <h6 className={`${styles['text']} ${styles['truncate-height']}`}>{book.volumeInfo['title']}</h6>
        <div className={`crop-height ${styles['image-container']}`}>
            <img className={`img-fluid ${!book.volumeInfo['imageLinks'] ? styles['bookIcon'] : ''}`} src={book.volumeInfo['imageLinks'] ? book.volumeInfo['imageLinks']['thumbnail']: bookIcon}></img>
        </div>
				{
					book.volumeInfo['authors'] && book.volumeInfo['authors'].length > 0  ?
					<span className={`${styles['text']} ${styles['truncate-height']}`}>{book.volumeInfo['authors'].join(', ')}</span> : null
				}
        
    </div>
}

export default BookItem;