import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

export default function Nav() {
    return (
        <nav className="md:mx-auto pt-2 mx-5 md:w-2/6 xl:text-lg h-11 bg-black text-white font-semibold rounded-2xl mt-12 shadow-lg">
            <div className="flex justify-center space-x-6 lg:space-x-14">
                <Link href={"/showroom"}>Get Started</Link>
                <Link href={'/register'}><p>Register</p></Link>
                <Link href={'/login'}><p>Login</p></Link>
            </div>
        </nav>  
    );
}
