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
                    src="/images/services-details/Ben/Ben2.png"
                    alt="Image"
                  />
                </div>

                <h3>Snap Smile</h3>
                <p>
                At eComet, we take pride in providing seamless and efficient services to Snap Smile, ensuring their online presence is not only vibrant but also customer-centric. Our dedicated team specializes in uploading products on the Shopify store, meticulously curating each listing to enhance visibility and user engagement. With a keen eye for detail, we ensure that Snap Smile's products are showcased in the best possible light, facilitating a smooth and enjoyable online shopping experience for their customers.
                </p>

                <p>
                In addition to product uploading, our responsive and client-focused team at eComet actively manages and responds to client queries and emails on behalf of Snap Smile. We understand the importance of timely and personalized communication in fostering strong customer relationships. By promptly addressing client inquiries, we contribute to Snap Smile's reputation for excellent customer service. Our commitment to excellence extends beyond the technical aspects of e-commerce, encompassing the human touch necessary for building trust and loyalty among Snap Smile's clientele.
                </p>

                <p>
                As a reliable partner in e-commerce support, eComet ensures that Snap Smile can focus on their core business activities while we handle the intricacies of product management and customer communication. With our comprehensive services, Snap Smile can confidently navigate the competitive e-commerce landscape, knowing that their online platform is in capable hands.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Ben/Ben3.png"
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
                            Snap Smile
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: "900" }}>
                              Technologies:
                            </span>{" "}
                            Shopify
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
                            <a href="https://shopsnapsmile.com/" target="_blank">
                            www.shopsnapsmile.com
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
