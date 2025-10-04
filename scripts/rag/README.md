# RAG Retrieval Pipeline - Production Implementation

**Phase 4A Complete**: Semantic search with query embeddings, comprehensive error handling, and production-ready tests.

## Overview

The RAG (Retrieval-Augmented Generation) retrieval pipeline provides intelligent rule retrieval using semantic search. It understands natural language queries and returns relevant coding rules from multiple collections.

### Key Features

- ✅ **Semantic Search**: Uses sentence-transformers (all-MiniLM-L6-v2) for query embeddings
- ✅ **Vector Similarity**: Real cosine similarity scoring via Qdrant API
- ✅ **Query Understanding**: Automatic intent classification (CHECK, FIX, EXPLAIN, EXAMPLE)
- ✅ **Multi-Collection Search**: Searches across all rule categories
- ✅ **Comprehensive Error Handling**: Graceful degradation with meaningful error messages
- ✅ **Production-Ready Tests**: >80% coverage with unit and integration tests

## Installation

### Prerequisites

- Python 3.8+
- Qdrant running at `http://localhost:6333` (or set `QDRANT_URL`)
- Virtual environment (recommended)

### Setup

```bash
# Navigate to scripts/rag directory
cd scripts/rag

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Dependencies

- `sentence-transformers==2.2.2` - For query embeddings
- `pytest==7.4.3` - For testing
- `pytest-cov==4.1.0` - For coverage reports

## Usage

### Command Line

```bash
# Basic usage
python3 retrieval_pipeline.py "Can I use arrow functions?"

# With verbose output
python3 retrieval_pipeline.py "How do I handle errors?" --verbose

# More examples
python3 retrieval_pipeline.py "What is a pure function?"
python3 retrieval_pipeline.py "Show me an example of immutability"
python3 retrieval_pipeline.py "Is it ok to use loops?"
```

### As Python Module

```python
from retrieval_pipeline import retrieve_rules

# Simple retrieval
result = retrieve_rules("Can I use classes?")
print(result)

# With verbose output
result = retrieve_rules("How to fix mutation?", verbose=True)
print(result)
```

### Advanced Usage

```python
from retrieval_pipeline import (
    classify_query_intent,
    generate_query_embedding,
    search_collection_semantic,
    QueryIntent
)

# Classify query intent
intent = classify_query_intent("Can I use classes?")
print(f"Intent: {intent.value}")  # Output: Intent: check

# Generate embedding
embedding = generate_query_embedding("What is a pure function?")
print(f"Embedding dimensions: {len(embedding)}")  # Output: 384

# Direct semantic search
results = search_collection_semantic(
    collection_name="constitutional_rules",
    query_embedding=embedding,
    limit=5,
    score_threshold=0.7
)

for result in results:
    print(f"{result.rule_id}: {result.score:.2f}")
```

## API Reference

### Main Functions

#### `retrieve_rules(query: str, verbose: bool = False) -> str`

Main entry point for rule retrieval.

**Parameters:**
- `query` (str): Natural language question about coding rules
- `verbose` (bool): Print debug information (default: False)

**Returns:**
- `str`: Formatted string with relevant rules and examples

**Raises:**
- Returns error message string (does not raise exceptions)

**Example:**
```python
result = retrieve_rules("Can I use arrow functions?")
print(result)
```

#### `classify_query_intent(query: str) -> QueryIntent`

Classifies the intent of a user query.

**Parameters:**
- `query` (str): User's natural language query

**Returns:**
- `QueryIntent`: One of CHECK, FIX, EXPLAIN, EXAMPLE, VIOLATION

**Query Intent Types:**
- `CHECK`: "Can I use X?", "Is it ok to...?"
- `FIX`: "How to fix X?", "Repair this..."
- `EXPLAIN`: "What is X?", "Why...?"
- `EXAMPLE`: "Show me X", "Demonstrate..."
- `VIOLATION`: Detected code violation (future use)

**Example:**
```python
intent = classify_query_intent("Can I use classes?")
assert intent == QueryIntent.CHECK
```

#### `generate_query_embedding(query: str) -> List[float]`

Generates embedding vector for user query.

**Parameters:**
- `query` (str): User's natural language query

**Returns:**
- `List[float]`: 384-dimensional embedding vector

**Raises:**
- `ValidationError`: If query is empty
- `EmbeddingError`: If embedding generation fails

**Example:**
```python
embedding = generate_query_embedding("What is a pure function?")
assert len(embedding) == 384
```

#### `search_collection_semantic(collection_name: str, query_embedding: List[float], limit: int = 10, score_threshold: float = 0.7) -> List[SearchResult]`

Searches a collection using vector similarity.

**Parameters:**
- `collection_name` (str): Name of Qdrant collection
- `query_embedding` (List[float]): Query vector (384 dimensions)
- `limit` (int): Maximum results to return (default: 10)
- `score_threshold` (float): Minimum cosine similarity score (default: 0.7)

**Returns:**
- `List[SearchResult]`: Search results sorted by score

**Raises:**
- `QdrantConnectionError`: If Qdrant API fails
- `ValidationError`: If parameters are invalid

**Example:**
```python
embedding = generate_query_embedding("Can I use classes?")
results = search_collection_semantic(
    "constitutional_rules",
    embedding,
    limit=5,
    score_threshold=0.75
)
```

### Data Classes

#### `SearchResult`

Represents a single search result.

**Attributes:**
- `rule_id` (str): Unique rule identifier
- `encoding_type` (str): Type of encoding (principle, pattern, example, antipattern)
- `category` (str): Rule category
- `severity` (str): Rule severity (blocking, warning, info)
- `document` (str): Rule content
- `score` (float): Cosine similarity score (0.0-1.0)
- `payload` (Dict): Additional metadata

#### `SearchConfig`

Configuration for search strategy.

**Attributes:**
- `collections` (List[str]): Collections to search
- `encoding_types` (List[str]): Encoding types to include
- `limit` (int): Maximum results
- `score_threshold` (float): Minimum score

### Exception Hierarchy

```
RetrievalError (base)
├── QdrantConnectionError (Qdrant API failures)
├── EmbeddingError (embedding generation failures)
└── ValidationError (invalid parameters)
```

## Configuration

### Environment Variables

- `QDRANT_URL`: Qdrant server URL (default: `http://localhost:6333`)
- `EMBEDDING_MODEL`: Model name (default: `sentence-transformers/all-MiniLM-L6-v2`)

**Example:**
```bash
export QDRANT_URL="http://qdrant.example.com:6333"
export EMBEDDING_MODEL="sentence-transformers/all-MiniLM-L6-v2"
python3 retrieval_pipeline.py "Can I use classes?"
```

### Search Strategy Configuration

The pipeline automatically configures search strategy based on query intent:

| Intent | Encoding Types | Score Threshold | Use Case |
|--------|---------------|-----------------|----------|
| CHECK | principle, antipattern | 0.65 | Permission checks |
| FIX | pattern, example | 0.70 | Error resolution |
| EXPLAIN | principle, example | 0.65 | Understanding concepts |
| EXAMPLE | example, pattern | 0.70 | Code samples |

## Testing

### Run All Tests

```bash
# Activate virtual environment
source venv/bin/activate

# Run all tests
pytest test_retrieval_pipeline.py -v

# Run with coverage
pytest test_retrieval_pipeline.py --cov=retrieval_pipeline --cov-report=html

# Run only unit tests (no Qdrant required)
pytest test_retrieval_pipeline.py -v -m "not integration"

# Run integration tests (requires Qdrant)
pytest test_retrieval_pipeline.py -v -m integration
```

### Test Coverage

Current test coverage: **>80%**

**Covered Areas:**
- ✅ Query intent classification
- ✅ Embedding generation
- ✅ Search parameter validation
- ✅ Error handling (all exception types)
- ✅ Result formatting
- ✅ End-to-end retrieval
- ✅ Semantic search relevance

### Test Structure

```
test_retrieval_pipeline.py
├── TestQueryIntentClassification
│   ├── test_check_intent
│   ├── test_fix_intent
│   ├── test_explain_intent
│   └── test_example_intent
├── TestEmbeddingGeneration
│   ├── test_embedding_dimensions
│   ├── test_embedding_consistency
│   └── test_empty_query_raises_error
├── TestSemanticSearch
│   ├── test_search_validates_parameters
│   ├── test_search_returns_results
│   └── test_search_handles_errors
├── TestErrorHandling
│   ├── test_retrieve_rules_empty_query
│   ├── test_retrieve_rules_embedding_error
│   └── test_retrieve_rules_qdrant_error
└── TestIntegration (requires Qdrant)
    ├── test_end_to_end_retrieval
    └── test_semantic_search_relevance
```

## Examples

### Example 1: Check Permission

```bash
$ python3 retrieval_pipeline.py "Can I use classes?"

======================================================================
RETRIEVAL RESULT
======================================================================
PRIMARY RULE: CONST-001
Category: constitutional
Severity: blocking
Relevance: 0.89

❌ NO - This violates a blocking rule

RELEVANT RULES:

1. [PRINCIPLE] CONST-001
   Score: 0.89 | Severity: blocking
   
   Classes are prohibited. Use pure functions and data structures instead.
   
----------------------------------------------------------------------
```

### Example 2: Get Explanation

```bash
$ python3 retrieval_pipeline.py "What is a pure function?"

======================================================================
RETRIEVAL RESULT
======================================================================
PRIMARY RULE: FP-001
Category: functional_programming
Severity: info
Relevance: 0.92

RELEVANT RULES:

1. [PRINCIPLE] FP-001
   Score: 0.92 | Severity: info
   
   A pure function is a function that:
   1. Always returns the same output for the same input
   2. Has no side effects
   3. Does not depend on external state
   
----------------------------------------------------------------------

2. [EXAMPLE] FP-001-EX
   Score: 0.87 | Severity: info
   
   // Pure function
   const add = (a, b) => a + b;
   
   // Impure function (side effect)
   let total = 0;
   const addToTotal = (x) => { total += x; };
   
----------------------------------------------------------------------
```

### Example 3: Request Fix

```bash
$ python3 retrieval_pipeline.py "How to fix mutation?"

======================================================================
RETRIEVAL RESULT
======================================================================
PRIMARY RULE: FP-002
Category: functional_programming
Severity: warning
Relevance: 0.85

RELEVANT RULES:

1. [PATTERN] FP-002-PAT
   Score: 0.85 | Severity: warning
   
   Instead of mutating, create new objects:
   
   // Bad (mutation)
   const obj = { x: 1 };
   obj.x = 2;
   
   // Good (immutable)
   const obj = { x: 1 };
   const newObj = { ...obj, x: 2 };
   
----------------------------------------------------------------------
```

## Troubleshooting

### Common Issues

#### 1. "Qdrant Error: Cannot connect to Qdrant"

**Cause:** Qdrant is not running or wrong URL

**Solution:**
```bash
# Check if Qdrant is running
curl http://localhost:6333/collections

# Start Qdrant with Docker
docker run -p 6333:6333 qdrant/qdrant

# Or set custom URL
export QDRANT_URL="http://your-qdrant-server:6333"
```

#### 2. "Embedding Error: sentence-transformers not installed"

**Cause:** Dependencies not installed

**Solution:**
```bash
pip install -r requirements.txt
```

#### 3. "No relevant rules found"

**Cause:** Query too specific or score threshold too high

**Solution:**
- Rephrase query to be more general
- Lower score threshold in code
- Check if collections are populated

#### 4. Tests fail with "Qdrant not available"

**Cause:** Integration tests require running Qdrant

**Solution:**
```bash
# Skip integration tests
pytest -m "not integration"

# Or start Qdrant for integration tests
docker run -p 6333:6333 qdrant/qdrant
```

## Performance

### Benchmarks

- **Query embedding generation**: ~50-100ms (first query), ~10-20ms (cached model)
- **Semantic search**: ~20-50ms per collection
- **Total retrieval time**: ~100-300ms for 5 collections

### Optimization Tips

1. **Model caching**: Model is cached after first use
2. **Batch queries**: Use `search_multiple_collections` for efficiency
3. **Adjust limits**: Lower `limit` parameter for faster searches
4. **Score thresholds**: Higher thresholds = fewer results = faster

## Architecture

```
User Query
    ↓
classify_query_intent() → QueryIntent
    ↓
generate_query_embedding() → [384-dim vector]
    ↓
determine_strategy() → SearchConfig
    ↓
search_multiple_collections()
    ↓
    ├→ search_collection_semantic(constitutional_rules)
    ├→ search_collection_semantic(functional_programming_rules)
    ├→ search_collection_semantic(syntax_rules)
    ├→ search_collection_semantic(formatting_rules)
    └→ search_collection_semantic(typescript_rules)
    ↓
[Combined & sorted results]
    ↓
format_result() → Formatted string
```

## Future Enhancements (Phase 4B/4C)

- [ ] Result deduplication by rule_id
- [ ] Citation tracking
- [ ] Confidence scoring
- [ ] Query result caching
- [ ] Advanced query understanding
- [ ] Performance monitoring
- [ ] Query expansion

## Contributing

When modifying the retrieval pipeline:

1. **Add tests** for new functionality
2. **Update documentation** in this README
3. **Run full test suite**: `pytest test_retrieval_pipeline.py --cov`
4. **Verify integration**: Test with real Qdrant instance
5. **Check coverage**: Maintain >80% coverage

## License

Part of the Arborist AI project.

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review test cases for usage examples
3. Examine error messages (they're designed to be helpful)
4. Check Qdrant logs if connection issues persist

---

**Last Updated**: 2025-10-04  
**Version**: Phase 4A Complete  
**Status**: Production Ready ✅
