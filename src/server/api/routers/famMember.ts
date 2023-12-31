import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";
import type { FamMembers } from "@prisma/client";
import { getCalendarDates } from "../helpers/getCalendarDates";

export const famMemberRouter = createTRPCRouter({
  getFamByParentId: publicProcedure
    .input(z.object({ parentId: z.string() }))
    .query(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 10000));

      let selectedMemberChildren;

      const selectedMember: FamMembers | null =
        await ctx.db.famMembers.findFirst({
          where: { FMfamId: "" },
        });

      console.log({ selectedMember });

      if (!selectedMember) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Invalid Fam member fam id",
        });
      }

      if (selectedMember) {
        selectedMemberChildren = await ctx.db.famMembers.findMany({
          where: { FMfamId: selectedMember.id },
        });
      }

      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name: selectedMember ? selectedMember.FM_name : "",
        id: selectedMember ? selectedMember.id : null,
        spouseName: null,
        children: selectedMemberChildren,
      };
    }),

  getFamById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const selectedFam = await ctx.db.famMembers.findMany({
        where: { FMfamId: input },
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
    .mutation(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      let reponse;

      switch (input.FMType) {
        case "PARENT":
          reponse = await db.famMembers.create({
            data: {
              FM_name: input.FMname,
              FMfamId: input.famId ? input.famId : "AAA",
              FM_dob: input.famDob ? input.famDob : null,
              FM_Petname: input.famPetname ? input.famPetname : null,
              FM_loc: input.famLoc ? input.famLoc : null,
              FM_Professon: input.famPro ? input.famPro : null,
              // ParentId: input.parentId ? input.parentId : "AAA",
            },
          });
          break;
        case "SPOUSE":
          reponse = await db.famMembers.create({
            data: {
              FM_name: input.FMname,
              FMfamId: input.famId,
              FM_dob: input.famDob ? input.famDob : null,
              FM_Petname: input.famPetname ? input.famPetname : null,
              FM_loc: input.famLoc ? input.famLoc : null,
              FM_Professon: input.famPro ? input.famPro : null,
            },
          });
          break;
        case "CHILD":
          reponse = await db.famMembers.create({
            data: {
              FM_name: input.FMname,
              FMparentId: input.famId,
              FM_dob: input.famDob ? input.famDob : null,
              FM_Petname: input.famPetname ? input.famPetname : null,
              FM_loc: input.famLoc ? input.famLoc : null,
              FM_Professon: input.famPro ? input.famPro : null,
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
    .mutation(async ({ input }) => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));

      const user = await db.famMembers.delete({
        where: {
          id: input,
        },
      });

      return user;
    }),

  getCalendarDates: publicProcedure.input(z.null()).query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const NameByDob = await db.famMembers.findMany({
      select: {
        FM_name: true,
        FM_dob: true,
      },
    });

    const dates = getCalendarDates(NameByDob);

    return dates;
  }),
});
