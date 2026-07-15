import re

def clean_context(text: str):

    text = text.replace("|", " ")

    text = text.replace("-----", "")

    text = text.replace("•", "-")

    text = re.sub(r"\n{3,}", "\n\n", text)

    text = re.sub(r"\s{2,}", " ", text)

    return text.strip()