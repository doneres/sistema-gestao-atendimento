package br.com.djrx.atendimento.modules.ficha;

import java.util.UUID;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FichaRepository extends JpaRepository<Ficha, UUID> {

    int countByStatus(String status); // 
    List<Ficha> findByStatusOrderByDataHoraEntradaFilaAsc(String status);
}
