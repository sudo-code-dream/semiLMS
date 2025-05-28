"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatDistanceToNow } from "date-fns";

export default function AnnouncementsList({
  schoolName,
}: {
  schoolName: string;
}) {
  const announcements = useQuery(api.announcements.getBySchool, { schoolName });

  if (!announcements?.length) {
    return (
      <div className='text-center text-gray-500 py-8'>No announcements yet</div>
    );
  }

  return (
    <div className='space-y-4'>
      {announcements.map((announcement) => (
        <div
          key={announcement._id}
          className={`p-4 rounded-lg border ${
            announcement.isPinned ? "bg-blue-50 border-blue-200" : "bg-white"
          }`}>
          <div className='flex items-start justify-between mb-2'>
            <div>
              <h3 className='font-semibold text-lg'>{announcement.title}</h3>
              <p className='text-sm text-gray-500'>
                By {announcement.teacherName} •{" "}
                {formatDistanceToNow(announcement.createdAt, {
                  addSuffix: true,
                })}
              </p>
            </div>
            {announcement.isPinned && (
              <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'>
                Pinned
              </span>
            )}
          </div>

          <p className='text-gray-700 whitespace-pre-wrap'>
            {announcement.content}
          </p>

          {announcement.tags && announcement.tags.length > 0 && (
            <div className='mt-3 flex gap-2'>
              {announcement.tags.map((tag) => (
                <span
                  key={tag}
                  className='bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded'>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
