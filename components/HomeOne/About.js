import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <>
      <section className="about-area pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div 
                className="about-img"
                data-aos="fade-in"
                data-aos-duration="1200"
                data-aos-delay="100"
              >
                <img src="/images/about-img.png" alt="Image" />
              </div>
            </div>

            <div className="col-lg-6">
              <div 
                className="about-content"
                data-aos="fade-in"
                data-aos-duration="1200"
                data-aos-delay="200"
              >
                <span>About Us</span>
                <h2>
                Pioneering Excellence, Fueling Innovation, Redefining Tomorrow
                </h2>
                <p>
                We are more than pioneers, architects of excellence, catalysts for innovation, and visionaries redefining tomorrow's possibilities. With unwavering commitment, we craft solutions that transcend expectations, fueling a future where your success knows no bounds.
                </p>

                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <ul>
                      <li>
                        <i className="flaticon-checked"></i>
                        Responsive Design
                      </li>
                      <li>
                        <i className="flaticon-checked"></i>
                        Scalable Backend
                      </li>
                      <li>
                        <i className="flaticon-checked"></i>
                        Security Integration
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-6 col-sm-6">
                    <ul>
                      <li>
                        <i className="flaticon-checked"></i>
                        Efficient Task Management
                      </li>
                      <li>
                        <i className="flaticon-checked"></i>
                        Smart Information Retrieval
                      </li>
                      <li>
                        <i className="flaticon-checked"></i>
                        Time-saving Automation
                      </li>
                    </ul>
                  </div>
                </div>

                <Link href="/about-1" className="default-btn">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
