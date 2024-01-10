import Image from "next/image";
import Link from "next/link";
import React from "react";
import GithubIcon from "~/../public/assets/icons/social/github.svg";
import LinkdineIcon from "~/../public/assets/icons/social/linkdin.svg";
import TwitterIcon from "~/../public/assets/icons/social/twitter.svg";

const AboutUs = () => {
  return (
    <div>
      <h1 className="font-sans text-5xl leading-[60px]">
        Hey, My name is <span className="font-bold">Sundarpaul Dakkumalla</span>
        , <br /> I am a Software Engineer 🧑🏽‍💻 and I love making cool things 🥶.{" "}
        <br />
      </h1>
      <p className="pt-5 text-lg">
        I am from India, Pune/Hyderbad. Diploma in Computer Science, with 2+
        years of experience. I work with MERN stack, Nextjs, Nestjs, React
        native, flutter, firebase and AWS
      </p>
      <div className="flex space-x-5 pt-10">
        <div className=" text-xl font-semibold">Check out My socials: </div>
        <Link href={"https://github.com/dsundarpaul"} target="_blank">
          {/* <span className="text-5xl">🐈‍⬛</span> */}
          <Image
            src={GithubIcon as string}
            width={30}
            height={30}
            alt="github"
          />
        </Link>
        <Link href={"https://twitter.com/dSundarpaul"} target="_blank">
          {/* ✖️ */}
          <Image
            src={TwitterIcon as string}
            width={30}
            height={30}
            alt="github"
          />
        </Link>
        <Link
          href={"https://www.linkedin.com/in/sundar-paul-dakkumalla-6aa97b1a1/"}
          target="_blank"
        >
          {/* 🔗 */}
          <Image
            src={LinkdineIcon as string}
            width={30}
            height={30}
            alt="github"
          />
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
