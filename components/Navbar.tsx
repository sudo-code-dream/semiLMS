"use client";
import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { CodeIcon } from "lucide-react";
import {SignedIn, UserButton, useUser} from "@clerk/nextjs";
import TDashboarBtn from "@/components/TDashboardBtn";
import Image from "next/image";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import TDashboardBtn from "@/components/TDashboardBtn";
import DashboardBtn from "@/components/DashboardBtn";

const Navbar = () => {
    const { user } = useUser();

  const roleData = useQuery(api.users.getUserRoleData, {
    userId: user?.id ?? "",
  });

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const rawRole = roleData?.companyRole?.trim() || roleData?.role?.trim();
  const role = rawRole ? capitalizeFirstLetter(rawRole) : null;

  return (
    <nav className={"border-b"}>
      <div
        className={
          "flex h-16 items-center px-4 container mx-auto hover:cursor-pointer  "
        }>
        <Link
          href='/dashboard'
          className='flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity'>
          <span className='bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent'>
            <Image
              src='/logo.png'
              className='hover:cursor-pointer'
              alt='Logo'
              width={90}
              height={90}
            />
          </span>
        </Link>

        <SignedIn>
          <div className={"flex items-center space-x-4 ml-auto"}>
            {roleData?.companyRole ? (
                <TDashboardBtn />
            ): (
                <DashboardBtn />
              )}

            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
