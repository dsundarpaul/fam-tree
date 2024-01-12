export const FamMember = {
  PARENT: "PARENT",
  SPOUSE: "SPOUSE",
  CHILD: "CHILD",
  SPOUSE_PARENT: "SPOUSE_PARENT",
} as const;

export type FMTypeKeys = keyof typeof FamMember;

export const FILLER_IMAGE =
  "https://utfs.io/f/8a8ebf48-7607-41ac-8cf7-4aaf38f60882-velizm.png";
