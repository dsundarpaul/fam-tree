import { type Prisma, type FamMembers } from "@prisma/client";
import { z } from "zod";

const getAddFMbodyProps = z.object({
  FMname: z.string(),
  FMType: z.enum(["PARENT", "SPOUSE", "CHILD"]),
  famId: z.string().optional(),
  famDob: z.string().optional(),
  famPetname: z.string().optional(),
  famLoc: z.string().optional(),
  famPro: z.string().optional(),
});

export const getAddFMbody = (input: z.infer<typeof getAddFMbodyProps>) => {
  const dataBody: Omit<Prisma.FamMembersCreateInput, "authorId"> = {
    FM_name: input.FMname,
    FM_dob: input.famDob ? input.famDob : null,
    FM_Petname: input.famPetname ? input.famPetname : null,
    FM_loc: input.famLoc ? input.famLoc : null,
    FM_Professon: input.famPro ? input.famPro : null,
    // authorId,
  };

  if (input.FMType === "PARENT" || "SPOUSE") {
    // dataBody = { ...tempObject, FMfamId: input.famId ? input.famId : "AAA" };

    dataBody.FMfamId = input.famId ? input.famId : "AAA";
  } else {
    dataBody.FMparentId = input.famId;
  }

  return dataBody;
};
