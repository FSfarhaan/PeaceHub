from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, mail, daily, questions, negative_message as negative

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(mail.router)
app.include_router(daily.router)
app.include_router(questions.router)
app.include_router(negative.router)
