import * as z from "zod";

export const AddFamMemberformSchema = z.object({
  fullName: z.string().min(2).max(50),
  isAlive: z.optional(z.enum(["A", "D"])),
  dob: z.optional(z.date()),
  petname: z.string().optional(),
  location: z.string().optional(),
  profession: z.string().optional(),
});
