import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Pen, Phone } from "lucide-react";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const { fullname = "", email = "", phoneNumber = "", profile = {} } = user;
  const {
    bio = "",
    skills = [],
    resumeUrl = "",
    resumeName = "",
    profilePhoto = "",
  } = profile;

  const resumeFileName =
    resumeName || (resumeUrl ? resumeUrl.split("/").pop() : "");

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white shadow-md rounded-xl p-6 space-y-6 border">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={profilePhoto || "https://github.com/shadcn.png"}
              />
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{fullname}</h2>

              {/* Email */}
              <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                <Phone className="w-4 h-4" />
                <span>{phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Bio</h3>
            <p className="text-sm text-gray-700">
              {bio || "No bio added yet."}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-red-400 text-white rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No skills added yet.
              </p>
            )}
          </div>

          {/* Resume */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Resume</h3>

            {resumeUrl ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-100 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2 sm:mb-0">
                  {resumeFileName || "Resume"}
                </p>
                <div className="flex gap-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </a>
                  <a
                    href={resumeUrl}
                    download
                    className="text-sm text-green-600 hover:underline"
                  >
                    Download
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No resume uploaded yet.
              </p>
            )}
          </div>

          {/* Applied Jobs Table */}
          <AppliedJobsTable />

          {/* Edit Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => setOpen(true)}
              variant="default"
              className="bg-red-400 hover:bg-red-500 flex items-center gap-2"
            >
              <Pen className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>

          <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
