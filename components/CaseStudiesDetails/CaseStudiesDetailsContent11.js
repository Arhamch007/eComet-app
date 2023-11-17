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
                    src="/images/services-details/TimbitsSports/timbit1.png"
                    alt="Image"
                  />
                </div>

                <h3>Timbits Sports</h3>
                <p>
                  Tim Hortons is committed to fostering a vibrant community for
                  children, offering them the chance to discover new sports,
                  join leagues, build lasting friendships, and simply enjoy
                  being kids. Timbit Sports, our initiative, proudly serves over
                  300,000 young players every season across Canada. With a
                  website developed by our dedicated Stackworx team, we've
                  harnessed the power of Ruby on Rails (ROR) and JavaScript (JS)
                  to create an engaging digital platform that enables us to
                  connect with and support these aspiring athletes and their
                  families.
                </p>

                <p>
                  Our ROR and JS technologies work in harmony to ensure that the
                  Timbit Sports website provides an intuitive and user-friendly
                  experience, making it easier for kids and parents to get
                  involved in sports and community activities. The platform is a
                  testament to our commitment to nurturing the potential of
                  young athletes and promoting active, healthy lifestyles.
                </p>

                <p>
                  Tim Hortons, through the collaborative efforts of our
                  dedicated Stackworx team, is delighted to be a driving force
                  behind this initiative, bringing opportunities for growth and
                  camaraderie to children throughout Canada.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/TimbitsSports/timbit1.png"
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
                            Tim Hortons
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            ROR, JS
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
                              href="https://www.timbitssports.com/users/sign_in"
                              target="_blank"
                            >
                              www.timbitssports.com
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
