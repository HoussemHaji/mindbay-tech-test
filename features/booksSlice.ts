import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBooksOverview } from '@/core/api/nytBooks';
import { BookList } from '@/types/books';

interface BooksState {
  bookLists: BookList[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  publishedDate: string | null;  // Added publishedDate to the state
}

const initialState: BooksState = {
  bookLists: [],
  status: 'idle',
  error: null,
  publishedDate: null,
};

export const fetchBooksOverview = createAsyncThunk(
  'books/fetchOverview',
  async (publishedDate?: string) => {
    const response = await getBooksOverview(publishedDate); 
    return {
      lists: response.results.lists,
      publishedDate: response.results.published_date, 
    };
  }
);

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
        state.bookLists = action.payload.lists;
        state.publishedDate = action.payload.publishedDate; 
      })
      .addCase(fetchBooksOverview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch books';
      });
  },
});

export default booksSlice.reducer;
