"use client";
import React, { FormEvent } from "react";
import PackageDetailsForm from "@/components/molecules/package-upload/PackageDetailsForm";
import MultiStepTabNavigation from "@/components/molecules/global/MultiStepTabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { setActiveTab } from "@/redux/feature/package-upload/packageUploadTabSlice";
import MultiStepFormPaginationsButton from "@/components/molecules/global/MultiStepFormPaginationsButton";
import { setErrors } from "@/redux/feature/package-upload/packageUploadErrorsSlice";
import PackageItineraryForm from "@/components/molecules/package-upload/PackageItineraryForm";
import PackageMealsForm from "@/components/molecules/package-upload/PackageMealsForm";
import PackageFlightsForm from "@/components/molecules/package-upload/PackageFlightsForm";
import PackageHotelsForm from "@/components/molecules/package-upload/PackageHotelForm";
import PackageTransportForm from "@/components/molecules/package-upload/PackageTransportForm";
import PackageMediaForm from "@/components/molecules/package-upload/PackageMediaForm";
import {
  clearAllMealErrors,
  setMealError,
} from "@/redux/feature/package-upload/packageUploadMealsErrorsSlice";
import {
  clearAllFlightErrors,
  setFlightError,
} from "@/redux/feature/package-upload/packageUploadFlightErrorsSlice";
import {
  clearAllHotelErrors,
  setHotelError,
} from "@/redux/feature/package-upload/packageUploadHotelErrorsSlice";
import {
  clearAllTransportErrors,
  setTransportError,
} from "@/redux/feature/package-upload/packageUploadTransportErrorsSlice";
import PackageGuideForm from "@/components/molecules/package-upload/PackageGuideForm";
import {
  clearAllGuideErrors,
  setGuideError,
} from "@/redux/feature/package-upload/packageUploadGuideErrorsSlice";

const tabs = [
  { label: "Package Detail" },
  { label: "Itinerery" },
  { label: "Meals" },
  { label: "Flight" },
  { label: "Hotels" },
  { label: "Transport" },
  { label: "Guide" },
  { label: "Media" },
];

function PackageUploadWrapper() {
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: RootState) => state.packageUploadTab.activeTab
  );
  const packageUploadDetails = useSelector(
    (state: RootState) => state.packageUploadDetails
  );
  const days = useSelector(
    (state: RootState) => state.packageUploadItinerary.days
  );
  const meals = useSelector((state: RootState) => state.packageUploadMeals);
  const flights = useSelector((state: RootState) => state.packageUploadFlights);
  const hotels = useSelector((state: RootState) => state.packageUploadHotels);
  const transport = useSelector(
    (state: RootState) => state.packageUploadTransport
  );
  const guides = useSelector((state: RootState) => state.packageUploadGuides);
  /**
   * Validates the form fields for a given step and updates errors in Redux state.
   *
   * @param {number} tabIndex - The current step index in the form wizard.
   * @returns {boolean} - Returns `true` if the step is valid (no errors), otherwise `false`.
   */
  const validateStep = (tabIndex: number) => {
    const errors: { [key: string]: string } = {}; // Object to store validation errors

    // Validate Step 0 (First Step)
    if (tabIndex === 0) {
      // Check if "packageTitle" is empty or consists only of whitespace
      if (!packageUploadDetails.packageTitle?.trim()) {
        errors.packageTitle = "Package title is required";
      }

      if (!packageUploadDetails.days) {
        errors.days = "Days required";
      }
      if (!packageUploadDetails.nights) {
        errors.nights = "Nights required";
      }
      // Validate "basePrice" to ensure it's not empty or undefined
      if (
        packageUploadDetails.basePrice === undefined ||
        packageUploadDetails.basePrice === null ||
        packageUploadDetails.basePrice === ""
      ) {
        errors.basePrice = "Base Price is required";
      }

      // Validate "discountPrice" to ensure it's not empty or undefined
      if (
        packageUploadDetails.discountPrice === undefined ||
        packageUploadDetails.discountPrice === null ||
        packageUploadDetails.discountPrice === "" //
      ) {
        errors.discountPrice = "Discount Price is required";
      }

      // Validate Country Selection
      if (
        !packageUploadDetails.countries ||
        packageUploadDetails.countries.length === 0
      ) {
        errors.countries = "At least one country must be selected";
      }

      // Validate City Selection (only if a country is selected)
      if (
        packageUploadDetails.countries.length > 0 &&
        (!packageUploadDetails.cities ||
          packageUploadDetails.cities.length === 0)
      ) {
        errors.cities = "At least one city must be selected";
      }
    } else if (tabIndex === 1) {
      if (!days || days.length === 0) {
        errors["days"] = "At least one day is required in the itinerary.";
      } else {
        days.forEach((day, index) => {
          if (!day.title?.trim()) {
            errors[`days[${index}].title`] = `Title for Day ${
              index + 1
            } is required.`;
          }
          if (!day.activity?.trim()) {
            errors[`days[${index}].activity`] = `Activity for Day ${
              index + 1
            } is required.`;
          }
        });
      }
    } else if (tabIndex === 2) {
      if (!meals || meals.length === 0) {
        errors["meals"] = "At least one meal must be added.";
      } else {
        // Clear all previous meal errors
        dispatch(clearAllMealErrors());
        meals.forEach((meal, index) => {
          if (!meal.title?.trim()) {
            errors[`meals[${index}].title`] = `Meal Title for Meal ${
              index + 1
            } is required.`;
            dispatch(
              setMealError({
                index,
                field: "title",
                error: `Meal Title for Meal ${index + 1} is required.`,
              })
            );
          }
          if (!meal.foodType?.trim()) {
            errors[`meals[${index}].foodType`] = `Food Type for Meal ${
              index + 1
            } is required.`;
            dispatch(
              setMealError({
                index,
                field: "foodType",
                error: `Food Type for Meal ${index + 1} is required.`,
              })
            );
          }
          if (!meal.details?.trim()) {
            errors[`meals[${index}].details`] = `Details for Meal ${
              index + 1
            } are required.`;
            dispatch(
              setMealError({
                index,
                field: "details",
                error: `Details for Meal ${index + 1} are required.`,
              })
            );
          }
          if (!meal.days || meal.days.length === 0) {
            errors[
              `meals[${index}].days`
            ] = `At least one day must be selected for Meal ${index + 1}.`;
            dispatch(
              setMealError({
                index,
                field: "days",
                error: `At least one day must be selected for Meal ${
                  index + 1
                }.`,
              })
            );
          }
          if (!meal.pricePerPax) {
            errors[`meals[${index}].pricePerPax`] = `Price per pax for Meal ${
              index + 1
            } are required.`;
            dispatch(
              setMealError({
                index,
                field: "pricePerPax",
                error: `Price per pax for Meal ${index + 1} are required.`,
              })
            );
          }
        });
      }
    } else if (tabIndex === 3) {
      if (!flights || flights.length === 0) {
        errors["flights"] = "At least one flight must be added.";
      } else {
        // Clear all previous flight errors
        dispatch(clearAllFlightErrors());
        flights.forEach((flight, index) => {
          if (!flight.title?.trim()) {
            errors[`flights[${index}].title`] = `Flight Title for Flight ${
              index + 1
            } is required.`;
            dispatch(
              setFlightError({
                index,
                field: "title",
                error: `Flight Title for Flight ${index + 1} is required.`,
              })
            );
          }
          if (!flight.flightFrom?.trim()) {
            errors[`flights[${index}].flightFrom`] = `Flight From for Flight ${
              index + 1
            } is required.`;
            dispatch(
              setFlightError({
                index,
                field: "flightFrom",
                error: `Flight From for Flight ${index + 1} is required.`,
              })
            );
          }
          if (!flight.flightTo?.trim()) {
            errors[`flights[${index}].flightTo`] = `Flight To for Flight ${
              index + 1
            } is required.`;
            dispatch(
              setFlightError({
                index,
                field: "flightTo",
                error: `Flight To for Flight ${index + 1} is required.`,
              })
            );
          }
          if (!flight.flightType?.trim()) {
            errors[`flights[${index}].flightType`] = `Flight Type for Flight ${
              index + 1
            } is required.`;
            dispatch(
              setFlightError({
                index,
                field: "flightType",
                error: `Flight Type for Flight ${index + 1} is required.`,
              })
            );
          }
          if (!flight.carrierName?.trim()) {
            errors[
              `flights[${index}].carrierName`
            ] = `Carrier Name for Flight ${index + 1} is required.`;
            dispatch(
              setFlightError({
                index,
                field: "carrierName",
                error: `Carrier Name for Flight ${index + 1} is required.`,
              })
            );
          }
          if (!flight.pricePerPax) {
            errors[
              `flights[${index}].pricePerPax`
            ] = `Price per pax for Flight ${index + 1} is required.`;
            dispatch(
              setFlightError({
                index,
                field: "pricePerPax",
                error: `Price per pax for Flight ${index + 1} is required.`,
              })
            );
          }
          if (!flight.days || flight.days.length === 0) {
            errors[
              `flight[${index}].days`
            ] = `At least one day must be selected for Flight ${index + 1}.`;
            dispatch(
              setFlightError({
                index,
                field: "days",
                error: `At least one day must be selected for Flight ${
                  index + 1
                }.`,
              })
            );
          }
        });
      }
    } else if (tabIndex === 4) {
      if (!hotels || hotels.length === 0) {
        errors["hotels"] = "At least one hotel must be added.";
      } else {
        // Clear all previous hotel errors
        dispatch(clearAllHotelErrors());
        hotels.forEach((hotel, index) => {
          if (!hotel.title?.trim()) {
            errors[`hotels[${index}].title`] = `Hotel Title for Hotel ${
              index + 1
            } is required.`;
            dispatch(
              setHotelError({
                index,
                field: "title",
                error: `Hotel Title for Hotel ${index + 1} is required.`,
              })
            );
          }
          if (!hotel.hotelName?.trim()) {
            errors[`hotels[${index}].hotelName`] = `Hotel Name for Hotel ${
              index + 1
            } is required.`;
            dispatch(
              setHotelError({
                index,
                field: "hotelName",
                error: `Hotel Name for Hotel ${index + 1} is required.`,
              })
            );
          }
          if (!hotel.hotelStar) {
            errors[`hotels[${index}].hotelStar`] = `Hotel Star for Hotel ${
              index + 1
            } is required.`;
            dispatch(
              setHotelError({
                index,
                field: "hotelStar",
                error: `Hotel Star for Hotel ${index + 1} is required.`,
              })
            );
          }
          if (!hotel.roomType?.trim()) {
            errors[`hotels[${index}].roomType`] = `Room Type for Hotel ${
              index + 1
            } is required.`;
            dispatch(
              setHotelError({
                index,
                field: "roomType",
                error: `Room Type for Hotel ${index + 1} is required.`,
              })
            );
          }
          if (!hotel.roomCategory?.trim()) {
            errors[
              `hotels[${index}].roomCategory`
            ] = `Room Category for Hotel ${index + 1} is required.`;
            dispatch(
              setHotelError({
                index,
                field: "roomCategory",
                error: `Room Category for Hotel ${index + 1} is required.`,
              })
            );
          }
          if (!hotel.pricePerNight) {
            errors[
              `hotels[${index}].pricePerNight`
            ] = `Price per night for Hotel ${index + 1} is required.`;
            dispatch(
              setHotelError({
                index,
                field: "pricePerNight",
                error: `Price per night for Hotel ${index + 1} is required.`,
              })
            );
          }
          if (!hotel.totalStays) {
            errors[`hotels[${index}].totalStays`] = `Total stays for Hotel ${
              index + 1
            } is required.`;
            dispatch(
              setHotelError({
                index,
                field: "totalStays",
                error: `Total stays for Hotel ${index + 1} is required.`,
              })
            );
          }
        });
      }
    } else if (tabIndex === 5) {
      if (!transport || transport.length === 0) {
        errors["transport"] = "At least one transport option must be added.";
      } else {
        // Clear all previous transport errors
        dispatch(clearAllTransportErrors());
        transport.forEach((item, index) => {
          if (!item.title?.trim()) {
            errors[
              `transport[${index}].title`
            ] = `Transport Title for Transport ${index + 1} is required.`;
            dispatch(
              setTransportError({
                index,
                field: "title",
                error: `Transport Title for Transport ${
                  index + 1
                } is required.`,
              })
            );
          }
          if (!item.detail?.trim()) {
            errors[`transport[${index}].detail`] = `Detail for Transport ${
              index + 1
            } is required.`;
            dispatch(
              setTransportError({
                index,
                field: "detail",
                error: `Detail for Transport ${index + 1} is required.`,
              })
            );
          }
          if (!item.from?.trim()) {
            errors[
              `transport[${index}].from`
            ] = `Departure Location for Transport ${index + 1} is required.`;
            dispatch(
              setTransportError({
                index,
                field: "from",
                error: `Departure Location for Transport ${
                  index + 1
                } is required.`,
              })
            );
          }
          if (!item.to?.trim()) {
            errors[`transport[${index}].to`] = `Destination for Transport ${
              index + 1
            } is required.`;
            dispatch(
              setTransportError({
                index,
                field: "to",
                error: `Destination for Transport ${index + 1} is required.`,
              })
            );
          }
          if (!item.vehicleType?.trim()) {
            errors[
              `transport[${index}].vehicleType`
            ] = `Vehicle Type for Transport ${index + 1} is required.`;
            dispatch(
              setTransportError({
                index,
                field: "vehicleType",
                error: `Vehicle Type for Transport ${index + 1} is required.`,
              })
            );
          }
          if (!item.carryType?.trim()) {
            errors[
              `transport[${index}].carryType`
            ] = `Carry Type for Transport ${index + 1} is required.`;
            dispatch(
              setTransportError({
                index,
                field: "carryType",
                error: `Carry Type for Transport ${index + 1} is required.`,
              })
            );
          }
          if (!item.pricePerPax) {
            errors[
              `transport[${index}].pricePerPax`
            ] = `Price per pax for Transport ${index + 1} is required.`;
            dispatch(
              setTransportError({
                index,
                field: "pricePerPax",
                error: `Price per pax for Transport ${index + 1} is required.`,
              })
            );
          }
        });
      }
    } else if (tabIndex === 6) {
      if (!guides || guides.length === 0) {
        errors["guides"] = "At least one guide must be added.";
      } else {
        // Clear all previous guide errors
        dispatch(clearAllGuideErrors());
        guides.forEach((guide, index) => {
          if (!guide.title?.trim()) {
            errors[`guides[${index}].title`] = `Guide Title for Guide ${
              index + 1
            } is required.`;
            dispatch(
              setGuideError({
                index,
                field: "title",
                error: `Guide Title for Guide ${index + 1} is required.`,
              })
            );
          }
          if (!guide.detail?.trim()) {
            errors[`guides[${index}].detail`] = `Detail for Guide ${
              index + 1
            } is required.`;
            dispatch(
              setGuideError({
                index,
                field: "detail",
                error: `Detail for Guide ${index + 1} is required.`,
              })
            );
          }
          if (!guide.guideType?.trim()) {
            errors[`guides[${index}].guideType`] = `Guide Type for Guide ${
              index + 1
            } is required.`;
            dispatch(
              setGuideError({
                index,
                field: "guideType",
                error: `Guide Type for Guide ${index + 1} is required.`,
              })
            );
          }
          if (!guide.guideAt || guide.guideAt.length === 0) {
            errors[
              `guides[${index}].guideAt`
            ] = `At least one day must be selected for Guide ${index + 1}.`;
            dispatch(
              setGuideError({
                index,
                field: "guideAt",
                error: `At least one day must be selected for Guide ${
                  index + 1
                }.`,
              })
            );
          }
          if (!guide.gender?.trim()) {
            errors[`guides[${index}].gender`] = `Gender for Guide ${
              index + 1
            } is required.`;
            dispatch(
              setGuideError({
                index,
                field: "gender",
                error: `Gender for Guide ${index + 1} is required.`,
              })
            );
          }
          if (
            !guide.includedWithBasePrice &&
            (!guide.pricePerPax || isNaN(guide.pricePerPax))
          ) {
            errors[`guides[${index}].pricePerPax`] = `Price per pax for Guide ${
              index + 1
            } is required.`;
            dispatch(
              setGuideError({
                index,
                field: "pricePerPax",
                error: `Price per pax for Guide ${index + 1} is required.`,
              })
            );
          }
        });
      }
    }

    // Dispatch the collected errors to the Redux store for UI display
    dispatch(setErrors(errors));

    // Return `true` if no errors exist, otherwise `false`
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles tab navigation in the form wizard.
   *
   * @param {number} tabIndex - The index of the tab the user is trying to navigate to.
   */
  const handleTabChange = (tabIndex: number) => {
    // Prevent moving to the next tab if the current step is invalid
    // if (tabIndex > activeTab) {
    //   if (!validateStep(activeTab)) return; // Validate current step and stop navigation if invalid
    // }

    // Update the active tab in the Redux store
    dispatch(setActiveTab(tabIndex));
  };

  /**
   * Handles form submission.
   *
   * @param {FormEvent} e - The event object from the form submission.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate the current step before proceeding with form submission
    // if (!validateStep(activeTab)) return;
  };

  /**
   * Renders the component corresponding to the active tab in the form wizard.
   *
   * @returns {JSX.Element | null} - Returns the component for the active section or null if none exists.
   */
  const renderActiveSection = () => {
    switch (activeTab) {
      case 0:
        return <PackageDetailsForm />;
      case 1:
        return <PackageItineraryForm />;
      case 2:
        return <PackageMealsForm />;
      case 3:
        return <PackageFlightsForm />;
      case 4:
        return <PackageHotelsForm />;
      case 5:
        return <PackageTransportForm />;
      case 6:
        return <PackageGuideForm />;
      case 7:
        return <PackageMediaForm />;
      default:
        return null;
    }
  };

  return (
    <div className="p-1 sm:p-5 rounded-md space-y-5">
      <MultiStepTabNavigation onTabChange={handleTabChange} tabs={tabs} />
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">{renderActiveSection()}</div>
        <MultiStepFormPaginationsButton
          handleTabChange={handleTabChange}
          activeTab={activeTab}
          tabsLength={tabs.length}
        />
      </form>
    </div>
  );
}

export default PackageUploadWrapper;
