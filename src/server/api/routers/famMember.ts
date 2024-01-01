import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";
import { getCalendarDates } from "../helpers/getCalendarDates";

export const famMemberRouter = createTRPCRouter({
  getFamById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      if (!authorId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const selectedFam = await ctx.db.famMembers.findMany({
        where: {
          AND: { FMfamId: { equals: input }, authorId: { equals: authorId } },
        },
      });

      const selectedFamChildren = await ctx.db.famMembers.findMany({
        where: { FMparentId: input },
      });

      return {
        parents: selectedFam,
        children: selectedFamChildren,
      };
    }),

  addFamMember: publicProcedure
    .input(
      z.object({
        FMname: z.string(),
        FMType: z.enum(["PARENT", "SPOUSE", "CHILD"]),
        famId: z.string().optional(),
        famDob: z.string().optional(),
        famPetname: z.string().optional(),
        famLoc: z.string().optional(),
        famPro: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      if (!authorId) throw new TRPCError({ code: "UNAUTHORIZED" });

      //TODO: try removing reponse and dirtectly returning
      let reponse;

      const dataBody = {
        FM_name: input.FMname,
        FM_dob: input.famDob ? input.famDob : null,
        FM_Petname: input.famPetname ? input.famPetname : null,
        FM_loc: input.famLoc ? input.famLoc : null,
        FM_Professon: input.famPro ? input.famPro : null,
        authorId,
      };

      switch (input.FMType) {
        case "PARENT":
          reponse = await db.famMembers.create({
            data: {
              ...dataBody,
              FMfamId: input.famId ? input.famId : "AAA",
              // ParentId: input.parentId ? input.parentId : "AAA",
            },
          });
          break;
        case "SPOUSE":
          reponse = await db.famMembers.create({
            data: {
              ...dataBody,
              FMfamId: input.famId ? input.famId : "AAA",
            },
          });
          break;
        case "CHILD":
          reponse = await db.famMembers.create({
            data: {
              ...dataBody,
              FMparentId: input.famId,
            },
          });
          break;
        default:
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Invalid FMTYpe",
          });
      }

      console.log({ reponse });

      return reponse;
    }),

  deleteFamMember: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      if (!authorId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const user = await db.famMembers.delete({
        where: {
          id: input,
        },
      });

      return user;
    }),

  getCalendarDates: publicProcedure.input(z.null()).query(async ({ ctx }) => {
    const authorId = ctx.userId;

    if (!authorId) throw new TRPCError({ code: "UNAUTHORIZED" });
    const NameByDob = await db.famMembers.findMany({
      select: {
        FM_name: true,
        FM_dob: true,
      },
      where: {
        authorId: authorId,
      },
    });

    const dates = getCalendarDates(NameByDob);

    return dates;
  }),
});
