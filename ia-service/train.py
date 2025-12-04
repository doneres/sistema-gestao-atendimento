# ia-service/train.py
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from joblib import dump

def gerar_dados_sinteticos(n=1000):
    rng = np.random.default_rng(42)

    fila_atual = rng.integers(0, 30, size=n)
    atendentes_ativos = rng.integers(1, 6, size=n)
    tipo_atendimento = rng.integers(0, 5, size=n)  # 5 tipos

    tempo_espera = (
        fila_atual * rng.uniform(1.5, 3.0, size=n) / np.clip(atendentes_ativos, 1, None)
        + tipo_atendimento * 2
        + rng.normal(0, 3, size=n)
    )

    df = pd.DataFrame({
        "fila_atual": fila_atual,
        "atendentes_ativos": atendentes_ativos,
        "tipo_atendimento": tipo_atendimento,
        "tempo_espera": tempo_espera
    })

    return df

def treinar_modelo():
    df = gerar_dados_sinteticos(2000)

    X = df[["fila_atual", "atendentes_ativos", "tipo_atendimento"]]
    y = df["tempo_espera"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    modelo = RandomForestRegressor(
        n_estimators=100,
        random_state=42
    )

    modelo.fit(X_train, y_train)

    score = modelo.score(X_test, y_test)
    print(f"Acurácia (R²) no teste: {score:.3f}")

    dump(modelo, "model.pkl")
    print("Modelo salvo em model.pkl")

if __name__ == "__main__":
    treinar_modelo()
