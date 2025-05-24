// app/study-materials/[subject]/[number]/page.tsx
"use client";

import { useParams } from "next/navigation";
import SubjectQuarter from "@/components/SubjectQuarter";
import { SUBJECTS_ACTIONS, SUBJECTS_QUARTERS } from "@/constants";


export default function StudyMaterialPage() {
  const params = useParams();
  const subject = params.subject;
  const number = params.number;

  const decodedSubject = subject ? decodeURIComponent(subject.toString()) : "";

  return (
    <div className='container max-w-8xl mx-auto p-6'>
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
