/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchBooksOverview } from '@/features/booksSlice';
import BookDetailView from '@/components/book-detail-view';
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

    const booksByAuthor = bookLists.flatMap((list) =>
        list.books.filter((book) => book.author === author)
    );

    const uniqueBooksByAuthor = Array.from(
        new Map(booksByAuthor.map((book) => [book.title, book])).values()
    );

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
        <div className="min-h-screen bg-white md:grid md:grid-cols-2">
            <div className="md:border-r">
                <div className="flex items-center gap-2 p-4 border-b">

                    <div className="flex flex-col  items-start">
                        <Link href="/authors" className="flex gap-[0.69rem] ">
                            <img src="/back.svg" alt=">" />
                            <span className="text-[#030303] font-[Neulis Sans] text-[1rem] font-normal leading-[1.5rem] py-2">{author}</span>
                        </Link>

                        <span className="text-[#A8A8A8] font-[Inter] text-[0.875rem] font-light leading-[1rem] my-3">
                            {uniqueBooksByAuthor.length} books
                        </span>
                    </div>
                </div>
                <div className="divide-y pt-5 flex flex-col justify-center items-center gap-3 mx-3">
                    {uniqueBooksByAuthor.map((book, index) => (
                        <button
                            key={`${book.primary_isbn13}-${index}`}
                            onClick={() => setSelectedBook(book)}
                            className="w-full text-left flex items-start justify-between px-4 py-6 hover:bg-gray-50 rounded-[1.25rem] border border-[#EBEBEB] bg-[rgba(242,242,235,0.50)]"
                        >
                            <div className="space-y-1 flex flex-col gap-8 w-full">
                                <h2 className="text-[#030303] font-[Neulis Sans] text-[1.25rem] font-medium leading-[1.75rem] flex justify-between ">
                                    {book.title}
                                    <img src="/vector.svg" alt=">" />
                                </h2>
                                <p className="text-[#3A5959]  font-[Inter] text-[0.875rem] font-normal leading-[1.375rem]">
                                    Published: {publishedDate}
                                </p>
                            </div>

                        </button>
                    ))}
                </div>
            </div>

            <div className="hidden md:block">
                {selectedBook ? (
                    <BookDetailView book={selectedBook} publishedDate={formattedDate} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Please start by selecting a book
                    </div>
                )}
            </div>
        </div>
    );
}
