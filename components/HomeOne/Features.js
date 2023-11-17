import React from "react";
import Link from "next/link";
import { PiCodeDuotone } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsGraphUpArrow } from "react-icons/bs";




const featuresData = [
  {
    iconName: <PiCodeDuotone/>,
    title: "Web Development",
    shortText:
      "eComet pioneers web excellence, coding innovation, seamless experiences, connecting businesses to the digital forefront with precision & flair.",
    viewDetails: "/service-details",
    aosDelay: "100",
  },
  {
    iconName: <HiOutlineUserGroup/>,
    title: "Virtual Assistant",
    shortText:
      "Streamlining tasks, enhancing productivity, and ensuring seamless operations through tailored virtual solutions for optimized efficiency.",
    viewDetails: "/service-details",
    aosDelay: "200",
  },
  {
    iconName: <BsGraphUpArrow/>,
    title: "Business Development",
    shortText:
      "Fuel growth, spark innovation, cultivate success crafting strategic solutions and forging impactful partnerships in business development.",
    viewDetails: "/service-details",
    aosDelay: "300",
  },
];

const Features = () => {
  return (
    <>
      <div className="features-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {featuresData &&
              featuresData.slice(0, 3).map((value, i) => (
                <div
                  className="col-lg-4 col-sm-6 p-0"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay={value.aosDelay}
                  key={i}
                >
                  <div className="single-features">
                    <i>{value.iconName}</i>
                    <h3>{value.title}</h3>
                    <p>{value.shortText}</p>

                    {/* <Link href={value.viewDetails} className="read-more-icon">
                      <span className="flaticon-right-arrow"></span>
                    </Link> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
