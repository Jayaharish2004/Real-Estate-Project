import React from "react";
import "./Services.scss"; // Import the CSS file

const Services = () => {
  return (
    <div className="services-container">
      <header className="services-header">
        <h1>Our Services</h1>
        <p>
          At Pinnacle Ventures, we offer a comprehensive range of real estate
          services across Tamil Nadu and other major South Indian cities.
          Explore our offerings and find the perfect solution for your needs.
        </p>
      </header>
      <section className="services-list">
        <div className="service-card">
          <h2>Property Sales</h2>
          <p>
            We provide expert assistance in buying and selling properties. Our
            team will guide you through every step of the process, from
            valuation to closing.
          </p>
        </div>
        <div className="service-card">
          <h2>Property Rentals</h2>
          <p>
            Looking for a rental property? We offer a wide range of rental
            options including apartments, houses, and commercial spaces. Let us
            help you find your next home or office.
          </p>
        </div>
        <div className="service-card">
          <h2>Property Management</h2>
          <p>
            Our property management services ensure that your investment is
            well-maintained and managed efficiently. We handle tenant
            screening, rent collection, and maintenance.
          </p>
        </div>
        <div className="service-card">
          <h2>Real Estate Consulting</h2>
          <p>
            Need expert advice on real estate investments? Our consultants
            provide valuable insights on market trends, property valuations, and
            investment opportunities.
          </p>
        </div>
        <div className="service-card">
          <h2>Luxury Real Estate</h2>
          <p>
            Discover high-end properties with exclusive features. Our luxury
            real estate services cater to those seeking premium homes and
            investments.
          </p>
        </div>
        <div className="service-card">
          <h2>Commercial Real Estate</h2>
          <p>
            Explore opportunities in commercial real estate including office
            spaces, retail properties, and industrial units. We offer tailored
            solutions for businesses of all sizes.
          </p>
        </div>
        <div className="service-card">
          <h2>New Developments</h2>
          <p>
            Stay ahead of the market with information on upcoming developments
            and new residential and commercial projects in Tamil Nadu and South
            India.
          </p>
        </div>
        <div className="service-card">
          <h2>Investment Opportunities</h2>
          <p>
            Discover lucrative real estate investment opportunities with our
            expert analysis and market insights to help you make informed
            decisions.
          </p>
        </div>
      </section>
      <section className="city-services">
        <h2>Our Customer Favourite Destinations</h2>
        <div className="city-list">
          <div className="city-card">
            <h3>Chennai</h3>
            <p>Explore property options in the vibrant city of Chennai.</p>
          </div>
          <div className="city-card">
            <h3>Bengaluru</h3>
            <p>Find your ideal home or investment in the tech hub of Bengaluru.</p>
          </div>
          <div className="city-card">
            <h3>Hyderabad</h3>
            <p>Discover real estate opportunities in the bustling city of Hyderabad.</p>
          </div>
          <div className="city-card">
            <h3>Coimbatore</h3>
            <p>Explore property options in the growing city of Coimbatore.</p>
          </div>
          <div className="city-card">
            <h3>Madurai</h3>
            <p>Find your next property in the historic city of Madurai.</p>
          </div>
          <div className="city-card">
            <h3>Trichy</h3>
            <p>Explore real estate options in the city of Trichy.</p>
          </div>
          <div className="city-card">
            <h3>Salem</h3>
            <p>Discover property opportunities in the city of Salem.</p>
          </div>
          <div className="city-card">
            <h3>Tirunelveli</h3>
            <p>Find your ideal property in Tirunelveli.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
