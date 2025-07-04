import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const categories = [
  "Full Stack Developer",
  "Backend",
  "Frontend",
  "Data Science",
  "Machine Learning & AI",
  "Graphic Designer",
];
const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-lg mx-auto my-20">
        <CarouselContent className="flex gap-6">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-auto flex justify-center items-center"
            >
              <Button className=" rounded-3xl text-black bg-red-300 hover:bg-red-200   px-6 py-3 text-sm whitespace-nowrap">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
