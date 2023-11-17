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
                    src="/images/services-details/Workstool/wrok1.png"
                    alt="Image"
                  />
                </div>

                <h3>Workstool</h3>
                <p>
                  Workstool, powered by the dynamic combination of Ruby on Rails
                  (ROR) and React, stands as a testament to the innovation and
                  expertise of our dedicated Stackworx team. With React, we
                  bring forth a seamless and responsive user interface, ensuring
                  an immersive user experience that captivates visitors from the
                  moment they land on the website. The robustness of Ruby on
                  Rails, on the other hand, forms the backbone of our project,
                  providing a solid foundation for secure data management and
                  efficient server-side processing.
                </p>

                <p>
                  In the realm of modern web development, the collaboration
                  between React and ROR within Workstool is nothing short of
                  revolutionary. React, with its component-based architecture,
                  elevates user interactions to an intuitive level, fostering
                  engagement and satisfaction among our platform's users.
                  Meanwhile, ROR's flexibility and scalability empower us to
                  craft intricate backend systems, ensuring seamless data flow
                  and processing.
                </p>

                <p>
                  At the heart of Workstool lies a cutting-edge fusion of React
                  and Ruby on Rails, meticulously sculpted by the skilled hands
                  of our Stackworx developers. React's lightning-fast rendering
                  and intuitive component-based structure empower users with a
                  fluid and dynamic interface, enhancing their interactions with
                  the platform. Meanwhile, Ruby on Rails, renowned for its
                  elegance and efficiency, ensures the backend operations run
                  seamlessly, offering robust security and unparalleled
                  performance.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Workstool/wrok2.png"
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
                            Workstool
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
                            <a href="https://workstool.de/" target="_blank">
                              www.workstool.de
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
