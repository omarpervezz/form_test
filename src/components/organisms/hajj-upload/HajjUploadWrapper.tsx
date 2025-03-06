"use client";
import React, { FormEvent } from "react";
import HajjBasicInfoForm from "@/components/molecules/hajj-upload/HajjBasicInfoForm";
import MultiStepTabNavigation from "@/components/molecules/global/MultiStepTabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";

import MultiStepFormPaginationsButton from "@/components/molecules/global/MultiStepFormPaginationsButton";
import { setErrors } from "@/redux/feature/hajj-upload/hajjUploadErrorsSlice";
import HajjFlightForm from "@/components/molecules/hajj-upload/HajjFlightForm";
import HajjHotelForm from "@/components/molecules/hajj-upload/HajjHotelForm";
import { setActiveTab } from "@/redux/feature/package-upload/packageUploadTabSlice";
import HajjTransportForm from "@/components/molecules/hajj-upload/HajjTransportForm";
import HajjMealsForm from "@/components/molecules/hajj-upload/HajjMealsForm";
const tabs = [
  { label: "Basic Information" },
  { label: "Flight" },
  { label: "Hotel" },
  { label: "Transport" },
  { label: "Meals" },
];

function HajjUploadWrapper() {
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: RootState) => state.packageUploadTab.activeTab
  );
  const hajjUploadDetails = useSelector(
    (state: RootState) => state.hajjUploadDetails
  );
  const flights = useSelector(
    (state: RootState) => state.hajjUploadFlights.flights
  );
  const hotels = useSelector(
    (state: RootState) => state.hajjUploadHotels.hotels
  );
  const transports = useSelector(
    (state: RootState) => state.hajjUploadTransports.transports
  );
  const meals = useSelector((state: RootState) => state.hajjUploadMeals.meals);

  const validateStep = (tabIndex: number) => {
    const errors: { [key: string]: string } = {};

    if (tabIndex === 0) {
      if (!hajjUploadDetails.packageTitle?.trim()) {
        errors.packageTitle = "Package title is required";
      }
      if (!hajjUploadDetails.basePrice) {
        errors.basePrice = "Base Price is required";
      }
      if (
        hajjUploadDetails.acceptPartialPayment &&
        !hajjUploadDetails.registrationPartialPayment
      ) {
        errors.registrationPartialPayment =
          "Registration partial payment is required";
      }
    } else if (tabIndex === 1) {
      if (!flights || flights.length === 0) {
        errors["flights"] = "At least one flight must be added.";
      } else {
        flights.forEach((flight, index) => {
          if (!flight.flightFrom?.trim()) {
            errors[`flights[${index}].flightFrom`] = `Flight from for Flight ${
              index + 1
            } is required.`;
          }
          if (!flight.flightTo?.trim()) {
            errors[`flights[${index}].flightTo`] = `Flight to for Flight ${
              index + 1
            } is required.`;
          }
          if (!flight.flightType?.trim()) {
            errors[`flights[${index}].flightType`] = `Flight type for Flight ${
              index + 1
            } is required.`;
          }
          if (!flight.transitType?.trim()) {
            errors[
              `flights[${index}].transitType`
            ] = `Transit type for Flight ${index + 1} is required.`;
          }
          if (!flight.airlinesName?.trim()) {
            errors[
              `flights[${index}].airlinesName`
            ] = `Airlines name for Flight ${index + 1} is required.`;
          }
          if (!flight.pricePerPax) {
            errors[
              `flights[${index}].pricePerPax`
            ] = `Price per pax for Flight ${index + 1} is required.`;
          }
        });
      }
    } else if (tabIndex === 2) {
      if (!hotels || hotels.length === 0) {
        errors["hotels"] = "At least one hotel must be added.";
      } else {
        hotels.forEach((hotel, index) => {
          if (!hotel.hotelName?.trim()) {
            errors[`hotels[${index}].hotelName`] = `Hotel name for Hotel ${
              index + 1
            } is required.`;
          }
          if (!hotel.hotelType?.trim()) {
            errors[`hotels[${index}].hotelType`] = `Hotel type for Hotel ${
              index + 1
            } is required.`;
          }
          if (!hotel.roomType?.trim()) {
            errors[`hotels[${index}].roomType`] = `Room type for Hotel ${
              index + 1
            } is required.`;
          }
          if (hotel.hotelStar === undefined || hotel.hotelStar === null) {
            errors[`hotels[${index}].hotelStar`] = `Hotel star for Hotel ${
              index + 1
            } is required.`;
          }
          if (!hotel.hotelDistance?.trim()) {
            errors[
              `hotels[${index}].hotelDistance`
            ] = `Hotel distance for Hotel ${index + 1} is required.`;
          }
          if (!hotel.pricePerNight) {
            errors[
              `hotels[${index}].pricePerNight`
            ] = `Price per night for Hotel ${index + 1} is required.`;
          }
        });
      }
    } else if (tabIndex === 3) {
      if (!transports || transports.length === 0) {
        errors["transports"] = "At least one transport must be added.";
      } else {
        transports.forEach((transport, index) => {
          if (!transport.title?.trim()) {
            errors[`transports[${index}].title`] = `Title for Transport ${
              index + 1
            } is required.`;
          }
          if (!transport.detail?.trim()) {
            errors[`transports[${index}].detail`] = `Detail for Transport ${
              index + 1
            } is required.`;
          }
          if (!transport.from?.trim()) {
            errors[`transports[${index}].from`] = `From for Transport ${
              index + 1
            } is required.`;
          }
          if (!transport.to?.trim()) {
            errors[`transports[${index}].to`] = `To for Transport ${
              index + 1
            } is required.`;
          }
          if (!transport.vehicleType?.trim()) {
            errors[
              `transports[${index}].vehicleType`
            ] = `Vehicle type for Transport ${index + 1} is required.`;
          }
          if (!transport.carryType?.trim()) {
            errors[
              `transports[${index}].carryType`
            ] = `Carry type for Transport ${index + 1} is required.`;
          }
          if (!transport.pricePerPax) {
            errors[
              `transports[${index}].pricePerPax`
            ] = `Price per pax for Transport ${index + 1} is required.`;
          }
        });
      }
    } else if (tabIndex === 4) {
      if (!meals || meals.length === 0) {
        errors["meals"] = "At least one meal must be added.";
      } else {
        meals.forEach((meal, index) => {
          if (!meal.title?.trim()) {
            errors[`meals[${index}].title`] = `Title for Meal ${
              index + 1
            } is required.`;
          }
          if (!meal.details?.trim()) {
            errors[`meals[${index}].details`] = `Details for Meal ${
              index + 1
            } are required.`;
          }
          if (!meal.pricePerPax) {
            errors[`meals[${index}].pricePerPax`] = `Price per pax for Meal ${
              index + 1
            } is required.`;
          }
        });
      }
    }

    dispatch(setErrors(errors));
    return Object.keys(errors).length === 0;
  };

  const handleTabChange = (tabIndex: number) => {
    // if (tabIndex > activeTab) {
    //   if (!validateStep(activeTab)) return;
    // }
    dispatch(setActiveTab(tabIndex));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // if (!validateStep(activeTab)) return;
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 0:
        return <HajjBasicInfoForm />;
      case 1:
        return <HajjFlightForm />;
      case 2:
        return <HajjHotelForm />;
      case 3:
        return <HajjTransportForm />;
      case 4:
        return <HajjMealsForm />;
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

export default HajjUploadWrapper;
