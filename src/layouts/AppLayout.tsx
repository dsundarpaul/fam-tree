import React, { type ReactNode } from "react";
import Navbar from "~/components/Navbar/Navbar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen  bg-gradient-to-b from-[#D3CCE3] to-[#E9E4F0]">
      <Navbar />
      <div className="flex justify-center py-10">
        <div className="max-w-7xl ">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
