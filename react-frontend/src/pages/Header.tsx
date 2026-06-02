import { Button } from "@/components/ui/button"

export default function Header() {
    return (
    <div className="flex h-20 w-full bg-gray-400 border-b-4 border-gray-800">
        <div className="flex  flex-col items-center justify-center ml-2">
        <Button>Home</Button>
        </div>
        <div className="flex flex-row-reverse w-full mr-2">
            <div className="flex items-center justify-center">
            <Button>Login</Button>
            </div>
        </div>
    </div>
    )
}