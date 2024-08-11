package com.example.real_estate_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long propertyId;
    private String propertyName;
    private String description;
    private String city;
    private double price;

    // Getters and Setters
    public Long getId() { return propertyId; }
    public void setId(Long id) { this.propertyId = id; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getName() { return propertyName; }
    public void setName(String name) { this.propertyName = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
