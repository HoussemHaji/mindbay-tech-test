/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Book } from '@/types/books';

export default function BookDetailView({
    book,
    publishedDate,
}: {
    book: Book;
    publishedDate: string | null;
}) {



    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-lg font-semibold mb-6">Book Overview</h1>
            <div className="flex flex-col items-center gap-6 mb-8">

                <img
                    src={'/book.jpg'}
                    alt={book.title}
                    className="w-48 h-72 object-cover rounded-lg shadow-lg"
                />
                <h2 className="text-2xl font-bold text-center">{book.title}</h2>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800">
                        🔥 New York Times Best Seller
                    </span>
                    <span className="text-gray-500">
                        Published: {publishedDate}
                    </span>
                </div>
                <p className="text-gray-600 text-center">{book.description}</p>
                <div className="text-sm text-gray-500 text-center">
                    Publisher: {book.publisher}
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Add to Reading list
                </Button>
            </div>
        </div>
    );
}
