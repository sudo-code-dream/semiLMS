import { Code2, Users, BellDot, LanguagesIcon, Pin } from "lucide-react";
import { MdQuiz } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { FaComputer } from "react-icons/fa6";
import { RiEnglishInput } from "react-icons/ri";
import { PiMathOperationsDuotone } from "react-icons/pi";
import { GiMaterialsScience } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";

export const INTERVIEW_CATEGORY = [
  { id: "upcoming", title: "Upcoming Interviews", variant: "outline" },
  { id: "completed", title: "Completed", variant: "secondary" },
  { id: "succeeded", title: "Succeeded", variant: "default" },
  { id: "failed", title: "Failed", variant: "destructive" },
] as const;

export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export const QUICK_ACTIONS = [
  {
    icon: Code2,
    title: "Upload Materials",
    description: "Upload your study materials",
    color: "primary",
    gradient: "from-primary/10 via-primary/5 to-transparent",
    href: "teacher/studymaterials",
  },
  {
    icon: MdQuiz,
    title: "Create Quiz",
    description: "Create quizes for your students",
    color: "primary",
    gradient: "from-primary/10 via-primary/5 to-transparent",
    href: "teacher/create-quiz",
    underConstruction: true,
  },
  {
    icon: Users,
    title: "Check Scores",
    description: "Check student's scores ",
    underConstruction: true,
    color: "purple-500",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    href: "teacher/view-scores",
  },
  {
    icon: Users,
    title: "Student Management",
    description: "Assign students to you school",
    color: "purple-500",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    href: "teacher/students",
  },
  {
    icon: Pin,
    title: "Create Announcement",
    description: "Create announcements for students",
    color: "purple-500",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    href: "teacher/create-announcement",
  },
];

export const USER_QUICK_ACTIONS = [
  {
    icon: LuNotebookPen,
    title: "Study Materials",
    description: "Start studying",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "study-materials",
  },
  {
    icon: MdQuiz,
    title: "Quiz",
    description: "Test your skills",
    underConstruction: true,
    color: "primary",
    gradient: "from-primary/10 via-primary/5 to-transparent",
    href: "quiz",
  },
  {
    icon: BellDot,
    title: "Notifications",
    description: "View notifications",
    color: "primary",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    href: "notifications",
  },
  {
    icon: Users,
    title: "Profile",
    description: "View user profile",
    color: "primary",
    gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
    href: "profile",
  },
  {
    icon: Pin,
    title: "Announements",
    description: "View announcements",
    color: "primary",
    gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
    href: "announcements",
  },
];

export const SUBJECTS_ACTIONS = [
  {
    icon: FaComputer,
    title: "Computer",
    description: "Understanding and using digital technology.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/computersub.png",
  },
  {
    icon: RiEnglishInput,
    title: "English",
    description: "Learning language, literature, and communication.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/englishsub.png",
  },
  {
    icon: PiMathOperationsDuotone,
    title: "Mathematics",
    description: "Solving problems using numbers and logic.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/mathsub1.png",
  },
  {
    icon: GiMaterialsScience,
    title: "Science",
    description: "Exploring nature through observation and experiments.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/sciencesub.png",
  },
  {
    icon: FaHistory,
    title: "Araling Panlipunan",
    description: "Understanding history, culture, and society.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/apsub.png",
  },
  {
    icon: LanguagesIcon,
    title: "Filipino",
    description: "Understanding history, culture, and society.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/filipinosub.png",
  },
  {
    icon: FaHistory,
    title: "TLE",
    description: "Understanding history, culture, and society.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/tlesub.png",
  },
  {
    icon: FaHistory,
    title: "ESP",
    description: "Understanding history, culture, and society.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/espsub.png",
  },
  {
    icon: FaHistory,
    title: "Music",
    description: "Understanding history, culture, and society.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/musicsub.png",
  },
  {
    icon: FaHistory,
    title: "Arts",
    description: "Understanding history, culture, and society.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/arts.png",
  },
  {
    icon: FaHistory,
    title: "Physical Education",
    description: "Understanding history, culture, and society.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/pe.png",
  },
  {
    icon: FaHistory,
    title: "Health",
    description: "Understanding history, culture, and society.",
    color: "primary",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    href: "profile",
    bannerUrl: "/healthsub.png",
  },
];

export const SUBJECTS_QUARTERS = [
  {
    id: "1",
    title: "1st Quarter",
    description: "Dream big. Start small.",
  },
  {
    id: "2",
    title: "2nd Quarter",
    description: "Chaos is a ladder.",
  },
  {
    id: "3",
    title: "3rd Quarter",
    description: "Less talk, more do.",
  },
  {
    id: "4",
    title: "4th Quarter",
    description: "Curiosity fuels creation.",
  },
];

export const CODING_QUESTIONS: CodeQuestion[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers in the array such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
      python: `def two_sum(nums, target):
    # Write your solution here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
    },
    constraints: [
      "2 ≤ nums.length ≤ 104",
      "-109 ≤ nums[i] ≤ 109",
      "-109 ≤ target ≤ 109",
      "Only one valid answer exists.",
    ],
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}`,
      python: `def reverse_string(s):
    # Write your solution here
    pass`,
      java: `class Solution {
    public void reverseString(char[] s) {
        // Write your solution here
        
    }
}`,
    },
  },
  {
    id: "palindrome-number",
    title: "Palindrome Number",
    description:
      "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward.",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation:
          "121 reads as 121 from left to right and from right to left.",
      },
      {
        input: "x = -121",
        output: "false",
        explanation:
          "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.",
      },
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {
  // Write your solution here
  
}`,
      python: `def is_palindrome(x):
    # Write your solution here
    pass`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your solution here
        
    }
}`,
    },
  },
];

export const LANGUAGES = [
  { id: "javascript", name: "JavaScript", icon: "/javascript.png" },
  { id: "python", name: "Python", icon: "/python.png" },
  { id: "java", name: "Java", icon: "/java.png" },
] as const;

export interface CodeQuestion {
  id: string;
  title: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  starterCode: {
    javascript: string;
    python: string;
    java: string;
  };
  constraints?: string[];
}

export type QuickActionType = (typeof QUICK_ACTIONS)[number];
export type QuickActionType2 = (typeof SUBJECTS_ACTIONS)[number];
export type QuickActionType3 = (typeof SUBJECTS_QUARTERS)[number];
