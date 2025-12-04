package br.com.djrx.atendimento.modules.ficha.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class EstimativaTempoRequestDTO {

    @JsonProperty("fila_atual")
    private int filaAtual;

    @JsonProperty("atendentes_ativos")
    private int atendentesAtivos;

    @JsonProperty("tipo_atendimento")
    private int tipoAtendimento;
}
