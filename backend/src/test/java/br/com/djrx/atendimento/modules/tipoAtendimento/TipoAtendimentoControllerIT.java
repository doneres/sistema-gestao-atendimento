package br.com.djrx.atendimento.modules.tipoAtendimento;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class TipoAtendimentoControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TipoAtendimentoRepository repository;

    @BeforeEach
    void seed() {
        repository.deleteAll();
        TipoAtendimento ta = new TipoAtendimento();
        ta.setId(UUID.randomUUID());
        ta.setNomeServico("Geral");
        ta.setDescricao("Atendimento geral");
        ta.setIniciaisServico("GE");
        repository.save(ta);
    }

    @Test
    void deveListarTiposDeAtendimento() throws Exception {
        mockMvc.perform(get("/tipo-atendimento").accept(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
               .andExpect(jsonPath("$[0].nomeServico").value("Geral"));
    }

    @Test
    void deveCadastrarTipoDeAtendimento() throws Exception {
        String body = "{\n" +
                "  \"nomeServico\": \"Prioritário\",\n" +
                "  \"descricao\": \"Atendimento prioritário\",\n" +
                "  \"iniciaisServico\": \"PR\"\n" +
                "}";

        mockMvc.perform(post("/tipo-atendimento")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
               .andExpect(status().isCreated())
               .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
               .andExpect(jsonPath("$.nomeServico").value("Prioritário"))
               .andExpect(jsonPath("$.id").exists());
    }
}
