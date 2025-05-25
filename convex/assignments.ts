import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Track institution plan assignments
export const logAssignment = mutation({
  args: {
    assignedToUserId: v.id("users"),
    assignedToUserName: v.string(),
    assignedToUserEmail: v.string(),
    schoolName: v.string(),
    assignedByUserId: v.string(),
    assignedByUserName: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify the user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Insert the assignment record
    const assignment = await ctx.db.insert("assignments", {
      assignedToUserId: args.assignedToUserId,
      assignedToUserName: args.assignedToUserName,
      assignedToUserEmail: args.assignedToUserEmail,
      schoolName: args.schoolName,
      assignedByUserId: args.assignedByUserId,
      assignedByUserName: args.assignedByUserName,
      status: "completed",
      type: "institution_plan",
      createdAt: Date.now(),
    });
    return assignment;
  },
});

// Get recent assignments for activity feed
export const getRecentAssignments = query({
  args: {},
  handler: async (ctx) => {
    // Verify the user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const assignments = await ctx.db
      .query("assignments")
      .order("desc")
      .take(10);
    return assignments;
  },
});

// Get assignments by user (who assigned them)
export const getMyAssignments = query({
  args: {}, // Add this empty args object
  handler: async (ctx) => {
    // Verify the user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    // Get the user's Clerk ID
    const userId = identity.subject;

    // Get assignments made by this user
    const assignments = await ctx.db
      .query("assignments")
      .filter((q) => q.eq(q.field("assignedByUserId"), userId))
      .order("desc")
      .take(10);

    return assignments;
  },
});

export const getAssignedToMe = query({
  args: {}, // Add this empty args object
  handler: async (ctx) => {
    // Verify the user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    // Get the user's Clerk ID
    const userId = identity.name;

    // Get assignments made by this user
    const assignments = await ctx.db
      .query("assignments")
      .filter((q) => q.eq(q.field("assignedToUserName"), userId))
      .order("desc")
      .take(10);
    return assignments;
  },
});
