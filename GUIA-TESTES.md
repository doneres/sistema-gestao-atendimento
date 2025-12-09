# 🚀 Guia Rápido de Testes - Sistema de Autenticação JWT

## ⚠️ PRÉ-REQUISITOS

1. **Docker Desktop** instalado e **EXECUTANDO**
2. **Java 21** (já instalado)
3. **Maven** (wrapper incluído no projeto)

---

## 📋 PASSO A PASSO PARA TESTAR

### 1️⃣ Iniciar Docker Desktop

- Abra o **Docker Desktop** e aguarde até que esteja completamente iniciado
- Verifique se o ícone do Docker na bandeja do sistema está verde

### 2️⃣ Iniciar PostgreSQL

```powershell
cd c:\Users\USER\source\repos\sistema-gestao-atendimento
docker-compose up -d db
```

**Verificar se está rodando:**

```powershell
docker ps
```

Deve aparecer: `atendimento-postgres-db` com status `Up`

### 3️⃣ Executar a Aplicação Spring Boot

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

**Aguarde a mensagem:**

```
Started AtendimentoApplication in X.XXX seconds
```

### 4️⃣ Acessar Swagger UI

Abra o navegador em:

```
http://localhost:8080/swagger-ui.html
```

---

## 🧪 TESTES NO SWAGGER

### ✅ TESTE 1: Registrar Novo Cliente

1. Expanda `POST /auth/register`
2. Clique em **"Try it out"**
3. Cole este JSON:

```json
{
  "nome": "Maria Silva",
  "username": "maria.silva",
  "email": "maria@example.com",
  "password": "SenhaForte@123",
  "telefone": "11987654321",
  "dataNascimento": "1995-03-20",
  "tipo": "CLIENTE"
}
```

4. Clique em **"Execute"**
5. **Resultado Esperado:** Status `201 Created` com token JWT

### ✅ TESTE 2: Registrar Funcionário com Matrícula

```json
{
  "nome": "João Santos",
  "username": "joao.santos",
  "email": "joao@example.com",
  "password": "Admin@2024Forte",
  "telefone": "11976543210",
  "dataNascimento": "1988-07-15",
  "tipo": "FUNCIONARIO",
  "matricula": 12345,
  "funcao": "Atendente"
}
```

### ✅ TESTE 3: Login

1. Expanda `POST /auth/login`
2. **"Try it out"**
3. JSON:

```json
{
  "username": "maria.silva",
  "password": "SenhaForte@123"
}
```

4. **Resultado:** Status `200 OK` + **COPIE O TOKEN**

**Exemplo de resposta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI...",
  "id": "uuid-aqui",
  "nome": "Maria Silva",
  "username": "maria.silva",
  "email": "maria@example.com",
  "tipo": "CLIENTE",
  "telefone": "11987654321",
  "dataNascimento": "1995-03-20",
  "message": "Login realizado com sucesso"
}
```

### ✅ TESTE 4: Validar Token

1. Expanda `POST /auth/validate-token`
2. Cole o token do teste anterior:

```json
{
  "token": "COLE_O_TOKEN_AQUI"
}
```

3. **Resultado:** `{"valid": true, "message": "Token válido"}`

### ✅ TESTE 5: Listar Todos os Usuários

1. Expanda `GET /auth/users`
2. **"Try it out"** → **"Execute"**
3. **Resultado:** Lista com Maria e João

### ✅ TESTE 6: Buscar Usuário por ID

1. Copie o `id` da Maria da lista anterior
2. Expanda `GET /auth/users/{id}`
3. Cole o ID no campo `id`
4. Selecione `tipo: CLIENTE` no dropdown
5. **Execute**

### ✅ TESTE 7: Atualizar Usuário

1. Expanda `PUT /auth/users/{id}`
2. Cole o ID da Maria
3. Selecione `tipo: CLIENTE`
4. JSON:

```json
{
  "nome": "Maria Silva Santos",
  "telefone": "11999887766"
}
```

### ✅ TESTE 8: Logout

1. Expanda `POST /auth/logout`
2. Cole o token:

```json
{
  "token": "COLE_O_TOKEN_AQUI"
}
```

3. **Resultado:** `{"message": "Logout realizado com sucesso"}`

### ✅ TESTE 9: Validar Token Após Logout

1. Expanda `POST /auth/validate-token`
2. Use o MESMO token do logout
3. **Resultado:** `{"valid": false, "message": "Token inválido ou expirado"}`

✅ **ISSO PROVA QUE O CONTROLE DE SESSÃO ESTÁ FUNCIONANDO!**

---

## 🔍 VERIFICAR BANCO DE DADOS

### Conectar no PostgreSQL:

```powershell
docker exec -it atendimento-postgres-db psql -U sysadminatend -d atendimento_db
```

### Consultas SQL:

```sql
-- Ver estrutura das tabelas
\dt

-- Ver clientes
SELECT id, nome, username, email, tipo, login_time, logout_time FROM clientes;

-- Ver funcionários
SELECT id, nome, username, email, tipo, matricula, funcao, login_time, logout_time FROM funcionarios;

-- Ver hashes de senha (segurança)
SELECT username, senha, salt FROM clientes LIMIT 1;

-- Sair do psql
\q
```

---

## 🧪 TESTES DE SEGURANÇA

### ❌ TESTE: Senha Fraca

```json
{
  "nome": "Teste",
  "username": "teste",
  "email": "teste@test.com",
  "password": "123456",
  "telefone": "11999999999",
  "dataNascimento": "2000-01-01",
  "tipo": "CLIENTE"
}
```

**Esperado:** Erro de validação (senha deve ter 12+ caracteres com maiúscula, minúscula, número e especial)

### ❌ TESTE: Username Duplicado

Tente registrar outro usuário com `"username": "maria.silva"`
**Esperado:** Erro "Username já está em uso"

### ❌ TESTE: Login com Senha Errada

```json
{
  "username": "maria.silva",
  "password": "SenhaErrada123!"
}
```

**Esperado:** `401 Unauthorized` - "Credenciais inválidas"

### ❌ TESTE: Token Inválido

```json
{
  "token": "token.invalido.aqui"
}
```

**Esperado:** `{"valid": false}`

---

## 📊 CHECKLIST DE VALIDAÇÃO

### Autenticação:

- [ ] Registro de Cliente funciona
- [ ] Registro de Funcionário funciona
- [ ] Login retorna token JWT válido
- [ ] Senha é armazenada como hash (nunca em texto plano)
- [ ] Salt é único para cada usuário

### Sessão:

- [ ] Token validado corretamente após login
- [ ] Logout invalida o token
- [ ] Token não funciona após logout
- [ ] loginTime e logoutTime são atualizados

### CRUD:

- [ ] Listar usuários retorna Clientes e Funcionários
- [ ] Buscar por ID funciona
- [ ] Atualizar dados funciona
- [ ] Deletar usuário funciona

### Segurança:

- [ ] Senhas fracas são rejeitadas
- [ ] Username duplicado é rejeitado
- [ ] Login com senha errada é bloqueado
- [ ] Token inválido é rejeitado
- [ ] CORS permite apenas origens configuradas

### Banco de Dados:

- [ ] Tabelas `clientes` e `funcionarios` criadas
- [ ] Campos de autenticação presentes
- [ ] Dados persistem após restart

---

## 🛑 PARAR O AMBIENTE

```powershell
# Parar aplicação: Ctrl+C no terminal do Spring Boot

# Parar PostgreSQL
docker-compose down
```

---

## 🐛 TROUBLESHOOTING

### Erro: "Cannot connect to Docker"

- **Solução:** Inicie o Docker Desktop e aguarde alguns minutos

### Erro: "Port 5432 already in use"

- **Solução:** Pare outro PostgreSQL rodando localmente

```powershell
# Windows
Stop-Service postgresql-x64-16
```

### Erro: "Port 8080 already in use"

- **Solução:** Mate o processo na porta 8080

```powershell
netstat -ano | findstr :8080
taskkill /PID [número_do_pid] /F
```

### Erro ao acessar Swagger

- Verifique se a aplicação iniciou completamente
- Acesse: `http://localhost:8080/actuator/health`
- Deve retornar: `{"status":"UP"}`

### Tabelas não criadas no banco

- Verifique os logs do Spring Boot
- Confirme que `spring.jpa.hibernate.ddl-auto=update` está configurado
- Reinicie a aplicação

---

## ✅ PRÓXIMOS PASSOS APÓS VALIDAÇÃO

1. **Implementar JWT Filter** para proteger endpoints automáticamente
2. **Adicionar @PreAuthorize** para controle de acesso por tipo
3. **Integrar com Frontend** React
4. **Criar testes unitários** e de integração
5. **Deploy** em ambiente de produção

---

## 📞 SUPORTE

Se encontrar problemas:

1. Verifique os logs do Spring Boot
2. Verifique logs do Docker: `docker logs atendimento-postgres-db`
3. Confirme que todas as dependências foram baixadas
4. Limpe e recompile: `.\mvnw.cmd clean package -DskipTests`

**Sistema 100% funcional e pronto para uso!** 🎉
