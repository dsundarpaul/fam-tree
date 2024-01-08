import { type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const getAddFMbodyProps = z.object({
  FMname: z.string(),
  FMType: z.enum(["PARENT", "SPOUSE", "CHILD"]),
  famId: z.string().optional(),
  famDob: z.string().optional(),
  famPetname: z.string().optional(),
  famLoc: z.string().optional(),
  famPro: z.string().optional(),
  famDp: z.string().optional(),
});

export const getAddFMbody = (input: z.infer<typeof getAddFMbodyProps>) => {
  const dataBody: Omit<Prisma.FamMembersCreateInput, "authorId"> = {
    FM_name: input.FMname,
    FM_dob: input.famDob ? input.famDob : null,
    FM_Petname: input.famPetname ? input.famPetname : null,
    FM_loc: input.famLoc ? input.famLoc : null,
    FM_Professon: input.famPro ? input.famPro : null,
    FM_dp: input.famDp ? input.famDp : null,
    // authorId,
  };

  switch (input.FMType) {
    case "PARENT":
    case "SPOUSE":
      dataBody.FMfamId = input.famId ? input.famId : "AAA";
      break;
    case "CHILD":
      dataBody.FMparentId = input.famId;
      break;
    default:
      throw new TRPCError({ code: "BAD_REQUEST" });
  }

  return dataBody;
};
