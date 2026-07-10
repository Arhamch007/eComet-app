import React from "react";
import Link from "next/link";

const ServicesStyleFour = () => {
  return (
    <>
      <section className="industries-serve-area pt-100 pb-0">
        <div className="container">
          <div className="section-title">
            <h2>Unleashing Seamless Web, Automation & Marketing Solutions</h2>
            <p>
            Elevate productivity with our seamless fusion of Web Development, Automation, and Email Marketing. Our tailored solutions redefine efficiency, combining innovative technology, intelligent workflows, and strategic communication to drive growth and deliver exceptional digital experiences.
            </p>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12 col-md-6">
                  <div className="single-industries">
                    <i className="flaticon-machine-learning"></i>
                    <h3>Full-Stack Expertise</h3>
                    <span>Coding Frontiers</span>
                  </div>
                </div>

                <div className="col-lg-12 col-md-6">
                  <div className="single-industries">
                    <i className="flaticon-artificial-intelligence"></i>
                    <h3>Web Application Development</h3>
                    <span>Digital Solutions</span>
                  </div>
                </div>

                <div className="col-lg-12 col-md-6">
                  <div className="single-industries">
                    <i className="flaticon-health"></i>
                    <h3>Intelligent Workflows</h3>
                    <span>Automation Solutions</span>
                  </div>
                </div>

                <div className="col-lg-12 col-md-6">
                  <div className="single-industries">
                    <i className="flaticon-automation"></i>
                    <h3>Strategic Email Marketing</h3>
                    <span>Maximizing Engagement</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="industries-img">
                <img src="/images/offer1.png" alt="Image" />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12 col-md-6">
                  <div className="single-industries right-item">
                    <i className="flaticon-choice"></i>
                    <h3>Administrative Excellence</h3>
                    <span>Efficient Organizational Mastery</span>
                  </div>
                </div>

                <div className="col-lg-12 col-md-6">
                  <div className="single-industries right-item">
                    <i className="flaticon-deep-learning"></i>
                    <h3>E-commerce Solutions</h3>
                    <span>Empower Commerce, Elevate Solutions</span>
                  </div>
                </div>

                <div className="col-lg-12 col-md-6">
                  <div className="single-industries right-item">
                    <i className="flaticon-cyber-security"></i>
                    <h3>Data-driven Support</h3>
                    <span>Data Empowers Support</span>
                  </div>
                </div>

                <div className="col-lg-12 col-md-6">
                  <div className="single-industries right-item">
                    <i className="flaticon-blockchain"></i>
                    <h3>Customized Assistance</h3>
                    <span>Tailored Support, Your Way Forward</span>
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

export default ServicesStyleFour;
