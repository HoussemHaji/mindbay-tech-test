import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBooksOverview } from '@/core/api/nytBooks';
import { BookList } from '@/types/books';

interface BooksState {
  bookLists: BookList[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BooksState = {
  bookLists: [],
  status: 'idle',
  error: null,
};

export const fetchBooksOverview = createAsyncThunk('books/fetchOverview', async (publishedDate?: string) => {
  const response = await getBooksOverview(publishedDate);
  return response.results.lists;
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksOverview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooksOverview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookLists = action.payload;
      })
      .addCase(fetchBooksOverview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch books';
      });
  },
});

export default booksSlice.reducer;
