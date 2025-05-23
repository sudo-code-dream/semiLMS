import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Terms of Service & Privacy Policy</h1>
            <p className="text-zinc-400">Last updated: May 23, 2024</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-emerald-500">Welcome to Fudemy</h2>
            <p>
              Welcome to Fudemy by Fud00 Tech – a learning platform where teachers can upload study materials and
              quizzes, and students can access and complete them.
            </p>

            <p>
              These Terms of Service ("Terms") govern your access to and use of the Fudemy platform. By accessing or
              using Fudemy, you agree to be bound by these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-emerald-500">1. User Agreements</h2>
            <p>By using Fudemy, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the platform for educational purposes only.</li>
              <li>Respect intellectual property and not upload harmful or illegal content.</li>
              <li>Keep your account information accurate and secure.</li>
              <li>Not attempt to gain unauthorized access to any part of the Service.</li>
              <li>Not use the Service for any illegal or unauthorized purpose.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-emerald-500">2. Privacy Policy</h2>
            <p>
              We collect basic info like your name, email, and activity to improve your learning experience. We do not
              sell your data and only share it with your school as needed.
            </p>
            <p>The information we collect includes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Account information (name, email, password)</li>
              <li>Profile information (profile picture, bio)</li>
              <li>Usage data (how you interact with the platform)</li>
              <li>Content you upload or create on the platform</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-emerald-500">3. Content Ownership</h2>
            <p>
              You retain ownership of any content you upload to Fudemy. However, by uploading content, you grant Fudemy
              a license to use, store, and share your content in connection with providing the Service.
            </p>
          </section>

          {/* Add more sections as needed */}

          <div className="pt-8 border-t border-zinc-800">
            <p className="text-zinc-400 text-sm">
              If you have any questions about these Terms, please contact us at support@fudemy.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
