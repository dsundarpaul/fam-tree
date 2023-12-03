import React from "react";
import { Button } from "../ui/button";
import { type FMTypeKeys } from "~/constants/consts";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type FamNavigationButtonProps = {
  memberType: Omit<FMTypeKeys, "SPOUSE">;
  navigateTo: string | null;
};

const FamNavigationButton = ({
  memberType,
  navigateTo,
}: FamNavigationButtonProps) => {
  return (
    <div>
      <Button
        className={` ${
          memberType === "PARENT" ? "mb-2" : "mt-2"
        }  w-full  bg-transparent text-slate-600 hover:animate-bounce hover:bg-transparent `}
        // onClick={() => callback()}
      >
        <Link href={`/${navigateTo}`}>
          {memberType === "PARENT" ? (
            <>
              <ArrowUpIcon />
              <div>Go Pervious</div>
            </>
          ) : (
            <>
              Show Family
              <ArrowDownIcon className="text-black" />
            </>
          )}
        </Link>
      </Button>
    </div>
  );
};

export default FamNavigationButton;
