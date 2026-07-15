# Import the PdfReader class
from pypdf import PdfReader
# Import the text splitter from LangChain
from langchain_text_splitters import RecursiveCharacterTextSplitter
# Import the Sentence Transformer class
from sentence_transformers import SentenceTransformer
# Import the ChromaDB client
import chromadb
# Import the os module for working with files and folders
import os
import json
from chatbot.paths import DATA_FOLDER
from chatbot.paths import VECTOR_DB_PATH

#document loader and reader for the PDF file
# Folder containing all PDF documents
pdf_folder = DATA_FOLDER
# Get all PDF files from the folder
pdf_files = [
    file
    for file in os.listdir(pdf_folder)
    if file.endswith(".pdf")
]

#Chunking
# Store chunks from all PDF documents
all_chunks = []
# Store metadata for all chunks
all_metadata = []
document_metadata = []
# Number of characters in each chunk
chunk_size = 500
# Number of overlapping characters between consecutive chunks
chunk_overlap = 100
# Create a text splitter object
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=chunk_size,
    chunk_overlap=chunk_overlap
)

# Read every PDF file
for pdf_file in pdf_files:
    # Create the complete file path
    pdf_path = os.path.join(pdf_folder, pdf_file)
    # Display the PDF currently being processed
    print(f"\n========== Reading: {pdf_file} ==========\n")
    # Create a PdfReader object
    reader = PdfReader(pdf_path)
    # Get all pages from the current PDF
    pages = reader.pages

    #Extracting text
    # Store the text of the current PDF
    pdf_text = ""
    # Read every page in the current PDF
    for page in pages:
        # Extract text from the page
        text = page.extract_text()
        # Add the page text to the current PDF text
        pdf_text += text + "\n"
    # Split the current PDF into chunks
    pdf_chunks = text_splitter.split_text(pdf_text)
    # Add the chunks to the master list
    all_chunks.extend(pdf_chunks)
    # Create metadata for every chunk of this PDF
    pdf_metadata = [
      {"source": pdf_file}
      for _ in pdf_chunks
    ]
    # Add the metadata to the master list
    all_metadata.extend(pdf_metadata)
    # Display the number of chunks created from this PDF
    print(f"{pdf_file}: {len(pdf_chunks)} chunks created")
    file_size = round(
      os.path.getsize(pdf_path) / (1024 * 1024),
      2
    )

    document_metadata.append(
      {
        "name": pdf_file,
        "status": "Indexed",
        "chunks": len(pdf_chunks),
        "size": file_size
      }
    )
# Display the complete document
#print(document_text)

# Number of characters in each chunk
#chunk_size = 200
# Number of overlapping characters between consecutive chunks
#chunk_overlap = 50
# Store all chunks
#chunks = []
# Create chunks from the complete document
#for i in range(0, len(document_text), chunk_size):
    # Create one chunk from the document using string slicing
    #chunk = document_text[i : i + chunk_size]
    # Add the current chunk to the list of chunks
    #chunks.append(chunk)
# Display all the chunks
#print(chunks)
# Create a text splitter object

# Display the total number of chunks created
print(f"\nTotal Chunks Created: {len(all_chunks)}")
# Display each chunk separately
for chunk_number, chunk in enumerate(all_chunks, start=1):
    # Display the chunk number
    print(f"\n========== Chunk {chunk_number} ==========\n")
    # Display the chunk
    print(chunk)

# Load the sentence transformer model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
# Convert all chunks into embedding vectors
embeddings = embedding_model.encode(all_chunks)
# Display the number of embedding vectors
print(f"\nTotal Embeddings Created: {len(embeddings)}")
# Display the dimension of one embedding vector
print(f"Embedding Dimension: {len(embeddings[0])}")
# Display the first embedding vector
#print(embeddings[0])

# Create a ChromaDB client
client = chromadb.PersistentClient(path=VECTOR_DB_PATH)
# Delete the existing collection if it already exists
try:
    client.delete_collection(name="employee_handbook")
    print("Existing collection deleted.")
except:
    pass
# Create a new collection
collection = client.get_or_create_collection(
    name="employee_handbook"
)
# Store all chunks, embeddings, and metadata in ChromaDB
collection.add(
    # Create a unique ID for every chunk
    ids=[str(i) for i in range(len(all_chunks))],
    # Store all document chunks
    documents=all_chunks,
    # Store the embedding vectors
    embeddings=embeddings.tolist(),
    # Store the metadata for every chunk
    metadatas=all_metadata
)
# Display a success message
print("\nEmbeddings successfully stored in ChromaDB!")
metadata_file = os.path.join(
    DATA_FOLDER,
    "document_metadata.json"
)

with open(metadata_file, "w") as file:

    json.dump(
        document_metadata,
        file,
        indent=4
    )

print("Document metadata saved successfully.")