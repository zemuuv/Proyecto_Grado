package com.proyecto.residuos_back.model;

public class Residuo {

    String residuoType;
    String residuoDescription;

    public Residuo(String residuoType, String residuoDescription) {
        this.residuoType = residuoType;
        this.residuoDescription = residuoDescription;
    }

    public Residuo() {
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
