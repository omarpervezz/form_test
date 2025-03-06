"use client";
import TopupBody from "@/components/molecules/topup/TopupBody";
import TopupHeader from "@/components/molecules/topup/TopupHeader";

import React from "react";

const AddTopupWrapper = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (formData: any) => {
    console.log("main form", formData);
  };
  return (
    <div className="m-5 bg-white rounded-md p-5 dark:bg-darkPrimaryBg">
      <TopupHeader />
      <TopupBody onSubmit={onSubmit} />
    </div>
  );
};

export default AddTopupWrapper;
