#!/usr/bin/env python3
"""
Phase 4A: Production-Ready Retrieval Pipeline

Implements semantic search with:
1. Query embedding generation using sentence-transformers
2. Vector similarity search via Qdrant API
3. Comprehensive error handling
4. Real cosine similarity scoring
"""

import json
import urllib.request
import urllib.error
import sys
import os
from typing import List, Dict, Any, Optional, Union
from dataclasses import dataclass
from enum import Enum

# Lazy import for sentence-transformers to avoid loading if not needed
_embedding_model = None

QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
EMBEDDING_DIM = 384  # all-MiniLM-L6-v2 dimension

# ============================================================================
# Exception Hierarchy
# ============================================================================

class RetrievalError(Exception):
    """Base exception for retrieval errors"""
    pass

class QdrantConnectionError(RetrievalError):
    """Qdrant connection or API error"""
    pass

class EmbeddingError(RetrievalError):
    """Failed to generate embedding"""
    pass

class ValidationError(RetrievalError):
    """Invalid query or parameters"""
    pass

# ============================================================================
# Data Classes
# ============================================================================

@dataclass(frozen=True)
class SearchConfig:
    """Configuration for search strategy"""
    collections: List[str]
    encoding_types: List[str]
    limit: int
    score_threshold: float

@dataclass(frozen=True)
class SearchResult:
    """Single search result with metadata"""
    rule_id: str
    encoding_type: str
    category: str
    severity: str
    document: str
    score: float
    payload: Dict[str, Any]

class QueryIntent(Enum):
    """Classification of user query intent"""
    CHECK = "check"
    FIX = "fix"
    EXPLAIN = "explain"
    EXAMPLE = "example"
    VIOLATION = "violation"

# ============================================================================
# Embedding Generation
# ============================================================================

def get_embedding_model():
    """Get cached embedding model (lazy loading)"""
    global _embedding_model
    if _embedding_model is None:
        try:
            from sentence_transformers import SentenceTransformer
            _embedding_model = SentenceTransformer(EMBEDDING_MODEL)
        except ImportError as e:
            raise EmbeddingError(
                f"sentence-transformers not installed. Run: pip install sentence-transformers"
            ) from e
        except Exception as e:
            raise EmbeddingError(f"Failed to load embedding model: {e}") from e
    return _embedding_model

def generate_query_embedding(query: str) -> List[float]:
    """
    Generate embedding vector for user query.

    Args:
        query: User's natural language query

    Returns:
        384-dimensional embedding vector

    Raises:
        EmbeddingError: If embedding generation fails
    """
    if not query or not query.strip():
        raise ValidationError("Query cannot be empty")

    try:
        model = get_embedding_model()
        embedding = model.encode(query, convert_to_numpy=True)
        return embedding.tolist()
    except ValidationError:
        raise
    except Exception as e:
        raise EmbeddingError(f"Failed to generate embedding: {e}") from e

# ============================================================================
# Semantic Search
# ============================================================================

def search_collection_semantic(
    collection_name: str,
    query_embedding: List[float],
    limit: int = 10,
    score_threshold: float = 0.7
) -> List[SearchResult]:
    """
    Search collection using vector similarity.

    Args:
        collection_name: Name of Qdrant collection
        query_embedding: Query vector (384 dimensions)
        limit: Maximum results to return
        score_threshold: Minimum cosine similarity score

    Returns:
        List of search results sorted by score

    Raises:
        QdrantConnectionError: If Qdrant API fails
        ValidationError: If parameters are invalid
    """
    if not collection_name:
        raise ValidationError("Collection name cannot be empty")

    if not query_embedding or len(query_embedding) != EMBEDDING_DIM:
        raise ValidationError(f"Query embedding must have {EMBEDDING_DIM} dimensions")

    if limit <= 0:
        raise ValidationError("Limit must be positive")

    if not 0 <= score_threshold <= 1:
        raise ValidationError("Score threshold must be between 0 and 1")

    # Construct Qdrant search request
    search_req_data = {
        "vector": {
            "name": "fast-all-minilm-l6-v2",
            "vector": query_embedding
        },
        "limit": limit,
        "score_threshold": score_threshold,
        "with_payload": True,
        "with_vector": False
    }

    url = f"{QDRANT_URL}/collections/{collection_name}/points/search"

    try:
        req = urllib.request.Request(
            url,
            method='POST',
            data=json.dumps(search_req_data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )

        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read())
            points = data.get('result', [])

            results = []
            for point in points:
                payload = point.get('payload', {})
                score = point.get('score', 0.0)

                results.append(SearchResult(
                    rule_id=payload.get('rule_id', ''),
                    encoding_type=payload.get('encoding_type', ''),
                    category=payload.get('category', ''),
                    severity=payload.get('severity', ''),
                    document=payload.get('document', ''),
                    score=score,
                    payload=payload
                ))

            return results

    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8') if e.fp else str(e)
        raise QdrantConnectionError(
            f"Qdrant HTTP error {e.code} for collection '{collection_name}': {error_body}"
        ) from e
    except urllib.error.URLError as e:
        raise QdrantConnectionError(
            f"Cannot connect to Qdrant at {QDRANT_URL}: {e.reason}"
        ) from e
    except json.JSONDecodeError as e:
        raise QdrantConnectionError(f"Invalid JSON response from Qdrant: {e}") from e
    except Exception as e:
        raise QdrantConnectionError(f"Unexpected error during search: {e}") from e

def search_multiple_collections(
    config: SearchConfig,
    query_embedding: List[float]
) -> List[SearchResult]:
    """
    Search multiple collections and combine results.

    Args:
        config: Search configuration
        query_embedding: Query vector

    Returns:
        Combined and sorted results from all collections

    Raises:
        QdrantConnectionError: If any collection search fails
    """
    all_results = []
    errors = []

    for collection in config.collections:
        try:
            results = search_collection_semantic(
                collection,
                query_embedding,
                config.limit,
                config.score_threshold
            )

            # Filter by encoding type
            filtered = [r for r in results if r.encoding_type in config.encoding_types]
            all_results.extend(filtered)

        except QdrantConnectionError as e:
            # Collect errors but continue with other collections
            errors.append(f"{collection}: {str(e)}")
            continue

    if not all_results and errors:
        raise QdrantConnectionError(
            f"All collection searches failed:\n" + "\n".join(errors)
        )

    # Sort by score descending and limit
    all_results.sort(key=lambda r: r.score, reverse=True)
    return all_results[:config.limit]

# ============================================================================
# Query Understanding
# ============================================================================

def classify_query_intent(query: str) -> QueryIntent:
    """
    Classify the intent of a user query.

    Args:
        query: User's natural language query

    Returns:
        Classified intent
    """
    if not query:
        return QueryIntent.EXPLAIN

    q = query.lower()

    # Check for permission/validation queries
    if any(p in q for p in ["can i", "is it ok", "allowed", "should i", "may i"]):
        return QueryIntent.CHECK

    # Check for fix/repair queries
    if any(p in q for p in ["how to fix", "fix", "repair", "resolve", "solve"]):
        return QueryIntent.FIX

    # Check for example queries
    if any(p in q for p in ["show me", "example", "demonstrate", "sample"]):
        return QueryIntent.EXAMPLE

    # Check for explanation queries
    if any(p in q for p in ["what is", "what are", "explain", "why", "describe"]):
        return QueryIntent.EXPLAIN

    # Default to explanation
    return QueryIntent.EXPLAIN

def determine_strategy(intent: QueryIntent) -> SearchConfig:
    """
    Map query intent to search configuration.

    Args:
        intent: Classified query intent

    Returns:
        Search configuration optimized for intent
    """
    all_collections = [
        "constitutional_rules",
        "functional_programming_rules",
        "syntax_rules",
        "formatting_rules",
        "typescript_rules"
    ]

    if intent == QueryIntent.CHECK:
        # For permission checks, prioritize principles and antipatterns
        return SearchConfig(
            collections=all_collections,
            encoding_types=["principle", "antipattern"],
            limit=10,
            score_threshold=0.65
        )

    elif intent == QueryIntent.FIX:
        # For fixes, prioritize patterns and examples
        return SearchConfig(
            collections=all_collections,
            encoding_types=["pattern", "example"],
            limit=10,
            score_threshold=0.70
        )

    elif intent == QueryIntent.EXPLAIN:
        # For explanations, include principles and examples
        return SearchConfig(
            collections=all_collections,
            encoding_types=["principle", "example"],
            limit=10,
            score_threshold=0.65
        )

    elif intent == QueryIntent.EXAMPLE:
        # For examples, prioritize examples and patterns
        return SearchConfig(
            collections=all_collections,
            encoding_types=["example", "pattern"],
            limit=10,
            score_threshold=0.70
        )

    else:
        # Default strategy
        return SearchConfig(
            collections=all_collections,
            encoding_types=["principle", "example"],
            limit=10,
            score_threshold=0.65
        )

# ============================================================================
# Result Formatting
# ============================================================================

def format_result(results: List[SearchResult], intent: QueryIntent) -> str:
    """
    Format search results for display.

    Args:
        results: Search results to format
        intent: Query intent for context

    Returns:
        Formatted string for display
    """
    if not results:
        return "No relevant rules found. Try rephrasing your query or lowering the specificity."

    lines = []

    # Add header with primary rule
    primary = results[0]
    lines.append(f"PRIMARY RULE: {primary.rule_id}")
    lines.append(f"Category: {primary.category}")
    lines.append(f"Severity: {primary.severity}")
    lines.append(f"Relevance: {primary.score:.2f}")
    lines.append("")

    # Add intent-specific guidance
    if intent == QueryIntent.CHECK:
        if primary.severity == "blocking":
            lines.append("❌ NO - This violates a blocking rule")
        elif primary.severity == "warning":
            lines.append("⚠️  NOT RECOMMENDED - This triggers a warning")
        else:
            lines.append("✓ ALLOWED - But consider the guidance below")
        lines.append("")

    # Add top results
    lines.append("RELEVANT RULES:")
    lines.append("")

    for i, result in enumerate(results[:5], 1):
        lines.append(f"{i}. [{result.encoding_type.upper()}] {result.rule_id}")
        lines.append(f"   Score: {result.score:.2f} | Severity: {result.severity}")
        lines.append("")

        # Truncate long documents
        doc = result.document
        if len(doc) > 500:
            doc = doc[:497] + "..."
        lines.append(f"   {doc}")
        lines.append("")
        lines.append("-" * 70)
        lines.append("")

    return "\n".join(lines)

# ============================================================================
# Main Retrieval Pipeline
# ============================================================================

def retrieve_rules(query: str, verbose: bool = False) -> str:
    """
    Main retrieval pipeline with semantic search.

    Args:
        query: User's natural language query
        verbose: Print debug information

    Returns:
        Formatted string with relevant rules

    Raises:
        RetrievalError: If retrieval fails
    """
    try:
        # Validate query
        if not query or not query.strip():
            raise ValidationError("Query cannot be empty")

        query = query.strip()

        if verbose:
            print(f"Query: {query}")

        # Classify intent
        intent = classify_query_intent(query)
        if verbose:
            print(f"Intent: {intent.value}")

        # Generate embedding
        try:
            embedding = generate_query_embedding(query)
            if verbose:
                print(f"Generated embedding: {len(embedding)} dimensions")
        except EmbeddingError as e:
            raise EmbeddingError(f"Failed to generate query embedding: {e}") from e

        # Determine search strategy
        config = determine_strategy(intent)
        if verbose:
            print(f"Searching {len(config.collections)} collections...")
            print(f"Encoding types: {config.encoding_types}")
            print(f"Score threshold: {config.score_threshold}")

        # Execute search
        try:
            results = search_multiple_collections(config, embedding)
            if verbose:
                print(f"Found {len(results)} results")
        except QdrantConnectionError as e:
            raise QdrantConnectionError(f"Search failed: {e}") from e

        # Format and return
        return format_result(results, intent)

    except ValidationError as e:
        return f"Validation Error: {e}"
    except EmbeddingError as e:
        return f"Embedding Error: {e}\n\nPlease ensure sentence-transformers is installed."
    except QdrantConnectionError as e:
        return f"Qdrant Error: {e}\n\nPlease ensure Qdrant is running at {QDRANT_URL}"
    except Exception as e:
        return f"Unexpected Error: {e}"

# ============================================================================
# CLI Interface
# ============================================================================

def main():
    """Command-line interface"""
    if len(sys.argv) < 2:
        print("Usage: python3 retrieval_pipeline.py <query> [--verbose]")
        print("\nExamples:")
        print('  python3 retrieval_pipeline.py "Can I use arrow functions?"')
        print('  python3 retrieval_pipeline.py "How do I handle errors?" --verbose')
        print('  python3 retrieval_pipeline.py "What is a pure function?"')
        sys.exit(1)

    # Parse arguments
    verbose = "--verbose" in sys.argv or "-v" in sys.argv
    query_parts = [arg for arg in sys.argv[1:] if arg not in ["--verbose", "-v"]]
    query = " ".join(query_parts)

    # Execute retrieval
    result = retrieve_rules(query, verbose=verbose)

    # Display result
    print("\n" + "=" * 70)
    print("RETRIEVAL RESULT")
    print("=" * 70)
    print(result)

if __name__ == "__main__":
    main()
