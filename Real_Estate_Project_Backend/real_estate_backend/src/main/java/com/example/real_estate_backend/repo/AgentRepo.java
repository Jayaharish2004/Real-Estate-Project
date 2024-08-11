package com.example.real_estate_backend.repo;

import com.example.real_estate_backend.model.Agent;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AgentRepo extends JpaRepository<Agent, Long> {
    List<Agent> findByCity(String city); // Method to find agents by city
}
