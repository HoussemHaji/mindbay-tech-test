import { Book, BookList } from "@/types/books"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getProcessedAuthors(bookLists: BookList[]) {
    const authors = bookLists.flatMap((list) =>
        list.books.map((book) => ({
            name: book.author,
            booksCount: list.books.filter((b) => b.author === book.author).length,
        }))
    )
    const uniqueAuthors = Array.from(new Map(authors.map((a) => [a.name, a])).values())

    const groupedAuthors: Array<Array<{ name: string; booksCount: number }>> = []
    for (let i = 0; i < uniqueAuthors.length;) {
        if (groupedAuthors.length % 2 === 0) {
            groupedAuthors.push([uniqueAuthors[i]])
            i += 1
        } else {
            groupedAuthors.push(uniqueAuthors.slice(i, i + 2))
            i += 2
        }
    }
    return groupedAuthors
}

export function getBooksByAuthor(bookLists: BookList[], author: string): Book[] {
    const booksByAuthor = bookLists.flatMap((list) =>
        list.books.filter((book: Book) => book.author === author)
    );

    const uniqueBooksByAuthor = Array.from(
        new Map(booksByAuthor.map((book) => [book.title, book])).values()
    );

    return uniqueBooksByAuthor;
}
