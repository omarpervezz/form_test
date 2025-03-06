"use client";
import React, { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/organisms/topbar/Topbar";
import Sidebar from "@/components/molecules/sidebar/Sidebar";
import { ThemeProvider } from "@/components/atoms/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/redux-store/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAppSlidebar = () => setIsOpen(!isOpen);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased bg-[#eff3f8] overflow-x-hidden p-5  dark:bg-darkMainBg`}
      >
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col md:flex-row w-full">
              <Sidebar
                toggleAppSlidebar={toggleAppSlidebar}
                isOpen={isOpen}
                isMobileMenuOpen={isMobileMenuOpen}
                handleHamburgerClick={handleHamburgerClick}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
              <div
                className={`flex-1 flex flex-col space-y-0 md:space-y-5 transition-all duration-300 fixed top-0 left-0 md:left-5 w-full h-full md:h-[calc(100vh-40px)] ${
                  isOpen ? "lg:pl-56" : "lg:pl-20"
                } md:relative  md:pr-5`}
              >
                <div className="flex flex-col space-y-1 h-full md:space-y-5 md:mt-0">
                  <Topbar handleHamburgerClick={handleHamburgerClick} />

                  <main className="flex-grow overflow-y-auto rounded-md space-y-5 table-container bg-white dark:bg-darkPrimaryBg">
                    <div>{children}</div>
                  </main>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
