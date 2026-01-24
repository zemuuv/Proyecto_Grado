package com.proyecto.residuos_back.repository;

import com.proyecto.residuos_back.model.Residuo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ResiduosRepository extends JpaRepository<Residuo, Long> {

    @Query(
            value = """
        SELECT *
        FROM datos_recomendaciones
        WHERE tipo_residuo = :tipo
        ORDER BY RANDOM()
        LIMIT 1
        """,
            nativeQuery = true
    )
    Residuo obtenerAleatorioPorTipo(String tipo);

}
