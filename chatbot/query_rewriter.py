from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

MODEL = os.getenv("OPENROUTER_MODEL")


def rewrite_query(question: str, history: list):

    if len(history) == 0:
        return question

    messages = [
        {
            "role": "system",
            "content": """
You rewrite follow-up questions.

Your job is ONLY to rewrite the user's latest question
into a standalone question.

Do not answer.

Only return the rewritten question.

Examples:

History:
What is Kubernetes?

Question:
Who created it?

Output:
Who created Kubernetes?

History:
Explain the leave policy.

Question:
Who is eligible for it?

Output:
Who is eligible for the leave policy?
"""
        }
    ]

    messages.extend(history)

    messages.append(
        {
            "role": "user",
            "content": question
        }
    )

    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        temperature=0
    )

    return response.choices[0].message.content.strip()