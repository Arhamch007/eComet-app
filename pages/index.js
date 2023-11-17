import Navbar from "../components/Layouts/Navbar";
import MainBanner from "../components/HomeOne/MainBanner";
import Features from "../components/HomeOne/Features";
import About from "../components/HomeOne/About";
import Services from "../components/HomeOne/Services";
import MakeYourBusiness from "../components/Common/MakeYourBusiness";
import WhatWeOffer from "../components/HomeOne/WhatWeOffer";
import CaseStudies from "../components/HomeThree/CaseStudies"
import Testimonials from "../components/Common/Testimonials";
import Faqs from "../components/HomeThree/Faq"
import Footer from "../components/Layouts/Footer";

export default function Index() {
  return (
    <>
      <Navbar />

      <MainBanner />

      <Features />

      <About />

      <Services />

      <MakeYourBusiness />

      <WhatWeOffer />

      <CaseStudies/>

      <Testimonials />

      <Faqs/>

      <Footer />
    </>
  );
}
