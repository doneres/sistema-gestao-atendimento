# 🎯 Sistema de Gerenciamento de Atendimento

Sistema completo de gerenciamento de atendimento com backend Spring Boot, frontend React + Vite e banco de dados PostgreSQL.

---

## 📋 Pré-requisitos

### Para Desenvolvimento Local
- **Java 21** ([Download](https://adoptium.net/))
- **Maven 3.8+** ([Download](https://maven.apache.org/download.cgi))
- **Node.js 20+** ([Download](https://nodejs.org/))
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))

### Para Docker (Produção)
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
- **Docker Compose** (já vem com Docker Desktop)

---

## 🚀 Opções de Execução

### **Opção 1: Desenvolvimento Local (Recomendado)**

Melhor para desenvolvimento ativo com hot reload.

#### **1. Iniciar Banco de Dados**
```bash
# Subir apenas o PostgreSQL no Docker
docker-compose up -d db

# Verificar se está rodando
docker-compose ps
```

#### **2. Iniciar Backend**
```bash
# Navegar até a pasta do backend
cd backend

# Compilar o projeto
mvn clean install -DskipTests

# Rodar aplicação
mvn spring-boot:run
```

**Backend estará disponível em:** `http://localhost:8080`

#### **3. Iniciar Frontend**
```bash
# Navegar até a pasta do frontend
cd frontend

# Instalar dependências (primeira vez)
npm install

# Rodar em modo desenvolvimento
npm run dev
```

**Frontend estará disponível em:** `http://localhost:5173`

#### **4. Parar Tudo**
```bash
# Parar backend: Ctrl + C no terminal

# Parar frontend: Ctrl + C no terminal

# Parar banco de dados
docker-compose down
```

---

### **Opção 2: Tudo no Docker (Produção)**

Melhor para testar ambiente de produção ou deploy.

#### **1. Build e Iniciar Todos os Serviços**
```bash
# Buildar imagens e subir containers
docker-compose up -d --build

# Ver logs em tempo real
docker-compose logs -f

# Ver logs apenas do backend
docker-compose logs -f backend
```

#### **2. Verificar Status**
```bash
# Ver containers rodando
docker-compose ps

# Ver uso de recursos
docker stats
```

#### **3. Acessar Aplicação**
- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:8080`
- **Banco de Dados:** `localhost:5432`

#### **4. Parar Todos os Serviços**
```bash
# Parar containers (mantém dados)
docker-compose stop

# Parar e remover containers (mantém dados)
docker-compose down

# Parar e remover TUDO (incluindo volumes)
docker-compose down -v
```

---

### **Opção 3: Backend Docker + Frontend Local**

Útil quando você só precisa alterar o frontend.

```bash
# 1. Subir backend e banco
docker-compose up -d db backend

# 2. Rodar frontend localmente
cd frontend
npm run dev
```

---

## 🔧 Comandos Úteis

### **Docker**
```bash
# Rebuild apenas um serviço
docker-compose build backend
docker-compose restart backend

# Ver logs de um serviço específico
docker-compose logs -f backend

# Entrar no container do banco
docker exec -it atendimento-postgres-db psql -U sysadminatend -d atendimento_db

# Limpar tudo e recomeçar
docker-compose down -v
docker volume prune -f
docker-compose up -d --build
```

### **Backend**
```bash
# Compilar sem rodar testes
mvn clean install -DskipTests

# Rodar testes
mvn test

# Gerar JAR para produção
mvn clean package -DskipTests

# Rodar com profile específico
mvn spring-boot:run -Dspring-boot.run.profiles=docker
```

### **Frontend**
```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 🗄️ Banco de Dados

### **Credenciais**
- **Host:** `localhost` (local) ou `db` (Docker)
- **Porta:** `5432`
- **Database:** `atendimento_db`
- **Usuário:** `sysadminatend`
- **Senha:** `+Y[p0kU*Z4jj`

### **Conectar via psql**
```bash
# Se PostgreSQL instalado localmente
psql -h localhost -U sysadminatend -d atendimento_db

# Via Docker
docker exec -it atendimento-postgres-db psql -U sysadminatend -d atendimento_db
```

### **Comandos SQL Úteis**
```sql
-- Listar bancos de dados
\l

-- Listar tabelas
\dt

-- Ver estrutura de uma tabela
\d nome_da_tabela

-- Sair
\q
```

---

## 📁 Estrutura do Projeto

```
sistema-atendimento/
├── backend/                    # Spring Boot API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/          # Código Java
│   │   │   └── resources/
│   │   │       ├── application.yml        # Config local
│   │   │       └── application-docker.yml # Config Docker
│   │   └── test/              # Testes
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── pages/            # Páginas
│   │   └── App.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
└── docker-compose.yml         # Orquestração Docker
```

---

## 🐛 Troubleshooting

### **Backend não conecta ao banco**

**Erro:** `java.net.UnknownHostException: db`

**Solução:**
```bash
# Certifique-se que está usando o profile correto
# Local: application.yml (url: localhost:5432)
# Docker: application-docker.yml (url: db:5432)

# Verificar se o banco está rodando
docker-compose ps
```

### **Porta já em uso**

**Erro:** `Bind for 0.0.0.0:8080 failed: port is already allocated`

**Solução:**
```bash
# Ver o que está usando a porta
# Windows
netstat -ano | findstr :8080

# Linux/Mac
lsof -i :8080

# Matar processo ou mudar porta no docker-compose.yml
```

### **Dependências desatualizadas**

```bash
# Backend
cd backend
mvn clean install -U

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### **Banco de dados corrompido**

```bash
# Resetar volumes do Docker
docker-compose down -v
docker volume prune -f
docker-compose up -d --build
```

### **Frontend não carrega dados**

1. Verificar se backend está rodando: `http://localhost:8080/api/funcionarios`
2. Verificar CORS no backend
3. Verificar console do navegador (F12)
4. Verificar variável de ambiente `REACT_APP_API_URL`

---

## 🔐 Segurança

⚠️ **IMPORTANTE:** As credenciais neste README são para **desenvolvimento local apenas**.

Para **produção**, use:
- Variáveis de ambiente
- Secrets do Docker
- Vault ou AWS Secrets Manager
- Nunca commite senhas no Git

---

## 📚 Tecnologias Utilizadas

### **Backend**
- Spring Boot 3.5.6
- Java 21
- PostgreSQL 16
- Hibernate/JPA
- Maven

### **Frontend**
- React 18
- Vite
- Bootstrap 5
- React Router DOM

### **DevOps**
- Docker
- Docker Compose
- Nginx

---

## 📝 Scripts NPM Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run preview      # Preview do build
npm run lint         # Verificar código
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

**Douglas Jr**
- GitHub: [@djrx](https://github.com/djrx)

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique a seção **Troubleshooting**
2. Veja as **issues** do GitHub
3. Abra uma nova issue com detalhes do erro

---

**Versão:** 1.0.0  
**Última atualização:** 18/11/2025