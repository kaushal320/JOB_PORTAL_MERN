import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";

import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const [isApplied, setIsApplied] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // Fetch job
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const job = res.data.job;
          dispatch(setSingleJob(job));

          // ✅ Sync the local isApplied state from job data
          const applied = job?.applications?.some(
            (application) => application.applicant === user?._id
          );
          setIsApplied(applied);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // Check if already applied
  useEffect(() => {
    if (singleJob && user) {
      const applied = singleJob?.applications?.some(
        (application) => application.applicant === user._id
      );
      setIsApplied(applied);
    }
  }, [singleJob, user]);

  // Apply to job
  const handleApply = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        // Successfully applied
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      } else if (res.data.message === "You have already applied for this job") {
        // Already applied, ensure button is disabled and state reflects that
        setIsApplied(true);
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.error("Error applying to job:", error);
      const message = error?.response?.data?.message || "Something went wrong";

      // If backend returns 400 for already applied
      if (message === "You have already applied for this job") {
        setIsApplied(true);
      }

      toast.error(message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-400">
              {singleJob?.title || "Loading..."}
            </CardTitle>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
              <Badge variant="outline">{singleJob?.location}</Badge>
              <Badge variant="outline">{singleJob?.jobType}</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-red-400">
                Job Description
              </h2>
              <p className="text-sm text-gray-700 mt-1">
                {singleJob?.description || "No description provided."}
              </p>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-lg font-semibold text-red-400">
                Requirements
              </h2>
              {Array.isArray(singleJob?.requirements) &&
              singleJob.requirements.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
                  {singleJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 mt-1">
                  No specific requirements listed.
                </p>
              )}
            </div>

            {/* Other Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-gray-700">Salary:</strong>{" "}
                <span className="text-green-600 font-medium">
                  Rs. {singleJob?.salary || "N/A"}
                </span>
              </div>
              <div>
                <strong className="text-gray-700">Experience:</strong>{" "}
                {singleJob?.experience || "N/A"}
              </div>
              <div>
                <strong className="text-gray-700">Position:</strong>{" "}
                {singleJob?.position || "N/A"}
              </div>
              <div>
                <strong className="text-gray-700">Created At:</strong>{" "}
                {singleJob?.createdAt
                  ? new Date(singleJob.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-4">
              <Button
                className={`text-white ${
                  isApplied
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-red-400 hover:bg-red-500"
                }`}
                onClick={handleApply}
                disabled={isApplied}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default JobDescription;
