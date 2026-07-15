# Import OS module
import os

# Get project root directory
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

# ChromaDB folder
VECTOR_DB_PATH = os.path.join(
    BASE_DIR,
    "vector_db"
)

# PDF folder
DATA_FOLDER = os.path.join(
    BASE_DIR,
    "data"
)

print("Vector DB Path:", VECTOR_DB_PATH)
print("Data Folder:", DATA_FOLDER)