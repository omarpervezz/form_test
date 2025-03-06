// components/InsideSidebar.tsx
import { setActiveTab } from "@/redux/feature/user-profile/profileSlice";
import { RootState } from "@/redux/redux-store/store";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface InsideSidebarProps {
  tabs: string[];
}

const InsideSidebar: React.FC<InsideSidebarProps> = ({ tabs }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.profile.activeTab);

  return (
    <div>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`cursor-pointer p-3 rounded-md capitalize text-sm font-bold ${
              activeTab === tab ? "font-bold bg-[#1768D0] text-white" : ""
            }`}
            onClick={() => dispatch(setActiveTab(tab))}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InsideSidebar;
