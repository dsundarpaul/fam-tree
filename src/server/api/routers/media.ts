import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { createClient } from "@supabase/supabase-js";

export const mediaRouter = createTRPCRouter({
  uploadMedia: publicProcedure
    .input(z.object({ file: z.string() }))
    .query(async ({ ctx, input }) => {
      const supabase = createClient("", "");

      const { data, error } = await supabase.storage
        .from("")
        .upload("", input.file);

      return "upload media here";
    }),
});
