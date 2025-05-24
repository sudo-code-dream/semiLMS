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
import ProfileCard from "@/components/ProfileCard";

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
      value:
        !subscription && roleData.companyRole
          ? "Fud00 Tech"
          : !subscription
            ? "(Waiting for approval)"
            : subscription,
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
      <ProfileCard
        name={name}
        avatar={avatar}
        role={role}
        subscription={subscription}
        schoolName={schoolName}
        menuItems={menuItems}
        onTermsOpen={() => setIsTermsModalOpen(true)}
      />

      {/* Terms Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
}
