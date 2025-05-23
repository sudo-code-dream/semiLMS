// components/MaterialCard.tsx

import React from "react";
import { Card } from "@/components/ui/card";
import { FileText, Video, Paperclip, Image, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

type FileType = "pdf" | "video" | "attachment" | string;

function FileIcon({ fileType }: { fileType: FileType }) {
  switch (fileType) {
    case "pdf":
      return <FileText className='h-4 w-4 text-blue-500' />;
    case "video":
      return <Video className='h-4 w-4 text-red-500' />;
    case "attachment":
      return <Paperclip className='h-4 w-4 text-gray-500' />;
    default:
      return <FileText className='h-4 w-4 text-gray-500' />;
  }
}

type Material = {
  _id: Id<"studyMaterials">;
  title: string;
  description: string;
  subject: string;
  gradeLevel: number;
  mainContentUrl?: string;
  bannerUrl?: string;
  videoUrl?: string;
  fileType: FileType;
  additionalResourcesUrls: string[];
};

type MaterialCardProps = {
  material: Material;
  canDelete?: boolean;
  onRequestDelete?: () => void; 
};

export const MaterialCard = ({
  material,
  canDelete = false,
  onRequestDelete,
}: MaterialCardProps) => {
  return (
    <Card
      key={material._id}
      className='p-4 space-y-2 bg-center bg-no-repeat bg-contain'
      style={{ backgroundImage: `url(${material?.bannerUrl})` }}>
      <div className='flex items-start justify-between'>
        <h3 className='font-semibold'>{material.title}</h3>
        {canDelete && (
          <Button
            variant='ghost'
            size='icon'
            onClick={onRequestDelete}
            className='text-red-500 hover:text-red-700'>
            <Trash2 className='h-4 w-4' />
          </Button>
        )}
      </div>
      <p className='text-sm text-muted-foreground'>{material.description}</p>
      <div className='text-sm text-muted-foreground'>
        Subject: {material.subject}
      </div>
      <div className='text-sm text-muted-foreground'>
        Grade Level: {material.gradeLevel}
      </div>
      <div className='flex flex-col space-y-2'>
        {material.mainContentUrl && (
          <a
            href={material.mainContentUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center space-x-2 text-sm hover:underline'>
            <FileIcon fileType={material.fileType} />
            <span>View Main Content</span>
          </a>
        )}
        {material.bannerUrl && (
          <a
            href={material.bannerUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center space-x-2 text-sm hover:underline'>
            <Image className='h-4 w-4 text-red-500' />
            <span>View Image</span>
          </a>
        )}
        {material.videoUrl && (
          <a
            href={material.videoUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center space-x-2 text-sm hover:underline'>
            <Video className='h-4 w-4 text-red-500' />
            <span>View Video</span>
          </a>
        )}
        {material.additionalResourcesUrls.map((url, index) => (
          <a
            key={index}
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center space-x-2 text-sm hover:underline'>
            <Paperclip className='h-4 w-4 text-gray-500' />
            <span>Additional Resource {index + 1}</span>
          </a>
        ))}
      </div>
    </Card>
  );
};
