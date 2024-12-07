/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"

export function MobileHeader() {
    return (
        <div className="md:hidden  px-5 py-[0.62rem]">
            <div className="flex items-center justify-start gap-[0.62rem] ">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <img src={"/menu.svg"} alt="menu" className="w-6 h-6 " ></img>

                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top" className="p-4">
                        <SheetTitle>Menu</SheetTitle>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
                <h1 className="text-[var(--Typo1, #030303)] font-neulis-sans text-[1rem] font-normal leading-[1.5rem]">
                    Menu
                </h1>

            </div>
        </div>
    )
}

