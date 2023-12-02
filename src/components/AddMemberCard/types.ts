import { type FMTypeKeys } from "~/constants/consts";

export interface AddMemberCardPropsType {
  /**
   * famId used for api calls
   */
  famId: string;

  /**
   * FMType tells the type of family member
   */
  FMType: FMTypeKeys;
}
