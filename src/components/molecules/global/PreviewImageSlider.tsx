"use client";
import React, { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/molecules/global/PreviewCarousel";

interface PreviewImageSliderProps {
  images: StaticImageData[];
}

const PreviewImageSlider: React.FC<PreviewImageSliderProps> = ({ images }) => {
  const [previewImage, setPreviewImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Image
          src={previewImage}
          alt={`preview-img`}
          width={1150}
          height={428}
          className="rounded-2xl w-full h-[428px] object-cover"
        />
      </div>
      <div>
        <Carousel>
          <CarouselContent className="flex flex-row justify-center">
            {images.map((img, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3"
                onClick={() => setPreviewImage(img)}
              >
                <Image
                  src={img}
                  alt={`carousel-img-${index + 1}`}
                  width={367}
                  height={190}
                  className="w-full h-[190px] object-cover rounded-2xl cursor-pointer"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center gap-2">
            <CarouselPrevious arrowPositionLeftRight={true} />
            <CarouselNext arrowPositionLeftRight={true} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default PreviewImageSlider;
