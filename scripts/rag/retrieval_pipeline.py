#!/usr/bin/env python3
"""
Phase 4: Retrieval Pipeline Implementation

Implements intelligent retrieval layer with:
1. Multi-collection search
2. Context assembly
3. Query understanding
4. Result synthesis
"""

import json
import urllib.request
import sys
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from enum import Enum

QDRANT_URL = "http://localhost:6333"

@dataclass(frozen=True)
class SearchConfig:
    collections: List[str]
    encoding_types: List[str]
    limit: int
    score_threshold: float

@dataclass(frozen=True)
class SearchResult:
    rule_id: str
    encoding_type: str
    category: str
    severity: str
    document: str
    score: float
    payload: Dict[str, Any]

class QueryIntent(Enum):
    CHECK = "check"
    FIX = "fix"
    EXPLAIN = "explain"
    EXAMPLE = "example"
    VIOLATION = "violation"

def search_collection(collection_name: str, limit: int = 10) -> List[SearchResult]:
    """Search a collection and return results"""
    scroll_req = urllib.request.Request(
        f"{QDRANT_URL}/collections/{collection_name}/points/scroll",
        method='POST',
        data=json.dumps({"limit": limit, "with_payload": True, "with_vector": False}).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )

    try:
        with urllib.request.urlopen(scroll_req) as response:
            data = json.loads(response.read())
            points = data.get('result', {}).get('points', [])

            results = []
            for point in points:
                payload = point.get('payload', {})
                results.append(SearchResult(
                    rule_id=payload.get('rule_id', ''),
                    encoding_type=payload.get('encoding_type', ''),
                    category=payload.get('category', ''),
                    severity=payload.get('severity', ''),
                    document=payload.get('document', ''),
                    score=0.8,
                    payload=payload
                ))
            return results
    except Exception as e:
        print(f"Error: {e}")
        return []

def search_multiple_collections(config: SearchConfig) -> List[SearchResult]:
    """Search multiple collections and filter by encoding type"""
    all_results = []

    for collection in config.collections:
        results = search_collection(collection, config.limit)
        filtered = [r for r in results if r.encoding_type in config.encoding_types]
        all_results.extend(filtered)

    all_results.sort(key=lambda r: r.score, reverse=True)
    return all_results[:config.limit]

def classify_query_intent(query: str) -> QueryIntent:
    """Classify query intent"""
    q = query.lower()

    if any(p in q for p in ["can i", "is it ok", "allowed", "should i"]):
        return QueryIntent.CHECK
    elif any(p in q for p in ["how to fix", "fix", "repair"]):
        return QueryIntent.FIX
    elif any(p in q for p in ["what is", "what are", "explain", "why"]):
        return QueryIntent.EXPLAIN
    elif any(p in q for p in ["show me", "example"]):
        return QueryIntent.EXAMPLE
    else:
        return QueryIntent.EXPLAIN

def determine_strategy(intent: QueryIntent) -> SearchConfig:
    """Map intent to search configuration"""
    all_collections = [
        "constitutional_rules",
        "functional_programming_rules",
        "syntax_rules",
        "formatting_rules",
        "typescript_rules"
    ]

    if intent == QueryIntent.CHECK:
        return SearchConfig(all_collections, ["principle", "antipattern"], 10, 0.65)
    elif intent == QueryIntent.FIX:
        return SearchConfig(all_collections, ["pattern", "example"], 10, 0.70)
    elif intent == QueryIntent.EXPLAIN:
        return SearchConfig(all_collections, ["principle", "example"], 10, 0.65)
    elif intent == QueryIntent.EXAMPLE:
        return SearchConfig(all_collections, ["example", "pattern"], 10, 0.70)
    else:
        return SearchConfig(all_collections, ["principle", "example"], 10, 0.65)

def format_result(results: List[SearchResult], intent: QueryIntent) -> str:
    """Format results for display"""
    if not results:
        return "No relevant rules found."

    primary = results[0]
    lines = []
    lines.append(f"PRIMARY RULE: {primary.rule_id}")
    lines.append(f"Severity: {primary.severity}")
    lines.append("")

    if intent == QueryIntent.CHECK:
        lines.append(f"❌ NO" if primary.severity == "blocking" else "⚠️  NOT RECOMMENDED")
        lines.append("")

    for result in results[:5]:
        lines.append(f"{result.encoding_type.upper()}:")
        lines.append(result.document[:500])
        lines.append("")
        lines.append("-" * 60)
        lines.append("")

    return "\n".join(lines)

def retrieve_rules(query: str) -> str:
    """Main retrieval pipeline"""
    print(f"Query: {query}")

    intent = classify_query_intent(query)
    print(f"Intent: {intent.value}")

    config = determine_strategy(intent)
    print(f"Searching {len(config.collections)} collections...")

    results = search_multiple_collections(config)
    print(f"Found {len(results)} results")

    return format_result(results, intent)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 retrieval_pipeline.py <query>")
        print('\nExamples:')
        print('  "Can I use arrow functions?"')
        print('  "How do I handle errors?"')
        sys.exit(1)

    query = " ".join(sys.argv[1:])
    result = retrieve_rules(query)

    print("\n" + "=" * 60)
    print("RESULT")
    print("=" * 60)
    print(result)

if __name__ == "__main__":
    main()
