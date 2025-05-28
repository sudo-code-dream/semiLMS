import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    schoolName: v.string(),
    attachments: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    isPinned: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Get teacher info
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user.role !== "teacher") {
      throw new Error("Only teachers can create announcements");
    }

    return await ctx.db.insert("announcements", {
      ...args,
      teacherId: identity.subject,
      teacherName: user.name,
      createdAt: Date.now(),
      status: "active",
    });
  },
});

export const getBySchool = query({
  args: { schoolName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("announcements")
      .withIndex("by_school", (q) => q.eq("schoolName", args.schoolName))
      .filter((q) => q.eq(q.field("status"), "active"))
      .order("desc")
      .collect();
  },
});

export const getByTeacher = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db
      .query("announcements")
      .withIndex("by_teacher", (q) => q.eq("teacherId", identity.subject))
      .order("desc")
      .collect();
  },
});
