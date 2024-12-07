import { Menu } from 'lucide-react'
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
        <div className="md:hidden border-b p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">WellnessOne</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-4">
                        <SheetTitle>WellnessOne</SheetTitle>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

