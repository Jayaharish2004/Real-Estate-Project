package com.example.real_estate_backend.service;

import com.example.real_estate_backend.model.Property;
import com.example.real_estate_backend.repo.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public List<Property> getPropertiesByCity(String city) {
        return propertyRepository.findByCityIgnoreCase(city);
    }

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }

    public Property updateProperty(Long id, Property property) {
        if (propertyRepository.existsById(id)) {
            property.setId(id);
            return propertyRepository.save(property);
        }
        return null;
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
}
