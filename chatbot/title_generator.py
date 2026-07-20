from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

MODEL = os.getenv("MODEL_NAME")


def generate_title(question: str):

    response = client.models.generate_content(
       model=MODEL,
       contents=f"""
    Generate a short conversation title.

    Rules:

    - Maximum 5 words.
    - Use Title Case.
    - No punctuation.
    - No quotation marks.
    - Do not use verbs like Explain, Tell, Describe, What Is, How To.
    - Return only the main topic of the conversation.

    Examples:

    Question:
    What is the leave policy?

    Output:
    Leave Policy

    Question:
    Explain the dress code.

    Output:
    Dress Code

    Question:
    Tell me about reimbursement rules.

    Output:
    Expense Reimbursement

    Question:
    How does attendance tracking work?

    Output:
    Attendance Tracking

    Question:
    What are the IT security guidelines?

    Output:
    IT Security Guidelines
    Question:
    {question}
    """,
       config=types.GenerateContentConfig(
         temperature=0
       )
    )
    return response.text.strip()