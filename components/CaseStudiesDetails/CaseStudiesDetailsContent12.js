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
                    src="/images/services-details/FantasyMiddleware/Fantasy2.png"
                    alt="Image"
                  />
                </div>

                <h3>Fantasy Middleware</h3>
                <p>
                  Our StackWorx team has skillfully developed a user-friendly,
                  highly configurable idea management platform designed to
                  effortlessly capture, evaluate, and act on valuable insights
                  from the experts within your organization. Powered by Ruby on
                  Rails (ROR), this website seamlessly integrates the latest web
                  technologies to create an intuitive and efficient idea
                  management solution. ROR, known for its robust and flexible
                  framework, forms the backbone of this platform, ensuring
                  smooth operations and adaptability to meet the unique needs of
                  your organization.
                </p>

                <p>
                  Collaborating with our dedicated team, we've harnessed the
                  capabilities of ROR to provide a dynamic and responsive
                  platform that empowers your organization to harness the
                  collective intelligence of your workforce. Our idea management
                  website is designed to optimize the innovation process,
                  allowing you to tap into the wealth of knowledge within your
                  organization, evaluate ideas effectively, and take swift
                  action to drive progress. With StackWorx's development
                  expertise and ROR as our foundation, we've created an
                  indispensable tool that enables your organization to stay at
                  the forefront of innovation.
                </p>

                <p>
                  By utilizing Ruby on Rails, our website stands as a testament
                  to the potential of this technology in modern web development.
                  It highlights how ROR can be leveraged to create a robust and
                  adaptable platform that streamlines idea management,
                  empowering organizations to turn insights into action,
                  fostering innovation, and staying ahead in today's dynamic
                  business landscape.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/FantasyMiddleware/Fantasy1.png"
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
                            Fantasy Middleware
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            ROR
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
                            <a
                              href="https://fantasy-middleware.herokuapp.com/users/sign_in"
                              target="_blank"
                            >
                              www.fantasy-middleware.com
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
