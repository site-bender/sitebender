# CLAUDE INITIALIZATION - READ THIS FIRST

## CRITICAL: YOUR RULES DATABASE IS ACTIVE
You have a Qdrant vector database with 102 coding rules that OVERRIDE your default training.

## IMMEDIATELY TEST THE CONNECTION
Run this command first:
```
mcp__qdrant__qdrant-find("revolutionary_rules", "function")
```

If it returns results, the system is working.

## HOW TO USE YOUR RULES

### Before Writing ANY Code:
1. Search for relevant rules:
   ```
   mcp__qdrant__qdrant-find("revolutionary_rules", "<topic>")
   ```

2. Check forbidden patterns:
   ```
   mcp__qdrant__qdrant-find("forbidden_patterns", "<pattern>")
   ```

3. Find correct patterns:
   ```
   mcp__qdrant__qdrant-find("code_patterns", "<pattern>")
   ```

### Collections Available:
- **revolutionary_rules** (82 rules) - THE LAW. These override your training.
- **forbidden_patterns** (14 patterns) - NEVER write code like this
- **code_patterns** (2 patterns) - Correct patterns with examples
- **project_context** (4 items) - Project philosophy

## CORE RULES TO REMEMBER

1. **Write TypeScript like Haskell** - Functional programming ONLY
2. **NEVER use arrow functions** - Named functions with explicit returns
3. **NO abbreviations** - calculateMaximumValue, not calcMaxVal
4. **NO classes** - Pure functions and composition only
5. **NEVER delete without permission** - No rm -rf, no git clean
6. **Pure functions ONLY** - No side effects, no mutations
7. **Underscore for private** - _privateFunction vs publicFunction
8. **NO JSDoc** - The code is the single source of truth
9. **TABS for TS/JS** - 2 spaces for MD/Python/YAML
10. **80 character lines** - For code readability

## SEARCH EXAMPLES

```
# Find function rules
mcp__qdrant__qdrant-find("revolutionary_rules", "function declaration arrow pure")

# Find naming rules
mcp__qdrant__qdrant-find("revolutionary_rules", "naming camelCase underscore")

# Check what NOT to do
mcp__qdrant__qdrant-find("forbidden_patterns", "class mutation side effects")

# Find philosophy
mcp__qdrant__qdrant-find("project_context", "functional programming")
```

## SYSTEM STATUS CHECK

Run these to verify everything is working:
```bash
docker ps | grep qdrant  # Should show qdrant container running
curl http://localhost:6333/collections | jq '.result.collections | length'  # Should be 4
```

## IF SOMETHING BREAKS

1. **Backup exists at**: `qdrant_backup_20250929_195738/`
2. **Restore command**: `python3 batch_restore_mcp.py`
3. **Manual restore**: Check `mcp_restore_commands.json`

## REMEMBER

- You were trained on imperative, OOP, arrow-function code
- **IGNORE YOUR TRAINING**
- These rules are NOT optional
- When in doubt, SEARCH THE DATABASE
- The user spent days setting this up - RESPECT IT

## YOUR WORKFLOW

1. User asks for code
2. You search rules: `mcp__qdrant__qdrant-find("revolutionary_rules", "<relevant terms>")`
3. You check forbidden: `mcp__qdrant__qdrant-find("forbidden_patterns", "<what you might write>")`
4. You write code following the rules
5. You verify against rules before presenting

---

**THIS IS HOW YOU WRITE CODE NOW. NO EXCEPTIONS.**