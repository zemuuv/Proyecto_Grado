package com.proyecto.residuos_back.services;

import com.proyecto.residuos_back.model.Residuo;
import com.proyecto.residuos_back.repository.ResiduosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResiduoService {

    private final ResiduosRepository repository;

    public ResiduoService(ResiduosRepository repository) {
        this.repository = repository;
    }

    public List<Residuo> obtenerTodos() {
        return repository.findAll();
    }

    public Residuo obtenerResiduoAleatorio(String tipo) {
        return repository.obtenerAleatorioPorTipo(tipo.toLowerCase());
    }
}
