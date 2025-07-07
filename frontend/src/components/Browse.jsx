import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";

const randomJobs = [1, 2, 3];

const Browse = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">
          Search Results ({randomJobs.length})
        </h1>

        {randomJobs.length <= 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {randomJobs.map((item, index) => (
              <Job key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
