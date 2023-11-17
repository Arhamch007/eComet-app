import React from "react";

const teamData = [
  
  {
    image: "/images/team/usama.png",
    name: "Usama Iqbal",
    designation: "CEO & Founder",
    aosDelay: "200",

    socialLinks: [
      {
        iconName: "bx bxl-facebook",
        url: "https://www.facebook.com/usama.arian188",
      },
      {
        iconName: "bx bxl-github",
        url: "https://github.com/usamaarian007",
      },
      {
        iconName: "bx bxl-linkedin",
        url: "https://www.linkedin.com/in/usama-iqbal07/",
      },
    ],
  },
  {
    image: "/images/team/farooq.png",
    name: "Farooq Ashraf",
    designation: "CTO & Co-Founder",
    aosDelay: "100",

    socialLinks: [
      {
        iconName: "bx bxl-facebook",
        url: "https://www.facebook.com/farooqch270",
      },
      {
        iconName: "bx bxl-github",
        url: "https://github.com/farooqch11",
      },
      {
        iconName: "bx bxl-linkedin",
        url: "https://www.linkedin.com/in/m-farooq-ashraf-08b55311a/",
      },
    ],
  },
  {
    image: "/images/team/arham2.png",
    name: "Arham Mahmood",
    designation: "Full Stack Developer",
    aosDelay: "300",

    socialLinks: [
      {
        iconName: "bx bxl-facebook",
        url: "https://www.facebook.com/arman.ch.98229/",
      },
      {
        iconName: "bx bxl-github",
        url: "https://github.com/Arhamch007",
      },
      {
        iconName: "bx bxl-linkedin",
        url: "https://www.linkedin.com/in/arham-mahmood-associate-software-engineer/",
      },
    ],
  },
  {
    image: "/images/team/abouzar.png",
    name: "Abouzar Ijaz",
    designation: "MERN Stack Developer",
    aosDelay: "400",

    socialLinks: [
      {
        iconName: "bx bxl-facebook",
        url: "https://www.facebook.com/profile.php?id=100011857892382&mibextid=LQQJ4d",
      },
      {
        iconName: "bx bxl-github",
        url: "https://github.com/abouzarijaz89",
      },
      {
        iconName: "bx bxl-linkedin",
        url: "https://linkedin.com/in/abouzar-ijaz-12935b1ab",
      },

    ],
  },
  {
    image: "/images/team/bilal.png",
    name: "Bilal Raza",
    designation: "Senior Business Developer",
    aosDelay: "500",

    socialLinks: [
      {
        iconName: "bx bxl-facebook",
        url: "https://www.facebook.com/bilalrajpoot.bilalrajpoot.127",
      },
      {
        iconName: "bx bxl-github",
        url: "https://github.com/BILALRAZA9",
      },
      {
        iconName: "bx bxl-linkedin",
        url: "https://www.linkedin.com/in/bilal-raza-642a0725b/",
      },
    ],
  },
  {
    image: "/images/team/ali.png",
    name: "Ali Abdullah",
    designation: "Sales Executive",
    aosDelay: "600",

    socialLinks: [
      {
        iconName: "bx bxl-facebook",
        url: "https://www.facebook.com/aliabdulla78",
      },
      {
        iconName: "bx bxl-github",
        url: "https://github.com/Aley78",
      },
      {
        iconName: "bx bxl-linkedin",
        url: "https://www.linkedin.com/in/ali-abdullah-business-dev/",
      },
    ],
  },
  {
    image: "/images/team/zain.png",
    name: "Zain Fayyaz",
    designation: "Senior Administrative Assistant",
    aosDelay: "600",

    socialLinks: [
      {
        iconName: "bx bxl-facebook",
        url: "https://www.facebook.com/zain.fayyaz.73157",
      },
      {
        iconName: "bx bxl-github",
        url: "https://github.com/ZainFayyaz23",
      },
      {
        iconName: "bx bxl-linkedin",
        url: "https://www.linkedin.com/in/zain-fayyaz-a96a11279/",
      },
    ],
  },
  {
    image: "/images/team/hammad.png",
    name: "Hammad Ahmad",
    designation: "Executive Administrative Assistant",
    aosDelay: "600",

    socialLinks: [
      {
        iconName: "bx bxl-facebook",
        url: "https://www.facebook.com/profile.php?id=100079237031380",
      },
      {
        iconName: "bx bxl-github",
        url: "#",
      },
      {
        iconName: "bx bxl-linkedin",
        url: "#",
      },
    ],
  },
  {
    image: "/images/team/abdullah.png",
    name: "Abdullah Haroon",
    designation: "Junior Administrative Assistant ",
    aosDelay: "600",

    socialLinks: [
      {
        iconName: "bx bxl-facebook",
        url: "https://www.facebook.com/profile.php?id=100057225608398",
      },
      {
        iconName: "bx bxl-github",
        url: "#",
      },
      {
        iconName: "bx bxl-linkedin",
        url: "https://www.linkedin.com/in/sheikh-abdullah-661351291/",
      },
    ],
  },
];

const TeamTwo = () => {
  return (
    <>
      <section className="team-area pb-70">
        <div className="container">
          <div className="section-title home-four-section-title">
            <span>Team</span>
            <h2>Unleashing the Power of the Genius Development Team!</h2>
            <p>
            Team eComet pioneers in e-commerce innovation. Our diverse expertise ensures seamless collaboration, delivering unmatched user experiences and driving business growth. Committed to cutting-edge technologies, we propel businesses into a new era of success.
            </p>
          </div>

          <div className="row justify-content-center">
            {teamData &&
              teamData.slice(0, 9).map((value, i) => (
                <div
                  className="col-lg-4 col-sm-6"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay={value.aosDelay}
                  key={i}
                >
                  <div className="single-team active">
                    <div className="team-single-img">
                      <img src={value.image} alt="Image" />

                      <div className="team-img">
                        <img src="/images/team/team-shape.png" alt="Image" />
                      </div>
                    </div>

                    <div className="team-content">
                      <h3>{value.name}</h3>
                      <span>{value.designation}</span>

                      <ul>
                        {value.socialLinks.map((value, i) => (
                          <li key={i}>
                            <a href={value.url} target="_blank">
                              <i className={value.iconName}></i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamTwo;
