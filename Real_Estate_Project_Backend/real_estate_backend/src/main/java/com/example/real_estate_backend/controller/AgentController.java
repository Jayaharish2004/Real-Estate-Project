package com.example.real_estate_backend.controller;

import com.example.real_estate_backend.model.Agent;
import com.example.real_estate_backend.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

    @Autowired
    private AgentService agentService;

    @GetMapping
    public List<Agent> getAllAgents() {
        return agentService.getAllAgents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agent> getAgentById(@PathVariable Long id) {
        Optional<Agent> agent = agentService.getAgentById(id);
        return agent.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Agent> createAgent(@RequestBody Agent agent) {
        Agent savedAgent = agentService.saveAgent(agent);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAgent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agent> updateAgent(@PathVariable Long id, @RequestBody Agent agent) {
        if (!agentService.getAgentById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        agent.setId(id);
        Agent updatedAgent = agentService.saveAgent(agent);
        return ResponseEntity.ok(updatedAgent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgent(@PathVariable Long id) {
        if (!agentService.getAgentById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        agentService.deleteAgent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Agent>> getAgentsByCity(@RequestParam String city) {
        List<Agent> agents = agentService.getAgentsByCity(city);
        if (agents.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(agents);
    }
}
