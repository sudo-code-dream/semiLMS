// convex/files.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {
    filename: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.generateUploadUrl();
  },
});