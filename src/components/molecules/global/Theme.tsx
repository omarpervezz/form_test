"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { IoMdSunny } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null; // Prevent SSR mismatches

  return (
    <div onClick={handleToggle} className="flex items-center gap-2">
      <button
        className="bg-[#F4F7FE4D] text-[#8391A1] shadow-sm p-2 rounded-full 
                   dark:text-white dark:bg-darkButtonBg transition-all duration-500 ease-in-out"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? (
          <IoMdSunny size={18} />
        ) : (
          <IoMoonOutline size={18} />
        )}
      </button>
      <span className="text-xs md:hidden">Theme</span>
    </div>
  );
}
