import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "accepted":
      return "bg-green-100 text-green-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    case "interview scheduled":
      return "bg-yellow-100 text-yellow-800";
    case "under review":
    default:
      return "bg-blue-100 text-blue-700";
  }
};

const AppliedJobsTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setApplications(res.data.applications);
        } else {
          setApplications([]);
        }
        if (res.data.success) {
          console.log("✅ Applications:", res.data.applications); // Debug
          setApplications(res.data.applications);
        }
      } catch (error) {
        console.error("❌ Error fetching applied jobs:", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Applied Jobs</h3>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Applied</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  You haven't applied to any jobs yet.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {app.job?.title || "N/A"}
                  </TableCell>
                  <TableCell>{app.job?.company?.name || "N/A"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(app.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobsTable;
