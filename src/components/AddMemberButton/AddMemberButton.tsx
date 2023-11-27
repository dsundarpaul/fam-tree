import React from "react";
import { Button } from "../ui/button";

interface AddMemberButtonProps {
  callback: () => void;
}

const AddMemberButton = ({ callback }: AddMemberButtonProps) => {
  return (
    <Button
      onClick={() => callback()}
      className="h-[110px] w-[110px] border-[1px] border-dashed border-black bg-transparent text-black transition-all delay-100  hover:scale-105 hover:bg-slate-200 hover:text-[16px]"
    >
      Add Member
    </Button>
  );
};

export default AddMemberButton;
