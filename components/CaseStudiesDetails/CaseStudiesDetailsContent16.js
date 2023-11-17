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
                    src="/images/services-details/Jarrod/havoc1.png"
                    alt="Image"
                  />
                </div>

                <h3>Havoc Parts</h3>
                <p>
                At eComet, we take pride in our partnership with Havoc Parts, where our commitment to seamless e-commerce experiences has been exemplified through a range of services. From the meticulous task of uploading products onto the Shopify store to the creation of custom product pages, our team at eComet has been instrumental in enhancing the online presence of Havoc Parts. We understand the importance of a visually appealing and user-friendly interface, ensuring that potential customers are greeted with an engaging and efficient online shopping experience.
                </p>

                <p>
                In collaboration with Havoc Parts, eComet has gone beyond the ordinary by crafting custom product pages that stand out in a crowded digital marketplace. Our design and development teams worked closely to understand Havoc Parts' unique requirements, resulting in visually striking and highly functional product pages. By combining aesthetic appeal with seamless navigation, we've created an online showcase that not only reflects Havoc Parts' brand identity but also maximizes user engagement and conversion rates.
                </p>

                <p>
                eComet's dedication to comprehensive e-commerce support for Havoc Parts extends beyond the storefront. Our research tasks have provided valuable insights, enabling Havoc Parts to stay ahead of market trends and consumer preferences. Additionally, our expertise extends to eBay, where we have successfully executed listings that enhance Havoc Parts' visibility and reach in the competitive online marketplace. Whether it's market research or expanding presence on various platforms, eComet continues to be a trusted partner, driving Havoc Parts toward sustained e-commerce success.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Jarrod/havoc2.png"
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
                            Havoc Parts
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            Shopify
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
                            <a href="https://www.havoc-parts.com/" target="_blank">
                            www.havoc-parts.com
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
