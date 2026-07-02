# Import the CrossEncoder class
from sentence_transformers import CrossEncoder
# Load the Cross Encoder model for reranking retrieved chunks
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
# Rerank the retrieved chunks based on their relevance to the user query
def rerank_chunks(query, chunks):
    # Pair the user query with every retrieved chunk
    sentence_pairs = [
    [query, chunk]
    for chunk in chunks
    ]
    # Predict the relevance score for every question-chunk pair
    scores = reranker.predict(sentence_pairs)
    # Combine every retrieved chunk with its corresponding relevance score
    chunk_scores = list(zip(chunks, scores))
    # Sort the chunks in descending order of relevance score
    chunk_scores.sort(
      key=lambda item: item[1],
      reverse=True
    )
    # Select only the top 3 highest-ranked chunks
    top_chunks = [
      chunk
      for chunk, score in chunk_scores[:3]
    ]
    # Return the top-ranked chunks
    return top_chunks
