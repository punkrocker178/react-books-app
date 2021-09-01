import React from 'react';
import styles from './BookItem.module.css';

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
    return <div className={styles['book-container']}>
        <h5>{book.volumeInfo['title']}</h5>
        <div className="crop-height">
            <img className="img-fluid" src={book.volumeInfo['imageLinks'] ? book.volumeInfo['imageLinks']['thumbnail']: ''}></img>
        </div>
        <span>{book.volumeInfo['subtitle']}</span>
    </div>
}

export default BookItem;