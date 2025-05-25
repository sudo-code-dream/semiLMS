"use client";
import { useUserRole } from "@/hooks/useUserRole";
import { QUICK_ACTIONS, USER_QUICK_ACTIONS } from "@/constants";
import ActionCard from "@/components/ActionCard";
import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {useParams, useRouter} from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { MdDashboard } from "react-icons/md";
import { motion } from "framer-motion";
import {Clock, Calendar, Bell, School, ChevronRight, ArrowLeft} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const { user } = useUser();
  const { isTeacher, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const assignments = useQuery(api.assignments.getMyAssignments);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const subject = params.subject;
  const grade = params.grade;

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  // Animation variants - subtle animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70 },
    },
  };

  // Combine and sort activities by creation time
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
      type: "assignment",
      title: `Assigned ${assignment.assignedToUserName} to ${assignment.schoolName}`,
      subtitle: `Institution Plan Assignment`,
      timestamp: assignment.createdAt,
      icon: School,
      color: "bg-[#059669]/20 text-[#10b981] border-[#059669]/30",
    })),
  ].sort((a, b) => b.timestamp - a.timestamp);
  console.log(assignments,"assignments");


  if(isLoading) {
    return (
        <div className='flex items-center justify-center min-h-[60vh]'>
          <div className='text-[#94a3b8] text-lg'>Loading...</div>
        </div>
    );
  }

  const handleGoBack = () => {
    router.push(`/study-materials/${subject}/${grade}`);
  }

  return (
    <div className='min-h-screen bg-[#121620] text-[#e6e7eb]'>

      <div className='fixed inset-0 bg-gradient-to-br from-[#1e2538]/20 via-[#1e293b]/10 to-[#1e2538]/20 pointer-events-none'></div>

      <div className='container max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6'>

        <div className='mb-6 sm:mb-10'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-[#e2e8f0] mb-2 flex items-center gap-2'>
                <span className='bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] bg-clip-text text-transparent'>
                  Dashboard
                </span>{" "}
                <MdDashboard className='text-[#4ade80] text-3xl sm:text-4xl' />
              </h1>
              <p className='text-sm sm:text-base text-[#94a3b8]'>
                {isTeacher
                  ? "Dashboard"
                  : "Access your school's learning management system"}
              </p>
            </div>

            <div className='flex gap-3 mt-2 sm:mt-0'>
              <div className='bg-[#1e293b]/60 border border-[#334155]/40 rounded-xl px-3 sm:px-4 py-2 sm:py-3 w-full sm:w-auto'>
                <div className='text-xs text-[#94a3b8] mb-1'>Today</div>
                <div className='text-lg sm:text-xl font-bold text-[#e2e8f0]'>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: window.innerWidth < 640 ? "short" : "long",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Quick Actions */}
        <motion.div
          className='mb-8 sm:mb-12'
          initial='hidden'
          animate='visible'
          variants={containerVariants}>
          <div className='grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4'>
            {USER_QUICK_ACTIONS.map((action, index) => (
              <motion.div key={action.title} variants={itemVariants}>
                <ActionCard
                  //@ts-ignore
                  action={action}
                  onClick={() => handleQuickAction(action.href)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Teacher Section */}
        {isTeacher && (
          <>
            <div className='rounded-lg bg-[#1e293b]/40 border border-[#334155]/30 p-4 sm:p-6 mt-7 mb-6 sm:mb-10'>
              <h1 className='text-2xl sm:text-3xl font-bold text-[#e2e8f0] mb-2 flex items-center gap-2'>
                <span className='bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] bg-clip-text text-transparent'>
                  Teacher
                </span>{" "}
                <MdDashboard className='text-[#4ade80] text-3xl sm:text-4xl' />
              </h1>
              <p className='text-sm sm:text-base text-[#94a3b8]'>
                Admin | Teacher Panel
              </p>
            </div>

            <motion.div
              initial='hidden'
              animate='visible'
              variants={containerVariants}>
              <div className='grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6 py-2 sm:py-4 lg:grid-cols-4'>
                {QUICK_ACTIONS.map((action, index) => (
                  <motion.div key={action.title} variants={itemVariants}>
                    <ActionCard
                      action={action}
                      onClick={() => handleQuickAction(action.href)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* Recent Activity Section */}
        <div className='mt-8 sm:mt-12 bg-[#1e293b]/40 border border-[#334155]/30 rounded-xl p-4 sm:p-6'>
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
                      {activity.type === "interview"
                        ? "Interview"
                        : "Assignment"}
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
              <p className='text-sm sm:text-base'>
                No recent activity to display
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
