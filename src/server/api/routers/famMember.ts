import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const famMemberRouter = createTRPCRouter({
  getFamByParentId: publicProcedure.input(z.string()).query(({ input }) => {
    return "";
  }),
});
