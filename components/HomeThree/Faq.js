import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";

const Faq = () => {
  return (
    <>
      <section className="faq-area pt-50 pb-100">
        <div className="container">
          <div className="section-title">
            <span>FAQ,s</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="faq-accordion">
                <Accordion preExpanded={["a"]}>

                <AccordionItem uuid="d">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        What technologies do you use for web development, and
                        how can they benefit my project?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
                        We harness the power of leading-edge technologies,
                        including React, Angular, Vue.js, Ruby on Rails (RoR),
                        Node.js, MongoDB, SaaS architecture, Tailwind CSS,
                        GitHub, Azure, and other innovative frameworks. This
                        strategic stack empowers us to craft websites that are
                        not only robust and scalable but also optimized for
                        exceptional performance, fortified security, and
                        seamless adaptability. Our commitment is to deliver a
                        digital experience that aligns precisely with the unique
                        requirements of your project, ensuring it stands out in
                        today's dynamic online landscape.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                 

                  <AccordionItem uuid="b">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        How does web development contribute to business growth?
                      </AccordionItemButton>
                    </AccordionItemHeading>

                    <AccordionItemPanel>
                      <p>
                        Web development enhances online presence, improves user
                        experience, and ensures a responsive and visually
                        appealing website. This, in turn, attracts more
                        visitors, boosts engagement, and contributes to
                        increased conversions.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  

                  <AccordionItem uuid="a">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        What tasks can automation handle for me?
                      </AccordionItemButton>
                    </AccordionItemHeading>

                    <AccordionItemPanel>
                      <p>
                        Automation can streamline workflows, manage repetitive tasks, optimize processes, and integrate your tools, saving time and improving overall business efficiency.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem uuid="c">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Can I customize automation solutions based on my specific business needs?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
                        Absolutely. Our automation solutions are highly customizable. You can tailor workflows, integrations, and processes based on your unique requirements, ensuring a personalized and efficient system.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                 

                  <AccordionItem uuid="e">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        How do you optimize email marketing for better results?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
                        We leverage data-driven strategies, audience insights, personalized content, and automated workflows to create effective email solutions that strengthen customer relationships, improve engagement, and drive consistent business growth.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="faq-img">
                <img src="/images/faq-img.png" alt="Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
