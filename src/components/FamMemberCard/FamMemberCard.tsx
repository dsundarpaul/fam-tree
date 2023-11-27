/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import Image from "next/image";
import ImgTemp from "../../../public/assets/missing-member-pic.png";
import { Cross1Icon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { api } from "~/utils/api";

type FamMemberCardProps = {
  memberName: string | null;
  img?: unknown;
  data?: unknown;
};

const FamMemberCard = ({ memberName, img, data }: FamMemberCardProps) => {
  // const { id } = data;

  const { mutate: deleteFamMember } =
    api.famMember.deleteFamMember.useMutation();

  const openMemberModal = () => null;

  const handleFamMemberDelete = () => {
    console.log({ data });
    deleteFamMember("l");
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
        <CardTitle>{memberName}</CardTitle>
      </CardFooter>
    </Card>
  );

  const renderMemberCartContent = () => (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{memberName}</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction>
          <Pencil2Icon />
          <span className="pl-2">Edit</span>
        </AlertDialogAction>
        <Button variant="destructive" onClick={() => handleFamMemberDelete()}>
          <TrashIcon width={20} height={20} />
          <span className="pl-1">delete</span>
        </Button>
        <AlertDialogAction>
          <Cross1Icon />
          <span className="pl-2">Close</span>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{renderMemberCard()}</AlertDialogTrigger>
        {renderMemberCartContent()}
      </AlertDialog>
    </>
  );
};

export default FamMemberCard;
