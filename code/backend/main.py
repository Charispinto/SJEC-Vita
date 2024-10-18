import vertexai
from fastapi import FastAPI
from vertexai.generative_models import GenerativeModel, ChatSession, Part 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

# df = pd.read_csv('./wellfargo_top10.csv')
df = pd.read_csv('./wells_thumbsup.csv')
arranged_text = ""
for index, row in df.iterrows():
  arranged_text += f"Review Content: {row['content']}\n"
  arranged_text += f"Score: {row['score']}\n"
  arranged_text += f"Thumbs Up Count: {row['thumbsUpCount']}\n"
  arranged_text += f"Review Created Version: {row['reviewCreatedVersion']}\n"
  arranged_text += "---\n"


class Message(BaseModel):
    text : str

app = FastAPI()


app.add_middleware(
    CORSMiddleware, 
    allow_headers = ["*"], 
    allow_credentials = True, 
    allow_origins = ["*"], 
    allow_methods = ["*"]
)


model1 = GenerativeModel(
    model_name='gemini-1.5-pro-001',
    system_instruction=[f'You are a chatbot for a company called Wells Fargo you will be speaking to a manager your will be provided with some of the reviews on the product based on these reviews you are supposed to answer the manager with thing like is the product feature to be introduced by the team going to be working out for the customers.  You have to go through the dataset thoroughly and analyse it to have good understanding over the dataset. Respond to the questions only when asked. ']
)

chat1 = model1.start_chat()


async def get_chat_responses(chat : ChatSession, prompt : str):
    text_response = []
    response = chat.send_message("The dataset is"+arranged_text+prompt, stream=True)
    for chunk in response:
        text_response.append(chunk.text)
    
    return "".join(text_response)


@app.get('/')
def say_hi():
    return {"hello" : "samwin"}




@app.post('/chat')
async def gemini_chat(prompt : Message):
    global model1, chat1
    print(prompt.text)
    response = await get_chat_responses(chat=chat1, prompt=prompt.text)


    return {"gemini_response" : f"{response}"}



@app.post('/bar_chart')
async def bar_chart(prompt : Message):
    
    return {"gemini_response" : f"bar graph"}

