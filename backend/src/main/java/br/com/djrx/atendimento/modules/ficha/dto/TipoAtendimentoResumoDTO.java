package br.com.djrx.atendimento.modules.ficha.dto;

import java.util.UUID;

public record TipoAtendimentoResumoDTO(
        UUID id,
        String nomeServico,
        String descricao,
        String iniciaisServico) {
}
