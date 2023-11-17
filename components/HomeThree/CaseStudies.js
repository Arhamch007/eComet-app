import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

const CaseStudies = () => {
  return (
    <>
      <section className="case-area pb-100">
        <div className="container">
          <div className="section-title">
            {/* <span>Case</span> */}
            <h2>Our Recent Projects</h2>
          </div>

          <Swiper
            spaceBetween={25}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 6500,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="case-top-wrap"
          >
            {/* 13 */}
            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case13.png"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/Drone" className="link-icon">
                    <h2>Leichtwerk AG</h2>
                    <p>
                      Unleashing innovation with React and Ruby on Rails for a
                      unique web development journey
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Leichtwerk AG</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 1 */}
            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case1.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/Halyard" className="link-icon">
                    <h2>Halyard</h2>
                    <p>
                      Navigating the realms of iOS, HTML5, CSS3, PHP, and Java
                      to craft a dynamic and diverse technological landscape.
                    </p>

                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Halyard</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 2 */}

            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case2.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/Lively" className="link-icon">
                    <h2>Lively</h2>
                    <p>
                      Igniting creativity at the crossroads of React and Ruby on
                      Rails (ROR), an avant-garde journey into web innovation
                      unfolds
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Lively</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 3 */}

            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case3.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/PROFICIO" className="link-icon">
                    <h2>Proficio</h2>
                    <p>
                      Fostering creativity through iOS, HTML5, CSS3, PHP, and
                      Java for a distinctive web development odyssey
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Proficio</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 4 */}

            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case4.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/Zentap" className="link-icon">
                    <h2>Zentap</h2>
                    <p>
                      Revolutionizing web development with Angular and Ruby on
                      Rails for a distinctive innovation odyssey
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Zentap</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 14 */}
            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case14.png"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/Workstool" className="link-icon">
                    <h2>Workstool</h2>
                    <p>
                      Fueling creativity through the dynamic synergy of React
                      and Ruby on Rails, embarking on an unparalleled web
                      development expedition
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Workstool</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 5 */}
            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case5.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/Greentopfarms" className="link-icon">
                    <h2>Green Top Farms</h2>
                    <p>
                      Igniting creativity through React and Ruby on Rails,
                      paving the way for an unparalleled web development
                      expedition
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Green Top Farms</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 6 */}
            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case6.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/Ideawake" className="link-icon">
                    <h2>Ideawake</h2>
                    <p>
                      Igniting creativity through iOS, HTML5, CSS3, PHP, and
                      Java, steering a distinctive path in web development
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Ideawake</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 7 */}
            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case7.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/pHin" className="link-icon">
                    <h2>pHin</h2>
                    <p>
                      Sparking ingenuity through the dynamic duo of VueJS and
                      Ruby on Rails, paving the way for an unparalleled
                      expedition in web development
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">pHin</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 8 */}
            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case8.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/Ezyagent" className="link-icon">
                    <h2>Ezyagent</h2>
                    <p>
                    Firing up ingenuity through the dynamic duo of VueJS and Ruby on Rails, embarking on an unparalleled expedition in web development
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Ezyagent</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 9 */}
            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case9.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/MegaStores" className="link-icon">
                    <h2>Mega Stores</h2>
                    <p>
                    Fueling creativity through Shopify, Liquid, and custom Ruby on Rails applications for an unparalleled web development adventure
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Mega Stores</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 10 */}
            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case10.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/Puppy" className="link-icon">
                    <h2>Puppy Wash</h2>
                    <p>
                    Venture into the digital frontier with Shopify, Liquid, React, and Ruby on Rails—a nexus of innovation in web development
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Puppy Wash</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 11 */}
            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case11.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/Timbits" className="link-icon">
                    <h2>Timbits Sports</h2>
                    <p>
                    Elevate your digital ambitions with the potent fusion of Ruby on Rails and JavaScript, charting a distinctive course in the landscape of web development innovation
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Timbits Sports</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* 12 */}
            <SwiperSlide>
              <div className="case-wrap">
                <div className="single-case">
                  <img
                    src="/images/cases/case12.jpg"
                    alt="Image"
                    className="w-100"
                  />

                  <Link href="/projects/Fantasy" className="link-icon">
                    <h2>Fantasy Middleware</h2>
                    <p>
                    Embarking on a distinctive web development journey by harnessing the power of React and Ruby on Rails, fueling innovation and creativity
                    </p>
                    <i className="bx bx-plus"></i>
                  </Link>
                </div>

                <h3>
                  <Link href="/case-studies-details">Fantasy Middleware</Link>
                </h3>
              </div>
            </SwiperSlide>

            {/* end */}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
