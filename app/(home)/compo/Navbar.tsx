import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              Fudemy
            </Link>
            <div className='hidden md:block ml-10'>
              <div className='flex items-center space-x-8'>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white'>
                  Pricing
                </Link>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white'>
                  Features
                </Link>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white'>
                  About
                </Link>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white'>
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <SignInButton>
              <Button variant='ghost' className='text-sm'>
                Sign In
              </Button>
            </SignInButton>
            <Button className='text-sm bg-gradient-to-r from-primary to-accent hover:opacity-90'>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
