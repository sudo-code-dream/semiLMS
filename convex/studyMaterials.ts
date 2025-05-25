// convex/studyMaterials.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    subject: v.string(),
    gradeLevel: v.number(),
    quarter: v.number(),
    teacherId: v.string(),
    mainContentUrl: v.string(),
    additionalResourcesUrls: v.array(v.string()),
    fileType: v.union(
      v.literal("pdf"),
      v.literal("video"),
      v.literal("attachment")
    ),
    videoUrl: v.optional(v.string()),
    materialBannerUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const studyMaterial = await ctx.db.insert("studyMaterials", {
      description: args.description,
      subject: args.subject,
      gradeLevel: args.gradeLevel,
      mainContentUrl: args.mainContentUrl,
      quarter: args.quarter,
      additionalResourcesUrls: args.additionalResourcesUrls,
      fileType: args.fileType,
      videoUrl: args.videoUrl,
      materialBannerUrl: args.materialBannerUrl,
      title: args.title,
      teacherId: args.teacherId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return studyMaterial;
  },
});

export const getUploadedByMeForNotif = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const userId = identity.subject;

    const uploadedByMe = await ctx.db
      .query("studyMaterials")
      .filter((q) => q.eq(q.field("teacherId"), userId))
      .order("desc")
      .take(10);

    return uploadedByMe;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const materials = await ctx.db
      .query("studyMaterials")
      .order("desc")
      .collect();
    return materials;
  },
});

// UPDATED: Added authorization check to deleteStudyMaterial
export const deleteStudyMaterial = mutation({
  args: { id: v.id("studyMaterials") },
  handler: async (ctx, args) => {
    // Get the current user from Clerk authentication
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    // Get the study material to check ownership
    const material = await ctx.db.get(args.id);

    if (!material) {
      throw new ConvexError("Study material not found");
    }

    // Check if the current user is the teacher who created it
    // Compare Clerk user ID with the teacherId stored in the material
    if (material.teacherId !== identity.subject) {
      throw new ConvexError("You can only delete study materials you created");
    }

    // If all checks pass, delete the material
    await ctx.db.delete(args.id);

    return { success: true };
  },
});

export const getByQuarter = query({
  args: { quarter: v.number(), grade: v.number(), subject: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const materials = await ctx.db
      .query("studyMaterials")
      .filter((q) =>
        q.and(
          q.eq(q.field("quarter"), args.quarter),
          q.eq(q.field("gradeLevel"), args.grade),
          q.eq(q.field("subject"), args.subject)
        )
      )
      .order("desc")
      .collect();
    return materials;
  },
});
