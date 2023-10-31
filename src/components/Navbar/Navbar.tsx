import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import BlobIcon from "../../../public/blob.svg";

const Navbar = () => {
  return (
    <nav className=" flex items-center justify-between space-x-4 px-10 pt-4 lg:space-x-6">
      <div className="flex items-center justify-between space-x-4 lg:space-x-6">
        <Link
          href="/"
          className=" font-medium transition-colors hover:text-primary"
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
          href="/examples/dashboard"
          className="text-xl font-medium transition-colors hover:text-primary"
        >
          Discover
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-xl font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Open Source
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-xl font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          About Us
        </Link>
      </div>
      <div>
        <Button>Login</Button>
      </div>
    </nav>
  );
};

export default Navbar;
