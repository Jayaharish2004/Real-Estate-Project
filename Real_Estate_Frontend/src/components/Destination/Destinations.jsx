// src/components/Destinations/Destinations.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./Destinations.scss";

// Import images
import chennaiImage from "./Chennai.jpg";
import bengaluruImage from "./Bengaluru.jpg";
import hyderabadImage from "./Hyderabad.jpg";
import coimbatoreImage from "./Coimbatore.jpg";
import maduraiImage from "./Madurai.jpg";
import trichyImage from "./Trichy.jpg";
import salemImage from "./Salem.jpg";
import tirunelveliImage from "./Tirunelveli.jpg";

const destinations = [
  { name: "Chennai", image: chennaiImage, path: "/properties/chennai" },
  { name: "Bengaluru", image: bengaluruImage, path: "/properties/bengaluru" },
  { name: "Hyderabad", image: hyderabadImage, path: "/properties/hyderabad" },
  { name: "Coimbatore", image: coimbatoreImage, path: "/properties/coimbatore" },
  { name: "Madurai", image: maduraiImage, path: "/properties/madurai" },
  { name: "Trichy", image: trichyImage, path: "/properties/trichy" },
  { name: "Salem", image: salemImage, path: "/properties/salem" },
  { name: "Tirunelveli", image: tirunelveliImage, path: "/properties/tirunelveli" },
  // Add more cities as needed
];

const Destinations = () => {
  return (
    <div className="destinations-container">
      <header className="destinations-header">
        <h1>Explore Our Most Popular Destinations</h1>
        <p>
        Discover the cities our customers love the most! From bustling urban centers to serene suburban areas, these popular destinations offer a diverse range of properties and lifestyle opportunities across major cities in Tamil Nadu and south India. 
        Whether you're looking for a cozy apartment, a spacious home, or a piece of land to build on, we have something for everyone. Click on a city to explore available homes, apartments, lands, and more.
        </p>
      </header>
      <section className="destinations-list">
        {destinations.map((destination) => (
          <div key={destination.name} className="destination-card">
            <Link to={destination.path}>
              <img src={destination.image} alt={destination.name} />
              <div className="destination-overlay">
                <h2>{destination.name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Destinations;
