import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
const ContactForm = () => {
  const [state, handleSubmit] = useForm("mbjvedvw");
  if (state.succeeded) {
    return (
      <div className="main-contact-area pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <h3
                style={{
                  textAlign: "center",
                  animation: "fade-in 4s",
                  fontSize: "44px",
                  color: "#333",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                Congratulations!!
              </h3>
              <h4
                style={{
                  paddingBottom: "50px",
                  paddingTop: "15px",
                  textAlign: "center",
                  fontSize: "18px",
                  color: "orange",
                  lineHeight: "1.5",
                }}
              >
                Your message was successfully sent and will be back to you soon.
              </h4>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="contact-img">
                <img src="/images/contact-img.png" alt="Image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="main-contact-area pb-100">
      <div className="container">
        <div className="section-title">
          <span>Contact Us</span>
          <h2>Inquisitive Minds, Swift Replies – Message Now!</h2>
          <p>
          Dive into our services, questions in tow? Message us; our experts await to unravel answers, guiding your journey with swift insight!
          </p>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="contact-wrap contact-pages mb-0">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                      <div className="form-group">
                        <input
                          id="Name"
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="form-control"
                          required
                        />
                        <ValidationError
                          prefix="Name"
                          field="name"
                          errors={state.errors}
                        />
                      </div>
                    </div>
                    {/*  */}
                    <div className="col-lg-6 col-sm-6">
                      <div className="form-group">
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="form-control"
                          required
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="form-group">
                        <input
                          id="number"
                          type="tel"
                          name="number"
                          placeholder="Phone number"
                          className="form-control"
                          required
                        />
                        <ValidationError
                          prefix="Number"
                          field="number"
                          errors={state.errors}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="form-group">
                        <input
                          id="text"
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          className="form-control"
                          required
                        />
                        <ValidationError
                          prefix="Subject"
                          field="subject"
                          errors={state.errors}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <textarea
                          id="message"
                          name="message"
                          cols="30"
                          rows="6"
                          placeholder="Write your message..."
                          className="form-control"
                          required
                        />
                        <ValidationError
                          prefix="Message"
                          field="message"
                          errors={state.errors}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-sm-12">
                      <button type="submit" className="default-btn btn-two">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="contact-img">
              <img src="/images/contact-img.png" alt="Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactForm;