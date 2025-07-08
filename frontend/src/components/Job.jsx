import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Navigate, useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = job._id;
  return (
    <div className="flex flex-col gap-4 bg-white shadow-md rounded-2xl p-4 sm:p-6 border w-full max-w-xl mx-auto">
      {/* Top: Company Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div>
            <h2 className="text-base sm:text-lg font-semibold">
              {job?.company?.name}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {job?.location}
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Job Title & Description */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold">{job?.title}</h3>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {job?.description}
        </p>
      </div>

      {/* Bottom: Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Button
          onClick={() => {
            navigate(`/description/${jobId}`);
          }}
          variant="outline"
          className="w-full sm:w-auto px-4 py-2 text-sm"
        >
          Detail
        </Button>
        <Button
          variant="default"
          className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 text-sm bg-red-400 hover:bg-red-500"
        >
          <Bookmark className="h-4 w-4" />
          Save for later
        </Button>
      </div>
    </div>
  );
};

export default Job;
