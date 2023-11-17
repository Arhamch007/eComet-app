import React from "react";

const ContactInfo = () => {
  return (
    <>
      <div className="contact-info-area pt-100 pb-70 ">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-6">
              <div className="single-contact-info">
                <i className="bx bx-envelope"></i>
                <h3>Email Us:</h3>
                <p>
                  <a href="mailto:hello@jumpx.com">ecomet.technologies@gmail.com</a>
                </p>
                {/* <p>
                  <a href="mailto:info@jumpx.com">info@jumpx.com</a>
                </p> */}
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-contact-info">
                <i className="bx bx-phone-call"></i>
                <h3>Call Us:</h3>
                <p>
                Ph. + <a href="tel:12318005678990">(92)-319-618175-0</a>
                </p>
                {/* <p>
                  Tel. + <a href="tel:12415235679874">(124) 1523-567-9874</a>
                </p> */}
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-contact-info">
                <i className="bx bx-location-plus"></i>
                <h3>Pakistan</h3>
                <p>F-Block, Street #9, Vehari</p>
              </div>
            </div>

            {/* <div className="col-lg-3 col-sm-6">
              <div className="single-contact-info">
                <i className="bx bx-support"></i>
                <h3>Live Chat</h3>
                <p>live chat all the time with our company 24/7</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
