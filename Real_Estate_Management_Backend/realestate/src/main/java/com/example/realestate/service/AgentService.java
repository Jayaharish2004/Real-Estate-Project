package com.example.realestate.service;

import com.example.realestate.model.Agent;
import com.example.realestate.repository.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgentService {

    @Autowired
    private AgentRepository agentRepository;

    // Get all agents
    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    // Get agent by ID
    public Optional<Agent> getAgentById(Long id) {
        return agentRepository.findById(id);
    }

    // Create new agent
    public Agent createAgent(Agent agent) {
        return agentRepository.save(agent);
    }

    // Update existing agent
    public Agent updateAgent(Long id, Agent agent) {
        if (agentRepository.existsById(id)) {
            agent.setId(id);
            return agentRepository.save(agent);
        }
        return null;
    }

    // Delete agent
    public boolean deleteAgent(Long id) {
        if (agentRepository.existsById(id)) {
            agentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
