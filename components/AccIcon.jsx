'use client'
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { retrieveSession } from "@/lib/auth/retrieveSession";
import { useEffect, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "@/lib/auth/logout";
import Link from "next/link";

export function AccIcon() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await retrieveSession();
        setUserData(data);
      } catch (error) {
        console.error('Error retrieving user data:', error.message);
      }
    };

    fetchData();
  }, []);
  console.log("data", userData);

    return (
          <div className="hidden sm:block">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-black">
                  <AvatarImage src="https://imgs.search.brave.com/NLpgWA-anJ89n8ggNMg1F78gPFBzCLCKFaGd-SBIVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzA5LzU5Lzc1/LzM2MF9GXzUwOTU5/NzUzMl9SS1V1WXNF/UmhPRG1reGtaZDgy/cFNIbkZ0REF0Z2J6/Si5qcGc" />
                </Avatar>
              </HoverCardTrigger>
    
              {/* When is hovered */}
              {userData ? (

              <HoverCardContent className="w-80 bg-black text-white">
                <div className="flex justify-between space-x-4">
                  <div className=" spacey-5">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-semibold">{userData.email}</h4>
                      <MdOutlineLogout className="text-2xl cursor-pointer" onClick={logout} />
                    </div>
                    <Link href={`/showroom/${userData.url}`}>
                      <Button className="border-2 border-gray-200 p-2">Post now your selling car!</Button>
                    </Link>
                    <div className="flex items-center pt-2">
                      <FaRegCalendarAlt className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Joined on: {userData.joined}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
              ) : (
                <HoverCardContent className="w-80 bg-black text-white">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                      <h4 className="text-sm sm:text-xl font-semibold p-5">Login now to post your car!</h4>
                        <div className="flex flex-col space-y-7 pl-6">
                          <Link href={'/login'}>Login Now</Link>
                          <Link href={'/register'}>Register Now</Link>
                        </div>
                  </div>
                </div>
              </HoverCardContent>
              )}
            </HoverCard>
          </div>
    );
}
