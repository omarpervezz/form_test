"use client";
import MultiStepFormPaginationsButton from "@/components/molecules/global/MultiStepFormPaginationsButton";
import MultiStepTabNavigation from "@/components/molecules/global/MultiStepTabNavigation";
import AddressType from "@/components/molecules/vendor-add/AddressType";
import BasicInfo from "@/components/molecules/vendor-add/BasicInfo";
import ContactInfo from "@/components/molecules/vendor-add/ContactInfo";
import { setActiveTab } from "@/redux/feature/package-upload/packageUploadTabSlice";
import { setAddressError } from "@/redux/feature/vendor-add/addressErrorSlice";
import { setContactInfoError } from "@/redux/feature/vendor-add/contactInfoErrorSlice";
import { setVendorAddErrors } from "@/redux/feature/vendor-add/vendorAddBasicInfoErrorSlice";

import { RootState } from "@/redux/redux-store/store";
import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { label: "Basic Info" },
  { label: "Contact Info" },
  { label: "Address type" },
];

function VendorAddWrapper() {
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: RootState) => state.packageUploadTab.activeTab
  );

  const basicInfo = useSelector(
    (state: RootState) => state.vendorBasicInfoAddState
  );
  const contactInfo = useSelector(
    (state: RootState) => state.contactInfoState.contactInfo
  );
  const addresses = useSelector(
    (state: RootState) => state.addressState.addresses
  );
  const validateStep = (tabIndex: number) => {
    const errors: { [key: string]: string } = {};

    if (tabIndex === 0) {
      if (!basicInfo.firstName?.trim()) {
        errors.firstName = "First name is required";
      }
      if (!basicInfo.lastName?.trim()) {
        errors.lastName = "Last name is required";
      }
      if (!basicInfo.email?.trim()) {
        errors.email = "Email is required";
      }
      if (!basicInfo.phone?.trim()) {
        errors.phone = "Phone is required";
      }
      dispatch(setVendorAddErrors(errors));
    } else if (tabIndex === 1) {
      contactInfo.forEach((contact, index) => {
        if (!contact.name?.trim()) {
          errors[`contactInfo[${index}].name`] =
            "Contact person name is required";
          dispatch(
            setContactInfoError({
              index,
              field: "name",
              error: "Contact person name is required",
            })
          );
        }
        if (!contact.email?.trim()) {
          errors[`contactInfo[${index}].email`] = "Contact email is required";
          dispatch(
            setContactInfoError({
              index,
              field: "email",
              error: "Contact email is required",
            })
          );
        }
        if (!contact.phone?.trim()) {
          errors[`contactInfo[${index}].phone`] = "Contact phone is required";
          dispatch(
            setContactInfoError({
              index,
              field: "phone",
              error: "Contact phone is required",
            })
          );
        }
      });
    } else if (tabIndex === 2) {
      addresses.forEach((address, index) => {
        if (!address.country?.trim()) {
          errors[`addresses[${index}].country`] = "Country is required";
          dispatch(
            setAddressError({
              index,
              field: "country",
              error: "Country is required",
            })
          );
        }
        if (!address.city?.trim()) {
          errors[`addresses[${index}].city`] = "City is required";
          dispatch(
            setAddressError({
              index,
              field: "city",
              error: "City is required",
            })
          );
        }
        if (!address.state?.trim()) {
          errors[`addresses[${index}].state`] = "State is required";
          dispatch(
            setAddressError({
              index,
              field: "state",
              error: "State is required",
            })
          );
        }
        if (!address.addressLine1?.trim()) {
          errors[`addresses[${index}].addressLine1`] =
            "Address Line 1 is required";
          dispatch(
            setAddressError({
              index,
              field: "addressLine1",
              error: "Address Line 1 is required",
            })
          );
        }
        if (!address.postCode?.trim()) {
          errors[`addresses[${index}].postCode`] = "Post Code is required";
          dispatch(
            setAddressError({
              index,
              field: "postCode",
              error: "Post Code is required",
            })
          );
        }
      });
    }

    // Return `true` if no errors exist, otherwise `false`
    return Object.keys(errors).length === 0;
  };

  const handleTabChange = (tabIndex: number) => {
    // if (tabIndex > activeTab) {
    //   if (!validateStep(activeTab)) return;
    // }
    dispatch(setActiveTab(tabIndex));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Validate the current step before proceeding with form submission
    // if (!validateStep(activeTab)) return;
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 0:
        return <BasicInfo />;
      case 1:
        return <ContactInfo />;
      case 2:
        return <AddressType />;
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

export default VendorAddWrapper;
