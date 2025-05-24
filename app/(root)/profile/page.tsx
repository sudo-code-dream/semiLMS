"use client";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  LogOut,
  MoveUpRight,
  Settings,
  CreditCard,
  FileText,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TermsModal from "@/components/Terms-modal";

interface MenuItem {
  label: string;
  value?: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function UserProfile() {
  const { user } = useUser();
  const clerkId = user?.id;
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const roleData = useQuery(api.users.getUserRoleData, {
    userId: user?.id ?? "",
  });

  const instituteData = useQuery(api.users.getSubcriptionPlan, {
    userId: user?.id ?? "",
  });

  const role = roleData?.companyRole?.trim()
    ? capitalizeFirstLetter(roleData.companyRole)
    : capitalizeFirstLetter(roleData?.role ?? "Student");

  if (!user || !roleData) return <p>Loading...</p>;

  const subscriptionType = instituteData?.subscription ?? "Trial";
  const schoolName = instituteData?.schoolname ?? "";

  const name = user?.fullName ?? "John Doe";
  const avatar = user?.imageUrl ?? "https://your-fallback-image.png";
  const subscription =
    subscriptionType === "Institution Plan" && schoolName
      ? `${subscriptionType} (${schoolName})`
      : subscriptionType;
  const menuItems: MenuItem[] = [
    {
      label: "Subscription",
      value: subscription,
      href: "#",
      icon: <CreditCard className='w-4 h-4' />,
      external: false,
    },
    {
      label: "Settings",
      href: "#",
      icon: <Settings className='w-4 h-4' />,
    },
    {
      label: "Terms & Policies",
      href: "#",
      icon: <FileText className='w-4 h-4' />,
      onClick: (e) => {
        e.preventDefault();
        setIsTermsModalOpen(true);
      },
    },
  ];

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className='w-full min-h-screen relative'>
      {/* Back Button - Already exists in the UI */}
      <div className='absolute top-6 left-6 z-10'>
        <button
          onClick={handleGoBack}
          className='flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 shadow-sm border border-zinc-200 dark:border-zinc-700'
          aria-label='Go back'>
          <ArrowLeft className='w-5 h-5 text-zinc-600 dark:text-zinc-400' />
        </button>
      </div>

      {/* Profile Card */}
      <div className='w-full max-w-sm mx-auto items-center justify-center pt-[15rem]'>
        <div className='relative overflow-visible rounded-2xl border border-zinc-200 dark:border-zinc-800'>
          <div className='relative px-6 pt-12 pb-6'>
            <div className='flex items-center gap-4 mb-8'>
              <div className='relative shrink-0'>
                <Image
                  src={avatar || "/placeholder.svg"}
                  alt={name}
                  width={72}
                  height={72}
                  className='rounded-full ring-4 ring-white dark:ring-zinc-900 object-cover'
                />
                <div className='absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900' />
              </div>

              {/* Profile Info */}
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

                  {/* Hover Tooltip - positioned outside the link */}
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
                                  rounded-lg transition-colors duration-200'>
                <div className='flex items-center gap-2'>
                  <LogOut className='w-4 h-4' />
                  <span className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
                    <SignOutButton>Logout</SignOutButton>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
}
