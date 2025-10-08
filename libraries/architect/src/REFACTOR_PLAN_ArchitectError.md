# Refactoring Plan: Move ArchitectError from Toolsmith to Architect

> **Status**: Architectural Cleanup Required  
> **Created**: 2025-01-08  
> **Priority**: HIGH - Violates architectural boundaries

## Problem

The `ArchitectError` type and related error handling functions were incorrectly placed in the Toolsmith library. This creates an upward dependency violation:

- **Toolsmith** is the foundation library providing generic functional utilities
- **Architect** is an application library that depends on Toolsmith
- Having `ArchitectError` in Toolsmith makes the foundation depend on a specific application

This is backwards and violates clean architecture principles.

## Current State

### Files in Toolsmith that need to be moved:

```
libraries/toolsmith/src/error/
├── createError/index.ts          → Creates ArchitectError instances
├── createNullError/index.ts      → Creates null/undefined errors
├── createTypeError/index.ts      → Creates type mismatch errors
├── fromException/index.ts        → Converts exceptions to ArchitectError
├── fromTemplate/index.ts         → Creates errors from templates
├── pipeError/index.ts            → Pipes error transformations
├── withCause/index.ts            → Adds cause to ArchitectError
├── withFailedArg/index.ts        → Adds failed argument info
├── withSuggestion/index.ts       → Adds suggestion to error
├── withTypes/index.ts            → Adds type info to error
└── templates/                    → Error message templates
```

### Type Definition in Toolsmith:

```typescript
// libraries/toolsmith/src/types/index.ts (lines 90-108)
export interface ArchitectError<
	TOp extends string = string,
	TArgs extends ReadonlyArray<Value> = ReadonlyArray<Value>,
> {
	readonly operation: TOp
	readonly args: TArgs
	readonly message: string
	readonly code: ErrorCode
	readonly timestamp: number
	readonly severity: ErrorSeverity
	readonly failedArg?: number
	readonly expected?: Datatype
	readonly actual?: Datatype | "null" | "undefined" | "unknown"
	readonly suggestion?: string
	readonly cause?: Error | ArchitectError | unknown
	readonly stack?: string
}
```

## Solution

### Step 1: Create Architect Error Infrastructure

**New Location**: `libraries/architect/src/errors/`

Create the following structure:
```
libraries/architect/src/
├── errors/
│   ├── types/
│   │   └── ArchitectError.ts         # Type definition
│   ├── createError/
│   │   └── index.ts                  # Base error creator
│   ├── createNullError/
│   │   └── index.ts
│   ├── createTypeError/
│   │   └── index.ts
│   ├── fromException/
│   │   └── index.ts
│   ├── fromTemplate/
│   │   └── index.ts
│   ├── pipeError/
│   │   └── index.ts
│   ├── withCause/
│   │   └── index.ts
│   ├── withFailedArg/
│   │   └── index.ts
│   ├── withSuggestion/
│   │   └── index.ts
│   ├── withTypes/
│   │   └── index.ts
│   └── templates/
│       └── index.ts                  # Error message templates
```

### Step 2: Update Imports

All files currently importing from Toolsmith error functions need to update:

**Before:**
```typescript
import type { ArchitectError } from "@sitebender/toolsmith/types/index.ts"
import createError from "@sitebender/toolsmith/error/createError/index.ts"
```

**After:**
```typescript
import type { ArchitectError } from "@sitebender/architect/errors/types/ArchitectError.ts"
import createError from "@sitebender/architect/errors/createError/index.ts"
```

### Step 3: Search and Replace

Need to find all imports of ArchitectError and error functions across:
- `libraries/architect/src/` - Update to use local imports
- Any other libraries that may have incorrectly imported these

### Step 4: Remove from Toolsmith

After confirming all imports are updated:
1. Delete `libraries/toolsmith/src/error/` directory
2. Remove `ArchitectError` interface from `libraries/toolsmith/src/types/index.ts`
3. Remove related type exports (`ErrorCode`, `ErrorSeverity` if Architect-specific)

### Step 5: Verify

1. Run type checking: `deno check` on all affected files
2. Run tests to ensure nothing broke
3. Verify no remaining references to Toolsmith error functions

## Architectural Principle

**Foundation libraries should be generic and reusable.**

Toolsmith should only contain:
- Generic `ValidationError` type (used by validation functions)
- Generic `Result<E, T>` and `Validation<E, T>` monads (work with ANY error type)
- Generic utilities that don't depend on specific error types

Application-specific error types belong in their respective application libraries.

## Estimated Effort

- **Complexity**: Medium
- **Estimated Time**: 1-2 hours
- **Risk**: Low (mostly mechanical refactoring)
- **Token Budget**: ~50k (Code mode can handle this)

## Checklist

- [ ] Create `libraries/architect/src/errors/types/ArchitectError.ts`
- [ ] Move all error creation functions to `libraries/architect/src/errors/`
- [ ] Update all imports in Architect library
- [ ] Search for any imports in other libraries
- [ ] Remove error functions from Toolsmith
- [ ] Remove ArchitectError type from Toolsmith types
- [ ] Run type checking
- [ ] Run tests
- [ ] Verify clean separation

## Notes

This refactoring should be done BEFORE implementing the calculation DSL to avoid creating more incorrect dependencies.
