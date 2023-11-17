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
                    src="/images/services-details/Ezyagent/easy1.png"
                    alt="Image"
                  />
                </div>

                <h3>Ezyagent</h3>
                <p>
                  Ezyagent, our cutting-edge insurance CRM software, is
                  revolutionizing the way insurance agents manage client
                  interactions. Developed by our Stackworx team, this innovative
                  solution leverages the power of Ruby on Rails (ROR) and Vue.js
                  to offer a seamless user experience. With ROR's robust backend
                  capabilities and Vue.js' dynamic front-end framework, Ezyagent
                  streamlines the client notification process, automating
                  crucial tasks for insurance agents.
                </p>

                <p>
                  Our collaboration with Ezyagent underscores the potential of
                  this technology stack. Ruby on Rails provides a solid
                  foundation for data handling and backend functionality, while
                  Vue.js ensures an interactive and user-friendly interface.
                  This combination results in an efficient, automated solution
                  that empowers insurance agents to focus on what they do best –
                  serving their clients.
                </p>

                <p>
                  Ezyagent represents a prime example of the Stackworx team's
                  expertise in crafting modern and effective web solutions. By
                  utilizing ROR and Vue.js, we've delivered a powerful platform
                  that significantly enhances the workflow of insurance agents,
                  making their lives easier and their businesses more efficient.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Ezyagent/easy2.png"
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
                            Ezyagent
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            ROR, Vue.JS
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
                            <a href="https://ezyagent.com/" target="_blank">
                              www.ezyagent.com
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
