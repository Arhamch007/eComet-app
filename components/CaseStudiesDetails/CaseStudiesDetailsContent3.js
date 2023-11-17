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
                    src="/images/services-details/Proficio/proficio1.jpg"
                    alt="Image"
                  />
                </div>

                <h3>PROFICIO </h3>
                <p>
                  Proficio, our flagship website, is built on the potent stack
                  of Node.js, Angular, and MongoDB. This technology trio
                  empowers us to enhance and introduce exciting features,
                  ensuring a top-notch user experience. Node.js delivers a
                  responsive backend for seamless data processing, while Angular
                  crafts an engaging front-end interface. Proficio is the
                  epitome of a modern and dynamic web platform, thanks to this
                  powerful stack.
                </p>

                <p>
                  In partnership with our client's CTO, we've expanded
                  Proficio's capabilities. MongoDB optimization ensures
                  efficient data management, making Proficio highly responsive
                  to users' evolving needs. This showcases Node.js, Angular, and
                  MongoDB's pivotal roles in driving innovation in modern web
                  development.
                </p>

                <p>
                  With our dedicated team and a technology stack built on Node,
                  Angular, and MongoDB, we are confident that Proficio will
                  continue to evolve, providing users with a feature-rich and
                  reliable website that meets their ever-growing demands. These
                  technologies not only enable us to deliver the current
                  enhancements but also position us to remain at the forefront
                  of web development, ready to adapt and innovate as the digital
                  landscape evolves. Proficio is a shining example of what can
                  be achieved when a powerful stack is harnessed to create a
                  seamless, feature-rich, and engaging web experience.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Proficio/proficio2.jpg"
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
                            Proficio
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            iOS, HTML5, CSS3, PHP, Java
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
                            <a href="https://www.proficio.com" target="_blank">
                              {" "}
                              www.proficio.com
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
