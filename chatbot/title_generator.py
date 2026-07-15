from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

MODEL = os.getenv("OPENROUTER_MODEL")


def generate_title(question: str):

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": """
Generate a short conversation title.

Rules:

- Maximum 5 words.
- No punctuation.
- No quotation marks.
- Title Case.
- Return only the title.

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
"""
            },
            {
                "role": "user",
                "content": question
            }
        ]
    )

    return response.choices[0].message.content.strip()