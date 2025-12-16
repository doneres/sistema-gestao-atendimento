package br.com.djrx.atendimento.modules.auth.service;

import java.lang.reflect.Field;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setup() throws Exception {
        jwtService = new JwtService();
        setField(jwtService, "secret", "minha-chave-secreta-super-segura-para-tests-1234567890");
        // expiração de 1 hora em milissegundos
        setField(jwtService, "expiration", 3600_000L);
    }

    @Test
    void geraTokenEValidaClaimsBasicas() {
        UUID userId = UUID.randomUUID();
        String username = "usuario";
        String tipo = "ADMIN";

        String token = jwtService.generateToken(userId, username, tipo);
        assertNotNull(token);
        assertEquals(username, jwtService.extractUsername(token));
        assertEquals(userId.toString(), jwtService.extractUserId(token));
        assertEquals(tipo, jwtService.extractTipo(token));
        assertTrue(jwtService.isTokenValid(token));
        assertTrue(jwtService.validateToken(token, username));
    }

    @Test
    void validateFalhaComUsernameDiferente() {
        UUID userId = UUID.randomUUID();
        String token = jwtService.generateToken(userId, "user", "CLIENTE");
        assertFalse(jwtService.validateToken(token, "outro"));
    }

    private static void setField(Object target, String fieldName, Object value) throws Exception {
        Field f = target.getClass().getDeclaredField(fieldName);
        f.setAccessible(true);
        f.set(target, value);
    }
}
