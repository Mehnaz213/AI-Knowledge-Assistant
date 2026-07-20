from google import genai
from google.genai import types

# Load environment variables
from dotenv import load_dotenv

# Import os module
import os

# Read the .env file
load_dotenv()

# Read OpenRouter model name
model = os.getenv("MODEL_NAME")

client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)

# Generate AI Response
def generate_response(
    system_prompt: str,
    user_prompt: str
):
    """
    Sends a prompt to the LLM
    and returns the generated response.
    """

    response = client.models.generate_content(
       model=model,
       contents=f"""
    SYSTEM:

    {system_prompt}

    USER:

    {user_prompt}
    """,
        config=types.GenerateContentConfig(
          temperature=0
        )
    )
    return response.text.strip()