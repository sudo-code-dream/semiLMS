"use client";
import {useUserRole} from "@/hooks/useUserRole";
import { SUBJECTS_ACTIONS} from "@/constants";
import {useState} from "react";
import {useRouter} from "next/navigation";
import StudyMaterialCard from "@/components/StudyMaterialsCard";
import NumberSelectionModal from "@/components/MeetingModal";



export default function Home() {
    const router = useRouter();
    const { isStudent, isTeacher , isLoading } = useUserRole();

    const [showModal, setShowModal] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [currentTitle, setCurrentTitle] = useState<string>("");

    const handleNumberSelection = (number: number, title: string) => {
        setSelectedNumber(number);
        setShowModal(false)

        router.push(`/study-materials/${title.toLowerCase()}/${number}`);
    }

    const handleQuickAction = (title: string) => {
        setShowModal(true)
        setCurrentTitle(title)
    }


    if(isLoading) return <p>Loading...</p>

    return (
      <div className={'container max-w-7xl mx-auto p-6'}>
                    <div className={' grid sm:grid-cols-2 gap-6 lg:grid-cols-4'}>
                        {
                            SUBJECTS_ACTIONS.map((action) => (
                                <StudyMaterialCard
                                    key={action.title}
                                    //@ts-ignore
                                    action={action}
                                    onClick={() => handleQuickAction(action.title)}
                                />
                            ))
                        }
                    </div>
          <NumberSelectionModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              //@ts-ignore
              onSelect={(number: number, title:string) => {
                  setShowModal(false);
                  router.push(`/study-materials/${currentTitle.toLowerCase()}/${number}`);
              }}
          />


      </div>
  );
}
