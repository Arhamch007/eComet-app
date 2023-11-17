import React from "react";

const WhyChooseUs = () => {
  return (
    <>
      <section className="choose-ue-area pb-100">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div 
                className="choose-title"
                data-aos="fade-in"
                data-aos-duration="1200"
                data-aos-delay="100"
              >
                <span>Why Choose Us</span>
                <h2>
                Excellence for Your Unique Solutions.
                </h2>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div 
                className="choose-card"
                data-aos="fade-in"
                data-aos-duration="1200"
                data-aos-delay="200"
              >
                <span>
                  01 <i className="flaticon-technical-support"></i>
                </span>
                <h3>Crafted Mastery</h3>
                <p>
                Delivering Excellence Through Uniquely Tailored Solutions for You.
                </p>
              </div>

              <div
                className="choose-card"
                data-aos="fade-in"
                data-aos-duration="1200"
                data-aos-delay="300"
              >
                <span>
                  02 <i className="flaticon-shield"></i>
                </span>
                <h3>Proven Expertise</h3>
                <p>
                Demonstrated mastery, your projects in capable, seasoned hands.
                </p>
              </div>

              <div
                className="choose-card"
                data-aos="fade-in"
                data-aos-duration="1200"
                data-aos-delay="400"
              >
                <span>
                  03 <i className="flaticon-support"></i>
                </span>
                <h3>Innovative Solutions</h3>
                <p>
                Pioneering Tomorrow's Answers with Today's Creative Ingenuity.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div 
                className="choose-img"
                data-aos="fade-in"
                data-aos-duration="1200"
                data-aos-delay="500"
              >
                <img src="/images/choose-img.png" alt="Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
