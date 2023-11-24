import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

const testimonialsData = [
  {
    image: "/images/clients/client3.jpg",
    name: "Lexi Ehrman",
    designation: "Head of Technology",
    feedbackText:
      "eComet stands out as a top-tier software house. They're not just problem solvers; they're incredibly creative ones. Reliable, smart, and fun to work with, they're truly the full package.",

    rating: [
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
    ],
  },

  {
    image: "/images/clients/client2.jpg",
    name: "Oscar Adams",
    designation: "InnovateTech Ventures",
    feedbackText:
      "Quick, efficient communication and execution! Went from idea to completion in just hours. Impressive work! Clean, clear code. Seller was nice, direct, and easy to work with. Thank you!",

    rating: [
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
    ],
  },
  {
    image: "/images/clients/client4.jpg",
    name: "David Ko",
    designation: "CEO - Drganja.com",
    feedbackText:
      "eComet's seamless interface and centralized task management are transformative for our e-commerce operations—efficiency redefined for unparalleled productivity.",

    rating: [
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
    ],
  },
  {
    image: "/images/clients/client1.jpg",
    name: "Logan Smith",
    designation: "TechCorp Solutions",
    feedbackText:
      "They are highly professional and seasoned, evident in their top-quality deliverables. Committed, creative, and a pleasure to work with, their expertise shines through in every project.",

    rating: [
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
    ],
  },

  {
    image: "/images/clients/1.jpg",
    name: "Alexander Nouveau",
    designation: "CEO - nouveaustartups.com",
    feedbackText:
      "eComet's business development services are exceptional—tailored strategies, insightful analysis, and seamless communication. An invaluable partner in our growth journey.",

    rating: [
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
      {
        iconName: "bx bxs-star",
      },
    ],
  },
];

const Testimonials = () => {
  return (
    <>
      <section className="client-area pt-50 pb-100">
        <div className="container">
          <div className="section-title">
            <span>Testimonials</span>
            <h2>What Clients Say About Us</h2>
          </div>

          <Swiper
            spaceBetween={25}
            navigation={true}
            autoplay={{
              delay: 6500,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
            }}
            modules={[Navigation, Autoplay]}
            className="testimonials-slide"
          >
            {testimonialsData &&
              testimonialsData.slice(0, 10).map((value, i) => (
                <SwiperSlide key={i}>
                  <div className="single-client">
                    <i className="quotes flaticon-left-quotes-sign"></i>
                    <p>{value.feedbackText}</p>

                    <ul>
                      {value.rating.map((value, i) => (
                        <li key={i}>
                          <i className={value.iconName}></i>
                        </li>
                      ))}
                    </ul>

                    <div className="client-img">
                      <img src={value.image} alt="Image" />
                      <h3>{value.name}</h3>
                      <span>{value.designation}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
