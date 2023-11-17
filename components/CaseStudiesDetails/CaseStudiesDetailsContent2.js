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
                    src="/images/services-details/Lively/Lively1.jpg"
                    alt="Image"
                  />
                </div>

                <h3>LIVELY</h3>
                <p>
                  One of the world’s biggest online store of women products. RoR
                  based stack, development and enhancements to existing
                  code-base. we developed custom web app for automation of their
                  ambassadors program to increase sales . which help to quickly
                  get commision based sales and track them according. Custom Web
                  portal for managing their Vendors and inventory , so that they
                  have enough inventory topped up always.Fetching their Shopify
                  orders and custom reporting on sales & products.
                </p>

                <p>
                  We are proud to be the driving force behind one of the world's
                  largest online stores specializing in women's products. Our
                  development efforts center around a robust Ruby on Rails (RoR)
                  based stack, where we've continually enhanced and expanded the
                  existing codebase to ensure an optimal shopping experience.
                  Our key achievement lies in the creation of a custom web
                  application, specifically designed to automate their
                  ambassadors program, effectively boosting sales and
                  simplifying commission tracking. This innovation allows us to
                  rapidly process commission-based sales and meticulously
                  monitor their performance, all contributing to the online
                  store's remarkable success.
                </p>

                <p>
                  In a dynamic e-commerce landscape, we take pride in our
                  ability to adapt and innovate. Our partnership involves
                  constant optimization of their web store, helping it thrive in
                  a highly competitive market. With a focus on enhancing both
                  the customer experience and backend efficiency, we've become a
                  trusted ally in their journey. Our work not only fuels their
                  growth but also equips them with invaluable data and tools,
                  allowing them to make strategic choices that keep their online
                  store at the forefront of the women's product industry.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                           src="/images/services-details/Lively/Lively2.jpg"
                          alt="Image"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="car-service-list">
                        <ul>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: '900' }}>Client:</span> Lively
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: '900' }}>Technologies:</span> ROR, React
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: '900' }}>Industry:</span> IT
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: '900' }}>URL:</span> <a href="https://www.wearlively.com" target="_blank"> www.wearlively.com</a>
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
