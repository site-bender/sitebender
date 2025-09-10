# Parser Library - Issues to Fix

## Date: 2025-01-10
## Status: 17 linter errors, 0 type errors

## Linting Issues to Fix

### 1. Untagged TODOs (3 errors)
**File:** `src/parseFileWithCompiler/index.ts`
- Line 113: `// TODO: Implement extractTypes` → Change to `// TODO(@parser): Implement extractTypes`
- Line 114: `// TODO: Implement extractConstants` → Change to `// TODO(@parser): Implement extractConstants`
- Line 115: `// TODO: Implement extractExports` → Change to `// TODO(@parser): Implement extractExports`

### 2. Explicit `any` Types (13 errors)

**File:** `src/extractSignature/detectProperties/detectPure/index.ts`
- Line 56: `(node as any).asteriskToken` → Need proper TypeScript type assertion

**File:** `src/extractFunctions/visitNodes/visit/collectMetadata/index.ts`
- Lines 14, 19, 24, 31, 47, 58: Multiple `(metadata as any)` casts → Need to fix metadata type to be mutable

**Test Files with `any` types:**
- `src/extractSignature/detectProperties/detectCurried/index.test.ts` - Lines 17, 18
- `src/extractSignature/detectProperties/detectAsync/index.test.ts` - Line 17
- `src/extractSignature/detectProperties/detectGenerator/index.test.ts` - Line 17
- `src/extractSignature/detectProperties/detectPure/index.test.ts` - Lines 17, 18

### 3. Unused Variable (1 error)
**File:** `src/extractSignature/extractReturnType/inferReturnType/index.ts`
- Line 10: `sourceFile` parameter is never used → Prefix with underscore: `_sourceFile`

## How to Fix

### Run these commands from the parser directory:
```bash
# Check current state
deno lint src/
deno check src/

# After fixes, verify
deno lint src/  # Should show: Checked 59 files (no errors)
deno check src/ # Should pass with no errors
```

### Priority Order:
1. Fix untagged TODOs (easiest - just add tags)
2. Fix unused variable (simple - add underscore prefix)
3. Fix `any` types in main code (metadata type needs to be mutable)
4. Fix `any` types in test files (use proper TypeScript types or `unknown`)

## Notes
- Parser library is mostly compliant with CLAUDE.md
- Follows one-function-per-file rule properly
- Has proper nested folder structure based on dependencies
- The parseFileWithCompiler file was created today and introduced some of these issues
- No type errors, only linting issues

## Context
This library is THE ONLY library that should import TypeScript directly. It provides parsed AST output to other libraries (especially Envoy for documentation generation).