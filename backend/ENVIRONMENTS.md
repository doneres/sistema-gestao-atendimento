# Guia de Execução de Ambientes

Este documento explica como preparar e executar o backend em dois cenários:

1. **Desenvolvimento local**: API rodando diretamente na máquina host e somente o banco em container (mais rápido para depurar).
2. **Produção/Docker**: API e banco rodando dentro de containers, usando o profile `docker`.

---

## 1. Ambiente de Desenvolvimento Local

Neste modo, você roda apenas o PostgreSQL em um container e executa a aplicação com o Maven na máquina host. O arquivo `src/main/resources/application.properties` já aponta para `localhost:5432`, então nenhuma variável extra é necessária.

### Passo a passo

1. **Subir o banco de dados**
   ```powershell
   docker run --name atendimento-db -p 5432:5432 \
     -e POSTGRES_DB=atendimento_db \
     -e POSTGRES_USER=sysadminatend \
     -e POSTGRES_PASSWORD="+Y[p0kU*Z4jj" \
     -d postgres:15
   ```
   - Garanta que a porta 5432 está livre antes de executar o comando.
   - Se já existir um container com esse nome, remova ou reuse com `docker start atendimento-db`.

2. **Instalar dependências e rodar a API**
   ```powershell
   ./mvnw spring-boot:run
   ```
   - A API subirá em `http://localhost:8080`.
   - Logs exibem queries SQL porque o profile padrão é o de desenvolvimento.

3. **Parar o ambiente**
   ```powershell
   docker stop atendimento-db
   ```

---

## 2. Ambiente de Produção (Docker)

Neste modo, tanto o backend quanto o banco rodam em containers e o profile `docker` (`application-docker.properties`) é utilizado. As variáveis já apontam para o host `db` e portas expostas para acesso externo.

### Passo a passo

1. **Gerar o artefato** (opcional se for usar apenas o Dockerfile)
   ```powershell
   ./mvnw clean package -DskipTests
   ```

2. **Construir a imagem da API**
   ```powershell
   docker build -t atendimento-backend .
   ```

3. **Criar uma rede (caso ainda não exista)**
   ```powershell
   docker network create atendimento-net
   ```

4. **Subir o banco**
   ```powershell
   docker run --name atendimento-db-prod --network atendimento-net \
     -e POSTGRES_DB=atendimento_db \
     -e POSTGRES_USER=sysadminatend \
     -e POSTGRES_PASSWORD="+Y[p0kU*Z4jj" \
     -d postgres:15
   ```

5. **Subir o backend em container**
   ```powershell
   docker run --name atendimento-api --network atendimento-net \
     -p 8080:8080 \
     -e SPRING_PROFILES_ACTIVE=docker \
     atendimento-backend
   ```
   - O backend usará `application-docker.properties` e acessará o banco via host `db` definido na imagem.

6. **Parar e remover containers quando terminar**
   ```powershell
   docker stop atendimento-api atendimento-db-prod
   docker rm atendimento-api atendimento-db-prod
   ```

---

## Dicas Extras

- Ajuste as origens CORS em `application.properties` ou `application-docker.properties` conforme o frontend utilizado.
- Para logs mais verbosos em produção, altere os níveis em `logging.level.*`.
- Considere criar um `docker-compose.yml` no futuro para automatizar os passos de rede + containers.