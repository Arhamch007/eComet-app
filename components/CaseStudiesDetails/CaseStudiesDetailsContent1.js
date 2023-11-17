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
                    src="/images/services-details/Halyard/one.png"
                    alt="Image"
                  />
                </div>

                <h3>Halyard</h3>
                <p>
                Halyard, part of the Owens & Minor Global Products Division, is focused on moving care forward. Our $1.2 billion portfolio of market-leading brands includes HALYARD, MEDICHOICE and MEDICAL ACTION are sold in more than 90 countries. Halyard’s broad portfolio offers the right product for each need, backed by best-in-class clinical expertise and more support at points of care. Our product standardization opportunities combined with supply chain expertise help drive efficiencies and protect healthcare providers from risks and disruptions in care.
                </p>

                <p>
                Halyard's commitment to advancing healthcare goes hand in hand with our dedication to cutting-edge technologies. Our digital solutions, built on technologies like iOS, HTML5, CSS3, PHP, and Java, enhance the overall patient and provider experience. By leveraging these technologies, we ensure seamless access to critical information and a user-friendly interface. 
                </p>

                <p>
                This technological foundation empowers healthcare providers and supports their mission to deliver quality care, even in the face of ever-evolving challenges in the healthcare landscape. Halyard remains at the forefront of innovation, where technology meets healthcare to drive efficiencies and maintain the highest standards of patient care.
                </p>

                <div className="car-service-list-wrap">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="service-list-img">
                        <img
                          src="/images/services-details/Halyard/two.png"
                          alt="Image"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="car-service-list">
                        <ul>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: '900' }}>Client:</span> Halyard
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: '900' }}>Technologies:</span> iOS, HTML5, CSS3, PHP, Java
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: '900' }}>Industry:</span> IT
                          </li>
                          <li>
                            <i className="bx bx-check"></i>
                            <span style={{ fontWeight: '900' }}>URL:</span> <a href="https://www.halyardhealth.com/" target="_blank"> www.halyardhealth.com</a>
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
