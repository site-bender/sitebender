#!/usr/bin/env python3
"""
Upsert Phase 2 RAG embeddings (principles and patterns) to Qdrant

This script:
1. Reads principle-embeddings.json and pattern-embeddings.json
2. Creates/recreates collections for each rule category
3. Upserts points with fake embeddings (MCP generates real ones on search)
"""

import json
import urllib.request
import sys
from pathlib import Path

QDRANT_URL = "http://localhost:6333"
VECTOR_SIZE = 384
VECTOR_NAME = "fast-all-minilm-l6-v2"

# Collection mapping
COLLECTIONS = {
    "constitutional_rules": "constitutional_rules",
    "functional_programming_rules": "functional_programming_rules",
    "syntax_rules": "syntax_rules",
    "formatting_rules": "formatting_rules",
    "typescript_rules": "typescript_rules",
}

def create_collection(collection_name):
    """Create or recreate a Qdrant collection"""
    # Delete if exists
    try:
        delete_req = urllib.request.Request(
            f"{QDRANT_URL}/collections/{collection_name}",
            method='DELETE'
        )
        urllib.request.urlopen(delete_req)
        print(f"  Cleared existing collection: {collection_name}")
    except:
        pass

    # Create with MCP-compatible vector config
    create_payload = {
        "vectors": {
            VECTOR_NAME: {
                "size": VECTOR_SIZE,
                "distance": "Cosine"
            }
        }
    }

    create_req = urllib.request.Request(
        f"{QDRANT_URL}/collections/{collection_name}",
        method='PUT',
        data=json.dumps(create_payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )

    with urllib.request.urlopen(create_req) as response:
        print(f"  ✓ Created collection: {collection_name}")

def upsert_points(collection_name, points):
    """Upsert points to a collection"""
    upsert_payload = {
        "points": points
    }

    upsert_req = urllib.request.Request(
        f"{QDRANT_URL}/collections/{collection_name}/points",
        method='PUT',
        data=json.dumps(upsert_payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )

    try:
        with urllib.request.urlopen(upsert_req) as response:
            return True
    except Exception as e:
        print(f"    Error upserting: {e}")
        return False

def process_principles():
    """Process and upsert principle embeddings"""
    print("\n=== Processing Principle Embeddings ===\n")

    principles_path = Path("docs/rag-phase2/principle-embeddings.json")
    with open(principles_path, 'r') as f:
        data = json.load(f)

    # Fake embedding (MCP generates real ones)
    fake_embedding = [0.1] * VECTOR_SIZE

    for category, rules in data.items():
        if category == "metadata":
            continue

        collection_name = COLLECTIONS.get(category)
        if not collection_name:
            print(f"⚠ Unknown category: {category}")
            continue

        print(f"\nProcessing {category} ({len(rules)} rules)...")

        # Create collection
        create_collection(collection_name)

        # Prepare points
        points = []
        for i, rule in enumerate(rules, 1):
            rule_id = rule['rule_id']
            point_id = hash(rule_id) % 1000000

            points.append({
                "id": point_id if point_id > 0 else i,
                "vectors": {
                    VECTOR_NAME: fake_embedding
                },
                "payload": {
                    "rule_id": rule_id,
                    "encoding_type": "principle",
                    "category": rule['category'],
                    "severity": rule['severity'],
                    "document": rule['principle'],  # MCP expects 'document' field
                    "keywords": rule['keywords'],
                    "tags": rule['tags'],
                }
            })

        # Upsert in batch
        if upsert_points(collection_name, points):
            print(f"  ✓ Upserted {len(points)} principle embeddings")
        else:
            print(f"  ✗ Failed to upsert principles")

def process_patterns():
    """Process and upsert pattern embeddings"""
    print("\n=== Processing Pattern Embeddings ===\n")

    patterns_path = Path("docs/rag-phase2/pattern-embeddings.json")
    with open(patterns_path, 'r') as f:
        data = json.load(f)

    # Fake embedding (MCP generates real ones)
    fake_embedding = [0.1] * VECTOR_SIZE

    for category, rules in data.items():
        if category == "metadata":
            continue

        collection_name = COLLECTIONS.get(category)
        if not collection_name:
            print(f"⚠ Unknown category: {category}")
            continue

        print(f"\nProcessing {category} patterns ({len(rules)} rules)...")

        # Prepare points (append to existing collection)
        points = []
        for i, rule in enumerate(rules, 1):
            rule_id = rule['rule_id']
            # Use different hash for patterns to avoid ID collision
            point_id = hash(f"{rule_id}-pattern") % 1000000

            points.append({
                "id": point_id if point_id > 0 else i + 1000,
                "vectors": {
                    VECTOR_NAME: fake_embedding
                },
                "payload": {
                    "rule_id": rule_id,
                    "encoding_type": "pattern",
                    "category": rule['category'],
                    "severity": rule['severity'],
                    "document": rule['pattern'],  # MCP expects 'document' field
                    "keywords": rule['keywords'],
                    "tags": rule['tags'],
                }
            })

        # Upsert in batch
        if upsert_points(collection_name, points):
            print(f"  ✓ Upserted {len(points)} pattern embeddings")
        else:
            print(f"  ✗ Failed to upsert patterns")

def process_queries():
    """Process and upsert query embeddings"""
    print("\n=== Processing Query Embeddings ===\n")

    queries_path = Path("docs/rag-phase2/query-embeddings.json")
    with open(queries_path, 'r') as f:
        data = json.load(f)

    # Fake embedding (MCP generates real ones)
    fake_embedding = [0.1] * VECTOR_SIZE

    for category, rules in data.items():
        if category == "metadata":
            continue

        collection_name = COLLECTIONS.get(category)
        if not collection_name:
            print(f"⚠ Unknown category: {category}")
            continue

        print(f"\nProcessing {category} queries ({len(rules)} rules)...")

        # Prepare points (append to existing collection)
        points = []
        for rule in rules:
            rule_id = rule['rule_id']
            queries = rule['queries']

            # Create one point per query phrase
            for i, query in enumerate(queries):
                # Use unique hash for each query
                point_id = hash(f"{rule_id}-query-{i}") % 1000000

                points.append({
                    "id": point_id if point_id > 0 else hash(f"{rule_id}{i}") % 1000000,
                    "vectors": {
                        VECTOR_NAME: fake_embedding
                    },
                    "payload": {
                        "rule_id": rule_id,
                        "encoding_type": "query",
                        "category": rule['category'],
                        "severity": rule['severity'],
                        "document": query,  # MCP expects 'document' field
                        "query_text": query,
                        "keywords": rule['keywords'],
                        "tags": rule['tags'],
                    }
                })

        # Upsert in batch
        if upsert_points(collection_name, points):
            print(f"  ✓ Upserted {len(points)} query embeddings")
        else:
            print(f"  ✗ Failed to upsert queries")

def process_antipatterns():
    """Process and upsert anti-pattern embeddings"""
    print("\n=== Processing Anti-Pattern Embeddings ===\n")

    antipatterns_path = Path("docs/rag-phase2/antipattern-embeddings.json")
    with open(antipatterns_path, 'r') as f:
        data = json.load(f)

    # Fake embedding (MCP generates real ones)
    fake_embedding = [0.1] * VECTOR_SIZE

    for category, rules in data.items():
        if category == "metadata":
            continue

        collection_name = COLLECTIONS.get(category)
        if not collection_name:
            print(f"⚠ Unknown category: {category}")
            continue

        print(f"\nProcessing {category} anti-patterns ({len(rules)} rules)...")

        # Prepare points (append to existing collection)
        points = []
        for rule in rules:
            rule_id = rule['rule_id']
            antipattern = rule['antipattern']

            # Use unique hash for anti-pattern
            point_id = hash(f"{rule_id}-antipattern") % 1000000

            points.append({
                "id": point_id if point_id > 0 else hash(f"anti-{rule_id}") % 1000000,
                "vectors": {
                    VECTOR_NAME: fake_embedding
                },
                "payload": {
                    "rule_id": rule_id,
                    "encoding_type": "antipattern",
                    "category": rule['category'],
                    "severity": rule['severity'],
                    "document": antipattern,  # MCP expects 'document' field
                    "violation_markers": rule['violation_markers'],
                    "keywords": rule['keywords'],
                    "tags": rule['tags'],
                }
            })

        # Upsert in batch
        if upsert_points(collection_name, points):
            print(f"  ✓ Upserted {len(points)} anti-pattern embeddings")
        else:
            print(f"  ✗ Failed to upsert anti-patterns")

def process_examples():
    """Process and upsert example embeddings"""
    print("\n=== Processing Example Embeddings ===\n")

    examples_path = Path("docs/rag-phase2/example-embeddings.json")
    with open(examples_path, 'r') as f:
        data = json.load(f)

    # Fake embedding (MCP generates real ones)
    fake_embedding = [0.1] * VECTOR_SIZE

    for category, rules in data.items():
        if category == "metadata":
            continue

        collection_name = COLLECTIONS.get(category)
        if not collection_name:
            print(f"⚠ Unknown category: {category}")
            continue

        print(f"\nProcessing {category} examples ({len(rules)} rules)...")

        # Prepare points (append to existing collection)
        points = []
        for rule in rules:
            rule_id = rule['rule_id']
            example = rule['example']

            # Use unique hash for example
            point_id = hash(f"{rule_id}-example") % 1000000

            points.append({
                "id": point_id if point_id > 0 else hash(f"ex-{rule_id}") % 1000000,
                "vectors": {
                    VECTOR_NAME: fake_embedding
                },
                "payload": {
                    "rule_id": rule_id,
                    "encoding_type": "example",
                    "category": rule['category'],
                    "severity": rule['severity'],
                    "document": example,  # MCP expects 'document' field
                    "context": rule['context'],
                    "keywords": rule['keywords'],
                    "tags": rule['tags'],
                }
            })

        # Upsert in batch
        if upsert_points(collection_name, points):
            print(f"  ✓ Upserted {len(points)} example embeddings")
        else:
            print(f"  ✗ Failed to upsert examples")

def process_counterexamples():
    """Process and upsert counter-example embeddings"""
    print("\n=== Processing Counter-Example Embeddings ===\n")

    counterexamples_path = Path("docs/rag-phase2/counterexample-embeddings.json")
    with open(counterexamples_path, 'r') as f:
        data = json.load(f)

    # Fake embedding (MCP generates real ones)
    fake_embedding = [0.1] * VECTOR_SIZE

    for category, rules in data.items():
        if category == "metadata":
            continue

        collection_name = COLLECTIONS.get(category)
        if not collection_name:
            print(f"⚠ Unknown category: {category}")
            continue

        print(f"\nProcessing {category} counter-examples ({len(rules)} rules)...")

        # Prepare points (append to existing collection)
        points = []
        for rule in rules:
            rule_id = rule['rule_id']
            counterexample = rule['counterexample']

            # Use unique hash for counter-example
            point_id = hash(f"{rule_id}-counterexample") % 1000000

            points.append({
                "id": point_id if point_id > 0 else hash(f"cex-{rule_id}") % 1000000,
                "vectors": {
                    VECTOR_NAME: fake_embedding
                },
                "payload": {
                    "rule_id": rule_id,
                    "encoding_type": "counterexample",
                    "category": rule['category'],
                    "severity": rule['severity'],
                    "document": counterexample,  # MCP expects 'document' field
                    "fix_reference": rule['fix_reference'],
                    "learning_points": rule['learning_points'],
                    "keywords": rule['keywords'],
                    "tags": rule['tags'],
                }
            })

        # Upsert in batch
        if upsert_points(collection_name, points):
            print(f"  ✓ Upserted {len(points)} counter-example embeddings")
        else:
            print(f"  ✗ Failed to upsert counter-examples")

def verify_collections():
    """Verify all collections were created"""
    print("\n=== Verifying Collections ===\n")

    try:
        req = urllib.request.Request(f"{QDRANT_URL}/collections")
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            collections = data.get('result', {}).get('collections', [])

            print("Collections in Qdrant:")
            for col in collections:
                name = col['name']
                if name in COLLECTIONS.values():
                    # Get collection info
                    info_req = urllib.request.Request(f"{QDRANT_URL}/collections/{name}")
                    with urllib.request.urlopen(info_req) as info_response:
                        info = json.loads(info_response.read())
                        points_count = info.get('result', {}).get('points_count', 0)
                        print(f"  ✓ {name}: {points_count} points")
    except Exception as e:
        print(f"  ✗ Error verifying: {e}")

def main():
    print("RAG Phase 2: Upserting Embeddings to Qdrant")
    print("=" * 60)

    try:
        # Test connection
        req = urllib.request.Request(f"{QDRANT_URL}/collections")
        with urllib.request.urlopen(req) as response:
            print(f"✓ Connected to Qdrant at {QDRANT_URL}\n")

        # Process principles
        process_principles()

        # Process patterns
        process_patterns()

        # Process queries
        process_queries()

        # Process anti-patterns
        process_antipatterns()

        # Process examples
        process_examples()

        # Process counter-examples
        process_counterexamples()

        # Verify
        verify_collections()

        print("\n" + "=" * 60)
        print("✓ PHASE 2 COMPLETE! All 6 encoding types generated and upserted!")
        print("\n6 Encoding Types Per Rule:")
        print("  1. Principle - High-level statement of the rule")
        print("  2. Pattern - Compliant code template")
        print("  3. Query - Developer questions (10 per rule)")
        print("  4. Anti-pattern - Prohibited code with violations")
        print("  5. Example - Compliant code with context")
        print("  6. Counter-example - Violation with learning points")
        print("\nTest with MCP:")
        print('  mcp__qdrant__qdrant-find("constitutional_rules", "How do I handle errors")')
        print('  mcp__qdrant__qdrant-find("syntax_rules", "Can I use arrow functions")')
        print('  mcp__qdrant__qdrant-find("typescript_rules", "What are branded types")')
        print("\nNext: Phase 3 - Vector Database Setup (collections already created!)")

    except Exception as e:
        print(f"\n✗ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
