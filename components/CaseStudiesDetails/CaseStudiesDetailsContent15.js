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
                    src="/images/services-details/Ganja/ganja3.png"
                    alt="Image"
                  />
                </div>

                <h3>Dr.Ganja</h3>
                <p>
                At eComet, we take pride in our partnership with Dr. Ganja, offering unparalleled services in order processing on both international and domestic fronts. Our dedicated team ensures that each transaction is seamlessly managed, from the initial order placement to the final delivery. Leveraging advanced technologies and a robust system, we prioritize efficiency, accuracy, and timely execution to enhance the overall customer experience for Dr. Ganja.
                </p>

                <p>
                The eComet collaboration extends beyond order processing to the meticulous management of Dr. Ganja's product catalog. Our skilled team takes charge of uploading product Sku's, ensuring that the inventory is accurately represented online. Additionally, we handle the crucial task of managing reviews, maintaining a positive online reputation for Dr. Ganja. By utilizing sophisticated tools and strategic approaches, we contribute to the growth of their brand through effective product presentation and customer engagement.
                </p>

                <p>
                In our commitment to transparency, we seamlessly integrate the backend operations for Dr. Ganja by uploading certificates associated with their products. This not only enhances credibility but also ensures compliance with industry standards. Moreover, we facilitate a seamless post-purchase experience by promptly sending tracking IDs to clients, allowing them to monitor the progress of their orders in real-time. Through these comprehensive services, eComet continues to be a reliable partner in Dr. Ganja's journey, combining technology and expertise for mutual success.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Ganja/ganja2.png"
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
                            Dr.Ganja
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            Wordpress
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
                            <a href="https://www.drganja.com/" target="_blank">
                            www.drganja.com
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
