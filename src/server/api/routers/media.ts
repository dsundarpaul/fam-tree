import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { createClient } from "@supabase/supabase-js";
import { env } from "~/env.mjs";
import { v4 as uuidv4 } from "uuid";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";

const FileSchema = z.object({
  name: z.string(),
  data: z.string(),
});

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

export const mediaRouter = createTRPCRouter({
  uploadMedia: privateProcedure
    .input(z.object({ file: z.instanceof(File) }))
    // .input(
    //   z.object({
    //     file: z
    //       .custom<File>((val) => val instanceof File, "Please upload a file")
    //       .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
    //         message: "Please choose jpeg/png format files only",
    //       }),
    //   }),
    // )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

      console.log({ supabase });

      const { name: filename } = input.file;

      await supabase.storage
        .from("fam_dpies")
        .upload(`${authorId}/${filename + uuidv4()}.jpeg`, input.file, {
          cacheControl: "3600",
          upsert: false,
        })
        .then(({ data, error }) => {
          console.log({ data, error });
          if (data) {
            const { data: puburl } = supabase.storage
              .from("fam-dpies")
              .getPublicUrl(`${authorId}/${filename}.jpeg`);

            console.log({ puburl });
          }
        });

      return "upload media here";
    }),
    createSignedURL: privateProcedure.input(z.string()).mutation(async ({ ctx }) => {
      const authorId = ctx.userId;
      const filename = uuidv4()
      
      // await db.modSpaces.create({
      //   data: {
      //     authorId: authorId,
      //     filename: filename
      //   }
      // });

      const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

      const { data, error } = await supabase 
      .storage
      .from('fam-dpies')
      .createSignedUploadUrl(`${authorId}/${filename}.jpeg`)

      if (error) {
        console.log( error, '****************************' )
        throw new TRPCError({ code: 'BAD_REQUEST'})
      }
      return { data }
    })
});
