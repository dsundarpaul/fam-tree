import { Prisma } from "@prisma/client";
import * as z from "zod";
import { RouterInputs, type RouterOutputs } from "~/utils/api";

export interface SidebarLink {
  icon: string;
  route: string;
  label: string;
}

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

export type SignedUploadURLType =
  RouterOutputs["media"]["createSignedURL"]["signedUploadURLData"];

export type MonthwiseBirthDayCollectionType = {
  month: string;
  birthdays: {
    memberName: string;
    date: string;
  }[];
};
