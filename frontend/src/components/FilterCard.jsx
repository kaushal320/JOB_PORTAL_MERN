import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["Kathmandu", "Hetauda", "Biratnagar", "Jhapa"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["10-20k", "20-40k", "50-60k"],
  },
];

const FilterCard = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm space-y-6 border">
      <h2 className="text-xl font-semibold">Filter Jobs</h2>

      {filterData.map((filter, index) => (
        <div key={index}>
          <h3 className="text-md font-medium mb-2">{filter.filterType}</h3>
          <RadioGroup>
            {filter.array.map((item, idx) => {
              const id = `${filter.filterType}-${item}`;
              return (
                <div key={idx} className="flex items-center space-x-2 mb-1">
                  <RadioGroupItem value={item} id={id} />
                  <Label htmlFor={id}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
