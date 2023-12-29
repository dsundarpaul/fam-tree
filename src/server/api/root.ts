import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { famMemberRouter } from "./routers/famMember";
import { mediaRouter } from "./routers/media";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  famMember: famMemberRouter,
  media: mediaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
