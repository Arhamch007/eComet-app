import React from "react";
import { FaLaptopCode } from "react-icons/fa";
import { SiAlwaysdata } from "react-icons/si";
import { BsDatabaseFillGear } from "react-icons/bs";
import { FaUsersGear } from "react-icons/fa6";
import { SiMinds } from "react-icons/si";
import { LuBrainCircuit } from "react-icons/lu";
import { PiHandshakeFill } from "react-icons/pi";










const servicesData = [
  {
    iconName: <FaLaptopCode/>,
    title: "Crafted Frontend Design",
    shortText:
      "Experience cutting-edge frontend design with React, Vue, and Next.js. We ensure your digital presence is stunning and responsive, pushing the boundaries of web excellence.",
    viewDetails: "/service-details",
    aosDelay: "100",
  },
  {
    iconName: <BsDatabaseFillGear/>,
    title: "Robust Backend Scaling",
    shortText:
      "Modern web apps scale with Node.js, Ruby on Rails, Django, Docker, serverless computing (AWS Lambda, Azure Functions), and Kubernetes, ensuring agile, scalable infrastructures.",
    viewDetails: "/service-details",
    aosDelay: "200",
  },
  {
    iconName: <SiAlwaysdata/>,
    title: "Optimized Performance",
    shortText:
      "Optimizing performance requires efficient coding, streamlined databases, algorithmic enhancements and regular monitoring for a seamless user experience.",
    viewDetails: "/service-details",
    aosDelay: "300",
  },
  {
    iconName: <LuBrainCircuit />    ,
    title: "Mindful Productivity Coach",
    shortText:
      "Effortlessly enhance productivity with our Mindful Productivity VA. Streamline tasks, focus on essentials, and experience personalized efficiency support.",
    viewDetails: "/service-details",
    aosDelay: "400",
  },
  {
    iconName:  <FaUsersGear /> ,
    title: "Digital Support",
    shortText:
      "Delegate tasks, streamline schedules—our Virtual Assistants ensure productivity, freeing you to effortlessly focus on your top priorities with confidence.",
    viewDetails: "/service-details",
    aosDelay: "500",
  },
  {
    iconName: <PiHandshakeFill/>,
    title: "Conscious Consumer Guide",
    shortText:
      "In the realm of conscious consumerism, embracing virtual assistant services empowers mindful choices, optimizing efficiency while minimizing environmental impact.",
    viewDetails: "/service-details",
    aosDelay: "600",
  },
];

const Services = () => {
  return (
    <section className="offer-area pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <span>Services</span>
          <h2>Elevate with Exceptional Services</h2>
          <p>
          Discover unparalleled excellence as we redefine service standards. Elevate your experience with our exceptional services, tailored to meet your unique needs and exceed your expectations.
          </p>
        </div>

        <div className="row justify-content-center">
          {servicesData &&
            servicesData.slice(0, 6).map((value, i) => (
              <div
                className="col-lg-4 col-sm-6"
                key={i}
                data-aos="fade-in"
                data-aos-duration="1200"
                data-aos-delay={value.aosDelay}
              >
                <div className="single-offer">
                  <i>{value.iconName}</i>
                  <h3>
                  {value.title}
                    {/* <Link href={value.viewDetails}></Link> */}
                    
                  </h3>
                  <p>{value.shortText}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Shape Images */}
      <div className="offer-shape">
        <img src="/images/shape/services-shape/1.png" alt="Image" />
        <img src="/images/shape/services-shape/2.png" alt="Image" />
        <img src="/images/shape/services-shape/3.png" alt="Image" />
        <img src="/images/shape/services-shape/4.png" alt="Image" />
        <img src="/images/shape/services-shape/5.png" alt="Image" />
        <img src="/images/shape/services-shape/6.png" alt="Image" />
      </div>
    </section>
  );
};

export default Services;
