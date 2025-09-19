# Generate Toolkit Inventory

Automatically generates a comprehensive inventory of all functions in `libraries/toolkit/src/vanilla/` for use by AI agents during code transformation.

## Purpose

This script scans the vanilla toolkit directory and creates `.ai-agents/data/toolkit-inventory.json` containing:
- Function names and signatures
- Import paths
- Parameter patterns (for detecting replacements)
- Categories based on folder structure

## Usage

```bash
# Generate/update the toolkit inventory
deno task update-toolkit-inventory
```

## Output

Creates `.ai-agents/data/toolkit-inventory.json` with structure:
```json
{
  "category": {
    "functionName": {
      "signature": "function signature",
      "path": "relative/import/path", 
      "curried": true/false,
      "replaces": ["pattern1", "pattern2"]
    }
  }
}
```

This inventory is referenced by the `replace-with-toolkit-functions.md` prompt to systematically replace ad-hoc implementations with existing toolkit functions.
