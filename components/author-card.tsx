import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface AuthorCardProps {
    name: string
    booksCount: number
    imageSrc?: string
    rowLength?: number
}

export function AuthorCard({ name, booksCount, imageSrc, rowLength }: AuthorCardProps) {
    const isSingleCardRow = rowLength === 1;

    return (
        <Link href={`/authors/${encodeURIComponent(name)}`}>
            <Card className={`hover:bg-accent transition-colors rounded-[1.25rem] border-[1.5px] border-[#ECECE3] ${isSingleCardRow ? "bg-[rgba(242,242,235,0.50)]" : "bg-[rgba(236,235,242,0.50)] border-[#EAE3EC]"}`} >
                <CardContent
                    className={`flex gap-6 ${isSingleCardRow ? "flex-row items-center py-6" : "flex-col items-start py-3 "
                        } px-4 `}
                >
                    <Avatar className={`h-12 w-12 border border-solid border-[#E3ECE9]  ${isSingleCardRow ? "" : "mb-2"}`}>
                        <AvatarImage src={imageSrc} alt={name} />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-[var(--typo-1,#030303)] font-inter text-[1rem] font-medium leading-[1.5rem]">
                            {name}
                        </h3>
                        <p className="text-[#A7A7A7] font-inter text-[0.75rem] font-normal leading-[1.25rem]">
                            {booksCount} books
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
