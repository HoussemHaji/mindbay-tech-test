/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchBooksOverview } from '@/features/booksSlice';
import BookDetailView from '@/components/book/book-detail-view';
import AuthorHeader from '@/components/author/auther-header';
import { getBooksByAuthor } from '@/lib/utils';
import { Book } from '@/types/books';

export default function AuthorDetailPage() {
    const params = useParams();
    const author = decodeURIComponent((params.author as string) || 'Unknown Author');
    const dispatch = useDispatch<AppDispatch>();
    const { bookLists, status, publishedDate } = useSelector((state: RootState) => state.books);
    const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);

    useEffect(() => {
        if (bookLists.length === 0 && status !== 'loading') {
            dispatch(fetchBooksOverview());
        }
    }, [bookLists, status, dispatch]);

    const uniqueBooksByAuthor = getBooksByAuthor(bookLists, author);

    if (status === 'loading' && bookLists.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Loading books...</p>
            </div>
        );
    }

    if (uniqueBooksByAuthor.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">No books found for {author}.</p>
            </div>
        );
    }

    const formattedDate = publishedDate ? new Date(publishedDate).toLocaleDateString() : 'No date available';

    return (
        <div className='md:pb-24'>
            <div className="min-h-screen bg-white md:grid md:grid-cols-2 md:px-[5.62rem] ">
                <div className="md:border-r md:w-[24.5625rem]">
                    <div className="pt-5 flex flex-col justify-center items-center gap-3 px-5 mt-6 md:py-5 md:pr-5">
                        <AuthorHeader author={author} bookCount={uniqueBooksByAuthor.length} />
                        {uniqueBooksByAuthor.map((book, index) => (
                            <button
                                key={`${book.primary_isbn13}-${index}`}
                                onClick={() => setSelectedBook(book)}
                                className="w-full text-left flex items-start justify-between px-4 py-6 hover:bg-gray-50 rounded-[1.25rem] border border-[#EBEBEB] bg-[rgba(242,242,235,0.50)]"
                            >
                                <div className="space-y-1 flex flex-col gap-8 w-full">
                                    <h2 className="text-[#030303] font-[Inter] text-[1.25rem] font-medium leading-[1.75rem] flex justify-between ">
                                        {book.title}
                                        <img src="/vector.svg" alt=">" />
                                    </h2>
                                    <p className="text-[#3A5959] font-[Inter] text-[0.875rem] font-normal leading-[1.375rem]">
                                        Published: {publishedDate}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="hidden md:flex md:flex-col md:justify-center md:items-start px-24">
                    {selectedBook ? (
                        <BookDetailView book={selectedBook} publishedDate={formattedDate} />
                    ) : (
                        <div className="flex items-center justify-center text-[#7E7E7E] font-[Inter] ">
                            Please start by selecting a book
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
