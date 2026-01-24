package com.proyecto.residuos_back.controller;
import com.proyecto.residuos_back.model.Residuo;
import com.proyecto.residuos_back.services.ResiduoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/residuo")
public class ResiduoController {

    private final ResiduoService service;

    public ResiduoController(ResiduoService service) {
        this.service = service;
    }

    @GetMapping("/residuos")
    public List<Residuo> probarSelect() {
        return service.obtenerTodos();
    }

    @GetMapping("/aleatorio")
    public Residuo obtenerAleatorio(@RequestParam String tipo) {
        return service.obtenerResiduoAleatorio(tipo);
    }

}