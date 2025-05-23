"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Video, Paperclip, Loader2, Image } from "lucide-react";
import { notFound } from "next/navigation";

const FileIcon = ({
  fileType,
}: {
  fileType: "pdf" | "video" | "attachment" | string;
}) => {
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
};

export default function QuarterPage() {
  const params = useParams();
  // Add debug logging
  console.log("URL Params:", params);

  const quarterValue =
    typeof params?.quarter === "string" ? parseInt(params.quarter) : null;
  const quarter = !isNaN(quarterValue as number) ? quarterValue : null;

  // Redirect to 404 if quarter is invalid
  if (quarter === null || quarter < 1 || quarter > 4) {
    notFound();
  }
  const materials = useQuery(api.studyMaterials.getByQuarter, { quarter });

  return (
    <div className='h-full p-4 space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>
          Quarter {quarter} Study Materials
        </h1>
      </div>

      <ScrollArea className='h-[calc(100vh-8rem)]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {!materials ? (
            <div className='col-span-full flex justify-center'>
              <Loader2 className='h-6 w-6 animate-spin' />
            </div>
          ) : materials.length === 0 ? (
            <div className='col-span-full text-center text-muted-foreground'>
              No study materials found for Quarter {quarter}.
            </div>
          ) : (
            materials.map((material) => (
              <Card key={material._id} className='p-4 space-y-2'>
                <div className='flex items-start justify-between'>
                  <h3 className='font-semibold'>{material.title}</h3>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {material.description}
                </p>
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
                  {material.materialBannerUrl && (
                    <a
                      href={material.materialBannerUrl}
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
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
