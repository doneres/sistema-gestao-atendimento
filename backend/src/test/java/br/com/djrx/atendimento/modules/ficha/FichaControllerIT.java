package br.com.djrx.atendimento.modules.ficha;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class FichaControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FichaRepository fichaRepository;

    @MockBean
    private IaServiceClient iaServiceClient; // mocka chamada externa de IA

    @BeforeEach
    void setup() {
        fichaRepository.deleteAll();
    }

    @Test
    void deveCriarFichaComSucesso() throws Exception {
        String body = "{\n" +
                "  \"descricao\": \"Teste de ficha\",\n" +
                "  \"tipoAtendimentoId\": \"" + UUID.randomUUID() + "\"\n" +
                "}";

        mockMvc.perform(post("/fichas")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
               .andExpect(status().isCreated())
               .andExpect(jsonPath("$.id").exists());
    }

        @Test
        void deveRetornarEstimativaTempo() throws Exception {
        Mockito.when(iaServiceClient.estimarTempoEspera(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyInt()))
               .thenReturn(new br.com.djrx.atendimento.modules.ficha.dto.EstimativaTempoResponseDTO(5));

        String body = "{\n" +
            "  \"quantidadePessoasNaFrente\": 10,\n" +
            "  \"mediaAtendimentoPorFuncionario\": 2,\n" +
            "  \"tipoAtendimentoCodigo\": 1\n" +
            "}";

        mockMvc.perform(post("/fichas/estimativa")
            .contentType(MediaType.APPLICATION_JSON)
            .content(body))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.estimativaMinutos").value(5));
        }
}
