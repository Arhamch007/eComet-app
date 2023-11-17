import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import CaseStudiesDetailsContent from "../../components/CaseStudiesDetails/CaseStudiesDetailsContent9";
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
        activePageText="Mega Stores"
      />

      <CaseStudiesDetailsContent />

      <CTA />

      <Footer />
    </>
  );
}
