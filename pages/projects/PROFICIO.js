import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import CaseStudiesDetailsContent from "../../components/CaseStudiesDetails/CaseStudiesDetailsContent3";
import CTA from "../../components/Common/CTA";
import Footer from "../../components/Layouts/Footer";

export default function CaseStudiesDetails() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Project Details"
        homePageUrl="/"
        homePageText="Home"
        activePageText="PROFICIO"
      />

      <CaseStudiesDetailsContent />

      <CTA />

      <Footer />
    </>
  );
}
