/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchBooksOverview } from '@/features/booksSlice';
import BookDetailView from '@/components/book/book-detail-view';
import AuthorHeader from '@/components/author/auther-header';
import { getBooksByAuthor } from '@/lib/utils';
import { Book } from '@/types/books';
import useMediaQuery from '@/features/hooks/useMediaQuery';

export default function AuthorDetailPage() {
    const params = useParams();
    const router = useRouter();
    const author = decodeURIComponent((params.author as string) || 'Unknown Author');
    const dispatch = useDispatch<AppDispatch>();
    const { bookLists, status, publishedDate } = useSelector((state: RootState) => state.books);
    const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        if (bookLists.length === 0 && status !== 'loading') {
            dispatch(fetchBooksOverview());
        }
    }, [bookLists, status, dispatch]);

    const uniqueBooksByAuthor = getBooksByAuthor(bookLists, author);

    if (status === 'loading' && bookLists.length === 0) {
        return (
            <div className="flex-center h-screen">
                <p className="text-gray-500">Loading books...</p>
            </div>
        );
    }

    if (uniqueBooksByAuthor.length === 0) {
        return (
            <div className="flex-center h-screen">
                <p className="text-gray-500">No books found for {author}.</p>
            </div>
        );
    }

    const formattedDate = publishedDate ? new Date(publishedDate).toLocaleDateString() : 'No date available';

    const handleBookClick = (book: Book) => {
        if (isMobile) {
            router.push(`/books/${book.primary_isbn13}`);
        } else {
            setSelectedBook(book);
        }
    };

    return (
        <div className="md:pb-24">
            <div className="min-h-screen bg-white md:grid md:grid-cols-2 md:px-[5.62rem]">
                <div className="md:border-r md:w-[24.5625rem]">
                    <div className="pt-5 flex flex-col justify-center items-center gap-3 px-5 mt-6 md:py-5 md:pr-5">
                        <AuthorHeader author={author} bookCount={uniqueBooksByAuthor.length} />
                        {uniqueBooksByAuthor.map((book, index) => (
                            <button
                                key={`${book.primary_isbn13}-${index}`}
                                onClick={() => handleBookClick(book)}
                                className="btn"
                            >
                                <div className="author-card">
                                    <h2 className="header-title flex justify-between">
                                        {book.title}
                                        <img src="/vector.svg" alt=">" />
                                    </h2>
                                    <p className="header-subtitle">Published: {publishedDate}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Panel for Larger Screens */}
                <div className="hidden md:flex md:flex-col md:justify-center md:items-start px-24">
                    {selectedBook ? (
                        <BookDetailView book={selectedBook} publishedDate={formattedDate} />
                    ) : (
                        <div className="flex-center text-[#7E7E7E] font-[Inter]">
                            Please start by selecting a book
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
