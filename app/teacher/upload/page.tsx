// app/(dashboard)/(routes)/teacher/upload/page.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useUserRole } from "@/hooks/useUserRole";
import { useStudyMaterials } from "@/hooks/use-study-materials";
import { toast } from "react-hot-toast";
import { notFound } from 'next/navigation';


interface UploadFormData {
    title: string;
    description: string;
    subject: string;
    gradeLevel: number | null;
    quarter: number | null;
}

const MaterialUploadPage = () => {
    const router = useRouter();
    const { isTeacher, isLoading } = useUserRole();
    const { handleUpload } = useStudyMaterials();
    const [isUploading, setIsUploading] = useState(false);

    // Form state
    const [formData, setFormData] = useState<UploadFormData>({
        title: "",
        description: "",
        subject: "",
        gradeLevel: null,
        quarter: null,
    });

    // File refs
    const mainPdfRef = useRef<HTMLInputElement>(null);
    const additionalFilesRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLInputElement>(null);

    if (!isTeacher || isLoading) {
        return (
            <div className="container max-w-3xl mx-auto p-6">
                <p>Loading...</p>
            </div>
        );
    }

const uploadFile = async (file: File): Promise<string> => {
    console.log("📤 Uploading file:", file.name, file.size);

    const formData = new FormData();

    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const baseName = file.name.replace(/\.[^/.]+$/, ""); // remove extension
    const newFileName = `${baseName}-${timestamp}.${extension}`;
    const versionedFile = new File([file], newFileName, { type: file.type });

    formData.append('file', versionedFile);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
    });

    const text = await response.text(); // Always parse text first to see raw output
    console.log("📥 Raw response from /api/upload:", text);

    if (!response.ok) {
        throw new Error(`❌ Upload failed: ${text}`);
    }

    const data = JSON.parse(text);
    return data.url;
};


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            const { title, description, subject, gradeLevel, quarter } = formData;

            // Validate required fields
           
             if (!subject || !gradeLevel || !quarter || !title || !description) {
                  throw new Error("Please fill in all required fields");
              }
            if (!mainPdfRef.current?.files?.[0]) {
                throw new Error("Please upload a main PDF file");
            }

            // Upload main PDF
            const mainPdfUrl = await uploadFile(mainPdfRef.current.files[0]);

            // Upload additional resources if any
            const additionalUrls: string[] = [];
            if (additionalFilesRef.current?.files?.length) {
                for (const file of Array.from(additionalFilesRef.current.files)) {
                    const url = await uploadFile(file);
                    additionalUrls.push(url);
                }
            }

            // Upload video if any
            let videoUrl: string | undefined;
            if (videoRef.current?.files?.[0]) {
                videoUrl = await uploadFile(videoRef.current.files[0]);
            }

            // Create study material
            await handleUpload(
                title,
                description,
                subject,
                gradeLevel,
                quarter,
                mainPdfUrl,
                additionalUrls,
                videoUrl
            );

            toast.success("Study material uploaded successfully!");
            router.push('/teacher/studymaterials');

        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error instanceof Error ? error.message : "Failed to upload study material");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Upload Study Materials</h1>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Subject</label>
                        <Select
                            onValueChange={(value) =>
                                setFormData(prev => ({ ...prev, subject: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="computer">Computer</SelectItem>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="mathematics">Mathematics</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="araling_panlipunan">Araling Panlipunan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Grade Level</label>
                        <Select
                            onValueChange={(value) =>
                                setFormData(prev => ({ ...prev, gradeLevel: parseInt(value) }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 6 }, (_, i) => i + 7).map((grade) => (
                                    <SelectItem key={grade} value={grade.toString()}>
                                        Grade {grade}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Quarter</label>
                        <Select
                            onValueChange={(value) =>
                                setFormData(prev => ({ ...prev, quarter: parseInt(value) }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select quarter" />
                            </SelectTrigger>
                            <SelectContent>
                                {[1, 2, 3, 4].map((q) => (
                                    <SelectItem key={q} value={q.toString()}>
                                        Quarter {q}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            placeholder="Enter material title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, title: e.target.value }))
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            placeholder="Enter material description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, description: e.target.value }))
                            }
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-4">
                            <h3 className="font-medium mb-2">Lesson Material (PDF)</h3>
                            <Input
                                type="file"
                                accept=".pdf"
                                ref={mainPdfRef}
                            />
                            <p className="text-sm text-gray-500 mt-1">Upload main lesson content (Max: 10MB)</p>
                        </div>

                        <div className="border-2 border-dashed rounded-lg p-4">
                            <h3 className="font-medium mb-2">Additional Resources</h3>
                            <Input
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx,.ppt,.pptx,.xlsx,.zip"
                                ref={additionalFilesRef}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Support materials: worksheets, presentations, etc. (Max: 20MB total)
                            </p>
                        </div>

                        <div className="border-2 border-dashed rounded-lg p-4">
                            <h3 className="font-medium mb-2">Video Content (Optional)</h3>
                            <Input
                                type="file"
                                accept="video/*"
                                ref={videoRef}
                            />
                            <p className="text-sm text-gray-500 mt-1">Upload video lessons (Max: 100MB)</p>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload Materials'}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default MaterialUploadPage;