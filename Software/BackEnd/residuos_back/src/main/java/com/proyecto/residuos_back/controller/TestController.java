package com.proyecto.residuos_back.controller;
import com.proyecto.residuos_back.model.Residuo;
import com.proyecto.residuos_back.services.ResiduoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test")
public class TestController {

    private final ResiduoService service;

    public TestController(ResiduoService service) {
        this.service = service;
    }

    @GetMapping("/residuos")
    public List<Residuo> probarSelect() {
        return service.obtenerTodos();
    }
}