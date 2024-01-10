import React from "react";

const Plans = () => {
  return (
    <div className=" flex justify-center ">
      <div className="h-[350px] w-[230px] rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 duration-100 ease-in hover:scale-105">
        <div className="h-full rounded-md  bg-slate-200 p-4 font-sans">
          <div className="flex justify-between text-4xl font-semibold">
            <div>Free</div>
            <div className="text-3xl text-slate-700">$0</div>
          </div>
          <hr></hr>
          <div className="pt-16">
            <ul className="list-inside list-disc ">
              <li className="list-item">Can create 1 Family</li>
              <li className="list-item">Access to Calendar</li>
              <li className="list-item">Shareable Link</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
