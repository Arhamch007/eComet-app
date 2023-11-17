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
                    src="/images/services-details/Fellon/fellon3.png"
                    alt="Image"
                  />
                </div>

                <h3>Fellon</h3>
                <p>
                At eComet, we take pride in providing comprehensive services to our clients, facilitating a smooth and efficient e-commerce experience. One of our key offerings is expert assistance in uploading products to Shopify stores. Understanding the significance of a well-curated product catalog, our team ensures that each product is accurately represented, with compelling descriptions and high-quality visuals. Whether it's a small-scale boutique or a thriving online marketplace, Ecomet is committed to streamlining the process of populating Shopify stores, enhancing the visual appeal and functionality for a superior customer browsing experience.
                </p>

                <p>
                In addition to product uploads, our dedicated team at eComet excels in promptly responding to client queries via email. Recognizing the importance of customer communication, we prioritize swift and effective responses to ensure customer satisfaction. Our customer support team is well-versed in the intricacies of the e-commerce landscape, addressing inquiries with a personalized touch. From product specifications to order tracking, our commitment to responsiveness reflects our dedication to providing clients with the support they need to foster trust and loyalty among their customer base.
                </p>

                <p>
                eComet is not just a service provider; we are your partner in navigating the dynamic world of e-commerce. Through our meticulous product uploading services and responsive client query management, we empower businesses to focus on growth and customer engagement while leaving the operational details to us. Join hands with eComet for a seamless e-commerce journey, where your success is our priority.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Fellon/fellon2.png"
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
                            Fellon
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
                            <a href="https://fellon.de/" target="_blank">
                            www.fellon.de
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
