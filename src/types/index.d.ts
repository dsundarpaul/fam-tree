import * as z from "zod";
import { type RouterOutputs } from "~/utils/api";

export type famMemberType = {
  id: string;
  FMname: string;
  ParentId: string | null;
  FamId: string | null;
};

export type childType = {
  id: string;
  FMname: string;
  ParentId: string;
  FamId: string;
};

export const FMObjectType = z.object({
  FMname: z.string().min(1).max(20),
  FMSpouse: z.string().min(1).max(20),
});

// export type GetChildrenType =
//   RouterOutputs["famMember"]["getFamById"]["parents"];

export type GetFamMemberType =
  RouterOutputs["famMember"]["getFamById"]["children"][number];
