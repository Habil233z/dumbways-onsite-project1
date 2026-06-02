import { Button } from "@/components/ui/button";

export default function Login() {

    function handleClick() {

    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="border-gray-800 border-2 h-150 w-200 bg-gray-200">
                <h1 className="text-center mt-8 text-4xl font-bold">Circle</h1>
                <h2 className="text-center mt-8 text-4xl">Login to Circle</h2>
                <form>
                    <input type="text" placeholder="Email/Username" name="email|username"/>
                    <input type="text" placeholder="Password" name="password"/>
                    <div className="flex items-center justify-center">
                    <Button onClick={handleClick}>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}