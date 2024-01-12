import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { db } from "~/server/db";
import { getCalendarDates } from "../helpers/getCalendarDates";
import { getAddFMbody } from "../helpers/getAddFMbody";
import { utapi } from "./uploadthing";
import { TRPCError } from "@trpc/server";

const FMTypes = z.enum(["PARENT", "SPOUSE", "CHILD", "SPOUSE_PARENT"]);

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
        FMType: FMTypes,
        famId: z.string().optional(),
        famDob: z.string().optional(),
        famPetname: z.string().optional(),
        famLoc: z.string().optional(),
        famPro: z.string().optional(),
        famDp: z.string().optional(),
        famDpFileKey: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const authorId = ctx.userId;

      //TODO: try removing reponse and dirtectly returning

      const dataBody = getAddFMbody(input);
      console.log({ authorId });
      try {
        await db.famMembers.updateMany({
          where: { FMfamId: input.famId },
          data: { canDelete: false },
        });

        const reponse = await db.famMembers.create({
          data: {
            ...dataBody,
            authorId: authorId,
          },
        });

        console.log({ reponse });

        return reponse;
      } catch {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  deleteFamMember: privateProcedure
    .input(
      z.object({
        memberId: z.string(),
        memberFamId: z.string().nullable(),
        memberParentFamId: z.string().optional(),
        memberDbFileKey: z.string().optional(),
        memberType: FMTypes,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await db.famMembers.delete({
          where: {
            id: input.memberId,
          },
        });

        if (input.memberDbFileKey) {
          await utapi.deleteFiles(input.memberDbFileKey);
        }

        await db.famMembers.updateMany({
          where: { FMfamId: input.memberFamId },
          data: { canDelete: true },
        });

        if (input.memberType === "CHILD") {
          await db.famMembers.updateMany({
            where: { FMfamId: input.memberParentFamId },
            data: { canDelete: true },
          });
        }

        return user;
      } catch {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
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
