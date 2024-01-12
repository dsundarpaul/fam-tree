/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import ImgTemp from "../../../public/assets/missing-member-pic.png";
import { Pencil2Icon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { api } from "~/utils/api";
import { type GetFamMemberType } from "~/types";
import { FILLER_IMAGE, type FMTypeKeys } from "~/constants/consts";
import FamNavigationButton from "../famNavigationButton/FamNavigationButton";
import toast from "react-hot-toast";

type FamMemberCardProps = {
  MemberType: FMTypeKeys;
  MemberData: GetFamMemberType;
  hasChildren?: boolean;
  id?: string;
};

const FamMemberCard = ({
  MemberData,
  MemberType,
  hasChildren,
}: FamMemberCardProps) => {
  const { FM_name, FM_Petname, FM_dob, FM_Professon } = MemberData;

  const [isFammemberCardOpen, setIsFamMemberCardOpen] = useState(false);

  const ctx = api.useContext();

  const { mutate: deleteFamMember, isLoading: isDeleteFamMemberLoading } =
    api.famMember.deleteFamMember.useMutation({
      onSuccess: async () => {
        await ctx.famMember.getFamById.invalidate();

        toast.success("Sucessfully Deleted Family Member");
        setIsFamMemberCardOpen(false);
      },
    });

  const openMemberModal = () => null;

  const handleFamMemberDelete = () => {
    if (MemberData) {
      deleteFamMember({
        memberId: MemberData.id,
        memberFamId: MemberData.FMfamId,
        memberDbFileKey: MemberData.FM_dpFilekey
          ? MemberData.FM_dpFilekey
          : undefined,
      });
    } else {
      alert("member id undefined");
    }
  };

  const renderMemberCard = () => (
    <Card
      className="pt-4 hover:bg-slate-100 "
      draggable
      onClick={() => openMemberModal()}
    >
      <CardContent className="flex justify-center">
        <Image
          src={MemberData.FM_dp ? MemberData.FM_dp : ImgTemp}
          width={100}
          height={100}
          alt="img"
        />
      </CardContent>
      <CardFooter className="flex justify-center">
        <CardTitle>{FM_name}</CardTitle>
      </CardFooter>
    </Card>
  );

  const renderMemberCartContent = () => (
    <DialogContent>
      <DialogHeader>
        <div className="flex space-x-5">
          <div>
            <Image
              src={MemberData.FM_dp ? MemberData.FM_dp : FILLER_IMAGE}
              alt="Member Image"
              width={150}
              height={150}
            />
          </div>
          <div>
            <DialogTitle className="pb-5 text-4xl">{FM_name}</DialogTitle>
            <DialogDescription className="font-mono text-lg text-black">
              Nickname:{" "}
              <span className="font-bold">
                {FM_Petname ? FM_Petname : "N/A"}
              </span>
            </DialogDescription>
            <DialogDescription className="font-mono text-lg text-black">
              Date of Birth:{" "}
              <span className="font-bold">{FM_dob ? FM_dob : "N/A"}</span>
            </DialogDescription>
            <DialogDescription className="font-mono text-lg text-black">
              Profession:{" "}
              <span className="font-bold">
                {FM_Professon ? FM_Professon : "N/A"}
              </span>
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <DialogFooter>
        {/* <Button disabled={isDeleteFamMemberLoading}>
          <Pencil2Icon className="mr-2" />
          Edit
        </Button> */}

        <Button
          variant="destructive"
          disabled={
            isDeleteFamMemberLoading || !MemberData.canDelete || hasChildren
          }
          onClick={() => handleFamMemberDelete()}
        >
          {isDeleteFamMemberLoading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <TrashIcon width={20} height={20} />
          )}
          <span className="pl-1">Delete</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  return (
    <div>
      {MemberType === "PARENT" && (
        <FamNavigationButton
          memberType={MemberType}
          navigateTo={MemberData?.FMparentId}
        />
      )}

      <Dialog
        open={isFammemberCardOpen}
        onOpenChange={(open) => setIsFamMemberCardOpen(open)}
      >
        <DialogTrigger>{renderMemberCard()}</DialogTrigger>
        {renderMemberCartContent()}
      </Dialog>

      {MemberType === "CHILD" && (
        <FamNavigationButton
          memberType={MemberType}
          navigateTo={MemberData?.FMfamId}
        />
      )}
    </div>
  );
};

export default FamMemberCard;
