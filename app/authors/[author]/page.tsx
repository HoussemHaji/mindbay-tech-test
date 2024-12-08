/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchBooksOverview } from '@/features/booksSlice';
import AuthorHeader from '@/components/author/auther-header';
import BookDetailView from '@/components/book/book-detail-view';
import { getBooksByAuthor } from '@/lib/utils';
import { Book } from '@/types/books';
import useMediaQuery from '@/features/hooks/useMediaQuery';
import BookListItem from '@/components/book/book-list-item';

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

    const handleBookClick = (book: Book) => {
        if (isMobile) {
            router.push(`/books/${book.primary_isbn13}`);
        } else {
            setSelectedBook(book);
        }
    };

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <AuthorHeader />

            <div className='flex w-full justify-start  md:px-[5.625rem] px-3  '>
                {/* Left Panel: Author and Book List */}
                <div className="md:border-r md:basis-1/3 w-full md:pt-5 md:pr-5 flex flex-col gap-8">
                    <div className='px-[1.25rem] py-[0.5rem] flex flex-col gap-1 font-[Inter] '>
                        <h1 className=" font-bold text-[#030303] text-lg ">{author}</h1>
                        <p className="text-gray-500 text-sm">Select a book to see details</p>
                    </div>
                    <div className='flex flex-col justify-center items-start gap-2'>
                        {uniqueBooksByAuthor.map((book, index) => (
                            <BookListItem
                                key={`${book.primary_isbn13}-${index}`}
                                book={book}
                                isSelected={selectedBook?.primary_isbn13 === book.primary_isbn13}
                                onClick={() => handleBookClick(book)}
                                publishedDate={publishedDate}
                            />
                        ))}
                    </div>

                </div>

                {/* Right Panel: Book Details */}
                <div className="hidden md:flex md:flex-col md:justify-center md:items-start md:px-24 basis-2/3 ">
                    {selectedBook ? (
                        <BookDetailView book={selectedBook} publishedDate={publishedDate} />
                    ) : (
                        <div className='w-full py-5  '>
                            <div className="flex-center w-full text-gray-500 bg-gray-100 rounded-3xl h-[33.75rem]">
                                Please start by selecting a book
                            </div>
                        </div>
                    )}
                </div>

            </div>


        </div>
    );
}
