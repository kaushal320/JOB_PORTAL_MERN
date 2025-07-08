import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";



const Browse = () => {
  const { allJobs } = useSelector((store) => store.job); // access from redux
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">
          Search Results ({allJobs.length})
        </h1>

        {allJobs.length <= 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
