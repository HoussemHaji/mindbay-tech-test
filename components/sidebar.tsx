/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    return (
        <div className={cn("pb-12 h-screen hidden md:block px-[1.25rem] pt-[3.16rem] text-[#6C6C6C] font-inter text-[0.875rem] font-medium leading-[1.375rem] ", className)}>
            <div className="space-y-4 ">
                <div className="flex flex-col gap-[4.74rem] justify-center items-center">
                    <Link href="/" className="flex items-center mb-8">
                        <img src={"/logo.svg"} alt="WelnessOne" className="w-[7.98538rem] h-[1.02781rem] " ></img>
                    </Link>
                    <nav className="flex flex-col gap-[1.9rem] w-full items-start">
                        <Link href="/" className="w-full">
                            <Button variant="ghost" className="w-full justify-start">
                                <img src={"/home.svg"} alt="WelnessOne" className="w-9 h-9 " ></img>

                                Home
                            </Button>
                        </Link>
                        <Link href="/authors" className="w-full">
                            <Button variant="ghost" className="w-full justify-start">
                                <img src={"/explore.svg"} alt="WelnessOne" className="w-9 h-9" ></img>

                                Explore
                            </Button>
                        </Link>
                    </nav>
                </div>
            </div>
            <div className="absolute bottom-4 flex ">
                <Button variant="ghost" className="w-full justify-start hover:bg-white">
                    <img src={"/logout.svg"} alt="WelnessOne" className="w-9 h-9" ></img>

                    Logout
                </Button>
            </div>
        </div >
    )
}

