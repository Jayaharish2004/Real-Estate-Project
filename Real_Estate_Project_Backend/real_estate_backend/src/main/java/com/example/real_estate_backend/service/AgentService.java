package com.example.real_estate_backend.service;

import com.example.real_estate_backend.model.Agent;
import com.example.real_estate_backend.repo.AgentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgentService {

    @Autowired
    private AgentRepo agentRepo;

    public List<Agent> getAllAgents() {
        return agentRepo.findAll();
    }

    public Optional<Agent> getAgentById(Long id) {
        return agentRepo.findById(id);
    }

    public Agent saveAgent(Agent agent) {
        return agentRepo.save(agent);
    }

    public void deleteAgent(Long id) {
        agentRepo.deleteById(id);
    }

    public List<Agent> getAgentsByCity(String city) {
        return agentRepo.findByCity(city);
    }
}
