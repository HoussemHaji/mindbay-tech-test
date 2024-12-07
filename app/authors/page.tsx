'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooksOverview } from '@/features/booksSlice'
import { RootState, AppDispatch } from '@/store'
import { Sidebar } from '@/components/sidebar'
import { MobileHeader } from '@/components/mobile-header'
import { AuthorCard } from '@/components/author-card'

export default function AuthorsPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { bookLists, status, error } = useSelector((state: RootState) => state.books)

    useEffect(() => {
        dispatch(fetchBooksOverview())
    }, [dispatch])

    if (status === 'loading') return <p>Loading authors...</p>
    if (status === 'failed') return <p>Error loading authors: {error}</p>

    // Flatten and deduplicate authors
    const authors = bookLists.flatMap((list) =>
        list.books.map((book) => ({
            name: book.author,
            booksCount: list.books.filter((b) => b.author === book.author).length,
        }))
    )
    const uniqueAuthors = Array.from(new Map(authors.map((a) => [a.name, a])).values())

    // Group authors into rows (1 item for even rows, 2 items for odd rows)
    const groupedAuthors: Array<Array<{ name: string; booksCount: number }>> = []
    for (let i = 0; i < uniqueAuthors.length;) {
        if (groupedAuthors.length % 2 === 0) {
            // Even row: 1 author
            groupedAuthors.push([uniqueAuthors[i]])
            i += 1
        } else {
            // Odd row: 2 authors
            groupedAuthors.push(uniqueAuthors.slice(i, i + 2))
            i += 2
        }
    }

    return (
        <div className="min-h-screen flex">
            <Sidebar className="hidden md:block w-64 top-0 border-r sticky self-stretch" />
            <div className="flex-1  self-stretch">
                <MobileHeader />
                <div className="xl:pr-[21.88rem] xl:pl-[12.5rem] pr-5 pl-5 lg:py-[3.75rem] py-0">
                    <h1 className="flex text-[#030303] font-neulis-sans text-[1rem] font-medium leading-[1.5rem] lg:mb-[2.5rem] lg:mt-0 mt-6 mb-5 ">
                        Explore
                        <span className='text-[rgba(3,3,3,0.60)] leading-[1.5rem] font-[300] text-[0.875rem] font-neulis-sans'>
                            &nbsp;by Author
                        </span>
                    </h1>
                    <div className="space-y-4">
                        {groupedAuthors.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={`grid gap-4 ${row.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                                    }`}
                            >
                                {row.map((author) => (
                                    <AuthorCard
                                        key={author.name}
                                        name={author.name}
                                        booksCount={author.booksCount}
                                        rowLength={row.length}
                                        imageSrc={`/placeholder.svg?height=40&width=40`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
