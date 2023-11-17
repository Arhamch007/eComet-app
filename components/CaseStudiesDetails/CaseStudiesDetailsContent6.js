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
                    src="/images/services-details/Ideawake/ideawake1.png"
                    alt="Image"
                  />
                </div>

                <h3>Ideawake</h3>
                <p>
                  Our stackworx team has created an intuitive and highly
                  configurable idea management platform that simplifies the
                  process of capturing, evaluating, and acting upon valuable
                  ideas from within your organization. Developed using a diverse
                  technology stack, our website seamlessly combines iOS for
                  mobile accessibility, HTML5 for robust web capabilities, CSS3
                  for sleek and responsive design, and the powerful back-end
                  support of PHP and Java. This combination of technologies
                  ensures that our platform provides a user-friendly experience
                  while offering the necessary versatility to adapt to your
                  organization's unique needs.
                </p>

                <p>
                  Collaborating with our team, you can harness the full
                  potential of this innovative platform. Its user-friendly
                  design, developed with HTML5 and CSS3, allows for a smooth and
                  visually appealing experience for users. Meanwhile, the robust
                  PHP and Java back-end enables efficient idea management,
                  making it effortless to capture, assess, and act upon the
                  insights of your organization's most knowledgeable members.
                  This technology stack is a testament to our commitment to
                  delivering cutting-edge solutions that empower organizations
                  to thrive in today's dynamic business landscape.
                </p>

                <p>
                  With our easy-to-use platform, your organization can tap into
                  the collective wisdom of your team, making it simpler than
                  ever to transform ideas into actionable strategies. The
                  synergy of iOS, HTML5, CSS3, PHP, and Java has resulted in a
                  highly adaptable and efficient solution that reflects our
                  dedication to helping your organization thrive. It's a
                  powerful tool that streamlines idea management and keeps your
                  organization at the forefront of innovation.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Ideawake/ideawake2.png"
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
                            Ideawake
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
                            <a href="https://ideawake.com/" target="_blank">
                            www.ideawake.com
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
