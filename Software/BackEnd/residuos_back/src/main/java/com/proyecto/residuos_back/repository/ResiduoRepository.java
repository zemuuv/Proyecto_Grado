package com.proyecto.residuos_back.repository;

import com.proyecto.residuos_back.model.Residuo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResiduoRepository extends JpaRepository<Residuo, Long> {
}
