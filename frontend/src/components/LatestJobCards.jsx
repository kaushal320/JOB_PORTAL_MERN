import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = ({ job }) => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition">
      {/* Company & Location */}
      <div>
        <h1 className="font-medium text-lg">
          {job?.company?.name || "Unnamed Company"}
        </h1>
        <p className="text-sm text-gray-500">
          {job?.location || "Location not specified"}
        </p>
      </div>

      {/* Title & Description */}
      <div className="mt-2">
        <h2 className="font-bold text-lg">
          {job?.title || "Job Title Not Provided"}
        </h2>
        <p className="text-sm text-gray-400 line-clamp-3">
          {job?.description || "No description available for this job."}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        {job?.position && (
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {job.position} Position{job.position > 1 ? "s" : ""}
          </Badge>
        )}

        {job?.jobType && (
          <Badge className="text-red-700 font-bold" variant="ghost">
            {job.jobType}
          </Badge>
        )}

        {job?.salary && (
          <Badge className="text-green-700 font-bold" variant="ghost">
            ₹{job.salary} LPA
          </Badge>
        )}

        {job?.experienceLevel !== undefined && (
          <Badge className="text-yellow-700 font-bold" variant="ghost">
            Exp: {job.experienceLevel}+ yrs
          </Badge>
        )}
      </div>
    </div>
  );
};

export default LatestJobCards;
