/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useContext, useState } from "react";
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
import { type FMTypeKeys } from "~/constants/consts";
import FamNavigationButton from "../famNavigationButton/FamNavigationButton";

type FamMemberCardProps = {
  MemberType: FMTypeKeys;
  MemberData: GetFamMemberType;
};

const FamMemberCard = ({ MemberData, MemberType }: FamMemberCardProps) => {
  const { FM_name, FM_Petname, FM_dob, FM_Professon } = MemberData;

  const [isFammemberCardOpen, setIsFamMemberCardOpen] = useState(false);

  const ctx = api.useContext();

  const { mutate: deleteFamMember, isLoading: isDeleteFamMemberLoading } =
    api.famMember.deleteFamMember.useMutation({
      onSuccess: () => {
        void ctx.famMember.getFamById.invalidate();
        setIsFamMemberCardOpen(false);
      },
    });

  const openMemberModal = () => null;

  const handleFamMemberDelete = () => {
    if (MemberData !== undefined) {
      deleteFamMember(MemberData.id);
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
        <Image src={ImgTemp} width={100} height={100} alt="img" />
      </CardContent>
      <CardFooter className="flex justify-center">
        <CardTitle>{FM_name}</CardTitle>
      </CardFooter>
    </Card>
  );

  const renderMemberCartContent = () => (
    <DialogContent>
      <DialogHeader>
        <div className="flex">
          <div>
            <Image src={""} alt="sdf" />
          </div>
          <div>
            <DialogTitle>{FM_name}</DialogTitle>
            <DialogDescription>Nickname: {FM_Petname}</DialogDescription>
            <DialogDescription>Date of Birth: {FM_dob}</DialogDescription>
            <DialogDescription>Profession: {FM_Professon}</DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <DialogFooter>
        <Button disabled={isDeleteFamMemberLoading}>
          <Pencil2Icon className="mr-2" />
          Edit
        </Button>

        <Button
          variant="destructive"
          disabled={isDeleteFamMemberLoading}
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
