package com.proyecto.residuos_back.controller;

import com.proyecto.residuos_back.services.ClasificacionService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/ia")
@CrossOrigin(origins = "*")
public class ClasificacionController {

    private final ClasificacionService service;

    public ClasificacionController(ClasificacionService service) {
        this.service = service;
    }

    @PostMapping("/clasificar")
    public String clasificar(@RequestParam("imagen") MultipartFile imagen) throws Exception {

        System.out.println("hola");

        return service.clasificarImagen(imagen);

    }
}