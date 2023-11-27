export const FamMember = {
  PARENT: "PARENT",
  SPOUSE: "SPOUSE",
  CHILD: "CHILD",
} as const;

export type FMTypeKeys = keyof typeof FamMember;
