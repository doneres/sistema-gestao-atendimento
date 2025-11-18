package br.com.djrx.atendimento.modules.ficha;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FichaRepository extends JpaRepository<Ficha, UUID> {

}
