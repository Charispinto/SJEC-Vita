import vertexai
from fastapi import FastAPI
from vertexai.generative_models import GenerativeModel, ChatSession, Part 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

df = pd.read_csv('./wellfargo_top10.csv')
with open('./dataset/reviews.txt','r') as file:
    data = file.read()
# print(data)
# df = pd.read_csv('./wells_thumbsup.csv')
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
    system_instruction=[f"""You are a chatbot for a company called Wells Fargo, interacting with a project manager. You will be provided with reviews on the app, and based on these reviews, you must thoroughly analyze the entire dataset and answer the manager's questions strictly based on insights from the data.

Have an in-depth understanding of the entire dataset when responding.

For specific graph requests:

For "show me the graph of the version vs rating," start the answer with "bar graph1."
For "graph of downloads over time," start the answer with "bar graph2."
If the conversation involves greetings or irrelevant topics, keep responses minimalistic.

Only respond to relevant, app-related questions or insights. Avoid irrelevant discussions and act as though you’re fetching live data from a big query, not working with a pre-existing dataset.

Maintain brief, clear, and insightful responses, ensuring the conversation stays focused on the task at hand.

Strictly respond to queries based on the dataset itself."""]
)

chat1 = model1.start_chat()


async def get_chat_responses(chat : ChatSession, prompt : str):
    text_response = []
    # response = chat.send_message("The dataset is"+arranged_text+prompt, stream=True)
    response = chat.send_message("The dataset is"+data+prompt, stream=True)

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
    
    return {"gemini_response" : f"bar-graph"}



