import React from "react";
import Link from "next/link";
import { RiLightbulbFlashFill } from "react-icons/ri";

const WhatWeOffer = () => {
  const openTabSection = (evt, tabNmae) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabs_item");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByTagName("li");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("current", "");
    }

    document.getElementById(tabNmae).style.display = "block";
    evt.currentTarget.className += "current";
  };

  return (
    <>
      <section className="industries-area pb-100">
        <div className="container">
          <div className="section-title">
            <span>What We Offer</span>
            <h2>Excellence for Your Unique Solutions.</h2>
            <p>
              Striving for excellence ensures tailored solutions that uniquely
              address your needs, setting a standard of unparalleled quality and
              innovation. Elevate your expectations with bespoke excellence.
            </p>
          </div>

          <div className="tab industries-list-tab">
            <div className="row align-items-center">
              <div className="col-lg-3">
                {/* Tabs navs */}
                <ul className="tabs">
                  <li
                    className="current"
                    onClick={(e) => openTabSection(e, "tab1")}
                  >
                    <span>
                      <i className="flaticon-machine-learning"></i>
                      <h3>Crafted Mastery</h3>
                      <p>Masterful Ingenuity</p>
                    </span>
                  </li>

                  <li onClick={(e) => openTabSection(e, "tab2")}>
                    <span>
                      <i className="flaticon-artificial-intelligence"></i>
                      <h3>Proven Expertise</h3>
                      <p>Demonstrated Proficiency</p>
                    </span>
                  </li>

                  <li onClick={(e) => openTabSection(e, "tab3")}>
                    <span>
                      <i>{<RiLightbulbFlashFill/>}</i>
                      <h3>Innovative Solutions</h3>
                      <p>Visionary Resolutions</p>
                    </span>
                  </li>

                  <li onClick={(e) => openTabSection(e, "tab4")}>
                    <span>
                      <i className="flaticon-automation"></i>
                      <h3>Peak Perfection</h3>
                      <p>Summit Precision</p>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="col-lg-9">
                <div className="tab_content">
                  {/* Tab item #1 */}
                  <div id="tab1" className="tabs_item">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="industries-img left-img">
                          <img src="/images/offer1.png" alt="Image" />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="industries-content">
                          <h3>Crafted Mastery</h3>
                          <p>
                            Embark on a journey of unparalleled expertise with
                            our Virtual Assistant and Web Development services
                            under the banner of Crafted Mastery.
                          </p>
                          <p>
                            Our commitment to excellence ensures that every
                            aspect of your virtual support and online presence
                            is meticulously curated for optimal performance.
                          </p>

                          <div className="row">
                            <div className="col-lg-6 col-sm-6">
                              <ul className="industries-item">
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Innovation
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Efficiency
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Precision
                                </li>
                              </ul>
                            </div>

                            <div className="col-lg-6 col-sm-6">
                              <ul className="industries-item">
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Reliability
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Versatility
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Excellence
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* <div className="text-center">
                            <Link href="/services" className="default-btn">
                              Discover More
                            </Link>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab item #2 */}
                  <div id="tab2" className="tabs_item">
                    <div className="row  align-items-center">
                      <div className="col-lg-6">
                        <div className="industries-content">
                          <h3>Proven Expertise</h3>
                          <p>
                            Unlock the power of seamless operations with our
                            unmatched virtual assistant and web development
                            services.
                          </p>
                          <p>
                            With a track record of success, our team brings
                            unparalleled proficiency to the realms of Virtual
                            Assistance and Web Development. Leveraging our
                            experience, we deliver results that resonate with
                            excellence.
                          </p>

                          <div className="row">
                            <div className="col-lg-6 col-sm-6">
                              <ul className="industries-item">
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Web Development Prowess
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Proactive Problem Solving
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Seamless Integration
                                </li>
                              </ul>
                            </div>

                            <div className="col-lg-6 col-sm-6">
                              <ul className="industries-item">
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Client-Centric Approach
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Strategic Innovation
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Virtual Mastery
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* <div className="text-center">
                            <Link href="/services" className="default-btn">
                              Discover More
                            </Link>
                          </div> */}
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="industries-img right-img">
                          <img src="/images/offer2.png" alt="Image" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab item #3 */}
                  <div id="tab3" className="tabs_item">
                    <div className="row  align-items-center">
                      <div className="col-lg-6">
                        <div className="industries-img left-img">
                          <img src="/images/offer3.png" alt="Image" />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="industries-content">
                          <h3>Innovative Solutions</h3>
                          <p>
                            Unlock unparalleled potential with our Innovative
                            Solutions, seamlessly blending cutting-edge Virtual
                            Assistant and Web Development services.
                          </p>
                          <p>
                            We redefine the paradigm, offering not just support
                            but a partnership for success. Our commitment to
                            efficiency, reliability, precision, innovation,
                            versatility, and empowerment ensures your business
                            ventures into the future with confidence and
                            unmatched capability.
                          </p>

                          <div className="row">
                            <div className="col-lg-6 col-sm-6">
                              <ul className="industries-item">
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Agile
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Efficient
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Dynamic
                                </li>
                              </ul>
                            </div>

                            <div className="col-lg-6 col-sm-6">
                              <ul className="industries-item">
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Secure
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Intuitive
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Scalable
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* <div className="text-center">
                            <Link href="/services" className="default-btn">
                              Discover More
                            </Link>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab item #4 */}
                  <div id="tab4" className="tabs_item">
                    <div className="row  align-items-center">
                      <div className="col-lg-6">
                        <div className="industries-content">
                          <h3>Peak Perfection</h3>
                          <p>
                            Unlock unparalleled excellence with our virtual
                            assistant and web development services.
                          </p>
                          <p>
                            We are dedicated to providing you with top-notch
                            solutions tailored to meet your unique needs. Our
                            commitment to perfection sets the standard for
                            quality and innovation in the digital realm.
                          </p>

                          <div className="row">
                            <div className="col-lg-6 col-sm-6">
                              <ul className="industries-item">
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Confidentiality
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Proactivity
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Flexibility
                                </li>
                              </ul>
                            </div>

                            <div className="col-lg-6 col-sm-6">
                              <ul className="industries-item">
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Responsiveness
                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  User-centricity

                                </li>
                                <li>
                                  <i className="flaticon-checked"></i>
                                  Timeliness
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* <div className="text-center">
                            <Link href="/services" className="default-btn">
                              Discover More
                            </Link>
                          </div> */}
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="industries-img right-img">
                          <img src="/images/offer4.png" alt="Image" />
                        </div>
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

export default WhatWeOffer;
