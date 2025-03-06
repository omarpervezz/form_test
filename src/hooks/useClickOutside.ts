import { useEffect, RefObject } from "react";

/**
 * Custom hook to handle clicks outside a specified element.
 *
 * @param ref - The React ref of the element to detect outside clicks for.
 * @param callback - Function to execute when a click occurs outside the referenced element.
 */
const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    /**
     * Event handler to detect clicks outside of the specified element.
     *
     * @param {MouseEvent} event - The mouse event triggered by user interaction.
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(); // Execute the callback function when clicked outside
      }
    };

    // Add event listener to detect clicks outside the specified element
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
