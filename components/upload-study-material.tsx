// components/upload-study-material-modal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useStudyMaterials } from "@/hooks/use-study-materials";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const UploadStudyMaterialModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState<number>(7);
  const [quarter, setQuarter] = useState<number>(1);
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [bannerFile, setBanner] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const { handleUpload } = useStudyMaterials();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainFile || !title) return;

    try {
      // In a real app, you'd upload files to a storage service first
      const mainContentUrl = URL.createObjectURL(mainFile);
      const additionalUrls = additionalFiles.map((file) =>
        URL.createObjectURL(file)
      );

      await handleUpload(
        title,
        description,
        subject,
        gradeLevel,
        quarter,
        mainContentUrl,
        additionalUrls,
        videoUrl || undefined
      );

      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSubject("");
    setGradeLevel(1);
    setQuarter(1);
    setMainFile(null);
    setAdditionalFiles([]);
    setVideoUrl("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className='h-4 w-4 mr-2' />
          Upload Study Material
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Upload Study Material</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-4'>
          <Input
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className='grid grid-cols-2 gap-4'>
            <Select
              value={subject}
              onValueChange={(value) => setSubject(value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select subject' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='computer'>Computer</SelectItem>
                <SelectItem value='english'>English</SelectItem>
                <SelectItem value='mathematics'>Mathematics</SelectItem>
                <SelectItem value='science'>Science</SelectItem>
                <SelectItem value='araling_panlipunan'>
                  Araling Panlipunan
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={gradeLevel.toString()}
              onValueChange={(value) => setGradeLevel(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder='Grade Level' />
              </SelectTrigger>
              <SelectContent>
                {[7, 8, 9, 10, 11, 12].map((grade) => (
                  <SelectItem key={grade} value={grade.toString()}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={quarter.toString()}
              onValueChange={(value) => setQuarter(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder='Quarter' />
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
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Main Content (PDF)</label>
            <Input
              type='file'
              accept='.pdf'
              onChange={(e) => setMainFile(e.target.files?.[0] || null)}
              required
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Additional Resources</label>
            <Input
              type='file'
              multiple
              onChange={(e) =>
                setAdditionalFiles(Array.from(e.target.files || []))
              }
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Banner (Image)</label>
            <Input
              onChange={(e) => setBanner(e.target.value)}
              required
            />
          </div>
          <Input
            type="file"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <Button type='submit' disabled={!mainFile || !title}>
            Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
