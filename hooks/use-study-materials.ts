// hooks/use-study-materials.ts
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export const useStudyMaterials = () => {
  const { user } = useUser();
  const materials = useQuery(api.studyMaterials.getAll);
  const createMaterial = useMutation(api.studyMaterials.create);
  const deleteMaterial = useMutation(api.studyMaterials.deleteStudyMaterial);

  const handleUpload = async (
    title: string,
    description: string,
    subject: string,
    gradeLevel: number,
    quarter: number,
    mainContentUrl: string,
    additionalResourcesUrls: string[] = [],
    videoUrl?: string
  ) => {
    try {
      // Determine fileType based on mainContentUrl extension
      const fileType = mainContentUrl.toLowerCase().endsWith('.pdf') 
        ? 'pdf' 
        : mainContentUrl.toLowerCase().includes('video') 
          ? 'video' 
          : 'attachment';

      await createMaterial({
        title,
        description,
        subject,
        gradeLevel,
        quarter,
        teacherId: user?.id || "",
        mainContentUrl,
        additionalResourcesUrls,
        fileType, // Add this required field
        videoUrl,
      });
    } catch (error) {
      console.error("Error creating study material:", error);
      throw error;
    }
  };

  return {
    materials,
    handleUpload,
    deleteMaterial,
  };
};