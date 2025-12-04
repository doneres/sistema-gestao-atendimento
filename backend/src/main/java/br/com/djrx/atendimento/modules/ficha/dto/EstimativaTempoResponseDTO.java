package br.com.djrx.atendimento.modules.ficha.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class EstimativaTempoResponseDTO {

    @JsonProperty("tempo_estimado_minutos")
    private double tempoEstimadoMinutos;

    private String origem;
}
