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
                        What tasks can a virtual assistant handle for me?
                      </AccordionItemButton>
                    </AccordionItemHeading>

                    <AccordionItemPanel>
                      <p>
                        Virtual assistants can manage administrative tasks,
                        handle emails, schedule appointments, conduct research,
                        and provide general support, freeing up your time for
                        more strategic activities.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem uuid="c">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Can I customize the services of a virtual assistant
                        based on my specific business needs?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
                        Absolutely. Our virtual assistant services are highly
                        customizable. You can tailor the tasks and
                        responsibilities based on your unique requirements,
                        ensuring a personalized and efficient support system.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                 

                  <AccordionItem uuid="e">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        How do you ensure the security of sensitive data when
                        using virtual assistant services?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
                        We prioritize data security through encrypted
                        communication channels, secure data storage, and strict
                        confidentiality measures. Our virtual assistants are
                        trained to handle sensitive information with the utmost
                        care and adhere to industry-standard security protocols.
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
