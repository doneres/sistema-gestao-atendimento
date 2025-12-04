package br.com.djrx.atendimento.modules.ficha.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record FichaResponseDTO(
        UUID id,
        String status,
        LocalDateTime dataHoraEntradaFila,
        LocalDateTime dataHoraInicioAtendimento,
        LocalDateTime dataHoraFimAtendimento,
        TipoAtendimentoResumoDTO tipoAtendimento,
        FuncionarioResumoDTO funcionario) {
}
