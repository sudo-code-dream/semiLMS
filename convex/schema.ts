import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.union(v.literal("student"), v.literal("teacher")),
    companyRole: v.optional(
      v.union(
        v.literal("Ceo"),
        v.literal("Back End Developer"),
        v.literal("Front End Developer"),
        v.literal("Fullstack Developer"),
        v.literal("Prompt Engineer"),
        v.literal("Project Manager"),
        v.literal("") // default because user should not be part of the company
      )
    ),
    subscription: v.optional(
      v.object({
        type: v.union(v.literal("trial"), v.literal("Institution Plan")),
        schoolName: v.optional(v.string()),
      })
    ),
    isAdmin: v.optional(v.boolean()), // default is false can be found in users.ts
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  interviews: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string()),
  })
    .index("by_candidate_id", ["candidateId"])
    .index("by_stream_call_id", ["streamCallId"]),

  comments: defineTable({
    content: v.string(),
    rating: v.number(),
    interviewId: v.id("interviews"),
    interviewerId: v.string(),
  }).index("by_interview_id", ["interviewId"]),

  studyMaterials: defineTable({
    title: v.string(),
    description: v.string(),
    subject: v.string(),
    gradeLevel: v.number(),
    quarter: v.number(),
    teacherId: v.string(),
    mainContentUrl: v.string(), // PDF URL
    additionalResourcesUrls: v.array(v.string()), // Array of resource URLs
    fileType: v.union(
      v.literal("pdf"),
      v.literal("video"),
      v.literal("attachment")
    ),
    videoUrl: v.optional(v.string()), // Optional video URL
    materialBannerUrl: v.optional(v.string()), // Optional banner URL
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  // New table for tracking assignments
  assignments: defineTable({
    assignedToUserId: v.id("users"),
    assignedToUserName: v.string(),
    assignedToUserEmail: v.string(),
    schoolName: v.string(),
    assignedByUserId: v.string(), // Clerk ID of the teacher who made the assignment
    assignedByUserName: v.string(),
    status: v.string(), // "completed", "pending", etc.
    type: v.string(), // "institution_plan", etc.
    createdAt: v.number(),
  })
    .index("by_assigned_by", ["assignedByUserId"])
    .index("by_assigned_to", ["assignedToUserId"])
    .index("by_type", ["type"])
    .index("by_created_at", ["createdAt"]),
});
