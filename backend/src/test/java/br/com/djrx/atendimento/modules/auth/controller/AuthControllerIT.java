package br.com.djrx.atendimento.modules.auth.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class AuthControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void loginDeveRetornarTokenQuandoCredenciaisValidas() throws Exception {
        String body = "{\n" +
                "  \"username\": \"user-test\",\n" +
                "  \"password\": \"password-test\"\n" +
                "}";

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
            .andExpect(status().isOk())
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.token").exists());
    }

    @Test
    void validateTokenDeveRetornarOkQuandoTokenValido() throws Exception {
        // Primeiro realiza login para obter token
        String loginBody = "{\n" +
                "  \"username\": \"user-test\",\n" +
                "  \"password\": \"password-test\"\n" +
                "}";

        String token = mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginBody))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();

        // Extrai campo token de forma simples
        String jwt = token.replaceAll(".*\"token\":\"(.*?)\".*", "$1");

        mockMvc.perform(post("/auth/validate-token")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"token\":\"" + jwt + "\"}"))
            .andExpect(status().isOk());
    }
}
