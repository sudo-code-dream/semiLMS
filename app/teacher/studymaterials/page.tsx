// app/teacher/studymaterials/page.tsx
"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStudyMaterials } from "@/hooks/use-study-materials";
import { UploadStudyMaterialModal } from "@/components/upload-study-material";
import {
  Loader2,
  Trash2,
  FileText,
  Video,
  Paperclip,
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { MaterialCard } from "@/components/MaterialCard";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface StudyMaterial {
  _id: Id<"studyMaterials">;
  _creationTime: number;
  fileType: "pdf" | "video" | "attachment" | string;
  title: string;
  description: string;
  mainContentUrl: string;
  additionalResourcesUrls: string[];
  videoUrl?: string;
  subject: string;
  gradeLevel: number;
  quarter: number;
  teacherId: string;
  createdAt: number;
  updatedAt: number;
}

const FileIcon = ({ fileType }: { fileType: StudyMaterial["fileType"] }) => {
  switch (fileType) {
    case "pdf":
      return <FileText className='h-4 w-4 text-blue-500' />;
    case "video":
      return <Video className='h-4 w-4 text-red-500' />;
    case "attachment":
      return <Paperclip className='h-4 w-4 text-gray-500' />;
    default:
      return <File className='h-4 w-4 text-gray-500' />; // Default icon
  }
};

const StudyMaterialsPage = () => {
  const { materials, deleteMaterial } = useStudyMaterials();
  const { user } = useUser(); // Get current user to check ownership
  const [selectedMaterialId, setSelectedMaterialId] =
    useState<Id<"studyMaterials"> | null>(null);


  // Helper function to check if current user can delete the material
  const canDelete = (material: StudyMaterial) => {
    return user?.id === material.teacherId;
  };

  return (
    <div className='h-full p-4 space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Study Materials</h1>
        <UploadStudyMaterialModal />
      </div>

      <ScrollArea className='h-[calc(100vh-8rem)]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {!materials ? (
            <div className='col-span-full flex justify-center'>
              <Loader2 className='h-6 w-6 animate-spin' />
            </div>
          ) : materials.length === 0 ? (
            <div className='col-span-full text-center text-muted-foreground'>
              No study materials found. Start by uploading some content!
            </div>
          ) : (
            materials.map((material) => (
              <MaterialCard
                key={material._id}
                material={material}
                canDelete={canDelete(material)} // pass boolean
                onRequestDelete={() => setSelectedMaterialId(material._id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
      <Dialog
        open={!!selectedMaterialId}
        onOpenChange={(open) => !open && setSelectedMaterialId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Material?</DialogTitle>
            <p className='text-sm text-muted-foreground'>
              This action cannot be undone.
            </p>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='ghost'>Cancel</Button>
            </DialogClose>
            <Button
              variant='destructive'
              onClick={() => {
                if (selectedMaterialId) {
                  deleteMaterial(selectedMaterialId);
                  setSelectedMaterialId(null);
                }
              }}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudyMaterialsPage;
