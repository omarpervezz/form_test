import React from "react";
import Paragraph from "@/components/atoms/Paragraph";
import Span from "@/components/atoms/Span";
import Image, { StaticImageData } from "next/image";
import { IconType } from "react-icons";

interface DashboardAccountCardProps {
  title: string;
  value: string | number;
  gradientFrom: string;
  gradientTo: string;
  icon: IconType;
  iconColor: string;
  footerText: string;
  footerIcon: IconType;
  footerIconColor: string;
  footerValue: string;
  footerPercentageColor: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

const DashboardAccountCard: React.FC<DashboardAccountCardProps> = ({
  title,
  value,
  gradientFrom,
  gradientTo,
  icon: Icon,
  iconColor,
  footerText,
  footerIcon: FooterIcon,
  footerIconColor,
  footerValue,
  footerPercentageColor,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
}) => {
  return (
    <div
      style={{
        background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
      }}
      className="px-5 pt-2 rounded-md shadow-md"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <Paragraph className="text-sm md:text-lg lg:text-base font-semibold text-white">
          {title}
        </Paragraph>
        <Span className="bg-[#FFFFFF1A] p-2 rounded-full">
          <Icon className={`text-${iconColor}`} size={22} />
        </Span>
      </div>

      {/* Card Body */}
      <Paragraph className="font-semibold text-white text-2xl md:text-3xl lg:text-2xl mt-1">
        {value}
      </Paragraph>

      {/* Card Footer */}

      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <span
            style={{ color: footerPercentageColor }}
            className={`bg-[#FFFFFF3D]  flex items-center gap-1 py-1.5 px-2 text-sm font-semibold rounded-full`}
          >
            <FooterIcon style={{ color: footerIconColor }} size={20} />{" "}
            {footerValue}
          </span>
          <Paragraph className="text-white font-medium text-sm lg:text-sm">
            {footerText}
          </Paragraph>
        </div>
        <Image
          src={imageSrc}
          width={imageWidth}
          height={imageHeight}
          alt={imageAlt}
          className="w-[90px] h-[70px]"
        />
      </div>
    </div>
  );
};

export default DashboardAccountCard;
