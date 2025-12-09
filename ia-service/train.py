import os
import psycopg2
import pandas as pd
import joblib
from sklearn.linear_model import LinearRegression

def carregar_dados_reais():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        dbname=os.getenv("DB_NAME", "atendimento_db"),
        user=os.getenv("DB_USER", "sysadminatend"),
        password=os.getenv("DB_PASSWORD", "")
    )

    query = """
        SELECT
          data_hora_inicio_atendimento,
          data_hora_fim_atendimento,
          tipo_servico_id
        FROM fichas
        WHERE status = 'FINALIZADO'
          AND data_hora_inicio_atendimento IS NOT NULL
          AND data_hora_fim_atendimento IS NOT NULL;
    """

    df = pd.read_sql_query(query, conn)
    conn.close()

    if df.empty:
        raise RuntimeError("Não há dados suficientes no banco para treinar o modelo.")

    # calcula tempo de atendimento em minutos
    df["data_hora_inicio_atendimento"] = pd.to_datetime(df["data_hora_inicio_atendimento"])
    df["data_hora_fim_atendimento"] = pd.to_datetime(df["data_hora_fim_atendimento"])
    df["tempo_min"] = (df["data_hora_fim_atendimento"] - df["data_hora_inicio_atendimento"]).dt.total_seconds() / 60.0
    df["tipo_codigo"] = df["tipo_servico_id"].astype("category").cat.codes

    X = df[["tipo_codigo"]]     
    y = df["tempo_min"]         

    return X, y

def treinar_modelo():
    X, y = carregar_dados_reais()

    modelo = LinearRegression()
    modelo.fit(X, y)

    joblib.dump(modelo, "model.pkl")
    print("Modelo treinado e salvo com dados REAIS!")

if __name__ == "__main__":
    treinar_modelo()
