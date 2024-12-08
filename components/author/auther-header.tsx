import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const AuthorHeader = () => (
    <div className='w-full hidden md:flex md:pt-10 md:pb-5 md:ml-[5.62rem]'>
        <Link href={"/authors"}>
            <div className='flex items-center gap-2 '>
                <img src="/back.svg" alt="<" />
                <span className='font-[Inter] text-base text-[#6C6C6C] font-medium'>Explore</span>

            </div>
        </Link>

    </div>
);

export default AuthorHeader;
