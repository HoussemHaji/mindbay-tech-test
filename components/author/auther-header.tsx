/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

type AuthorHeaderProps = {
    author: string;
    bookCount: number;
};

const AuthorHeader = ({ author, bookCount }: AuthorHeaderProps) => (
    <div className="flex flex-col w-full">
        <Link href="/authors" className="flex gap-[0.69rem]">
            <img src="/back.svg" alt="Back" />
            <span className="text-[#030303] text-[1rem] font-normal leading-[1.5rem] py-2">
                {author}
            </span>
        </Link>

        <span className="md:hidden text-[#A8A8A8] text-[0.875rem] font-light leading-[1rem] my-3">
            {bookCount} books
        </span>
    </div>
);

export default AuthorHeader;
