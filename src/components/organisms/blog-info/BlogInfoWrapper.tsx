"use client";
import React, { FormEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { setBlogInfoErrors } from "@/redux/feature/blog-info/blogInfoErrorsSlice";
import MultiStepTabNavigation from "@/components/molecules/global/MultiStepTabNavigation";
import MultiStepFormPaginationsButton from "@/components/molecules/global/MultiStepFormPaginationsButton";
import BlogInfoForm from "@/components/molecules/blog-info/BlogInfoForm";
import BlogArticleForm from "@/components/molecules/blog-info/BlogArticleForm";
import { setActiveTab } from "@/redux/feature/package-upload/packageUploadTabSlice";
import BlogSettingsForm from "@/components/molecules/blog-info/BlogSettingsForm";
const tabs = [
  { label: "Blog Info" },
  { label: "Articles" },
  { label: "Blog Settings" },
];

function BlogInfoWrapper() {
  const dispatch = useDispatch();
  const blogInfo = useSelector((state: RootState) => state.blogInfo);
  const activeTab = useSelector(
    (state: RootState) => state.packageUploadTab.activeTab
  );
  const validateStep = useCallback(
    (tabIndex: number) => {
      const errors: { [key: string]: string } = {};
      if (tabIndex === 0) {
        if (!blogInfo.blogTitle.trim())
          errors.blogTitle = "Blog title is required.";
        if (!blogInfo.category.trim())
          errors.category = "Category is required.";
        if (!blogInfo.subCategory.trim())
          errors.subCategory = "Sub category is required.";
        if (!blogInfo.metaTitle.trim())
          errors.metaTitle = "Meta title is required.";
        if (!blogInfo.shortDescription.trim())
          errors.shortDescription = "Short description is required.";
        if (!blogInfo.metaDescription.trim())
          errors.metaDescription = "Meta description is required.";
        if (!blogInfo.primaryKeyword.trim())
          errors.primaryKeyword = "Primary keyword is required.";
        if (!blogInfo.thumbnailImage)
          errors.thumbnailImage = "Thumbnail image is required.";
        if (!blogInfo.imageAlt.trim())
          errors.imageAlt = "Image alt text is required.";
      } else if (tabIndex === 1) {
        if (!blogInfo.articleTitle.trim())
          errors.articleTitle = "Article title is required.";
      }

      dispatch(setBlogInfoErrors(errors));
      return Object.keys(errors).length === 0;
    },
    [blogInfo, dispatch]
  );

  const handleTabChange = (tabIndex: number) => {
    // Prevent moving to the next tab if the current step is invalid
    // if (tabIndex > activeTab) {
    //   if (!validateStep(activeTab)) return; // Validate current step and stop navigation if invalid
    // }
    dispatch(setActiveTab(tabIndex));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // if (!validateStep(activeTab)) return;
    // alert("Form submitted successfully!");
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 0:
        return <BlogInfoForm />;
      case 1:
        return <BlogArticleForm />;
      case 2:
        return <BlogSettingsForm />;
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

export default BlogInfoWrapper;
