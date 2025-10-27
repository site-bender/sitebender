# Code Generators

This folder contains code generation utilities and configuration files.

## Structure

- `tmp/` - Temporary config files (gitignored, auto-deleted after use)
- Config files can also be placed anywhere and passed to generators

## Usage

### Function Generator

Create a config file:

```typescript
// add.config.ts
import type { FunctionConfig } from "../.claude/skills/function-implementation/types.ts"

export default {
  name: "add",
  conjunction: "To",
  parameters: [
    { name: "augend", type: "number" },
    { name: "addend", type: "number" },
  ],
  returns: "number",
} satisfies FunctionConfig
```

Generate the function:

```bash
# Auto-deletes config after use
deno task new:function add.config.ts

# Keep the config file
deno task new:function add.config.ts --keep

# Old style still works
deno task new:function add 2
```

### Programmatic API

```typescript
import { generateFunction } from "../.claude/skills/function-implementation/generator.ts"

await generateFunction({
  name: "add",
  conjunction: "To",
  parameters: [
    { name: "augend", type: "number" },
    { name: "addend", type: "number" },
  ],
  returns: "number",
})
```
