import React from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

interface AddMemberButtonProps {
  callback: () => void;
}

const AddMemberButton = ({ callback }: AddMemberButtonProps) => {
  return (
    <Button
      onClick={() => callback()}
      // border-[1px] border-dashed border-black
      className="flex h-[110px] w-[110px] flex-col border-none bg-transparent text-stone-600 transition-all delay-100 hover:scale-105 hover:bg-slate-200 hover:text-[16px]"
    >
      <PlusIcon className="h-12 w-12 text-stone-600" />
      Add Member
    </Button>
  );
};

export default AddMemberButton;
