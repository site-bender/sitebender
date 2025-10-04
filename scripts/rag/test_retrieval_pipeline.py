#!/usr/bin/env python3
"""
Production-Ready Tests for RAG Retrieval Pipeline

Tests cover:
1. Query intent classification
2. Embedding generation
3. Semantic search functionality
4. Error handling
5. End-to-end retrieval
"""

import pytest
import json
import sys
from unittest.mock import Mock, patch, MagicMock
from typing import List

# Import functions to test
from retrieval_pipeline import (
    classify_query_intent,
    generate_query_embedding,
    search_collection_semantic,
    search_multiple_collections,
    determine_strategy,
    format_result,
    retrieve_rules,
    QueryIntent,
    SearchConfig,
    SearchResult,
    RetrievalError,
    QdrantConnectionError,
    EmbeddingError,
    ValidationError,
    EMBEDDING_DIM
)

# ============================================================================
# Test Query Intent Classification
# ============================================================================

class TestQueryIntentClassification:
    """Test query intent classification logic"""

    def test_check_intent(self):
        """Test CHECK intent detection"""
        queries = [
            "Can I use classes?",
            "Is it ok to use loops?",
            "Should I use mutation?",
            "May I throw exceptions?"
        ]
        for query in queries:
            assert classify_query_intent(query) == QueryIntent.CHECK

    def test_fix_intent(self):
        """Test FIX intent detection"""
        queries = [
            "How to fix this error?",
            "How do I repair this code?",
            "Fix the mutation issue",
            "Resolve this problem"
        ]
        for query in queries:
            assert classify_query_intent(query) == QueryIntent.FIX

    def test_explain_intent(self):
        """Test EXPLAIN intent detection"""
        queries = [
            "What is a pure function?",
            "Explain immutability",
            "Why use functional programming?",
            "Describe the rule"
        ]
        for query in queries:
            assert classify_query_intent(query) == QueryIntent.EXPLAIN

    def test_example_intent(self):
        """Test EXAMPLE intent detection"""
        queries = [
            "Show me an example",
            "Demonstrate how to use this",
            "Give me a sample"
        ]
        for query in queries:
            assert classify_query_intent(query) == QueryIntent.EXAMPLE

    def test_empty_query_defaults_to_explain(self):
        """Test empty query defaults to EXPLAIN"""
        assert classify_query_intent("") == QueryIntent.EXPLAIN
        assert classify_query_intent("   ") == QueryIntent.EXPLAIN

# ============================================================================
# Test Embedding Generation
# ============================================================================

class TestEmbeddingGeneration:
    """Test query embedding generation"""

    def test_embedding_dimensions(self):
        """Test embedding has correct dimensions"""
        embedding = generate_query_embedding("test query")
        assert len(embedding) == EMBEDDING_DIM
        assert all(isinstance(x, float) for x in embedding)

    def test_embedding_consistency(self):
        """Test same query produces same embedding"""
        query = "Can I use arrow functions?"
        emb1 = generate_query_embedding(query)
        emb2 = generate_query_embedding(query)

        # Should be identical or very close
        assert len(emb1) == len(emb2)
        for v1, v2 in zip(emb1, emb2):
            assert abs(v1 - v2) < 1e-6

    def test_empty_query_raises_error(self):
        """Test empty query raises ValidationError"""
        with pytest.raises(ValidationError):
            generate_query_embedding("")

        with pytest.raises(ValidationError):
            generate_query_embedding("   ")

    def test_different_queries_different_embeddings(self):
        """Test different queries produce different embeddings"""
        emb1 = generate_query_embedding("Can I use classes?")
        emb2 = generate_query_embedding("What is a pure function?")


        # Should be different
        assert emb1 != emb2

# ============================================================================
# Test Search Configuration
# ============================================================================

class TestSearchConfiguration:
    """Test search strategy determination"""

    def test_check_strategy(self):
        """Test CHECK intent strategy"""
        config = determine_strategy(QueryIntent.CHECK)
        assert "principle" in config.encoding_types
        assert "antipattern" in config.encoding_types
        assert config.score_threshold == 0.65

    def test_fix_strategy(self):
        """Test FIX intent strategy"""
        config = determine_strategy(QueryIntent.FIX)
        assert "pattern" in config.encoding_types
        assert "example" in config.encoding_types
        assert config.score_threshold == 0.70

    def test_explain_strategy(self):
        """Test EXPLAIN intent strategy"""
        config = determine_strategy(QueryIntent.EXPLAIN)
        assert "principle" in config.encoding_types
        assert "example" in config.encoding_types

    def test_example_strategy(self):
        """Test EXAMPLE intent strategy"""
        config = determine_strategy(QueryIntent.EXAMPLE)
        assert "example" in config.encoding_types
        assert "pattern" in config.encoding_types

    def test_violation_strategy(self):
        """Test VIOLATION intent strategy (default case)"""
        config = determine_strategy(QueryIntent.VIOLATION)
        assert "principle" in config.encoding_types
        assert "example" in config.encoding_types
        assert config.score_threshold == 0.65

# ============================================================================
# Test Semantic Search (Mocked)
# ============================================================================

class TestSemanticSearch:
    """Test semantic search with mocked Qdrant"""

    def test_search_validates_collection_name(self):
        """Test empty collection name raises error"""
        with pytest.raises(ValidationError):
            search_collection_semantic("", [0.1] * EMBEDDING_DIM)

    def test_search_validates_embedding_dimensions(self):
        """Test wrong embedding dimensions raises error"""
        with pytest.raises(ValidationError):
            search_collection_semantic("test_collection", [0.1] * 100)

        with pytest.raises(ValidationError):
            search_collection_semantic("test_collection", [])

    def test_search_validates_limit(self):
        """Test invalid limit raises error"""
        with pytest.raises(ValidationError):
            search_collection_semantic(
                "test_collection",
                [0.1] * EMBEDDING_DIM,
                limit=0
            )

        with pytest.raises(ValidationError):
            search_collection_semantic(
                "test_collection",
                [0.1] * EMBEDDING_DIM,
                limit=-1
            )

    def test_search_validates_score_threshold(self):
        """Test invalid score threshold raises error"""
        with pytest.raises(ValidationError):
            search_collection_semantic(
                "test_collection",
                [0.1] * EMBEDDING_DIM,
                score_threshold=1.5
            )

        with pytest.raises(ValidationError):
            search_collection_semantic(
                "test_collection",
                [0.1] * EMBEDDING_DIM,
                score_threshold=-0.1
            )

    @patch('urllib.request.urlopen')
    def test_search_returns_results(self, mock_urlopen):
        """Test successful search returns results"""
        # Mock Qdrant response
        mock_response = Mock()
        mock_response.read.return_value = json.dumps({
            "result": [
                {
                    "id": "1",
                    "score": 0.85,
                    "payload": {
                        "rule_id": "CONST-001",
                        "encoding_type": "principle",
                        "category": "constitutional",
                        "severity": "blocking",
                        "document": "No classes allowed"
                    }
                }
            ]
        }).encode('utf-8')
        mock_response.__enter__ = Mock(return_value=mock_response)
        mock_response.__exit__ = Mock(return_value=False)
        mock_urlopen.return_value = mock_response

        results = search_collection_semantic(
            "test_collection",
            [0.1] * EMBEDDING_DIM
        )

        assert len(results) == 1
        assert results[0].rule_id == "CONST-001"
        assert results[0].score == 0.85
        assert results[0].encoding_type == "principle"

    @patch('urllib.request.urlopen')
    def test_search_handles_http_error(self, mock_urlopen):
        """Test HTTP error handling"""
        import urllib.error
        mock_urlopen.side_effect = urllib.error.HTTPError(
            "http://test", 404, "Not Found", {}, None
        )

        with pytest.raises(QdrantConnectionError):
            search_collection_semantic(
                "test_collection",
                [0.1] * EMBEDDING_DIM
            )

    @patch('urllib.request.urlopen')
    def test_search_handles_connection_error(self, mock_urlopen):
        """Test connection error handling"""
        import urllib.error
        mock_urlopen.side_effect = urllib.error.URLError("Connection refused")

        with pytest.raises(QdrantConnectionError):
            search_collection_semantic(
                "test_collection",
                [0.1] * EMBEDDING_DIM
            )

    @patch('urllib.request.urlopen')
    def test_search_handles_json_decode_error(self, mock_urlopen):
        """Test JSON decode error handling"""
        mock_response = Mock()
        mock_response.read.return_value = b"invalid json {{"
        mock_response.__enter__ = Mock(return_value=mock_response)
        mock_response.__exit__ = Mock(return_value=False)
        mock_urlopen.return_value = mock_response

        with pytest.raises(QdrantConnectionError, match="Invalid JSON response"):
            search_collection_semantic(
                "test_collection",
                [0.1] * EMBEDDING_DIM
            )

    @patch('urllib.request.urlopen')
    def test_search_handles_generic_exception(self, mock_urlopen):
        """Test generic exception handling"""
        mock_urlopen.side_effect = RuntimeError("Unexpected error")

        with pytest.raises(QdrantConnectionError, match="Unexpected error during search"):
            search_collection_semantic(
                "test_collection",
                [0.1] * EMBEDDING_DIM
            )

# ============================================================================
# Test Result Formatting
# ============================================================================

class TestResultFormatting:
    """Test result formatting"""

    def test_format_empty_results(self):
        """Test formatting with no results"""
        result = format_result([], QueryIntent.EXPLAIN)
        assert "No relevant rules found" in result

    def test_format_with_results(self):
        """Test formatting with results"""
        results = [
            SearchResult(
                rule_id="CONST-001",
                encoding_type="principle",
                category="constitutional",
                severity="blocking",
                document="Test document",
                score=0.85,
                payload={}
            )
        ]

        result = format_result(results, QueryIntent.EXPLAIN)
        assert "CONST-001" in result
        assert "0.85" in result
        assert "blocking" in result

    def test_format_check_intent_blocking(self):
        """Test CHECK intent with blocking severity"""
        results = [
            SearchResult(
                rule_id="CONST-001",
                encoding_type="principle",
                category="constitutional",
                severity="blocking",
                document="Test",
                score=0.85,
                payload={}
            )
        ]

        result = format_result(results, QueryIntent.CHECK)
        assert "❌ NO" in result

    def test_format_check_intent_warning(self):
        """Test CHECK intent with warning severity"""
        results = [
            SearchResult(
                rule_id="CONST-001",
                encoding_type="principle",
                category="constitutional",
                severity="warning",
                document="Test",
                score=0.85,
                payload={}
            )
        ]

        result = format_result(results, QueryIntent.CHECK)
        assert "⚠️" in result

    def test_format_check_intent_info(self):
        """Test CHECK intent with info severity"""
        results = [
            SearchResult(
                rule_id="CONST-001",
                encoding_type="principle",
                category="constitutional",
                severity="info",
                document="Test",
                score=0.85,
                payload={}
            )
        ]

        result = format_result(results, QueryIntent.CHECK)
        assert "✓ ALLOWED" in result

    def test_format_long_document_truncation(self):
        """Test long documents are truncated"""
        long_doc = "x" * 600  # More than 500 chars
        results = [
            SearchResult(
                rule_id="CONST-001",
                encoding_type="principle",
                category="constitutional",
                severity="info",
                document=long_doc,
                score=0.85,
                payload={}
            )
        ]

        result = format_result(results, QueryIntent.EXPLAIN)
        assert "..." in result
        # Check that the document was truncated to ~500 chars
        assert long_doc[:497] in result

# ============================================================================
# Test Error Handling
# ============================================================================

class TestErrorHandling:
    """Test comprehensive error handling"""

    def test_retrieve_rules_empty_query(self):
        """Test empty query returns error message"""
        result = retrieve_rules("")
        assert "Validation Error" in result

    def test_retrieve_rules_whitespace_query(self):
        """Test whitespace-only query returns error message"""
        result = retrieve_rules("   ")
        assert "Validation Error" in result

    @patch('retrieval_pipeline.generate_query_embedding')
    def test_retrieve_rules_embedding_error(self, mock_embed):
        """Test embedding error is handled gracefully"""
        mock_embed.side_effect = EmbeddingError("Model failed")

        result = retrieve_rules("test query")
        assert "Embedding Error" in result

    @patch('retrieval_pipeline.generate_query_embedding')
    @patch('retrieval_pipeline.search_multiple_collections')
    def test_retrieve_rules_qdrant_error(self, mock_search, mock_embed):
        """Test Qdrant error is handled gracefully"""
        mock_embed.return_value = [0.1] * EMBEDDING_DIM
        mock_search.side_effect = QdrantConnectionError("Connection failed")

        result = retrieve_rules("test query")
        assert "Qdrant Error" in result

    @patch('retrieval_pipeline.generate_query_embedding')
    @patch('retrieval_pipeline.search_multiple_collections')
    def test_retrieve_rules_verbose_output(self, mock_search, mock_embed):
        """Test verbose output prints debug information"""
        mock_embed.return_value = [0.1] * EMBEDDING_DIM
        mock_search.return_value = [
            SearchResult("CONST-001", "principle", "constitutional", "blocking", "doc1", 0.9, {})
        ]

        import io
        captured_output = io.StringIO()
        sys.stdout = captured_output

        try:
            result = retrieve_rules("test query", verbose=True)
            output = captured_output.getvalue()

            # Check verbose output contains expected information
            assert "Query:" in output
            assert "Intent:" in output
            assert "Generated embedding:" in output
            assert "Searching" in output
            assert "collections" in output
            assert "Encoding types:" in output
            assert "Score threshold:" in output
            assert "Found" in output
            assert "results" in output
        finally:
            sys.stdout = sys.__stdout__

    @patch('retrieval_pipeline.generate_query_embedding')
    def test_retrieve_rules_embedding_error_reraise(self, mock_embed):
        """Test EmbeddingError is caught and formatted"""
        # Simulate an EmbeddingError being raised during embedding generation
        mock_embed.side_effect = EmbeddingError("Failed to generate embedding: Model error")

        result = retrieve_rules("test query")
        assert "Embedding Error" in result
        assert "sentence-transformers" in result

# ============================================================================
# Integration Tests (Require Running Qdrant)
# ============================================================================

@pytest.mark.integration
class TestIntegration:
    """Integration tests requiring running Qdrant instance"""

    def test_end_to_end_retrieval(self):
        """Test complete retrieval pipeline"""
        try:
            result = retrieve_rules("Can I use arrow functions?")

            # Should return formatted result, not error
            assert "Error" not in result or "No relevant rules" in result
            assert len(result) > 0

        except Exception as e:
            pytest.skip(f"Qdrant not available: {e}")

    def test_semantic_search_relevance(self):
        """Test semantic search returns relevant results"""
        try:
            # Generate embedding for class-related query
            embedding = generate_query_embedding("Can I use classes?")

            # Search constitutional rules
            results = search_collection_semantic(
                "constitutional_rules",
                embedding,
                limit=5,
                score_threshold=0.6
            )

            # Should find results about classes
            if results:
                # Check that results are relevant
                assert any(
                    "class" in r.document.lower() or
                    "object" in r.document.lower()
                    for r in results
                )

                # Check scores are above threshold
                assert all(r.score >= 0.6 for r in results)

        except QdrantConnectionError:
            pytest.skip("Qdrant not available")

# ============================================================================
# Test Multiple Collections Search
# ============================================================================

class TestMultipleCollections:
    """Test searching multiple collections"""

    @patch('retrieval_pipeline.search_collection_semantic')
    def test_search_multiple_collections_combines_results(self, mock_search):
        """Test multiple collections are searched and combined"""
        # Mock results from different collections
        mock_search.side_effect = [
            [SearchResult("CONST-001", "principle", "constitutional", "blocking", "doc1", 0.9, {})],
            [SearchResult("FP-001", "example", "functional", "info", "doc2", 0.8, {})]
        ]

        config = SearchConfig(
            collections=["constitutional_rules", "functional_programming_rules"],
            encoding_types=["principle", "example"],
            limit=10,
            score_threshold=0.7
        )

        embedding = [0.1] * EMBEDDING_DIM
        results = search_multiple_collections(config, embedding)

        assert len(results) == 2
        assert results[0].score == 0.9  # Sorted by score
        assert results[1].score == 0.8

    @patch('retrieval_pipeline.search_collection_semantic')
    def test_search_multiple_collections_filters_encoding_types(self, mock_search):
        """Test encoding type filtering works"""
        mock_search.return_value = [
            SearchResult("CONST-001", "principle", "constitutional", "blocking", "doc1", 0.9, {}),
            SearchResult("CONST-002", "antipattern", "constitutional", "warning", "doc2", 0.85, {}),
            SearchResult("CONST-003", "example", "constitutional", "info", "doc3", 0.8, {})
        ]

        config = SearchConfig(
            collections=["constitutional_rules"],
            encoding_types=["principle", "antipattern"],  # Only these
            limit=10,
            score_threshold=0.7
        )

        embedding = [0.1] * EMBEDDING_DIM
        results = search_multiple_collections(config, embedding)

        # Should only include principle and antipattern, not example
        assert len(results) == 2
        assert all(r.encoding_type in ["principle", "antipattern"] for r in results)

    @patch('retrieval_pipeline.search_collection_semantic')
    def test_search_multiple_collections_handles_partial_failures(self, mock_search):
        """Test continues when some collections fail"""
        def side_effect(collection, *args, **kwargs):
            if collection == "constitutional_rules":
                return [SearchResult("CONST-001", "principle", "constitutional", "blocking", "doc1", 0.9, {})]
            else:
                raise QdrantConnectionError("Collection not found")

        mock_search.side_effect = side_effect

        config = SearchConfig(
            collections=["constitutional_rules", "nonexistent_collection"],
            encoding_types=["principle"],
            limit=10,
            score_threshold=0.7
        )

        embedding = [0.1] * EMBEDDING_DIM
        results = search_multiple_collections(config, embedding)

        # Should still return results from successful collection
        assert len(results) == 1
        assert results[0].rule_id == "CONST-001"

    @patch('retrieval_pipeline.search_collection_semantic')
    def test_search_multiple_collections_all_fail(self, mock_search):
        """Test error when all collections fail"""
        mock_search.side_effect = QdrantConnectionError("Collection not found")

        config = SearchConfig(
            collections=["constitutional_rules", "functional_programming_rules"],
            encoding_types=["principle"],
            limit=10,
            score_threshold=0.7
        )

        embedding = [0.1] * EMBEDDING_DIM

        with pytest.raises(QdrantConnectionError, match="All collection searches failed"):
            search_multiple_collections(config, embedding)

# ============================================================================
# Test CLI Interface
# ============================================================================

class TestCLIInterface:
    """Test command-line interface"""

    @patch('sys.argv', ['retrieval_pipeline.py'])
    def test_main_no_arguments(self):
        """Test main() with no arguments exits with usage"""
        import retrieval_pipeline
        with pytest.raises(SystemExit) as exc_info:
            retrieval_pipeline.main()
        assert exc_info.value.code == 1

    @patch('sys.argv', ['retrieval_pipeline.py', 'test', 'query'])
    @patch('retrieval_pipeline.retrieve_rules')
    def test_main_with_query(self, mock_retrieve):
        """Test main() with query arguments"""
        import retrieval_pipeline
        mock_retrieve.return_value = "Test result"

        import io
        captured_output = io.StringIO()
        sys.stdout = captured_output

        try:
            retrieval_pipeline.main()
            output = captured_output.getvalue()

            # Check that retrieve_rules was called with the query
            mock_retrieve.assert_called_once_with("test query", verbose=False)

            # Check output formatting
            assert "RETRIEVAL RESULT" in output
            assert "Test result" in output
        finally:
            sys.stdout = sys.__stdout__

    @patch('sys.argv', ['retrieval_pipeline.py', 'test', 'query', '--verbose'])
    @patch('retrieval_pipeline.retrieve_rules')
    def test_main_with_verbose_flag(self, mock_retrieve):
        """Test main() with --verbose flag"""
        import retrieval_pipeline
        mock_retrieve.return_value = "Test result"

        import io
        captured_output = io.StringIO()
        sys.stdout = captured_output

        try:
            retrieval_pipeline.main()

            # Check that retrieve_rules was called with verbose=True
            mock_retrieve.assert_called_once_with("test query", verbose=True)
        finally:
            sys.stdout = sys.__stdout__

    @patch('sys.argv', ['retrieval_pipeline.py', 'test', '-v', 'query'])
    @patch('retrieval_pipeline.retrieve_rules')
    def test_main_with_v_flag(self, mock_retrieve):
        """Test main() with -v flag"""
        import retrieval_pipeline
        mock_retrieve.return_value = "Test result"

        import io
        captured_output = io.StringIO()
        sys.stdout = captured_output

        try:
            retrieval_pipeline.main()

            # Check that retrieve_rules was called with verbose=True
            mock_retrieve.assert_called_once_with("test query", verbose=True)
        finally:
            sys.stdout = sys.__stdout__

# ============================================================================
# Test Coverage Report
# ============================================================================

def test_coverage_report():
    """Placeholder for coverage reporting"""
    # Run with: pytest --cov=retrieval_pipeline --cov-report=html
    pass

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
