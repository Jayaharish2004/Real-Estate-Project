import React from "react";
import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Pinnacle Ventures</h1>
        <p>Your Trusted Partner in Real Estate</p>
      </div>

      <div className="about-us-content">
        <section className="company-description">
          <h2>Company Description</h2>
          <p>
            Pinnacle Ventures is a premier real estate agency dedicated to providing outstanding service in property transactions. Established with a vision to redefine the real estate experience, we combine extensive market knowledge with personalized service to achieve exceptional results. Our expert team is committed to making the property journey smooth, transparent, and successful.
          </p>
        </section>

        <section className="achievements">
          <h2>Our Achievements</h2>
          <ul>
            <li>Over 10,000 successful property transactions in the past 5 years.</li>
            <li>Ranked among the top 10 real estate agencies in Tamil Nadu by Real Estate Times.</li>
            <li>Recipient of the Best Customer Service Award 2023 for exemplary client satisfaction.</li>
            <li>Featured in major publications for innovative marketing and exceptional service.</li>
            <li>Expanded into commercial real estate, broadening our service offerings.</li>
          </ul>
        </section>

        <section className="our-values">
          <h2>Our Values</h2>
          <p>
            At Pinnacle Ventures, our values of integrity, transparency, and customer-centricity drive us. We are dedicated to building lasting relationships based on trust and respect. Our ethical approach and commitment to excellence set us apart, ensuring we consistently exceed our clients’ expectations.
          </p>
        </section>

        <section className="contact-us">
          <h2>Contact Us</h2>
          <p>
            For inquiries or assistance, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> info@pinnacleventures.com <br />
            <strong>Phone:</strong> +91 123 456 7890 <br />
            <strong>Address:</strong> 123 Real Estate Avenue, Coimbatore, Tamil Nadu, India
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
