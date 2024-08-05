package com.example.realestate.controller;

import com.example.realestate.model.Agent;
import com.example.realestate.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

    @Autowired
    private AgentService agentService;

    // Get all agents
    @GetMapping
    public List<Agent> getAllAgents() {
        return agentService.getAllAgents();
    }

    // Get agent by ID
    @GetMapping("/{id}")
    public ResponseEntity<Agent> getAgentById(@PathVariable Long id) {
        Optional<Agent> agent = agentService.getAgentById(id);
        return agent.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create new agent
    @PostMapping
    public ResponseEntity<Agent> createAgent(@RequestBody Agent agent) {
        Agent createdAgent = agentService.createAgent(agent);
        return ResponseEntity.ok(createdAgent);
    }

    // Update existing agent
    @PutMapping("/{id}")
    public ResponseEntity<Agent> updateAgent(@PathVariable Long id, @RequestBody Agent agent) {
        Agent updatedAgent = agentService.updateAgent(id, agent);
        return updatedAgent != null ? ResponseEntity.ok(updatedAgent) :
                                      ResponseEntity.notFound().build();
    }

    // Delete agent
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgent(@PathVariable Long id) {
        return agentService.deleteAgent(id) ? ResponseEntity.noContent().build() :
                                              ResponseEntity.notFound().build();
    }
}
