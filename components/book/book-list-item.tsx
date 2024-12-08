/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Book } from '@/types/books';

interface BookListItemProps {
    book: Book;
    isSelected: boolean;
    onClick: () => void;
    publishedDate: string | null;
}

const BookListItem: React.FC<BookListItemProps> = ({ book, isSelected, onClick, publishedDate }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-4 py-6 rounded-3xl ${isSelected
                ? 'border-2 border-blue-400 text-blue-400'
                : ''
                } flex justify-between bg-gray-100`}
        >
            <div className="flex flex-col gap-8 font-[Inter]">
                <h2 className="text-lg font-medium">{book.title}</h2>
                <p className="text-sm text-gray-500">Published: {publishedDate}</p>
            </div>
            <img src="/vector.svg" alt="Icon" />
        </button>
    );
};

export default BookListItem;
