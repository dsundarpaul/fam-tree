import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import BlobIcon from "../../../public/blob.svg";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const user = useUser();

  return (
    <nav className="flex items-center justify-between space-x-4 px-5 pt-4 sm:px-10 lg:space-x-6">
      <div className="flex items-center justify-between space-x-2 sm:space-x-4 lg:space-x-6">
        <Link
          href="/"
          className="hidden font-medium transition-colors hover:text-primary sm:inline"
        >
          <Image
            priority
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={BlobIcon}
            alt="Follow us on Twitter"
            width={70}
            height={70}
          />
        </Link>

        <Link
          href="/"
          className="font-medium transition-colors hover:text-primary sm:text-xl "
        >
          Discover
        </Link>
        <Link
          href="https://github.com/dsundarpaul/fam-tree"
          target="_blank"
          className="font-medium text-muted-foreground transition-colors hover:text-primary sm:text-xl"
        >
          Open Source
        </Link>
        <Link
          href="/about-me"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:text-xl"
        >
          About Me
        </Link>
      </div>
      <div className="flex space-x-2">
        {user.isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Button className="max-sm:hidden">
            <SignInButton />
          </Button>
        )}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
