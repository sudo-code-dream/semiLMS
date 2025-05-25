"use client";
import React from "react";
import {
  ArrowLeft,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  School,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const Notifications = () => {
  const assignments = useQuery(api.assignments.getAssignedToMe);
  const uploadedByMe = useQuery(api.studyMaterials.getUploadedByMeForNotif);
  const interviews = useQuery(api.interviews.getMyInterviews);

  const router = useRouter();

  const allActivities = [
    ...(interviews || []).map((interview) => ({
      type: "interview",
      title: interview.title || "Untitled Interview",
      subtitle: interview.status || "Scheduled",
      timestamp: interview.startTime,
      icon: Calendar,
      color: "bg-[#1e40af]/20 text-[#60a5fa] border-[#1e40af]/30",
    })),
    ...(assignments || []).map((assignment) => ({
      type: "assignmentsToMe",
      title: `You were assigned to ${assignment.schoolName} by ${assignment.assignedByUserName} `,
      subtitle: `Institution Plan Assignment`,
      timestamp: assignment.createdAt,
      icon: School,
      color: "bg-[#059669]/20 text-[#10b981] border-[#059669]/30",
    })),
  ].sort((a, b) => b.timestamp - a.timestamp);

  const MaterialsUploadedByMe = [
    ...(uploadedByMe || []).map((studyMaterial) => ({
      type: "assignment",
      title: `Created ${studyMaterial.title}`,
    })),
  ];

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className='mt-8 sm:mt-12 bg-[#1e293b]/40 border border-[#334155]/30 rounded-xl p-4 sm:p-6'>
      <div className='absolute top-[4.3rem] left-6 z-10'>
        <button
          onClick={handleGoBack}
          className='flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 shadow-sm border border-zinc-200 dark:border-zinc-700'
          aria-label='Go back'>
          <ArrowLeft className='w-5 h-5 text-zinc-600 dark:text-zinc-400' />
        </button>
      </div>
      <div className='flex items-center justify-between mb-4 sm:mb-6'>
        <div className='flex items-center gap-2'>
          <Clock className='h-4 w-4 sm:h-5 sm:w-5 text-[#4ade80]' />
          <h2 className='text-base sm:text-lg font-semibold text-[#e2e8f0]'>
            Recent Activity
          </h2>
        </div>
        <button className='text-xs sm:text-sm text-[#4ade80] hover:text-[#86efac] transition-colors'>
          View All
        </button>
      </div>

      {allActivities && allActivities.length > 0 ? (
        <div className='space-y-3 sm:space-y-4'>
          {allActivities.slice(0, 5).map((activity, index) => (
            <div
              key={index}
              className='flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-[#1e293b]/60 transition-colors'>
              <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#1e293b]/80 flex flex-col items-center justify-center flex-shrink-0'>
                <activity.icon className='h-5 w-5 sm:h-6 sm:w-6 text-[#4ade80] mb-1' />
                <span className='text-[10px] sm:text-xs text-[#94a3b8]'>
                  {activity.type === "interview" ? "Interview" : "Assignment"}
                </span>
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='font-medium text-sm sm:text-base text-[#e2e8f0] truncate'>
                  {activity.title}
                </h3>
                <p className='text-xs sm:text-sm text-[#94a3b8]'>
                  {new Date(activity.timestamp).toLocaleDateString()}
                </p>
              </div>
              <div className='hidden sm:block px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap flex-shrink-0 ${activity.color}'>
                {activity.subtitle}
              </div>
              {/* Mobile-only chevron */}
              <ChevronRight className='block sm:hidden h-5 w-5 text-[#4ade80] flex-shrink-0' />
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-6 sm:py-8 text-[#94a3b8]'>
          <Bell className='h-10 w-10 sm:h-12 sm:w-12 mx-auto text-[#334155] mb-3' />
          <p className='text-sm sm:text-base'>No recent activity to display</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
