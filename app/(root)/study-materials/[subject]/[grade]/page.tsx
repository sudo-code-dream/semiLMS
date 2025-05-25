// app/study-materials/[subject]/[number]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import SubjectQuarter from "@/components/SubjectQuarter";
import { SUBJECTS_ACTIONS, SUBJECTS_QUARTERS } from "@/constants";
import { ArrowLeft } from "lucide-react";

export default function StudyMaterialPage() {
  const params = useParams();
  const router = useRouter();
  const subject = params.subject;
  const number = params.grade;

  const decodedSubject = subject ? decodeURIComponent(subject.toString()) : "";
  const handleGoBack = () => {
    router.push(`/study-materials`);
  };

  return (
    <div className='container max-w-8xl mx-auto p-6'>
      <div className='absolute top-[5rem] left-6 z-10'>
        <button
          onClick={handleGoBack}
          className='flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 shadow-sm border border-zinc-200 dark:border-zinc-700'
          aria-label='Go back'>
          <ArrowLeft className='w-5 h-5 text-zinc-600 dark:text-zinc-400' />
        </button>
      </div>
      <h1 className='text-2xl font-bold mb-4'>
        {decodedSubject.toUpperCase()} - Level {number}
      </h1>
      <div className={"grid sm:grid-cols-2 gap-6 lg:grid-cols-4"}>
        {SUBJECTS_QUARTERS.map((action) => (
          <SubjectQuarter key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
}
