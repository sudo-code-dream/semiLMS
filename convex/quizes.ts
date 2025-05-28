import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createQuiz = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    questions: v.array(
      v.object({
        type: v.string(),
        question: v.string(),
        options: v.optional(v.array(v.string())),
        correctAnswer: v.any(),
        points: v.number(),
      })
    ),
    timeLimit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Generate a random 6-character code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const quiz = await ctx.db.insert("quizzes", {
      ...args,
      code,
      createdBy: identity.subject,
      createdAt: Date.now(),
    });

    return quiz;
  },
});

export const getTeacherQuizzes = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const quizzes = await ctx.db
      .query("quizzes")
      .filter((q) => q.eq(q.field("createdBy"), identity.subject))
      .order("desc")
      .collect();

    return quizzes;
  },
});

export const getQuizByCode = query({
  args: { code: v.string() },
  handler: async (ctx, { code }) => {
    const quiz = await ctx.db
      .query("quizzes")
      .withIndex("by_code", (q) => q.eq("code", code))
      .first();

    return quiz;
  },
});
