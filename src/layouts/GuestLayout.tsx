import React, { type ReactNode } from "react";
import Navbar from "~/components/Navbar/Navbar";

const GuestLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen  ">
      <Navbar />
      <section className="flex min-h-screen flex-1 flex-col px-6 py-6 max-md:pb-14 sm:px-14">
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </section>
    </div>
  );
};

export default GuestLayout;
