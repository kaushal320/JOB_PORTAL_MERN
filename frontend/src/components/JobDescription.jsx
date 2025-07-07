import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "./shared/Navbar";

const job = {
  title: "Frontend Developer",
  description:
    "We are looking for a skilled frontend developer to join our growing team and work on exciting web projects using React and Tailwind CSS.",
  requirements: [
    "Proficient in React.js and JavaScript",
    "Experience with Tailwind CSS and responsive design",
    "Strong problem-solving skills",
    "Ability to work in a team environment",
  ],
  salary: "Rs. 40,000 - 60,000",
  experience: "1-3 years",
  position: "Mid-Level",
  companyId: "TechVerse Pvt. Ltd.",
  location: "Kathmandu, Nepal",
  jobType: "Full Time",
};

const JobDescription = () => {
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    setIsApplied(true);
    // Optional: Send to backend
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-400">
              {job.title}
            </CardTitle>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
              <Badge className="bg-green-400 text-white">{job.companyId}</Badge>
              <Badge variant="outline">{job.location}</Badge>
              <Badge variant="outline">{job.jobType}</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-red-400">
                Job Description
              </h2>
              <p className="text-sm text-gray-700 mt-1">{job.description}</p>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-lg font-semibold text-red-400">
                Requirements
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Other Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-gray-700">Salary:</strong>{" "}
                <span className="text-green-600 font-medium">{job.salary}</span>
              </div>
              <div>
                <strong className="text-gray-700">Experience:</strong>{" "}
                {job.experience}
              </div>
              <div>
                <strong className="text-gray-700">Position:</strong>{" "}
                {job.position}
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
