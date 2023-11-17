import React from "react";
import Link from "next/link";

const MakeYourBusiness = () => {
  return (
    <>
      <section className="business-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="business-content">
                <h2>Igniting Business Growth with Visionary Strategies</h2>
              </div>

              <div className="single-business">
                <i className="flaticon-chip"></i>
                <h3>Safeguarding Your Business in the Digital Age</h3>
                <p>
                Fortify your enterprise against digital threats with state-of-the-art cybersecurity measures, ensuring the resilience and security of your business in the dynamic landscape of the digital age.
                </p>
              </div>

              <div className="single-business">
                <i className="flaticon-blockchain"></i>
                <h3>Sustainable Practices for Long-Term Growth</h3>
                <p>
                Elevate your business by integrating eco-friendly practices, fostering a commitment to sustainability that not only enhances your brand reputation but also ensures enduring growth for a greener future.
                </p>
              </div>

              {/* <div className="business-btn">
                <Link href="/about-2" className="default-btn">
                  Know Details
                </Link>
              </div> */}
            </div>

            <div className="col-lg-6">
              <div className="row">
                <div 
                  className="col-lg-6 col-sm-6 counter-nth"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="100"
                >
                  <div className="single-counter">
                    <h2>
                      <span className="target">50+</span>
                    </h2>
                    <p>Project Completed</p>
                  </div>
                </div>

                <div 
                  className="col-lg-6 col-sm-6 counter-nth"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="200"
                >
                  <div className="single-counter">
                    <h2>
                      <span className="target">70k+</span>
                    </h2>
                    <p>Hours</p>
                  </div>
                </div>

                <div 
                  className="col-lg-6 col-sm-6 counter-nth"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="300"
                >
                  <div className="single-counter">
                    <h2>
                      <span className="target">60+</span>
                    </h2>
                    <p>Happy Clients</p>
                  </div>
                </div>

                <div 
                  className="col-lg-6 col-sm-6 counter-nth"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="400"
                >
                  <div className="single-counter">
                    <h2>
                      <span className="target">30+</span>
                    </h2>
                    <p>Rescue Mission</p>
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

export default MakeYourBusiness;
