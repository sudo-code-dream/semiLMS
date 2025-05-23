// hooks/use-study-materials.ts
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "react-hot-toast";

export const useStudyMaterials = () => {
  const { user } = useUser();
  const materials = useQuery(api.studyMaterials.getAll);
  const createMaterial = useMutation(api.studyMaterials.create);
  const deleteMaterialMutation = useMutation(
    api.studyMaterials.deleteStudyMaterial
  );

  const handleUpload = async (
    title: string,
    description: string,
    subject: string,
    gradeLevel: number,
    quarter: number,
    mainContentUrl: string,
    additionalResourcesUrls: string[] = [],
    materialBannerUrl?: string,
    videoUrl?: string
  ) => {
    try {
      // Determine fileType based on mainContentUrl extension
      const fileType = mainContentUrl.toLowerCase().endsWith(".pdf")
        ? "pdf"
        : mainContentUrl.toLowerCase().includes("video")
          ? "video"
          : "attachment";

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
        materialBannerUrl,
        videoUrl,
      });
    } catch (error) {
      console.error(
        "Error creating study material: use-study-material.tsx(for development only)",
        error
      );
      throw error;
    }
  };

  const deleteMaterial = async (materialId: Id<"studyMaterials">) => {
    try {
      await deleteMaterialMutation({ id: materialId });
      toast.success("Study material deleted successfully");
      // only is successfully deleted yezzz sirr
    } catch (error) {
      console.error("Delete error:", error);

      // Handle specific error messages (maybe bad code pero for late nani lots of elif hahaha)
      if (error instanceof Error) {
        if (error.message.includes("You can only delete")) {
          alert("You can only delete study materials you created");
        } else if (error.message.includes("not found")) {
          alert("Study material not found");
        } else if (error.message.includes("Not authenticated")) {
          alert("Please sign in to delete materials");
        } else {
          alert("Failed to delete study material");
        }
      } else {
        alert("Failed to delete study material");
      }
    }
  };

  return {
    materials,
    handleUpload,
    deleteMaterial,
  };
};
