# Arborist ↔ Envoy Integration Contract

**Date:** 2025-09-25
**Status:** BINDING

## Contract Summary

Arborist is the ONLY library that parses TypeScript/JSX. It uses SWC via deno_ast for syntax-level analysis. Envoy consumes Arborist's structured outputs for documentation generation.

## API Specifications

### Arborist Provides

```typescript
//++ Parses source file and returns structured data
parseSourceFile(
	specifier: string,
	source: string,
): ParsedModule

//++ Extracts functions from parsed module
extractFunctions(
	module: SwcModule,
	sourceText: SourceText,
): Array<FunctionNodeIR>

//++ Extracts comments with position data
extractComments(
	parsed: ParsedModule,
): Array<RawComment>

//++ Extracts import statements
extractImports(
	module: SwcModule,
	sourceText: SourceText,
): Array<ImportIR>

//++ Analyzes conditional branches
analyzeBranches(
	module: SwcModule,
	sourceText: SourceText,
): Array<BranchInfo>
```

### Data Structures

```typescript
type ParsedModule = {
  program: SwcModule; // SWC AST
  comments: CommentCollection; // deno_ast comments
  sourceText: SourceText; // Position utilities
  mediaType: MediaType; // File type
  specifier: string; // File path
};

type FunctionNodeIR = {
  name: string;
  span: { start: number; end: number };
  isAsync: boolean;
  isGenerator: boolean;
  isArrow: boolean;
  params: Array<ParamInfo>;
  returnTypeText?: string;
  typeParams?: Array<TypeParamInfo>;
};

type RawComment = {
  kind: "line" | "block";
  text: string; // Without markers
  fullText: string; // With markers
  start: number;
  end: number;
  line: number;
  column: number;
  nodeId?: string; // Associated function
};
```

## Division of Responsibilities

### Arborist Owns

- SWC/deno_ast integration
- Syntax-level parsing
- Span and position tracking
- Comment extraction (raw text)
- Import/export analysis
- Branch enumeration

### Envoy Owns

- Comment interpretation (//++, //??, //--)
- Documentation generation
- API formatting
- Complexity metrics from branches
- Documentation structure

### Arborist NEVER

- Interprets Envoy comment syntax
- Generates documentation
- Makes semantic type analysis
- Performs cross-file analysis

### Envoy NEVER

- Imports deno_ast or SWC
- Parses TypeScript directly
- Duplicates parsing logic
- Accesses raw AST nodes

## Performance Requirements

| File Size | Functions | Parse Time |
| --------- | --------- | ---------- |
| Small     | 10-50     | <10ms      |
| Medium    | 100-500   | <50ms      |
| Large     | 1000+     | <200ms     |

## Implementation Details

### Parser Backend

Arborist uses SWC exclusively:

```typescript
import { parseModule } from "https://deno.land/x/deno_ast@0.34.4/mod.ts";
```

### Comment Association

Comments are associated with functions by proximity:

1. Leading comments within 2 lines above function
2. Trailing comments on same line as function close
3. NodeId links comment to function name

### Type Information

All type information is syntax-level only:

- Parameter types as text strings
- Return types as text strings
- Generic constraints as text strings
- No semantic resolution

## Future Enhancements

### Semantic Analysis (Required Future Work)

A separate optional phase will add semantic type information:

```typescript
//++ Future: Adds semantic types to syntax data
enrichWithTypes(
	parsed: ParsedModule,
	options?: TypeCheckOptions,
): Promise<EnrichedModule>
```

This will:

- Use TypeScript compiler for type checking
- Augment syntax data with resolved types
- Remain completely optional
- Not affect parse performance

## Enforcement

### Validation

- Arborist is the ONLY library importing deno_ast
- Envoy has ZERO TypeScript parsing code
- All AST analysis goes through Arborist
- No exceptions, no workarounds

### Testing

Both libraries must maintain:

- Integration tests using shared fixtures
- Performance benchmarks
- Contract compliance tests

## Success Criteria

- ✅ Fast parsing (<50ms for typical files)
- ✅ Clean separation of concerns
- ✅ No duplicate parsing logic
- ✅ Envoy uses only Arborist outputs
- ✅ Performance targets met

---

**This contract is BINDING. No TypeScript parsing outside Arborist.**
