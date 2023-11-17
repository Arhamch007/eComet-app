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
                    src="/images/services-details/Drone/drone2.png"
                    alt="Image"
                  />
                </div>

                <h3>Drone</h3>
                <p>
                  At the heart of our project lies a sophisticated synergy
                  between React and Ruby on Rails, meticulously crafted by our
                  dedicated Stackworx team. React, with its component-based
                  architecture, delivers an immersive user interface,
                  characterized by smooth transitions and intuitive user
                  interactions. Meanwhile, Ruby on Rails, renowned for its
                  simplicity and flexibility, powers the backend infrastructure,
                  enabling us to build robust APIs that drive the website's
                  functionality.
                </p>

                <p>
                  This harmonious blend of React and ROR not only ensures a
                  visually captivating user experience but also guarantees the
                  reliability and scalability essential for a project of this
                  magnitude. Our Stackworx team's adept utilization of these
                  technologies has resulted in a website that stands as a
                  testament to our commitment to excellence and innovation.
                </p>

                <p>
                  In the digital landscape, our project drone takes flight,
                  propelled by the synergy of React and Ruby on Rails (ROR)
                  meticulously orchestrated by our skilled Stackworx team.
                  React, with its declarative and component-based approach,
                  crafts an engaging user interface, offering seamless
                  navigation and captivating visuals. Concurrently, ROR,
                  renowned for its robustness and developer-friendly nature,
                  forms the backbone of our project, facilitating efficient API
                  integrations and database management. Together, these
                  technologies create a harmonious ecosystem where user
                  experience takes center stage, ensuring that our website
                  delivers unparalleled performance and functionality. Through
                  our adept use of React and ROR, our Stackworx team has
                  elevated the project to new heights, setting a standard for
                  innovation and expertise in web development.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Drone/drone1.png"
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
                            Drone
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            React, ROR
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
                              href="https://www.leichtwerk.de/"
                              target="_blank"
                            >
                              www.leichtwerk.de
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
