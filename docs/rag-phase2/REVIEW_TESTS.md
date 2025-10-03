# Phase 2 Review: Test Queries

## Quick Verification

Run these commands to verify Phase 2 embeddings are working:

### 1. Check Collections Exist

```bash
curl http://localhost:6333/collections | jq '.result.collections[] | select(.name | startswith("constitutional") or startswith("functional") or startswith("syntax") or startswith("formatting") or startswith("typescript")) | {name, points_count: .points_count}'
```

Expected output: 5 collections with point counts:
- constitutional_rules: 60
- functional_programming_rules: 75
- syntax_rules: 60
- formatting_rules: 90
- typescript_rules: 75

### 2. Run Python Test Script

```bash
python3 scripts/rag/test_phase2_retrieval.py
```

This shows:
- All collections populated
- All 6 encoding types present
- Sample points from each encoding type

## MCP Semantic Search Tests

These test queries use the MCP server to perform actual semantic search with embeddings:

### Constitutional Rules Tests

```python
# Test: Error handling
mcp__qdrant__qdrant-find("constitutional_rules", "How do I handle errors")
# Should retrieve: const-004-no-exceptions with Result/Validation patterns

# Test: Classes
mcp__qdrant__qdrant-find("constitutional_rules", "Can I use classes")
# Should retrieve: const-001-no-classes with module patterns

# Test: Loops
mcp__qdrant__qdrant-find("constitutional_rules", "How to iterate over array")
# Should retrieve: const-003-no-loops with map/filter/reduce

# Test: Mutations
mcp__qdrant__qdrant-find("constitutional_rules", "How do I modify an object")
# Should retrieve: const-002-no-mutations with immutable updates
```

### Functional Programming Rules Tests

```python
# Test: Purity
mcp__qdrant__qdrant-find("functional_programming_rules", "What is a pure function")
# Should retrieve: fp-001-pure-functions with purity principles

# Test: Immutability
mcp__qdrant__qdrant-find("functional_programming_rules", "How to make data immutable")
# Should retrieve: fp-002-immutability with Readonly patterns

# Test: Totality
mcp__qdrant__qdrant-find("functional_programming_rules", "When to use Result vs Validation")
# Should retrieve: fp-003-total-functions with Maybe/Result/Validation

# Test: Composition
mcp__qdrant__qdrant-find("functional_programming_rules", "How do I compose functions")
# Should retrieve: fp-004-function-composition with pipe/compose
```

### Syntax Rules Tests

```python
# Test: Arrow functions
mcp__qdrant__qdrant-find("syntax_rules", "Can I use arrow functions")
# Should retrieve: syntax-001-no-arrow-functions with named function patterns

# Test: Abbreviations
mcp__qdrant__qdrant-find("syntax_rules", "Why no abbreviations")
# Should retrieve: syntax-002-no-abbreviations with full name examples

# Test: Naming
mcp__qdrant__qdrant-find("syntax_rules", "How should I name things")
# Should retrieve: syntax-003-plain-english-names

# Test: Currying
mcp__qdrant__qdrant-find("syntax_rules", "How to name curried functions")
# Should retrieve: syntax-004-curried-function-naming
```

### Formatting Rules Tests

```python
# Test: Indentation
mcp__qdrant__qdrant-find("formatting_rules", "Should I use tabs or spaces")
# Should retrieve: format-003-indentation

# Test: Line length
mcp__qdrant__qdrant-find("formatting_rules", "What's the line length limit")
# Should retrieve: format-004-line-length

# Test: Encoding
mcp__qdrant__qdrant-find("formatting_rules", "What character encoding")
# Should retrieve: format-001-character-encoding

# Test: Line endings
mcp__qdrant__qdrant-find("formatting_rules", "Should I use LF or CRLF")
# Should retrieve: format-002-line-endings
```

### TypeScript Rules Tests

```python
# Test: Discriminated unions
mcp__qdrant__qdrant-find("typescript_rules", "What are discriminated unions")
# Should retrieve: ts-001-discriminated-unions with _tag patterns

# Test: Branded types
mcp__qdrant__qdrant-find("typescript_rules", "What are branded types")
# Should retrieve: ts-002-branded-types with smart constructor patterns

# Test: Type annotations
mcp__qdrant__qdrant-find("typescript_rules", "Should I annotate types")
# Should retrieve: ts-003-explicit-annotations

# Test: Readonly
mcp__qdrant__qdrant-find("typescript_rules", "How to make types readonly")
# Should retrieve: ts-004-readonly-types
```

## Violation Detection Tests

Test that anti-patterns are retrieved when code violations are detected:

```python
# Test: Class detection
mcp__qdrant__qdrant-find("constitutional_rules", "class UserService")
# Should retrieve: const-001-no-classes anti-pattern

# Test: Arrow function detection
mcp__qdrant__qdrant-find("syntax_rules", "const add = (a, b) => a + b")
# Should retrieve: syntax-001-no-arrow-functions anti-pattern

# Test: Loop detection
mcp__qdrant__qdrant-find("constitutional_rules", "for (let i = 0; i < array.length; i++)")
# Should retrieve: const-003-no-loops anti-pattern

# Test: Exception detection
mcp__qdrant__qdrant-find("constitutional_rules", "throw new Error")
# Should retrieve: const-004-no-exceptions anti-pattern
```

## Cross-Collection Search

Test searching across all collections:

```python
# Search all collections for error handling
mcp__qdrant__qdrant-find("constitutional_rules", "error handling")
mcp__qdrant__qdrant-find("functional_programming_rules", "error handling")
mcp__qdrant__qdrant-find("typescript_rules", "error handling")

# Should retrieve:
# - const-004-no-exceptions (Result/Validation)
# - fp-003-total-functions (Maybe/Result/Validation)
# - ts-001-discriminated-unions (Result type definition)
```

## Expected Behavior

For each query, you should see:
1. **Multiple results** from different encoding types
2. **Relevant content** matching the query
3. **Proper metadata** (rule_id, encoding_type, severity)
4. **Related rules** appearing together

## Success Criteria

✅ **Phase 2 is successful if:**
1. All 5 collections have correct point counts
2. All 6 encoding types are present in each collection
3. MCP queries return relevant results
4. Different query styles retrieve appropriate encoding types
5. Violation detection finds anti-patterns
6. Cross-collection search works

## Troubleshooting

If queries don't return expected results:

1. **Check Qdrant is running:**
   ```bash
   docker ps | grep qdrant
   ```

2. **Verify collections:**
   ```bash
   curl http://localhost:6333/collections
   ```

3. **Check point counts:**
   ```bash
   curl http://localhost:6333/collections/constitutional_rules
   ```

4. **Re-run upsert if needed:**
   ```bash
   python3 scripts/rag/upsert_phase2_embeddings.py
   ```

5. **Check MCP server is running:**
   - MCP should be configured in your editor
   - Test with simple query first

## Next Steps After Review

Once you've verified Phase 2 is working:

1. **Phase 3**: Vector database optimization (already mostly done)
2. **Phase 4**: Retrieval pipeline development
3. **Phase 5**: Integration with Steward
4. **Phase 6**: Testing and validation
5. **Phase 7**: Documentation and maintenance

---

**Run the MCP test queries above and verify you get relevant results for each rule category!**
