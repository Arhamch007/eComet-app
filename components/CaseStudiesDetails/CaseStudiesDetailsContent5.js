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
                    src="/images/services-details/GreenTopFarm/green1.jpg"
                    alt="Image"
                  />
                </div>

                <h3>Green top farms</h3>
                <p>
                  Green Top Farms, your go-to source for nutritious catering and
                  meals, proudly serves institutions and households throughout
                  New York City. Our commitment to health and sustainability
                  drives our mission to provide you with delectable meals made
                  from seasonal produce sourced from local farms. Our dedicated
                  team, in collaboration with Stackworx, has harnessed the power
                  of Ruby on Rails (ROR) to craft a website that embodies our
                  values. ROR's efficiency and flexibility serve as the backbone
                  of our platform, ensuring that we can seamlessly deliver
                  sustainable lunches, dinners, and snacks that not only nourish
                  your body but also support local agriculture and eco-friendly
                  practices.
                </p>

                <p>
                  With the expertise of Stackworx, our website has been
                  meticulously developed, leveraging the strengths of Ruby on
                  Rails. This technology empowers us to streamline our online
                  operations, making it easier for you to access our menu, place
                  orders, and enjoy the convenience of healthy, locally-sourced
                  meals. Green Top Farms is not just a catering service; it's a
                  testament to the power of innovation in web development, and
                  we are proud to partner with Stackworx to create an
                  exceptional user experience. Together, we bring farm-fresh,
                  sustainable goodness to your doorstep with just a few clicks.
                </p>

                <p>
                  Our collaboration with Stackworx has allowed us to optimize
                  the user experience and elevate our commitment to
                  sustainability. ROR's capabilities have made it possible to
                  seamlessly manage orders, track deliveries, and offer a
                  user-friendly interface that simplifies your interaction with
                  Green Top Farms. We believe that the use of cutting-edge
                  technology, like Ruby on Rails, is instrumental in promoting a
                  healthier and more environmentally-conscious way of living
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/GreenTopFarm/green2.jpg"
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
                            Green top farms
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
                            <a href="https://greentop.farm/" target="_blank">
                            www.greentop.farm
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
