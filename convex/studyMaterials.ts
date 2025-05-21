// convex/studyMaterials.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
    fileType: v.union(v.literal('pdf'), v.literal('video'), v.literal('attachment')),
    videoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const studyMaterial = await ctx.db.insert("studyMaterials", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return studyMaterial;
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

export const deleteStudyMaterial = mutation({
  args: { id: v.id("studyMaterials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getByQuarter = query({
  args: { quarter: v.number() },
  handler: async (ctx, args) => {
    const materials = await ctx.db
        .query("studyMaterials")
        .filter((q) => q.eq(q.field("quarter"), args.quarter))
        .order("desc")
        .collect();
    return materials;
  },
});
