package br.com.djrx.atendimento.modules.ficha;

import br.com.djrx.atendimento.modules.ficha.dto.EstimativaTempoRequestDTO;
import br.com.djrx.atendimento.modules.ficha.dto.EstimativaTempoResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class IaServiceClient {

    private final RestTemplate restTemplate;

    // URL do serviço de IA na rede do Docker
    @Value("${ia.service.url:http://ia-service:8000}")
    private String iaBaseUrl;

    public IaServiceClient(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public EstimativaTempoResponseDTO estimarTempoEspera(
            int filaAtual,
            int atendentesAtivos,
            int tipoAtendimentoCodigo
    ) {
        EstimativaTempoRequestDTO req = new EstimativaTempoRequestDTO();
        req.setFilaAtual(filaAtual);
        req.setAtendentesAtivos(atendentesAtivos);
        req.setTipoAtendimento(tipoAtendimentoCodigo);

        ResponseEntity<EstimativaTempoResponseDTO> response =
                restTemplate.postForEntity(
                        iaBaseUrl + "/ia/estimativa-tempo",
                        req,
                        EstimativaTempoResponseDTO.class
                );

        return response.getBody();
    }
}
