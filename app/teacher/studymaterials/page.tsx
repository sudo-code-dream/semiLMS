// app/teacher/studymaterials/page.tsx
"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStudyMaterials } from "@/hooks/use-study-materials";
import { UploadStudyMaterialModal } from "@/components/upload-study-material";
import { Loader2, Trash2, FileText, Video, Paperclip, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Id} from "@/convex/_generated/dataModel";

interface StudyMaterial {
  _id: Id<"studyMaterials">;
  _creationTime: number;
  fileType: 'pdf' | 'video' | 'attachment' | string;
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

const FileIcon = ({ fileType }: { fileType: StudyMaterial['fileType'] }) => {
  switch (fileType) {
    case 'pdf':
      return <FileText className="h-4 w-4 text-blue-500" />;
    case 'video':
      return <Video className="h-4 w-4 text-red-500" />;
    case 'attachment':
      return <Paperclip className="h-4 w-4 text-gray-500" />;
    default:
      return <File className="h-4 w-4 text-gray-500" />; // Default icon
  }
};

const StudyMaterialsPage = () => {
  const { materials, deleteMaterial } = useStudyMaterials();

  return (
    <div className="h-full p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Study Materials</h1>
        <UploadStudyMaterialModal />
      </div>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!materials ? (
            <div className="col-span-full flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : materials.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground">
              No study materials found. Start by uploading some content!
            </div>
          ) : (
            materials.map((material) => (
              <Card key={material._id} className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{material.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMaterial({ id: material._id })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{material.description}</p>
                <div className="flex items-center space-x-2">
                  {material.fileType === 'pdf' && (
                    <a 
                      href={material.mainContentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      <FileIcon fileType={material.fileType} />
                      View PDF
                    </a>
                  )}
                  {material.fileType === 'video' && material.videoUrl && (
                    <a 
                      href={material.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      <FileIcon fileType={material.fileType} />
                      View Video
                    </a>
                  )}
                  {material.fileType === 'attachment' && material.additionalResourcesUrls.length > 0 && (
                    <a 
                      href={material.additionalResourcesUrls[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      <FileIcon fileType={material.fileType} />
                      View Attachment
                    </a>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StudyMaterialsPage;