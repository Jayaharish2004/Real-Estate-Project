package com.example.real_estate_backend.repo;

import com.example.real_estate_backend.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByCityIgnoreCase(String city);
}
