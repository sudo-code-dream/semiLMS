"use client";

import { useEffect } from "react";
import { X, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
            onClick={onClose}
          />

          {/* Modal - Centered with fixed width */}
          <div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className='w-full max-w-md'
              onClick={(e) => e.stopPropagation()}>
              <div className='bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden'>
                {/* Header */}
                <div className='flex items-center justify-between p-5 border-b border-zinc-800'>
                  <div className='flex items-center gap-2'>
                    <FileText className='w-5 h-5 text-emerald-500' />
                    <h2 className='text-lg font-semibold text-white'>
                      Terms & Privacy
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className='rounded-full p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors'>
                    <X className='w-5 h-5' />
                  </button>
                </div>

                {/* Content */}
                <div className='p-5 space-y-4 text-zinc-300'>
                  <p className='text-sm leading-relaxed'>
                    Welcome to Fudemy by Fud00 Tech – a learning platform where
                    teachers can upload study materials and quizzes, and
                    students can access and complete them.
                  </p>

                  <p className='text-sm leading-relaxed'>
                    By using Fudemy, you agree to:
                  </p>

                  <ul className='list-disc pl-5 text-sm space-y-1'>
                    <li>Use the platform for educational purposes only.</li>
                    <li>
                      Respect intellectual property and not upload harmful or
                      illegal content.
                    </li>
                    <li>Keep your account information accurate and secure.</li>
                  </ul>

                  <p className='text-sm leading-relaxed'>
                    We collect basic info like your name, email, and activity to
                    improve your learning experience. We do not sell your data
                    and only share it with your school as needed.
                  </p>

                  <p className='text-sm leading-relaxed'>
                    Your use of Fudemy means you accept our full Terms of
                    Service and Privacy Policy.
                  </p>

                  <div className='bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50 flex items-center gap-2'>
                    <div className='w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='12'
                        height='12'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-white'>
                        <polyline points='20 6 9 17 4 12'></polyline>
                      </svg>
                    </div>
                    <p className='text-sm text-zinc-300'>
                      By continuing, you agree to our Terms and Privacy Policy.
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className='p-5 border-t border-zinc-800 flex justify-end'>
                  <Link
                    href='/terms-and-policies'
                    className='flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium'>
                    Read Full Terms
                    <ExternalLink className='w-4 h-4' />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
