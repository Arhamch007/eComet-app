import React from "react";

const CaseStudiesDetailsContent = () => {
  return (
    <>
      <section className="service-details-area ptb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="service-details-wrap">
                <div className="service-img">
                  <img
                    src="/images/services-details/PuppyWash/pup1.png"
                    alt="Image"
                  />
                </div>

                <h3>Puppy wash</h3>
                <p>
                  The World's Leading Automated Dog Bath is a revolutionary
                  solution that offers convenience and efficiency in pet care.
                  Developed by our skilled Stackworx team, this innovative
                  product is designed to simplify the dog grooming process. With
                  the use of Shopify and Liquid, we've created a seamless online
                  shopping experience, making it easy for pet owners to acquire
                  this cutting-edge device from the comfort of their homes.
                </p>

                <p>
                  Our website's intuitive design ensures that customers can
                  quickly access all the information they need, from product
                  details to user reviews, making informed decisions a breeze.
                  The use of Shopify as our e-commerce platform provides a
                  secure and user-friendly checkout process, while Liquid
                  templates allow for customization, ensuring the website's
                  aesthetics match the product's sleek design. Whether indoors
                  in a bathtub or on your lawn, this automated dog bath offers a
                  versatile solution for pet owners, all made accessible through
                  our user-friendly website.
                </p>

                <p>
                  The World's Leading Automated Dog Bath represents the epitome
                  of convenience and innovation, and our use of Shopify and
                  Liquid technology ensures a seamless user experience.
                  Stackworx is proud to have been a part of this project,
                  delivering a website that complements the product's ease of
                  use and practicality.
                </p>
                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/PuppyWash/pup2.png"
                          alt="Image"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="car-service-list">
                        <ul>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Client:
                            </span>{" "}
                            Puppy wash
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            Shopify, Liquid
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Industry:
                            </span>{" "}
                            IT
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>URL:</span>{" "}
                            <a href="https://puppywash.com/" target="_blank">
                              www.puppywash.com
                            </a>
                          </li>
                          {/* <li>
                            <i className="bx bx-check"></i>
                            Alloy wheel treatment inside and out
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudiesDetailsContent;
