/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as announcements from "../announcements.js";
import type * as assignments from "../assignments.js";
import type * as comments from "../comments.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as interviews from "../interviews.js";
import type * as quizes from "../quizes.js";
import type * as studyMaterials from "../studyMaterials.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  announcements: typeof announcements;
  assignments: typeof assignments;
  comments: typeof comments;
  files: typeof files;
  http: typeof http;
  interviews: typeof interviews;
  quizes: typeof quizes;
  studyMaterials: typeof studyMaterials;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
