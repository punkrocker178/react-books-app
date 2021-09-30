import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
	name: 'book',
	initialState: {
		bookId: null,
		items: [],
		kind: '',
		totalItems: 0
	},
	reducers: {
		setBooks: (state, action: any) => {
			return {
				...state,
				...action.payload
			}
		},
		setId: (state, action: any) => {
			const id = action.payload;
			return {
				...state,
				bookId: id
			};
		}
	}
});

// Action creators are generated for each case reducer function
export const { setBooks, setId } = booksSlice.actions;
export default booksSlice.reducer;