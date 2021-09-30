import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../features/books/bookReducer';

export const store =  configureStore({
	reducer: {
		books: bookReducer
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {books: bookState}
export type AppDispatch = typeof store.dispatch;