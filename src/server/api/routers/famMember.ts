import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import input from "postcss/lib/input";
import { db } from "~/server/db";

export const famMemberRouter = createTRPCRouter({
  getFamByParentId: publicProcedure
    .input(z.object({ parentId: z.string() }))
    .query(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 10000));

      let selectedMemberChildren;

      const selectedMember = await ctx.db.famMembers.findFirst({
        where: { FMfamId: "" },
      });

      console.log({ selectedMember });

      if (selectedMember) {
        selectedMemberChildren = await ctx.db.famMembers.findMany({
          where: { FMfamId: selectedMember.id },
        });
      }

      return {
        name: selectedMember ? selectedMember.FMname : "",
        id: selectedMember ? selectedMember.id : null,
        spouseName: null,
        children: selectedMemberChildren,
      };
    }),

  getFamById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 10000));

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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input.FMname);
      let reponse;

      console.log(input.FMType, "**************");
      switch (input.FMType) {
        case "PARENT":
          reponse = await db.famMembers.create({
            data: {
              FMname: input.FMname,
              FMfamId: input.famId ? input.famId : "AAA",
              // ParentId: input.parentId ? input.parentId : "AAA",
            },
          });
          break;
        case "SPOUSE":
          reponse = await db.famMembers.create({
            data: {
              FMname: input.FMname,
              FMfamId: input.famId,
            },
          });
          break;
        case "CHILD":
          reponse = await db.famMembers.create({
            data: {
              FMname: input.FMname,
              FMparentId: input.famId,
            },
          });
        default:
          return "something went wrong!";
      }

      console.log({ reponse });

      return reponse;
    }),

  deleteFamMember: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const user = await db.famMembers.delete({
        where: {
          id: input,
        },
      });

      return user;
    }),
});
