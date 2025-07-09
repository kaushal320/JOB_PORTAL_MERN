import React from "react";
import Navbar from "../shared/Navbar";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Filter by name" />
          <Button
            className="bg-red-400 hover:bg-red-500"
            onClick={() => navigate("/admin/companies/create")}
          >
            New Company
          </Button>
        </div>
        <div className="overflow-x-auto">
          {/* CompaniesTable component will be rendered here */}
          <CompaniesTable />
        </div>
      </div>
    </>
  );
};

export default Companies;
