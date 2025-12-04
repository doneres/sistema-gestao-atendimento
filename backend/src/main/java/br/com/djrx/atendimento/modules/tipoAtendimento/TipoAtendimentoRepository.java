package br.com.djrx.atendimento.modules.tipoAtendimento;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoAtendimentoRepository extends JpaRepository<TipoAtendimento, UUID>{

}
