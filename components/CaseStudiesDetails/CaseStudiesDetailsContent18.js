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
                    src="/images/services-details/Luke/Luke2.png"
                    alt="Image"
                  />
                </div>

                <h3>Beauty Smile</h3>
                <p>
                At eComet, we take pride in our partnership with Beauty Smile, where we seamlessly integrate our services to enhance their online presence. Specializing in Shopify store management, we have effectively streamlined their product upload process, ensuring a visually appealing and user-friendly online storefront. Our dedicated team meticulously organizes and uploads products, optimizing each listing for maximum visibility and impact. This commitment to excellence has not only elevated the aesthetic appeal of Beauty Smile's e-commerce platform but has also contributed to increased customer engagement and satisfaction.
                </p>

                <p>
                In addition to product management, eComet plays a crucial role in handling client queries and emails for Beauty Smile. Our responsive customer service team ensures that all inquiries are addressed promptly and professionally, fostering a positive and trusting relationship between Beauty Smile and its customers. By managing client communication effectively, we contribute to a seamless and enjoyable shopping experience, reinforcing Beauty Smile's commitment to customer satisfaction.
                </p>

                <p>
                Our collaboration with Beauty Smile is a testament to our expertise in e-commerce support services. Through our strategic approach to Shopify store management and responsive client communication, eComet continues to empower Beauty Smile in navigating the competitive online market, allowing them to focus on their core business while we handle the intricacies of e-commerce management.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Luke/Luke3.png"
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
                            Beauty Smile
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
                            <a href="https://beautesourire.fr/" target="_blank">
                            www.beautesourire.fr
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
