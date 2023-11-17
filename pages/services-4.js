import React from "react";
import Navbar from "../components/Layouts/Navbar";
import PageBanner from "../components/Common/PageBanner";
import ServicesStyleFour from "../components/Services/ServicesStyleFour";
import MakeYourBusiness from "../components/Common/MakeYourBusiness";
import Footer from "../components/Layouts/Footer";

export default function Services4() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Our Services"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Services"
      />
      <ServicesStyleFour />

      <MakeYourBusiness />

      <Footer />
    </>
  );
}
