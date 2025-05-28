"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function CreateAnnouncement() {
  const router = useRouter();
  const createAnnouncement = useMutation(api.announcements.create);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    schoolName: "",
    isPinned: false,
    tags: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createAnnouncement(formData);
      router.push("/teacher/announcements");
    } catch (error) {
      console.error("Failed to create announcement:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Create New Announcement</h1>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium mb-1'>Title</label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder='Enter announcement title'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>School Name</label>
          <Input
            value={formData.schoolName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, schoolName: e.target.value }))
            }
            placeholder='Enter school name'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Content</label>
          <Textarea
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
            placeholder='Write your announcement here...'
            rows={6}
            required
          />
        </div>

        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='isPinned'
            checked={formData.isPinned}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isPinned: e.target.checked }))
            }
            className='rounded border-gray-300'
          />
          <label htmlFor='isPinned' className='text-sm'>
            Pin this announcement
          </label>
        </div>

        <div className='flex gap-4'>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Announcement"}
          </Button>
          <Button type='button' variant='outline' onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
