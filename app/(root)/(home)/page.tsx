"use client";
import { useUserRole } from "@/hooks/useUserRole";
import { QUICK_ACTIONS, USER_QUICK_ACTIONS } from "@/constants";
import ActionCard from "@/components/ActionCard";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";

export default function Home() {
  const router = useRouter();
  const { isTeacher, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={"container max-w-7xl mx-auto p-6"}>
      <div className='rounded-lg bg-card p-6 border shadow-sm mb-10'>
        <h1 className='text-4xl flex items-center gap-1 font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent'>
          Dashboard <MdDashboard className={"text-teal-600 text-4xl"} />
        </h1>
        <p className='text-muted-foreground mt-2'>
          {isTeacher
            ? "Dashboard"
            : "Access your school's learning management system"}
        </p>
      </div>

      {isTeacher ? (
        <>
          <div className={" grid sm:grid-cols-2 gap-6 lg:grid-cols-4"}>
            {USER_QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                //@ts-ignore
                action={action}
                onClick={() => handleQuickAction(action.href)}
              />
            ))}
          </div>
          <div className='rounded-lg bg-card p-6 mt-7 border shadow-sm mb-10'>
            <h1 className='text-4xl flex items-center gap-1 font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent'>
              Teacher <MdDashboard className={"text-teal-600 text-4xl"} />
            </h1>
            <p className='text-muted-foreground mt-2'>
              {isTeacher
                ? "Admin | Teacher Panel"
                : "Access your school's learning management system"}
            </p>
          </div>
          <div className={" grid sm:grid-cols-2 gap-6 py-4 lg:grid-cols-4"}>
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                //@ts-ignore
                onClick={() => handleQuickAction(action.href)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={" grid sm:grid-cols-2 gap-6 lg:grid-cols-4"}>
            {USER_QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                //@ts-ignore
                action={action}
                onClick={() => handleQuickAction(action.href)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
