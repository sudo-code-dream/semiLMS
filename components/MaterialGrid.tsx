"use client";
import { motion } from "framer-motion";
import { FC } from "react";

interface Material {
  _id: string;
  materialBannerUrl?: string;
  subject: string;
  gradeLevel: string | number;
  title: string;
  description: string;
  mainContentUrl?: string;
  fileType?: string;
  videoUrl?: string;
  additionalResourcesUrls: string[];
  // add other properties you use here
}

interface StudyMaterialsProps {
  materials: Material[];
  quarter: number | null;
  containerVariants: any;
  itemVariants: any;
  hoveredCard: string | null;
  setHoveredCard: (id: string | null) => void;
  getSubjectColor: (subject: string) => string;
  cn: (...classes: any[]) => string;
  Loader2: FC<any>;
  BookOpen: FC<any>;
  GraduationCap: FC<any>;
  FileIcon: FC<{ fileType?: string }>;
  ExternalLink: FC<any>;
  Video: FC<any>;
  ImageIcon: FC<any>;
  Eye: FC<any>;
  Paperclip: FC<any>;
}

const StudyMaterials: FC<StudyMaterialsProps> = ({
  materials,
  quarter,
  containerVariants,
  itemVariants,
  hoveredCard,
  setHoveredCard,
  getSubjectColor,
  cn,
  Loader2,
  BookOpen,
  GraduationCap,
  FileIcon,
  ExternalLink,
  Video,
  ImageIcon,
  Eye,
  Paperclip,
}) => {
  return (
    <div className='container  mx-auto px-6'>
      {!materials ? (
        <div className='flex flex-col items-center justify-center py-32'>
          <Loader2 className='h-12 w-12 text-emerald-500 animate-spin mb-4' />
          <p className='text-zinc-400 text-lg'>Loading study materials...</p>
        </div>
      ) : materials.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-32 text-center'>
          <div className='p-6 bg-zinc-800/50 rounded-full mb-6'>
            <BookOpen className='h-12 w-12 text-zinc-500' />
          </div>
          <h2 className='text-2xl font-semibold text-zinc-300 mb-2'>
            No Materials Found
          </h2>
          <p className='text-zinc-500 max-w-md'>
            No study materials are currently available for Quarter {quarter}.
            Check back later or contact your instructor.
          </p>
        </div>
      ) : (
        <motion.div
          className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'
          variants={containerVariants}
          initial='hidden'
          animate='visible'>
          {materials.map((material) => (
            <motion.div
              key={material._id.toString()}
              variants={itemVariants}
              onMouseEnter={() => setHoveredCard(material._id.toString())}
              onMouseLeave={() => setHoveredCard(null)}
              className='group relative'>
              <div
                className={cn(
                  "h-full rounded-2xl border  border-zinc-800/50 overflow-hidden transition-all duration-300",
                  hoveredCard === material._id.toString()
                    ? "border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                    : "hover:border-zinc-700"
                )}>
                <div className='relative h-48 overflow-hidden'>
                  {material.materialBannerUrl ? (
                    <div
                      className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
                      style={{
                        backgroundImage: `url(${material.materialBannerUrl})`,
                      }}
                    />
                  ) : (
                    <div className='absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900' />
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-[#0a0c14] via-transparent to-transparent' />

                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border ${getSubjectColor(material.subject)}`}>
                    {material.subject}
                  </div>

                  <div className='absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/50'>
                    Grade {material.gradeLevel}
                  </div>
                </div>

                <div className='p-6 space-y-4'>
                  <div>
                    <h3 className='text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors'>
                      {material.title}
                    </h3>
                    <p className='text-zinc-400 line-clamp-2'>
                      {material.description}
                    </p>
                  </div>

                  <div className='space-y-3 pt-2'>
                    <div className='flex items-center gap-2 text-xs text-zinc-500'>
                      <GraduationCap className='h-4 w-4' />
                      <span>Available Resources</span>
                    </div>

                    <div className='space-y-2'>
                      {material.mainContentUrl && (
                        <a
                          href={material.mainContentUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center justify-between p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all group/link'>
                          <div className='flex items-center gap-3'>
                            <div className='p-2 rounded-md bg-blue-500/10'>
                              <FileIcon fileType={material.fileType} />
                            </div>
                            <span className='text-sm text-zinc-300'>
                              Main Content
                            </span>
                          </div>
                          <ExternalLink className='h-4 w-4 text-zinc-500 group-hover/link:text-emerald-400 transition-colors' />
                        </a>
                      )}

                      {material.videoUrl && (
                        <a
                          href={material.videoUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center justify-between p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all group/link'>
                          <div className='flex items-center gap-3'>
                            <div className='p-2 rounded-md bg-red-500/10'>
                              <Video className='h-5 w-5 text-red-400' />
                            </div>
                            <span className='text-sm text-zinc-300'>
                              Video Lesson
                            </span>
                          </div>
                          <ExternalLink className='h-4 w-4 text-zinc-500 group-hover/link:text-emerald-400 transition-colors' />
                        </a>
                      )}

                      {material.materialBannerUrl && (
                        <a
                          href={material.materialBannerUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center justify-between p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all group/link'>
                          <div className='flex items-center gap-3'>
                            <div className='p-2 rounded-md bg-purple-500/10'>
                              <ImageIcon className='h-5 w-5 text-purple-400' />
                            </div>
                            <span className='text-sm text-zinc-300'>
                              View Image
                            </span>
                          </div>
                          <Eye className='h-4 w-4 text-zinc-500 group-hover/link:text-emerald-400 transition-colors' />
                        </a>
                      )}

                      {material.additionalResourcesUrls.length > 0 && (
                        <div className='mt-3'>
                          <div className='text-xs text-zinc-500 mb-2'>
                            Additional Resources
                          </div>
                          {material.additionalResourcesUrls.map(
                            (url, index) => (
                              <a
                                key={index}
                                href={url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center justify-between p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all group/link mb-2 last:mb-0'>
                                <div className='flex items-center gap-3'>
                                  <div className='p-2 rounded-md bg-emerald-500/10'>
                                    <Paperclip className='h-5 w-5 text-emerald-400' />
                                  </div>
                                  <span className='text-sm text-zinc-300'>
                                    Resource {index + 1}
                                  </span>
                                </div>
                                <ExternalLink className='h-4 w-4 text-zinc-500 group-hover/link:text-emerald-400 transition-colors' />
                              </a>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default StudyMaterials;
