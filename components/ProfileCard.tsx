"use client";

import Image from "next/image";
import Link from "next/link";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import {
  CreditCard,
  FileText,
  LogOut,
  MoveUpRight,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface MenuItem {
  label: string;
  value?: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

interface ProfileCardProps {
  name: string;
  avatar: string;
  role: string;
  subscription: string;
  schoolName: string;
  menuItems: MenuItem[];
  onTermsOpen: () => void;
}

export default function ProfileCard({
  name,
  avatar,
  role,
  subscription,
  schoolName,
  menuItems,
  onTermsOpen,
}: ProfileCardProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();
  const { signOut } = useClerk();

  const handleLogOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <div className='w-full max-w-sm mx-auto items-center justify-center pt-[15rem]'>
      <div className='relative overflow-visible rounded-2xl border border-zinc-200 dark:border-zinc-800'>
        <div className='relative px-6 pt-12 pb-6'>
          <div className='flex items-center gap-4 mb-8'>
            <div className='relative shrink-0'>
              <Image
                src={avatar}
                alt={name}
                width={72}
                height={72}
                className='rounded-full ring-4 ring-white dark:ring-zinc-900 object-cover'
              />
              <div className='absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900' />
            </div>

            <div className='flex-1'>
              <h2 className='text-xl font-semibold text-zinc-900 dark:text-zinc-100'>
                {name}
              </h2>
              <p className='text-zinc-600 dark:text-zinc-400'>{role}</p>
            </div>
          </div>

          <div className='h-px bg-zinc-200 dark:bg-zinc-800 my-6' />

          <div className='space-y-2 relative'>
            {menuItems.map((item) => (
              <div key={item.label} className='relative'>
                <Link
                  href={item.href}
                  className='flex items-center justify-between p-2 
                    hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
                    rounded-lg transition-colors duration-200'
                  onClick={item.onClick}>
                  <div className='flex items-center gap-2'>
                    {item.icon}
                    <span className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
                      {item.label}
                    </span>
                  </div>
                  <div className='flex justify-end items-center flex-1 min-w-0 ml-4'>
                    {item.value && (
                      <div
                        className='relative flex items-center'
                        onMouseEnter={() => setHoveredItem(item.label)}
                        onMouseLeave={() => setHoveredItem(null)}>
                        <span className='text-sm text-zinc-500 dark:text-zinc-400 mr-2 truncate max-w-[140px] cursor-help'>
                          {item.value}
                        </span>
                      </div>
                    )}
                    {item.external && (
                      <MoveUpRight className='w-4 h-4 flex-shrink-0' />
                    )}
                  </div>
                </Link>

                {hoveredItem === item.label &&
                  item.value &&
                  item.value.length > 20 && (
                    <div className='absolute right-0 top-full mt-1 z-[100] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs px-3 py-2 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 whitespace-nowrap max-w-[280px] animate-in fade-in-0 zoom-in-95 duration-200'>
                      {item.value}
                      <div className='absolute -top-1 right-4 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45'></div>
                    </div>
                  )}
              </div>
            ))}

            <button
              type='button'
              className='w-full flex items-center justify-between p-2 
                hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
                rounded-lg transition-colors duration-200'
              onClick={handleLogOut}>
              <div className='flex items-center gap-2'>
                <LogOut className='w-4 h-4' />
                <span className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
                  Logout
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
