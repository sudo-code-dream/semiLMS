import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        role: v.union(v.literal("student"), v.literal("teacher")),
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
    }).index("by_candidate_id", ["candidateId"])
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
        fileType: v.union(v.literal('pdf'), v.literal('video'), v.literal('attachment')),
        videoUrl: v.optional(v.string()), // Optional video URL
        createdAt: v.number(),
        updatedAt: v.number(),
    }),


})


