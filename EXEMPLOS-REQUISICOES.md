# 📡 Coleção de Requisições HTTP - Autenticação JWT

Use estes exemplos no **Swagger**, **Postman**, **Insomnia** ou qualquer cliente HTTP.

---

## 🔗 Base URL

```
http://localhost:8080
```

---

## 1️⃣ REGISTRAR CLIENTE

### `POST /auth/register`

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "nome": "Ana Paula Costa",
  "username": "ana.costa",
  "email": "ana.costa@example.com",
  "password": "SenhaSegura@2024",
  "telefone": "11987654321",
  "dataNascimento": "1992-05-18",
  "tipo": "CLIENTE"
}
```

**Resposta Esperada (201 Created):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhYmNkLTEyMzQtZWY1Ni03ODkwIiwidXNlcm5hbWUiOiJhbmEuY29zdGEiLCJ0aXBvIjoiQ0xJRU5URSIsImlhdCI6MTczMzc2MDAwMCwiZXhwIjoxNzMzODQ2NDAwfQ.xyz...",
  "id": "abcd-1234-ef56-7890",
  "nome": "Ana Paula Costa",
  "username": "ana.costa",
  "email": "ana.costa@example.com",
  "tipo": "CLIENTE",
  "telefone": "11987654321",
  "dataNascimento": "1992-05-18",
  "message": "Usuário registrado e autenticado com sucesso"
}
```

---

## 2️⃣ REGISTRAR FUNCIONÁRIO

### `POST /auth/register`

**Body:**

```json
{
  "nome": "Carlos Eduardo Santos",
  "username": "carlos.santos",
  "email": "carlos.santos@empresa.com",
  "password": "Admin@Forte2024",
  "telefone": "11976543210",
  "dataNascimento": "1985-11-22",
  "tipo": "FUNCIONARIO",
  "matricula": 10254,
  "funcao": "Gerente de Atendimento"
}
```

---

## 3️⃣ REGISTRAR ADMIN

### `POST /auth/register`

**Body:**

```json
{
  "nome": "Administrador Sistema",
  "username": "admin",
  "email": "admin@sistema.com",
  "password": "SuperAdmin@2024",
  "telefone": "11999999999",
  "dataNascimento": "1980-01-01",
  "tipo": "ADMIN",
  "matricula": 1,
  "funcao": "Administrador"
}
```

---

## 4️⃣ LOGIN

### `POST /auth/login`

**Body:**

```json
{
  "username": "ana.costa",
  "password": "SenhaSegura@2024"
}
```

**Resposta (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "id": "abcd-1234-ef56-7890",
  "nome": "Ana Paula Costa",
  "username": "ana.costa",
  "email": "ana.costa@example.com",
  "tipo": "CLIENTE",
  "telefone": "11987654321",
  "dataNascimento": "1992-05-18",
  "message": "Login realizado com sucesso"
}
```

---

## 5️⃣ VALIDAR TOKEN

### `POST /auth/validate-token`

**Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Resposta - Token Válido (200 OK):**

```json
{
  "valid": true,
  "message": "Token válido"
}
```

**Resposta - Token Inválido (200 OK):**

```json
{
  "valid": false,
  "message": "Token inválido ou expirado"
}
```

---

## 6️⃣ LOGOUT

### `POST /auth/logout`

**Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Resposta (200 OK):**

```json
{
  "message": "Logout realizado com sucesso"
}
```

---

## 7️⃣ LISTAR TODOS OS USUÁRIOS

### `GET /auth/users`

**Sem body**

**Resposta (200 OK):**

```json
[
  {
    "id": "abcd-1234-ef56-7890",
    "nome": "Ana Paula Costa",
    "username": "ana.costa",
    "email": "ana.costa@example.com",
    "tipo": "CLIENTE",
    "telefone": "11987654321",
    "dataNascimento": "1992-05-18"
  },
  {
    "id": "wxyz-5678-ijkl-0123",
    "nome": "Carlos Eduardo Santos",
    "username": "carlos.santos",
    "email": "carlos.santos@empresa.com",
    "tipo": "FUNCIONARIO",
    "telefone": "11976543210",
    "dataNascimento": "1985-11-22"
  }
]
```

---

## 8️⃣ BUSCAR USUÁRIO POR ID

### `GET /auth/users/{id}?tipo=CLIENTE`

**Exemplo:**

```
GET /auth/users/abcd-1234-ef56-7890?tipo=CLIENTE
```

**Resposta (200 OK):**

```json
{
  "id": "abcd-1234-ef56-7890",
  "nome": "Ana Paula Costa",
  "username": "ana.costa",
  "email": "ana.costa@example.com",
  "tipo": "CLIENTE",
  "telefone": "11987654321",
  "dataNascimento": "1992-05-18"
}
```

**Erro - Não encontrado (404 Not Found):**

```json
{
  "error": "Usuário não encontrado"
}
```

---

## 9️⃣ ATUALIZAR USUÁRIO

### `PUT /auth/users/{id}?tipo=CLIENTE`

**Exemplo:**

```
PUT /auth/users/abcd-1234-ef56-7890?tipo=CLIENTE
```

**Body (campos opcionais):**

```json
{
  "nome": "Ana Paula Costa Silva",
  "email": "ana.silva@example.com",
  "telefone": "11998877665"
}
```

**Resposta (200 OK):**

```json
{
  "id": "abcd-1234-ef56-7890",
  "nome": "Ana Paula Costa Silva",
  "username": "ana.costa",
  "email": "ana.silva@example.com",
  "tipo": "CLIENTE",
  "telefone": "11998877665",
  "dataNascimento": "1992-05-18"
}
```

---

## 🔟 ATUALIZAR FUNCIONÁRIO

### `PUT /auth/users/{id}?tipo=FUNCIONARIO`

**Body:**

```json
{
  "nome": "Carlos Eduardo Santos Junior",
  "matricula": 20500,
  "funcao": "Gerente Sênior de Atendimento"
}
```

---

## 1️⃣1️⃣ DELETAR USUÁRIO

### `DELETE /auth/users/{id}?tipo=CLIENTE`

**Exemplo:**

```
DELETE /auth/users/abcd-1234-ef56-7890?tipo=CLIENTE
```

**Resposta (200 OK):**

```json
{
  "message": "Usuário deletado com sucesso"
}
```

---

## ❌ EXEMPLOS DE ERROS

### Erro: Username Duplicado

**Request:**

```json
{
  "nome": "Teste",
  "username": "ana.costa",
  "email": "teste@test.com",
  "password": "SenhaForte@123",
  "telefone": "11999999999",
  "dataNascimento": "1990-01-01",
  "tipo": "CLIENTE"
}
```

**Resposta (400 Bad Request):**

```json
{
  "error": "Username já está em uso"
}
```

---

### Erro: Senha Fraca

**Request:**

```json
{
  "nome": "Teste",
  "username": "teste",
  "email": "teste@test.com",
  "password": "123456",
  "telefone": "11999999999",
  "dataNascimento": "1990-01-01",
  "tipo": "CLIENTE"
}
```

**Resposta (400 Bad Request):**

```json
{
  "password": "Senha deve ter no mínimo 12 caracteres, incluindo: letra maiúscula, minúscula, número e caractere especial (@$!%*?&#)"
}
```

---

### Erro: Credenciais Inválidas

**Request:**

```json
{
  "username": "ana.costa",
  "password": "senhaerrada"
}
```

**Resposta (401 Unauthorized):**

```json
{
  "error": "Credenciais inválidas"
}
```

---

### Erro: Token Expirado

**Request:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.EXPIRED_TOKEN..."
}
```

**Resposta (200 OK):**

```json
{
  "valid": false,
  "message": "Token inválido ou expirado"
}
```

---

## 🧪 CENÁRIOS DE TESTE COMPLETOS

### Cenário 1: Fluxo Completo de Cliente

```
1. POST /auth/register (CLIENTE)
2. Copiar token da resposta
3. POST /auth/validate-token → valid: true
4. POST /auth/logout
5. POST /auth/validate-token → valid: false
6. POST /auth/login
7. Novo token gerado
```

### Cenário 2: CRUD de Funcionário

```
1. POST /auth/register (FUNCIONARIO com matricula/funcao)
2. GET /auth/users → listar todos
3. GET /auth/users/{id}?tipo=FUNCIONARIO
4. PUT /auth/users/{id}?tipo=FUNCIONARIO (atualizar matricula)
5. DELETE /auth/users/{id}?tipo=FUNCIONARIO
6. GET /auth/users/{id}?tipo=FUNCIONARIO → 404
```

### Cenário 3: Validação de Segurança

```
1. POST /auth/register com senha fraca → ERRO
2. POST /auth/register com username duplicado → ERRO
3. POST /auth/login com senha errada → 401
4. POST /auth/logout com token
5. POST /auth/validate-token com mesmo token → valid: false
```

---

## 📦 Coleção Postman

### Importar para Postman:

1. File → Import
2. Cole a URL: `http://localhost:8080/v3/api-docs`
3. Ou crie uma coleção com os endpoints acima

### Variáveis de Ambiente:

```json
{
  "base_url": "http://localhost:8080",
  "token": "{{token_obtido_no_login}}"
}
```

---

## 🔍 Dicas de Teste

### 1. Sempre teste o token após logout

```bash
Login → Copiar Token → Validate (true) → Logout → Validate (false)
```

### 2. Teste com diferentes tipos

```bash
Registre: CLIENTE, FUNCIONARIO, ADMIN
Verifique que cada um é salvo na tabela correta
```

### 3. Teste validações

```bash
- Email inválido: "teste@"
- Telefone errado: "123"
- Senha fraca: "abc123"
- Data futura: "2030-01-01"
```

### 4. Teste concorrência

```bash
Registre 2 usuários com mesmo username simultaneamente
Apenas 1 deve ter sucesso
```

---

## ⚡ Scripts de Teste Rápido (PowerShell)

### Registrar Cliente:

```powershell
$body = @{
    nome = "Teste User"
    username = "teste"
    email = "teste@test.com"
    password = "SenhaForte@123"
    telefone = "11999999999"
    dataNascimento = "1990-01-01"
    tipo = "CLIENTE"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/auth/register" -Method POST -Body $body -ContentType "application/json"
```

### Login:

```powershell
$body = @{
    username = "teste"
    password = "SenhaForte@123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:8080/auth/login" -Method POST -Body $body -ContentType "application/json"
$token = $response.token
Write-Host "Token: $token"
```

### Validar Token:

```powershell
$body = @{
    token = $token
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/auth/validate-token" -Method POST -Body $body -ContentType "application/json"
```

---

**Bons testes! 🚀**
