import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import Image from "next/image";
import ImgTemp from "../../../public/assets/missing-member-pic.png";

interface RenderMemberCardProps {
  openMemberModal: () => void;
  FM_dp: string;
  FM_name: string;
}
const RenderMemberCard = ({
  openMemberModal,
  FM_dp,
  FM_name,
}: RenderMemberCardProps) => {
  return (
    <Card
      className="pt-4 hover:bg-slate-100 "
      draggable
      onClick={() => openMemberModal()}
    >
      <CardContent className="flex justify-center">
        <Image
          src={FM_dp ? FM_dp : ImgTemp}
          width={100}
          height={100}
          alt="img"
        />
      </CardContent>
      <CardFooter className="flex justify-center">
        <CardTitle>{FM_name.length > 14 ? FM_name.slice(0, 14) + '...' : FM_name}</CardTitle>
      </CardFooter>
    </Card>
  );
};

export default RenderMemberCard;
