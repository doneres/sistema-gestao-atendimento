package br.com.djrx.atendimento.modules.auth.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;

class PasswordHasherTest {

    @Test
    void deveGerarSaltComTamanhoEsperado() {
        PasswordHasher hasher = new PasswordHasher();
        String salt = hasher.generateSalt();
        assertNotNull(salt);
        // Base64 de 16 bytes -> 24 chars
        assertTrue(salt.length() >= 24);
    }

    @Test
    void deveHashEDepoisValidarComMesmoSalt() {
        PasswordHasher hasher = new PasswordHasher();
        String salt = hasher.generateSalt();
        String raw = "senha-segura";

        String hash = hasher.hashPassword(raw, salt);
        assertNotNull(hash);
        assertTrue(hasher.verifyPassword(raw, hash, salt));
    }

    @Test
    void naoDeveValidarComSaltDiferente() {
        PasswordHasher hasher = new PasswordHasher();
        String salt1 = hasher.generateSalt();
        String salt2 = hasher.generateSalt();
        String raw = "senha-segura";

        String hash = hasher.hashPassword(raw, salt1);
        assertFalse(hasher.verifyPassword(raw, hash, salt2));
    }
}
