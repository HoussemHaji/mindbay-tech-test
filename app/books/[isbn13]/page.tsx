'use client';

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import BookDetailView from '@/components/book/book-detail-view';

export default function BookDetailPage() {
    const params = useParams();
    const isbn13 = params?.isbn13 as string;

    const { bookLists, publishedDate } = useSelector((state: RootState) => state.books);

    const allBooks = bookLists.flatMap((bookList) => bookList.books);

    const book = allBooks.find((b) => b.primary_isbn13 === isbn13);

    if (!book) {
        return (
            <div className="flex-center h-screen">
                <p className="text-gray-500">Book not found.</p>
            </div>
        );
    }

    return (
        <div className="p-5">
            <BookDetailView book={book} publishedDate={publishedDate} />
        </div>
    );
}
