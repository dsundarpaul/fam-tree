import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { createClient } from "@supabase/supabase-js";
import { env } from "~/env.mjs";
import { v4 as uuidv4 } from "uuid";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";

export const mediaRouter = createTRPCRouter({
  createSignedURL: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx }) => {
      const authorId = ctx.userId;
      const filename = uuidv4();

      // await db.modSpaces.create({
      //   data: {
      //     authorId: authorId,
      //     filename: filename
      //   }
      // });

      const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

      const { data, error } = await supabase.storage
        .from("fam-dpies")
        .createSignedUploadUrl(`${authorId}/${filename}.jpeg`);

      if (error) {
        console.log(error, "****************************");
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return { data };
    }),
});
