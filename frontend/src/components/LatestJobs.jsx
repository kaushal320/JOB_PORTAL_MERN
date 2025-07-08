import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import useGetAllJobs from "@/hooks/useGetAllJobs";


const LatestJobs = () => {
  const { allJobs } = useSelector(store=>store.job); // access from redux

  useGetAllJobs(); // fetch data and update Redux

  

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-4xl font-bold mb-6">
        <span className="text-red-500">Latest & New</span> Jobs Openings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length > 0 ? (
          allJobs.map((job) => <LatestJobCards key={job._id} job={job} />)
        ) : (
          <p className="text-gray-500 col-span-3">
            No jobs available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
