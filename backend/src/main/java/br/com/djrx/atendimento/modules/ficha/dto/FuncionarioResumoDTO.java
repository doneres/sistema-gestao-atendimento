package br.com.djrx.atendimento.modules.ficha.dto;

import java.util.UUID;

public record FuncionarioResumoDTO(
        UUID id,
        String nome,
        Long matricula,
        String funcao) {
}
