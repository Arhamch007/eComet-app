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
                    src="/images/services-details/Phin/1.png"
                    alt="Image"
                  />
                </div>

                <h3>pHin</h3>
                <p>
                  Our stackworx team has developed an intuitive and highly
                  customizable idea management platform using Vue.js. This
                  technology choice ensures a user-friendly interface and
                  real-time updates for efficient idea capture and evaluation.
                  With Vue.js, we empower organizations to adapt the platform to
                  their specific needs, fostering innovation and informed
                  decision-making.
                </p>

                <p>
                  This Vue.js-powered platform exemplifies our commitment to
                  user-driven innovation, enabling organizations to harness
                  their internal expertise effectively. Its agility and
                  responsiveness guarantee that it remains adaptable to changing
                  requirements, nurturing a culture of continuous improvement
                  and innovation within your organization.
                </p>

                <p>
                  By giving those closest to the organization a simple yet
                  powerful tool to contribute their ideas, we ensure that the
                  wealth of knowledge within your organization is not only
                  captured but also acted upon. Vue.js, chosen by our stackworx
                  team, ensures that the platform remains agile, responsive, and
                  adaptable to evolving needs, ultimately fostering a culture of
                  continuous improvement and innovation.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Phin/2.png"
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
                            pHin
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            Vue.JS, ROR
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
                            <a href="#" target="_blank">
                              N/A
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
