// src/components/Properties/Properties.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./Properties.scss"; // Create this file for styles

// Import images from the Properties/images folder
import chennaiImage from "./images/Chennai.jpg";
import coimbatoreImage from "./images/Coimbatore.jpg";
import maduraiImage from "./images/Madurai.jpg";
import trichyImage from "./images/Trichy.jpg";
import salemImage from "./images/Salem.jpg";
import tirunelveliImage from "./images/Tirunelveli.jpg";
import erodeImage from "./images/Erode.jpg";
import tirupurImage from "./images/Tirupur.avif";
import velloreImage from "./images/Vellore.jpg";
import thoothukudiImage from "./images/Thoothukudi.jpg";
import dindigulImage from "./images/Dindigul.jpg";
import thanjavurImage from "./images/Thanjavur.jpg";
import hosurImage from "./images/Hosur.avif";
import karurImage from "./images/Karur.jpg";
import nagapattinamImage from "./images/Nagapattinam.jpg";
import rajapalayamImage from "./images/Rajapalayam.jpg";
import nagercoilImage from "./images/Nagercoil.jpg";
import bengaluruImage from "./images/Bengaluru.jpg";
import hyderabadImage from "./images/Hyderabad.jpg";
import kochiImage from "./images/Kochi.jpg";
import vizagImage from "./images/Vizag.jpg";

const cities = [
  { name: "Chennai", image: chennaiImage },
  { name: "Coimbatore", image: coimbatoreImage },
  { name: "Madurai", image: maduraiImage },
  { name: "Trichy", image: trichyImage },
  { name: "Salem", image: salemImage },
  { name: "Tirunelveli", image: tirunelveliImage },
  { name: "Erode", image: erodeImage },
  { name: "Tirupur", image: tirupurImage },
  { name: "Vellore", image: velloreImage },
  { name: "Thoothukudi", image: thoothukudiImage },
  { name: "Dindigul", image: dindigulImage },
  { name: "Thanjavur", image: thanjavurImage },
  { name: "Hosur", image: hosurImage },
  { name: "Karur", image: karurImage },
  { name: "Nagapattinam", image: nagapattinamImage },
  { name: "Rajapalayam", image: rajapalayamImage },
  { name: "Nagercoil", image: nagercoilImage },
  { name: "Bengaluru", image: bengaluruImage },
  { name: "Hyderabad", image: hyderabadImage },
  { name: "Kochi", image: kochiImage },
  { name: "Vizag", image: vizagImage },
];

const Properties = () => {
  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>Our Other Properties</h1>
        <p>
        Explore a comprehensive list of cities where you can find your dream property across major cities in Tamil Nadu and South India. From our top destinations to hidden gems, each city offers unique opportunities and lifestyles. Browse through our extensive collection of apartments, homes, and lands to find the perfect place that suits your needs and preferences. 
        Whether you're looking for a cozy apartment, a spacious home, or a piece of land to build on, we have something for everyone. Click on a city to explore available homes, apartments, lands, and more.
        </p>
      </header>
      <section className="properties-list">
        {cities.map((city) => (
          <div key={city.name} className="property-card">
            <Link to={`/properties/${city.name.toLowerCase()}`}>
              <img src={city.image} alt={city.name} />
              <div className="property-overlay">
                <h2>{city.name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Properties;
