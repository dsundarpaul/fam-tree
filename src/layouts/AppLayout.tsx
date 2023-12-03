import React, { type ReactNode } from "react";
import Navbar from "~/components/Navbar/Navbar";
import { Sidebar } from "~/components/sidebar/sidebar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen  bg-gradient-to-b from-[#D3CCE3] to-[#E9E4F0]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 py-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        {/* <div className="w-full">{children}</div> */}
      </div>
    </div>
  );
};

export default AppLayout;
