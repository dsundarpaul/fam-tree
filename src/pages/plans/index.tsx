import Image from "next/image";
import React from "react";
import { Button } from "~/components/ui/button";
import { PLANS_CONSTS } from "~/constants/plansConsts";

const Plans = () => {
  return (
    <>
      <div className="flex w-full justify-evenly">
        {PLANS_CONSTS.map((plan, idx) => (
          <div
            key={idx}
            className="h-[350px] w-[290px] rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] duration-100 ease-in hover:scale-105 hover:invert"
          >
            <div className="flex h-full w-full flex-col justify-between rounded-md bg-white p-4 font-sans">
              <div>
                <div className="flex justify-between text-4xl font-semibold">
                  <div>{plan.title}</div>
                  <div className="text-3xl text-slate-700">
                    &#8377;{plan.cost}
                  </div>
                </div>
                <hr></hr>
                <div className="pt-16">
                  <ul className="list-inside list-disc ">
                    {plan.services.map((service, idx) => (
                      <li
                        key={idx}
                        className="flex list-none items-center text-lg"
                      >
                        <Image
                          src="/assets/icons/tick.svg"
                          width={35}
                          height={40}
                          alt="tick"
                          className="mr-2"
                        />
                        {service.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-36 text-4xl font-bold">
        <h1>
          This page is still in Development, the above content is irrelevant.
          <u>PLEASE IGNORE</u>
        </h1>
      </div>
    </>
  );
};

export default Plans;
