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
                    src="/images/services-details/Zentap/zentap2.jpg"
                    alt="Image"
                  />
                </div>

                <h3>Zentap</h3>
                <p>
                  Zentap, the revolutionary platform designed to empower real
                  estate agents, has been brought to life through the
                  collaborative efforts of our expert Stackworx team. Leveraging
                  a powerful stack that includes Ruby on Rails (ROR) and
                  Angular, we've engineered a website that takes real estate
                  marketing to the next level. With our innovative software,
                  agents can streamline their marketing efforts, ultimately
                  resulting in an increased flow of leads and a higher rate of
                  successful business closings.
                </p>

                <p>
                  The integration of Ruby on Rails ensures that Zentap's backend
                  operates seamlessly, managing data and processes efficiently,
                  while Angular brings an engaging and dynamic front-end to
                  life. This fusion of technologies harmonizes the user
                  experience, creating a user-friendly interface that helps real
                  estate professionals thrive in a competitive market. With our
                  stack, we've revolutionized real estate marketing, making it
                  easier for agents to focus on what they do best – closing
                  deals and growing their businesses.
                </p>

                <p>
                  Our collaboration with Zentap represents a success story in
                  the real estate industry. By harnessing the capabilities of
                  ROR and Angular, we've not only developed a powerful website
                  but also a vital tool for real estate agents to gain a
                  competitive edge. Zentap's innovative approach to marketing
                  empowers professionals to reach more potential clients and
                  convert leads into successful business deals, ultimately
                  enhancing their overall success and growth.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Zentap/zentap2.jpg"
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
                            Zentap
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            ROR, Angular
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
                            <a href="https://www.zentap.com/" target="_blank">
                              www.zentap.com
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
