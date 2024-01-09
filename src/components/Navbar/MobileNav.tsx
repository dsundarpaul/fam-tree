"use client";
import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { NAV_CONSTS } from "~/constants/navConsts";
import { Button } from "../ui/button";
import BlobIcon from "../../../public/blob.svg";

const NavConent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {NAV_CONSTS.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient text-light-900 rounded-lg"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};
const MobileNav = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/assets/icons/HamburgerIcon.svg"
            width={36}
            height={36}
            alt="Menu"
            className="text-black invert sm:hidden"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="background-light900_dark200 border-none"
        >
          <Link href="/" className="flex items-center gap-1">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <Image src={BlobIcon} width={43} height={43} alt="famTree" />
            <p className="h2-bold">Fam Tree</p>
          </Link>
          <div>
            <SheetClose asChild>
              <NavConent />
            </SheetClose>

            <SignedOut>
              <div className="flex flex-col gap-3 pt-8">
                <SheetClose asChild>
                  <Link href="/sign-in">
                    <Button className="small-medium  btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                      <span className="primary-text-gradient">Log in</span>
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/sign-up">
                    <Button className="small-medium  light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                      Sign up
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SignedOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
