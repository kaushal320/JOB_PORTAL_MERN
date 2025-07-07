import React, { useEffect, useState } from "react";
import axios from "axios";
import LatestJobCards from "./LatestJobCards";
import { JOB_API_ENDPOINT } from "@/utils/constant";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
          withCredentials: true, // for cookie-based auth
        });
        setJobs(res.data.jobs.slice(0, 6)); // get only latest 6 jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-4xl font-bold mb-6">
        <span className="text-red-500">Latest & New</span> Jobs Openings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => <LatestJobCards key={job._id} job={job} />)
        ) : (
          <p className="text-gray-500 col-span-3">No jobs available right now.</p>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
