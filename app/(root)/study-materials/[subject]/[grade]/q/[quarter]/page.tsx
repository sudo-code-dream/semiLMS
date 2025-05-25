"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  FileText,
  Video,
  Paperclip,
  Loader2,
  ImageIcon,
  BookOpen,
  Calendar,
  GraduationCap,
  ExternalLink,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "@/components/LoaderUI";
import StudyMaterials from "@/components/MaterialGrid";

const FileIcon: React.FC<{ fileType?: string }> = ({ fileType }) => {
  switch (fileType) {
    case "pdf":
      return <FileText className='h-5 w-5 text-blue-400' />;
    case "video":
      return <Video className='h-5 w-5 text-red-400' />;
    case "attachment":
      return <Paperclip className='h-5 w-5 text-emerald-400' />;
    default:
      return <FileText className='h-5 w-5 text-zinc-400' />;
  }
};

export default function QuarterPage() {
  const params = useParams();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const router = useRouter();

  const quarterValue =
    typeof params?.quarter === "string"
      ? Number.parseInt(params.quarter)
      : null;
  const quarter = !isNaN(quarterValue as number) ? quarterValue : null;
  const gradeValue =
    typeof params.grade === "string" ? Number.parseInt(params.grade) : null;
  const subjectParam = Array.isArray(params.subject)
    ? params.subject[0]
    : params.subject;
  const subject = subjectParam ?? "";

  const grade = !isNaN(gradeValue as number) ? gradeValue : null;
  const materials = useQuery(api.studyMaterials.getByQuarter, {
    quarter: quarter ?? 0,
    grade: grade ?? 0,
    subject: subject ?? "",
  });

  // Update your loading condition

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 0, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const getSubjectColor = (subject: string) => {
    const subjectMap: Record<string, string> = {
      math: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      science: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      english: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      history: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      computer: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      art: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      music: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      "physical education":
        "bg-orange-500/20 text-orange-400 border-orange-500/30",
    };

    const lowerSubject = subject.toLowerCase();
    return (
      subjectMap[lowerSubject] ||
      "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
    );
  };

  const handleGoBack = () => {
    router.push(`/study-materials/${subject}/${grade}`);
  };

  return (
    <div className='min-h-screen min-w-full bg-[#0a0c14] text-zinc-100 pb-16'>
      {/* Header with gradient */}
      <div className='absolute top-[5rem] left-6 z-10'>
        <button
          onClick={handleGoBack}
          className='flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 shadow-sm border border-zinc-200 dark:border-zinc-700'
          aria-label='Go back'>
          <ArrowLeft className='w-5 h-5 text-zinc-600 dark:text-zinc-400' />
        </button>
      </div>
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10' />
        <div className='relative container mx-auto px-6 py-12'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-emerald-500/20 rounded-lg'>
              <BookOpen className='h-6 w-6 text-emerald-400' />
            </div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent'>
              Quarter {quarter} Study Materials
            </h1>
          </div>
          <div className='flex items-center gap-2 text-zinc-400 ml-12'>
            <Calendar className='h-4 w-4' />
            <span>Academic Year 2024-2025</span>
          </div>
        </div>
      </div>

      <StudyMaterials
        materials={materials ?? []}
        quarter={quarter}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
        hoveredCard={hoveredCard}
        setHoveredCard={setHoveredCard}
        getSubjectColor={getSubjectColor}
        cn={cn}
        Loader2={Loader2}
        BookOpen={BookOpen}
        GraduationCap={GraduationCap}
        FileIcon={FileIcon}
        ExternalLink={ExternalLink}
        Video={Video}
        ImageIcon={ImageIcon}
        Eye={Eye}
        Paperclip={Paperclip}
      />
    </div>
  );
}
