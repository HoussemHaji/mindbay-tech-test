/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button';
import { Book } from '@/types/books';

export default function BookDetailView({
    book,
    publishedDate,
}: {
    book: Book;
    publishedDate: string | null;
}) {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex flex-col w-full md:flex-row items-center py-5 gap-6">
                <div className='md:w-1/2 w-full flex justify-center items-center py-5 bg-gray-100 rounded-xl '>
                    <img
                        src={'/book.jpg'}
                        alt={book.title}
                        className="w-[8.275rem] h-[12.5rem] object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div className='flex flex-col  gap-8 md:w-1/2'>
                    <div>
                        <h2 className="text-2xl font-medium font-[Inter]">{book.title}</h2>
                        <p className="text-sm text-gray-600">{book.description}</p>
                    </div>
                    <Button className="w-full bg-blue-400 hover:bg-blue-500 rounded-2xl text-white">
                        Add to Reading list
                    </Button>

                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 h-36 py-5">
                <span className="inline-flex items-center md:w-1/2 p-3 md:h-full w-full gap-4 rounded-xl bg-gray-100 text-orange-800">
                    🔥
                    <p>New York Times Best Seller</p>
                </span>
                <div className='md:w-1/2 w-full md:h-full '>
                    <span className="text-gray-500">Published: {publishedDate}</span>
                    <div className="text-sm text-gray-500 ">
                        Publisher: {book.publisher}
                    </div>

                </div>


            </div>
        </div>
    );
}