package br.com.djrx.atendimento.modules.auth.service;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Serviço para hash seguro de senhas usando BCrypt + Salt individual
 */
@Component
public class PasswordHasher {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final SecureRandom secureRandom = new SecureRandom();

    /**
     * Gera um salt aleatório único para cada usuário
     * @return Salt codificado em Base64
     */
    public String generateSalt() {
        byte[] salt = new byte[16];
        secureRandom.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    /**
     * Cria hash da senha usando BCrypt com o salt fornecido
     * Combina a senha com o salt antes de fazer o hash
     * 
     * @param rawPassword Senha em texto plano
     * @param salt Salt individual do usuário
     * @return Hash BCrypt da senha combinada com o salt
     */
    public String hashPassword(String rawPassword, String salt) {
        String saltedPassword = rawPassword + salt;
        return encoder.encode(saltedPassword);
    }

    /**
     * Verifica se a senha fornecida corresponde ao hash armazenado
     * 
     * @param rawPassword Senha em texto plano fornecida
     * @param hashedPassword Hash armazenado no banco
     * @param salt Salt individual do usuário
     * @return true se a senha está correta, false caso contrário
     */
    public boolean verifyPassword(String rawPassword, String hashedPassword, String salt) {
        String saltedPassword = rawPassword + salt;
        return encoder.matches(saltedPassword, hashedPassword);
    }
}
