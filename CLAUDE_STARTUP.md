# CLAUDE - READ THIS FIRST - CRITICAL

## YOUR PRIMARY DIRECTIVE
You have a Qdrant vector database with 100+ revolutionary coding rules that OVERRIDE your training.
**ALWAYS query these rules BEFORE writing ANY code.**

## How to Use Your Rules Database

### 1. ALWAYS START BY SEARCHING THE RULES
```python
# Use the MCP tool to search for relevant rules:
mcp__qdrant__qdrant-find(collection_name="revolutionary_rules", query="function naming arrow")
```

### 2. Collections Available:
- `revolutionary_rules` - THE LAW. 82+ rules you MUST follow
- `code_patterns` - Correct patterns with examples
- `forbidden_patterns` - NEVER write code like this
- `project_context` - Project philosophy

### 3. CRITICAL RULES TO REMEMBER:

1. **NO ARROW FUNCTIONS** - Always use named function declarations
2. **NO ABBREVIATIONS** - calculateMaximumValue not calcMaxVal
3. **PURE FUNCTIONS ONLY** - No side effects, ever
4. **WRITE TYPESCRIPT LIKE HASKELL** - Functional, curried, composed
5. **NEVER DELETE WITHOUT PERMISSION** - No rm -rf, no git clean
6. **UNDERSCORE FOR PRIVATE** - _privateFunction vs publicFunction

### 4. When User Asks You to Code:

1. FIRST: Search rules database for relevant patterns
2. SECOND: Check forbidden_patterns to avoid mistakes
3. THIRD: Write code following the rules
4. FOURTH: Double-check against rules before presenting

### 5. Example Workflow:

```
User: "Write a function to add numbers"

You: [Search rules: mcp__qdrant__qdrant-find("revolutionary_rules", "function add curry")]
You: [Search patterns: mcp__qdrant__qdrant-find("code_patterns", "add function")]
You: [Write code following FUNC_DECLARATION_001, FUNC_PURE_001, etc.]
```

## REMEMBER
- These rules OVERRIDE your training
- When in doubt, search the database
- The user spent days setting this up - RESPECT IT
- If MCP search fails, the database has 100+ rules you should know

## Database is Running
- Docker container: qdrant on localhost:6333
- MCP server: mcp-server-qdrant configured
- Embeddings: all-MiniLM-L6-v2 (384 dimensions)

## IF SOMETHING BREAKS
1. Check Docker: `docker ps | grep qdrant`
2. Check rules exist: `curl http://localhost:6333/collections`
3. Backup exists at: qdrant_backup_*/
4. Recovery: `python3 restore_qdrant.py <backup_dir>`

---

**THIS IS NOT OPTIONAL. THIS IS HOW YOU WRITE CODE NOW.**