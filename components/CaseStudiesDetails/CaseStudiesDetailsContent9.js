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
                    src="/images/services-details/MegaStores/mega1.png"
                    alt="Image"
                  />
                </div>

                <h3>Mega Stores</h3>
                <p>
                  MEGASTORES stands as a trailblazer in the world of men's
                  fashion, offering a daily influx of fresh and stylish
                  clothing, shoes, accessories, and more. Our stackworx team has
                  meticulously crafted an exceptional online shopping experience
                  for our fashion-forward clientele. Using cutting-edge
                  technologies like Shopify, Liquid, and a custom Ruby on Rails
                  (ROR) app, we've ensured that MEGASTORES provides an
                  unparalleled platform for discovering the latest trends and
                  shopping for the best in men's fashion.
                </p>

                <p>
                  With Shopify as the backbone of our e-commerce solution, we've
                  harnessed its user-friendly interface and robust functionality
                  to create a seamless shopping experience. Liquid, the
                  templating language used within Shopify, enables us to craft
                  visually appealing and responsive web designs, ensuring that
                  our customers can explore our offerings effortlessly. Our
                  custom Ruby on Rails (ROR) application complements the Shopify
                  ecosystem, allowing us to tailor the platform to MEGASTORES'
                  unique needs, making for a highly personalized and efficient
                  online shopping destination.
                </p>

                <p>
                  MEGASTORES' commitment to delivering the latest trends in
                  men's fashion is perfectly matched by our technology stack,
                  ensuring that the website remains a dynamic and user-friendly
                  hub for style-conscious shoppers. This trifecta of Shopify,
                  Liquid, and ROR plays a vital role in MEGASTORES' success,
                  facilitating constant updates and improvements to keep our
                  customers on the forefront of fashion.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/MegaStores/mega2.png"
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
                            Mega Stores
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            Shopify, Liquid, ROR (custom app)
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
                            <a href="https://megastorescy.com/" target="_blank">
                              www.megastorescy.com
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
