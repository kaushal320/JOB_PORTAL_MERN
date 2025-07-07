import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div>
      <Navbar />

      {/* Filter + Job Cards Section */}
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col-reverse md:flex-row gap-5">
          {/* Filter Sidebar (shown below on mobile, left on desktop) */}
          <div className="w-full md:w-1/4">
            <FilterCard />
          </div>

          {/* Job Cards (shown above on mobile, right on desktop) */}
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {jobsArray.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobsArray.map((item, index) => (
                  <Job key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
