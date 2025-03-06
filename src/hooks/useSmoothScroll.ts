import { useState } from "react";

interface UseSmoothScroll {
  activeTab: string;
  smoothScrollTo: (targetId: string) => void;
}

const useSmoothScroll = (initialTab: string): UseSmoothScroll => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const smoothScrollTo = (targetId: string) => {
    console.log(targetId);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1100; // Duration in ms
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
    setActiveTab(targetId);
  };

  return { activeTab, smoothScrollTo };
};

export default useSmoothScroll;
