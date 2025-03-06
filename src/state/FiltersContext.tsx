import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
interface FiltersContextType {
  // toggle the filter element of Flight deals price ranger slider element
  isHideLatestFlightDealsFilterElementPriceRangeSlider: boolean;
  setIsHideLatestFlightDealsFilterElementPriceRangeSlider: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  priceRangeValues: [number, number];
  setPriceRangeValues: React.Dispatch<React.SetStateAction<[number, number]>>;
  budgetValue: [number, number];
  setBudgetValues: React.Dispatch<React.SetStateAction<[number, number]>>;

  durationNightValue: [number, number];
  setdurationNightValues: React.Dispatch<
    React.SetStateAction<[number, number]>
  >;

  isCheckedRegular: boolean;
  setIsCheckedRegular: React.Dispatch<React.SetStateAction<boolean>>;
  isCheckedMultiple: boolean;
  setIsCheckedMultiple: React.Dispatch<React.SetStateAction<boolean>>;

  isCheckedWithFlight: boolean;
  setIsCheckedWithFlight: React.Dispatch<React.SetStateAction<boolean>>;

  isCheckedWithoutFlight: boolean;
  setIsCheckedWithoutFlight: React.Dispatch<React.SetStateAction<boolean>>;

  isCheckedPremiumPackages: boolean;
  setIsCheckedPremiumPackages: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create Context with type
const FiltersContext = createContext<FiltersContextType | null>(null);

// Define the props for the provider
interface FilterProps {
  children: ReactNode;
}

// Context Provider
const FiltersProvider: React.FC<FilterProps> = ({ children }) => {
  const [
    isHideLatestFlightDealsFilterElementPriceRangeSlider,
    setIsHideLatestFlightDealsFilterElementPriceRangeSlider,
  ] = useState(false);
  const [priceRangeValues, setPriceRangeValues] = useState<[number, number]>([
    10, 50,
  ]);
  const [budgetValue, setBudgetValues] = useState<[number, number]>([10, 50]);

  const [durationNightValue, setdurationNightValues] = useState<
    [number, number]
  >([10, 50]);

  const [isCheckedRegular, setIsCheckedRegular] = useState(false);

  const [isCheckedMultiple, setIsCheckedMultiple] = useState(false);

  const [isCheckedWithFlight, setIsCheckedWithFlight] = useState(false);

  const [isCheckedWithoutFlight, setIsCheckedWithoutFlight] = useState(false);
  const [isCheckedPremiumPackages, setIsCheckedPremiumPackages] =
    useState(false);

  return (
    <FiltersContext.Provider
      value={{
        isHideLatestFlightDealsFilterElementPriceRangeSlider,
        setIsHideLatestFlightDealsFilterElementPriceRangeSlider,
        priceRangeValues,
        setPriceRangeValues,
        budgetValue,
        setBudgetValues,
        isCheckedRegular,
        setIsCheckedRegular,
        isCheckedMultiple,
        setIsCheckedMultiple,
        isCheckedWithFlight,
        setIsCheckedWithFlight,
        isCheckedWithoutFlight,
        setIsCheckedWithoutFlight,
        isCheckedPremiumPackages,
        setIsCheckedPremiumPackages,
        durationNightValue,
        setdurationNightValues,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

// Custom Hook for Access
const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};

export { FiltersProvider, useFilters };
