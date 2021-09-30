import { BookVolumes, Book } from "../components/BookList/BookList";

export const getBooksState = (store: any): BookVolumes => store.books;
export const getBookList = (store: any) => getBooksState(store) ? getBooksState(store).items : [];
export const getBookById = (store: any, id: string) =>
	getBooksState(store) ? { ...getBooksState(store).items.find((book: Book) => book.id === id) } : {};

export const getBooks = (store: any) => {
	getBookList(store).map((id: string) => getBookById(store, id));
};

export const getId = (store: any) => getBooksState(store).bookId;