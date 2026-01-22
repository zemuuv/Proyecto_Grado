package com.proyecto.residuos_back.model;

import jakarta.persistence.*;

@Entity
@Table(name = "datos_recomendaciones")
public class Residuo {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "tipo_residuo")
    private String residuoType;

    @Column(name = "descripcion")
    private String residuoDescription;

    public Residuo() {
    }

    public Residuo(String residuoType, String residuoDescription) {
        this.residuoType = residuoType;
        this.residuoDescription = residuoDescription;
    }

    // getters y setters

    public Long getId() {
        return id;
    }

    public String getResiduoType() {
        return residuoType;
    }

    public void setResiduoType(String residuoType) {
        this.residuoType = residuoType;
    }

    public String getResiduoDescription() {
        return residuoDescription;
    }

    public void setResiduoDescription(String residuoDescription) {
        this.residuoDescription = residuoDescription;
    }
}
