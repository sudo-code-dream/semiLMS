"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AnnouncementsList from "@/components/AnnouncementsList";

export default function AnnouncementsPage() {
  const { user } = useUser();

  // ✅ All hooks must be called unconditionally before any return
  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id as string,
  });

  const roleData = useQuery(api.users.getUserRoleData, {
    userId: user?.id ?? "",
  });

  const instituteData = useQuery(api.users.getSubcriptionPlan, {
    userId: user?.id ?? "",
  });

  // ✅ Early return must come after all hooks
  if (!userData) {
    return <div>Loading...</div>;
  }

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const schoolName = userData?.subscription?.schoolName;

  // Extract role and normalize it
  const rawRole = roleData?.companyRole?.trim() || roleData?.role?.trim();
  const role = rawRole ? capitalizeFirstLetter(rawRole) : null;

  if (!schoolName) {
    if (role) {
      return (
        <div className='text-center py-8'>
          {role}
          <p className='text-gray-600'>Welcome</p>
        </div>
      );
    } else {
      return (
        <div className='text-center text-red-500 py-8'>
          School not set. Please update your subscription settings.
          <p className='text-gray-600'>
            Please contact your school administrator for more information.
          </p>
        </div>
      );
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Announcements</h1>
      <AnnouncementsList schoolName={schoolName} />
    </div>
  );
}
