from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)

MODEL = os.getenv("MODEL_NAME")


def rewrite_query(question: str, history: list):

    if len(history) == 0:
        return question

    history_text = ""

    for msg in history:
        history_text += f"{msg['role']}: {msg['content']}\n"

    prompt = f"""
    You rewrite follow-up questions.

    Your job is ONLY to rewrite the user's latest question
    into a standalone question.

    Do not answer.

    Only return the rewritten question.

    Conversation History:

    {history_text}

    Latest Question:

    {question}

    Return ONLY the rewritten standalone question.
    """
    response = client.models.generate_content(
       model=MODEL,
       contents=prompt,
       config=types.GenerateContentConfig(
        temperature=0
       )
    )

    return response.text.strip()