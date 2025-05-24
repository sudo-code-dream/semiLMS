import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const syncUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    image: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();
    if (existingUser) return;

    return await ctx.db.insert("users", {
      ...args,
      role: "student",
    });
  },
});

export const getUsers = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const users = await ctx.db.query("users").collect();

    return users;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    return user;
  },
});

export const getUserRoleData = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.userId))
      .first();

    if (!user) return null;

    return {
      role: user.role,
      companyRole: user.companyRole ?? "", // Ensure fallback if undefined
    };
  },
});

export const getSubcriptionPlan = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.userId))
      .first();

    if (!user) return null;

    return {
      role: user.role,
      subscription: user.subscription?.type ?? "", // Ensure fallback if undefined
      schoolname: user.subscription?.schoolName ?? "", // Ensure fallback if undefined
    };
  },
});

export const assignInstitutionPlan = mutation({
  args: {
    userId: v.id("users"), // Convex internal ID for user
    schoolName: v.string(),
  },
  handler: async (ctx, { userId, schoolName }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Find the teacher by clerkId
    const teacher = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), identity.subject))
      .first();

    if (!teacher || teacher.role !== "teacher") {
      throw new Error("Only teachers can assign institution plans.");
    }

    // Update the user's subscription field
    await ctx.db.patch(userId, {
      subscription: {
        type: "Institution Plan",
        schoolName,
      },
    });
  },
});

export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});
