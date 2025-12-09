# ia-service/app.py
from fastapi import FastAPI
from pydantic import BaseModel
from joblib import load
import os

app = FastAPI(title="Atendimento IA Service")

# base absoluta da pasta onde está o app.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

model = None


class EstimativaRequest(BaseModel):
    fila_atual: int
    atendentes_ativos: int
    tipo_atendimento: int


class EstimativaResponse(BaseModel):
    tempo_estimado_minutos: float
    origem: str


def carregar_modelo():
    global model
    print("🔎 Procurando modelo em:", MODEL_PATH)

    if os.path.exists(MODEL_PATH):
        try:
            model = load(MODEL_PATH)
            print("✅ Modelo carregado com sucesso a partir de", MODEL_PATH)
        except Exception as e:
            print("⚠️ Erro ao carregar o modelo:", e)
            model = None
    else:
        print("⚠️ Arquivo de modelo NÃO encontrado em:", MODEL_PATH)
        model = None


@app.on_event("startup")
def startup_event():
    carregar_modelo()


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "model_path": MODEL_PATH,
        "model_file_exists": os.path.exists(MODEL_PATH),
    }


@app.post("/ia/estimativa-tempo", response_model=EstimativaResponse)
def estimar_tempo(req: EstimativaRequest):
    """
    Se existir modelo:
      - usa model.predict([[tipo_codigo]]) para obter tempo médio base
      - (a fila/atendentes você já ajusta no backend)

    Se não houver modelo:
      - usa fallback heurístico: fila_atual * 3 min / atendentes
    """
    if model is not None:
        try:
            # modelo é um LinearRegression treinado em cima de "tipo_codigo"
            features = [[req.tipo_atendimento]]
            tempo_base = float(model.predict(features)[0])

            # aqui ainda aplicamos leve ajuste pela fila e atendentes
            tempo = (req.fila_atual * tempo_base) / max(req.atendentes_ativos, 1)

            return EstimativaResponse(
                tempo_estimado_minutos=max(0.0, tempo),
                origem="modelo",
            )
        except Exception as e:
            print("⚠️ Erro ao usar o modelo, caindo para heurística:", e)

    # fallback simples (caso não tenha modelo ou tenha dado erro)
    tempo_fallback = (req.fila_atual * 3.0) / max(req.atendentes_ativos, 1)
    return EstimativaResponse(
        tempo_estimado_minutos=max(0.0, tempo_fallback),
        origem="heuristica",
    )


@app.post("/ia/reload-model")
def reload_model():
    carregar_modelo()
    return {
        "status": "reloaded",
        "model_loaded": model is not None,
        "model_path": MODEL_PATH,
        "model_file_exists": os.path.exists(MODEL_PATH),
    }
