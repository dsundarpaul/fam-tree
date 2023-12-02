import * as z from "zod";

export const AddFamMemberformSchema = z.object({
  fullName: z.string().min(2).max(50),
  gender: z.optional(z.enum(["M", "F"])),
  dob: z.optional(z.string()),
});
