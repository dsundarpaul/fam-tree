import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";
import { getCalendarDates } from "../helpers/getCalendarDates";
import { getAddFMbody } from "../helpers/getAddFMbody";

export const famMemberRouter = createTRPCRouter({
  getFamById: privateProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const selectedFam = await ctx.db.famMembers.findMany({
        where: {
          AND: { FMfamId: { equals: input }, authorId: { equals: authorId } },
        },
      });

      const selectedFamChildren = await ctx.db.famMembers.findMany({
        where: {
          AND: {
            FMparentId: { equals: input },
            authorId: { equals: authorId },
          },
        },
      });

      return {
        parents: selectedFam,
        children: selectedFamChildren,
      };
    }),

  addFamMember: privateProcedure
    .input(
      z.object({
        FMname: z.string(),
        FMType: z.enum(["PARENT", "SPOUSE", "CHILD"]),
        famId: z.string().optional(),
        famDob: z.string().optional(),
        famPetname: z.string().optional(),
        famLoc: z.string().optional(),
        famPro: z.string().optional(),
        famDp: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const authorId = ctx.userId;

      await db.famMembers.updateMany({
        where: { FMfamId: input.famId },
        data: { canDelete: false },
      });

      //TODO: try removing reponse and dirtectly returning

      const dataBody = getAddFMbody(input);

      const reponse = await db.famMembers.create({
        data: {
          ...dataBody,
          authorId: authorId,
          // ParentId: input.parentId ? input.parentId : "AAA",
        },
      });

      console.log({ reponse });

      return reponse;
    }),

  deleteFamMember: privateProcedure
    .input(
      z.object({
        memberId: z.string(),
        memberParentFamId: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const user = await db.famMembers.delete({
        where: {
          id: input.memberId,
        },
      });

      await db.famMembers.updateMany({
        where: { FMfamId: input.memberParentFamId },
        data: { canDelete: true },
      });

      return user;
    }),

  getCalendarDates: privateProcedure.input(z.null()).query(async ({ ctx }) => {
    const authorId = ctx.userId;

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
