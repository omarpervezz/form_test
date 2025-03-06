/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../feature/api/apiSlice";
import bookingFlightReducer from "../feature/booking/bookingFlightSlice";
import packageUploadTabReducer from "@/redux/feature/package-upload/packageUploadTabSlice";
import packageUploadDetailsReducer from "@/redux/feature/package-upload/packageUploadDetailsSlice";
import packageUploadItineraryReducer from "@/redux/feature/package-upload/packageUploadItinerarySlice";
import packageUploadMealsReducer from "@/redux/feature/package-upload/packageUploadMealsSlice";

import packageUploadFlightReducer from "@/redux/feature/package-upload/packageUploadFlightSlice";
import packageUploadHotelReducer from "@/redux/feature/package-upload/packageUploadHotelSlice";
import packageUploadTransportReducer from "@/redux/feature/package-upload/packageUploadTransportSlice";
import packageUploadGuideReducer from "@/redux/feature/package-upload/packageUploadGuideSlice";
import packageUploadMediaReducer from "@/redux/feature/package-upload/packageUploadMediaSlice";
/// package upload error state management
import packageUploadErrorsReducer from "@/redux/feature/package-upload/packageUploadErrorsSlice";
import packageUploadMealsErrorsReducer from "@/redux/feature/package-upload/packageUploadMealsErrorsSlice";
import packageUploadFlightErrorsReducer from "@/redux/feature/package-upload/packageUploadFlightErrorsSlice";
import packageUploadHotelErrorsReducer from "@/redux/feature/package-upload/packageUploadHotelErrorsSlice";
import packageUploadTransportErrorsReducer from "@/redux/feature/package-upload/packageUploadTransportErrorsSlice";
import packageUploadGuideErrorsReducer from "@/redux/feature/package-upload/packageUploadGuideErrorsSlice";
// package list table
import packageListReducer from "@/redux/feature/package-list/packageListSlice";

// vendor add
import vendorBasicInfoAddReducer from "@/redux/feature/vendor-add/vendorAddBasicInfoSlice";
import vendorBasicInfoAddErrorReducer from "@/redux/feature/vendor-add/vendorAddBasicInfoErrorSlice";
import contactInfoReducer from "@/redux/feature/vendor-add/contactInfoSlice";
import contactInfoErrorReducer from "@/redux/feature/vendor-add/contactInfoErrorSlice";
import addressReducer from "@/redux/feature/vendor-add/addressSlice";
import addressErrorReducer from "@/redux/feature/vendor-add/addressErrorSlice";

// hajj upload
import hajjUploadDetailsReducer from "@/redux/feature/hajj-upload/hajjUploadDetailsSlice";
import hajjUploadFlightsReducer from "@/redux/feature/hajj-upload/hajjUploadFlightsSlice";
import hajjUploadHotelsReducer from "@/redux/feature/hajj-upload/hajjUploadHotelsSlice";
import hajjUploadErrorsReducer from "@/redux/feature/hajj-upload/hajjUploadErrorsSlice";
import hajjUploadTabReducer from "@/redux/feature/hajj-upload/hajjUploadTabSlice";
import hajjUploadBasicInfoErrorsReducer from "@/redux/feature/hajj-upload/hajjUploadBasicInfoErrorsSlice";
import hajjUploadFlightErrorsReducer from "@/redux/feature/hajj-upload/hajjUploadFlightErrorsSlice";
import hajjUploadHotelErrorsReducer from "@/redux/feature/hajj-upload/hajjUploadHotelErrorsSlice";
import hajjUploadMealsReducer from "@/redux/feature/hajj-upload/hajjUploadMealsSlice";
import hajjUploadMealErrorsReducer from "@/redux/feature/hajj-upload/hajjUploadMealErrorsSlice";
import hajjUploadTransportsReducer from "@/redux/feature/hajj-upload/hajjUploadTransportsSlice";
import hajjUploadTransportErrorsReducer from "@/redux/feature/hajj-upload/hajjUploadTransportErrorsSlice";

// add country
import addCountryReducer from "@/redux/feature/add-country/addCountrySlice";
import addCountryErrorsReducer from "@/redux/feature/add-country/addCountryErrorsSlice";

// add city
import addCityReducer from "@/redux/feature/add-city/addCitySlice";
import addCityErrorsReducer from "@/redux/feature/add-city/addCityErrorsSlice";

// add banner
import addBannerReducer from "@/redux/feature/add-banner/addBannerSlice";
import addBannerErrorsReducer from "@/redux/feature/add-banner/addBannerErrorsSlice";

// add airport
import addAirportReducer from "@/redux/feature/add-airport/addAirportSlice";
import addAirportErrorsReducer from "@/redux/feature/add-airport/addAirportErrorsSlice";

// blog info
import blogInfoReducer from "@/redux/feature/blog-info/blogInfoSlice";
import blogInfoErrorsReducer from "@/redux/feature/blog-info/blogInfoErrorsSlice";
import blogArticleReducer from "@/redux/feature/blog-info/blogArticleSlice";
import blogArticleErrorsReducer from "@/redux/feature/blog-info/blogArticleErrorsSlice";
import blogSettingsReducer from "@/redux/feature/blog-info/blogSettingsSlice";
import blogSettingsErrorsReducer from "@/redux/feature/blog-info/blogSettingsErrorsSlice";

import {
  updateMediaField,
  removeMedia,
} from "@/redux/feature/package-upload/packageUploadMediaSlice";

import { updateBannerField } from "../feature/add-banner/addBannerSlice";
import {
  updateAirportField,
  removeGalleryImage,
} from "../feature/add-airport/addAirportSlice";

import { updateBlogInfoField } from "@/redux/feature/blog-info/blogInfoSlice";
import { updateBlogArticleField } from "@/redux/feature/blog-info/blogArticleSlice";

export const store = configureStore({
  reducer: {
    bookingFlight: bookingFlightReducer,
    packageUploadTab: packageUploadTabReducer,
    packageUploadDetails: packageUploadDetailsReducer,
    packageUploadItinerary: packageUploadItineraryReducer,
    packageUploadMeals: packageUploadMealsReducer,
    packageUploadFlights: packageUploadFlightReducer,
    packageUploadHotels: packageUploadHotelReducer,
    packageUploadTransport: packageUploadTransportReducer,
    packageUploadGuides: packageUploadGuideReducer,
    packageUploadMedia: packageUploadMediaReducer,
    // error handling
    packageUploadErrors: packageUploadErrorsReducer,
    packageUploadMealsErrors: packageUploadMealsErrorsReducer,
    packageUploadFlightErrors: packageUploadFlightErrorsReducer,
    packageUploadHotelErrors: packageUploadHotelErrorsReducer,
    packageUploadTransportErrors: packageUploadTransportErrorsReducer,
    packageUploadGuideErrors: packageUploadGuideErrorsReducer,
    // package list
    packageList: packageListReducer,

    // vendor add
    vendorBasicInfoAddState: vendorBasicInfoAddReducer,
    vendorBasicInfoAddErrors: vendorBasicInfoAddErrorReducer,
    contactInfoState: contactInfoReducer,
    contactInfoErrors: contactInfoErrorReducer,
    addressState: addressReducer,
    addressErrors: addressErrorReducer,
    // hajj upload
    hajjUploadDetails: hajjUploadDetailsReducer,
    hajjUploadFlights: hajjUploadFlightsReducer,
    hajjUploadHotels: hajjUploadHotelsReducer,
    hajjUploadErrors: hajjUploadErrorsReducer,
    hajjUploadTab: hajjUploadTabReducer,
    hajjUploadBasicInfoErrors: hajjUploadBasicInfoErrorsReducer,
    hajjUploadFlightErrors: hajjUploadFlightErrorsReducer,
    hajjUploadHotelErrors: hajjUploadHotelErrorsReducer,
    hajjUploadMeals: hajjUploadMealsReducer,
    hajjUploadMealErrors: hajjUploadMealErrorsReducer,
    hajjUploadTransports: hajjUploadTransportsReducer,
    hajjUploadTransportErrors: hajjUploadTransportErrorsReducer,

    // add country
    addCountry: addCountryReducer,
    addCountryErrors: addCountryErrorsReducer,

    // add city
    addCity: addCityReducer,
    addCityErrors: addCityErrorsReducer,

    // add banner
    addBanner: addBannerReducer,
    addBannerErrors: addBannerErrorsReducer,

    // add airport
    addAirport: addAirportReducer,
    addAirportErrors: addAirportErrorsReducer,
    // blog info
    blogInfo: blogInfoReducer,
    blogInfoErrors: blogInfoErrorsReducer,
    blogArticle: blogArticleReducer,
    blogArticleErrors: blogArticleErrorsReducer,
    blogSettings: blogSettingsReducer,
    blogSettingsErrors: blogSettingsErrorsReducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          updateMediaField.type,
          removeMedia.type,
          updateBannerField.type,
          updateAirportField.type,
          removeGalleryImage.type,
          updateBlogInfoField.type,
          updateBlogArticleField.type,
        ],
        ignoredPaths: [
          "packageUploadMedia.mainImage",
          "packageUploadMedia.galleryImages",
          "addBanner.banner.media",
          "addAirport.details.mainImage",
          "addAirport.details.galleryImages",
          "blogInfo.thumbnailImage",
          "blogArticle.featureImage",
        ],
      },
    }).concat(apiSlice.middleware),
});

// Export store type for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
