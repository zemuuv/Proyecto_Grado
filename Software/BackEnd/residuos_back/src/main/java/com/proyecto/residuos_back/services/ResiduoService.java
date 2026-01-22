package com.proyecto.residuos_back.services;

import com.proyecto.residuos_back.model.Residuo;
import com.proyecto.residuos_back.repository.ResiduoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResiduoService {

    private final ResiduoRepository repository;

    public ResiduoService(ResiduoRepository repository) {
        this.repository = repository;
    }

    public List<Residuo> obtenerTodos() {
        return repository.findAll();
    }
}
