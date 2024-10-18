from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import vertexai

app = FastAPI()

app.get('/')
def say_hi():
    return {'hello' : "there"}


