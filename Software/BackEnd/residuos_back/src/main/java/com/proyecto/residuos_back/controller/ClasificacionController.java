package com.proyecto.residuos_back.controller;

import com.proyecto.residuos_back.services.ClasificacionService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/ia")
@CrossOrigin(origins = "http://localhost:4200")
public class ClasificacionController {

    private final ClasificacionService service;

    public ClasificacionController(ClasificacionService service) {
        this.service = service;
    }

    @PostMapping("/clasificar")
    public String clasificar(@RequestParam("imagen") MultipartFile imagen) throws Exception {

        return service.clasificarImagen(imagen);

    }
}