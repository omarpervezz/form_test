import React from "react";

function InclusionExclusionItem({
  icon,
  description,
}: {
  icon: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-darkPrimaryBg shadow-light-shadow rounded-md flex items-center gap-2 px-3 py-2.5">
      {icon}
      {description}
    </div>
  );
}

export default InclusionExclusionItem;
