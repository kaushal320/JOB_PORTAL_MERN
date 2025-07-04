import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-2">
      <div className="inline-block bg-gray-100 px-3 py-1 rounded-2xl">
        <span className="text-red-500 font-medium">No1 job Hunt Website</span>
      </div>

      <h1 className="text-5xl font-bold text-center">
        Search,Apply & <br />
        <span>
          Get Your <span className="text-red-500">Dream Jobs</span>
        </span>
      </h1>
      <p className="text-center text-gray-400">
        Every job is a self-portrait of the person who did it. Autograph your
        work with excellence
      </p>
      <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
          type="text"
          placeholder="Find your dream jobs"
          className="outline-none border-none w-full"
        />
        <Button className="rounded-r-full bg-red-500 hover:bg-red-600">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
