package com.proyecto.residuos_back.services;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Service
public class ClasificacionService {

    private final String PYTHON_API = "http://localhost:5000/clasificar";

    public String clasificarImagen(MultipartFile file) throws Exception {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        // MUY IMPORTANTE: el nombre debe ser "imagen"
        body.add("imagen", resource);

        HttpEntity<MultiValueMap<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                PYTHON_API,
                request,
                String.class
        );

        return response.getBody();
    }
}