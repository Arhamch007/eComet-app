import React from "react";
import Navbar from "../components/Layouts/Navbar";
import PageBanner from "../components/Common/PageBanner";
import About from "../components/AboutOne/About";
import MakeYourBusiness from "../components/Common/MakeYourBusiness";
import Testimonials from "../components/Common/Testimonials";
import TeamTwo from "../components/Common/TeamTwo";
import Partner from "../components/Common/Partner";
import Footer from "../components/Layouts/Footer";

export default function About1() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="About Us"
        homePageUrl="/"
        homePageText="Home"
        activePageText="About"
      />

      <About />

      <MakeYourBusiness />

      <Testimonials />
      <div className="pb-50 pt-100">
      <TeamTwo  />
      </div>

      {/* <div className="pb-50">
        <Partner />
      </div> */}

      <Footer />
    </>
  );
}
