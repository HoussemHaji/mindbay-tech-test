'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooksOverview } from '@/features/booksSlice'
import { RootState, AppDispatch } from '@/store'
import { Sidebar } from '@/components/navigation/sidebar'
import { MobileHeader } from '@/components/navigation/mobile-header'
import { AuthorCard } from '@/components/author/author-card'
import { getProcessedAuthors } from '@/lib/utils'

export default function AuthorsPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { bookLists, status, error } = useSelector((state: RootState) => state.books)

    useEffect(() => {
        dispatch(fetchBooksOverview())
    }, [dispatch])

    if (status === 'loading')
        return <div className="flex-center h-screen">
            <p className="text-gray-500">Loading authors...</p>
        </div>
    if (status === 'failed') return <p>Error loading authors: {error}</p>

    const groupedAuthors = getProcessedAuthors(bookLists)

    return (
        <div className="min-h-screen flex">
            <Sidebar className="hidden md:block w-64 top-0 border-r sticky self-stretch" />
            <div className="flex-1 self-stretch">
                <MobileHeader />
                <div className="xl:pr-[21.88rem] xl:pl-[12.5rem] pr-5 pl-5 lg:py-[3.75rem] py-0">
                    <h1 className="header-title spacing-lg">
                        Explore
                        <span className="text-[rgba(3,3,3,0.60)] leading-[1.5rem] font-[300] text-[0.875rem]">
                            &nbsp;by Author
                        </span>
                    </h1>
                    <div className="space-y-4">
                        {groupedAuthors.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={`grid gap-4 ${row.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
                            >
                                {row.map((author) => (
                                    <AuthorCard
                                        key={author.name}
                                        name={author.name}
                                        booksCount={author.booksCount}
                                        rowLength={row.length}
                                        imageSrc={`/profile.png?height=40&width=40`}
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
