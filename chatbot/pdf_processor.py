# Load PDF files
from langchain_community.document_loaders import PyPDFLoader
# Split long text into chunks
from langchain_text_splitters import RecursiveCharacterTextSplitter
# Import OS module
import os
# Import the Sentence Transformer class
from sentence_transformers import SentenceTransformer
# Import the ChromaDB client
import chromadb
# Import the uuid module for generating unique IDs
import uuid
from chatbot.paths import VECTOR_DB_PATH

# Create ChromaDB vector database
def create_vector_store(chunks):
    # Load the same embedding model used everywhere else
    embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
    # Convert every chunk into an embedding vector
    embeddings = embedding_model.encode(
        [chunk.page_content for chunk in chunks]
    )
    # Connect to the existing ChromaDB database
    client = chromadb.PersistentClient(
        path=VECTOR_DB_PATH
    )
    # Open the existing collection
    collection = client.get_or_create_collection(
        name="employee_handbook"
    )
    # Create a list to store metadata for all chunks
    metadatas = []
    # Process every chunk
    for chunk in chunks:
        # Make a copy of the chunk's metadata
        metadata = chunk.metadata.copy()
        # Store only the PDF filename
        metadata["source"] = os.path.basename(
            metadata["source"]
        )
        # Add metadata to the list
        metadatas.append(metadata)

    # Store every chunk inside ChromaDB
    collection.add(
    # Create a unique ID for every chunk
        ids=[
        str(uuid.uuid4())
        for chunk in chunks
        ],
        # Store the text of every chunk
        documents=[
           chunk.page_content
           for chunk in chunks
        ],
        # Store the embedding vectors
        embeddings=embeddings.tolist(),
        # Store the metadata of every chunk
        metadatas=metadatas
    )
    return collection

# Complete PDF processing pipeline
def ingest_pdf(pdf_path):
    # Load and split the PDF into chunks
    chunks = process_pdf(pdf_path)
    # Create ChromaDB vector store
    vector_store = create_vector_store(chunks)
    # Return the vector store
    return vector_store

# Load PDF and return LangChain documents
def load_pdf(pdf_path):
    # Create a PDF loader
    loader = PyPDFLoader(pdf_path)
    # Read the PDF
    documents = loader.load()
    return documents

# Split documents into smaller chunks
def split_documents(documents):
    # Create a text splitter
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    # Split documents into chunks
    chunks = text_splitter.split_documents(documents)
    # Return chunks
    return chunks

# Process PDF and return chunks
def process_pdf(pdf_path):
    # Load the PDF
    documents = load_pdf(pdf_path)
    # Split the documents into chunks
    chunks = split_documents(documents)
    # Return chunks
    return chunks