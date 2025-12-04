# ia-service/app.py
from fastapi import FastAPI
from pydantic import BaseModel
from joblib import load
import os

app = FastAPI(title="Atendimento IA Service")

MODEL_PATH = "model.pkl"
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
    if os.path.exists(MODEL_PATH):
        model = load(MODEL_PATH)
        print("✅ Modelo carregado com sucesso.")
    else:
        print("⚠️ model.pkl não encontrado, usando heurística.")

@app.on_event("startup")
def startup_event():
    carregar_modelo()

@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": model is not None}

@app.post("/ia/estimativa-tempo", response_model=EstimativaResponse)
def estimar_tempo(req: EstimativaRequest):
    if model is not None:
        features = [[req.fila_atual, req.atendentes_ativos, req.tipo_atendimento]]
        tempo = float(model.predict(features)[0])
        return EstimativaResponse(
            tempo_estimado_minutos=max(0.0, tempo),
            origem="modelo"
        )

    # fallback simples
    tempo = (req.fila_atual * 3.0) / max(req.atendentes_ativos, 1)
    return EstimativaResponse(
        tempo_estimado_minutos=max(0.0, tempo),
        origem="heuristica"
    )
