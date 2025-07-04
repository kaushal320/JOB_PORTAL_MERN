import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500 "> Nepal</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          exercitationem corporis laudantium! Velit id eligendi natus
        </p>
      </div>
      <div>
        <Badge className="text-blue-700  font-bold" variant="ghost">
          12 Positions
        </Badge>
        <Badge className=" text-red-700 font-bold" variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-[#27213C] font-bold" variant="ghost">
          24 LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
