# Arborist SWC Implementation

## Architecture

Arborist uses SWC via deno_ast for all parsing operations. This provides:

- 20-50x faster parsing than TypeScript compiler
- Perfect alignment with Deno's internal parser
- Zero Node.js dependencies
- Precise span tracking for all AST nodes

## Parser Backend

```typescript
import {
  parseModule,
  MediaType,
  SourceText,
} from "https://deno.land/x/deno_ast@0.34.4/mod.ts";
```

## Core Functions

### parseSourceFile

```typescript
//++ Parses TypeScript/JSX source using SWC
export function parseSourceFile(
  specifier: string,
  source: string,
): ParsedModule {
  const mediaType = detectMediaType(specifier);

  const parsed = parseModule({
    specifier,
    source,
    mediaType,
    captureTokens: true,
    comments: true,
  });

  return {
    program: parsed.program,
    comments: parsed.comments,
    sourceText: new SourceText(source),
    mediaType,
    specifier,
  };
}
```

### extractFunctions

```typescript
//++ Discovers all functions in SWC module
export function extractFunctions(
  module: SwcModule,
  sourceText: SourceText,
): Array<FunctionNodeIR> {
  const functions: Array<FunctionNodeIR> = [];

  for (const item of module.body) {
    if (item.type === "FunctionDeclaration") {
      functions.push(toFunctionIR(item, sourceText));
    }

    if (item.type === "VariableDeclaration") {
      for (const decl of item.declarations) {
        if (isFunction(decl.init)) {
          functions.push(toFunctionIR(decl.init, sourceText));
        }
      }
    }
  }

  return functions;
}
```

### extractComments

```typescript
//++ Extracts all comments with position data
export function extractComments(parsed: ParsedModule): Array<RawComment> {
  const comments: Array<RawComment> = [];

  for (const comment of parsed.comments) {
    const start = comment.span.start;
    const end = comment.span.end;
    const fullText = parsed.sourceText.text.slice(start, end);
    const text = stripCommentMarkers(fullText);
    const { line, column } = parsed.sourceText.getLineAndColumnAt(start);

    comments.push({
      kind: comment.kind === "Block" ? "block" : "line",
      text,
      fullText,
      start,
      end,
      line,
      column,
    });
  }

  return comments;
}
```

### extractImports

```typescript
//++ Extracts all import statements
export function extractImports(
  module: SwcModule,
  sourceText: SourceText,
): Array<ImportIR> {
  const imports: Array<ImportIR> = [];

  for (const item of module.body) {
    if (item.type === "ImportDeclaration") {
      imports.push({
        specifier: item.source.value,
        kind: getImportKind(item),
        names: getImportNames(item),
        span: {
          start: item.span.start,
          end: item.span.end,
        },
      });
    }
  }

  return imports;
}
```

### analyzeBranches

```typescript
//++ Analyzes conditional branches for coverage
export function analyzeBranches(
  module: SwcModule,
  sourceText: SourceText,
): Array<BranchInfo> {
  const branches: Array<BranchInfo> = [];

  function visit(node: SwcNode): void {
    switch (node.type) {
      case "IfStatement":
        branches.push({
          kind: "if",
          span: { start: node.span.start, end: node.span.end },
          consequent: node.consequent.span,
          alternate: node.alternate?.span,
        });
        break;

      case "ConditionalExpression":
        branches.push({
          kind: "ternary",
          span: { start: node.span.start, end: node.span.end },
          consequent: node.consequent.span,
          alternate: node.alternate.span,
        });
        break;

      case "TryStatement":
        branches.push({
          kind: "try",
          span: { start: node.span.start, end: node.span.end },
        });
        break;
    }

    // Recursively visit children
    visitChildren(node, visit);
  }

  visit(module);

  return branches;
}
```

## Media Type Detection

```typescript
//++ Maps file extensions to deno_ast media types
export function detectMediaType(specifier: string): MediaType {
  if (specifier.endsWith(".ts")) return MediaType.TypeScript;
  if (specifier.endsWith(".tsx")) return MediaType.Tsx;
  if (specifier.endsWith(".js")) return MediaType.JavaScript;
  if (specifier.endsWith(".jsx")) return MediaType.Jsx;
  if (specifier.endsWith(".mts")) return MediaType.Mts;
  if (specifier.endsWith(".cts")) return MediaType.Cts;
  if (specifier.endsWith(".mjs")) return MediaType.Mjs;
  if (specifier.endsWith(".cjs")) return MediaType.Cjs;

  return MediaType.TypeScript; // Default
}
```

## Performance Optimization

### Content-Addressed Caching

```typescript
const astCache = new Map<string, ParsedModule>();

//++ Caches parsed ASTs by content hash
export async function parseWithCache(
  specifier: string,
  source: string,
): Promise<ParsedModule> {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(source),
  );
  const cacheKey = btoa(String.fromCharCode(...new Uint8Array(hash)));

  const cached = astCache.get(cacheKey);
  if (cached) return cached;

  const parsed = parseSourceFile(specifier, source);
  astCache.set(cacheKey, parsed);

  return parsed;
}
```

### Batch Parsing

```typescript
//++ Parses multiple files in parallel
export async function parseMany(
  files: Array<{ specifier: string; source: string }>,
): Promise<Array<ParsedModule>> {
  return await Promise.all(
    files.map((file) => parseSourceFile(file.specifier, file.source)),
  );
}
```

## Internal IR Types

### FunctionNodeIR

```typescript
type FunctionNodeIR = {
  name: string;
  span: { start: number; end: number };
  isAsync: boolean;
  isGenerator: boolean;
  isArrow: boolean;
  params: Array<{
    name: string;
    optional: boolean;
    typeText?: string;
    span: { start: number; end: number };
  }>;
  returnTypeText?: string;
  typeParams?: Array<{
    name: string;
    constraintText?: string;
    defaultText?: string;
  }>;
};
```

### ImportIR

```typescript
type ImportIR = {
  specifier: string;
  kind: "named" | "default" | "namespace";
  names: Array<{
    imported: string;
    local: string;
  }>;
  span: { start: number; end: number };
};
```

### RawComment

```typescript
type RawComment = {
  kind: "line" | "block";
  text: string;
  fullText: string;
  start: number;
  end: number;
  line: number;
  column: number;
  nodeId?: string;
};
```

### BranchInfo

```typescript
type BranchInfo = {
  kind: "if" | "ternary" | "logical" | "switch" | "try";
  span: { start: number; end: number };
  consequent?: { start: number; end: number };
  alternate?: { start: number; end: number };
};
```

## Design Decisions

### Why SWC?

1. **Speed** - Orders of magnitude faster than TypeScript compiler
2. **Alignment** - Same parser Deno uses internally
3. **Simplicity** - Syntax-only parsing is sufficient for 95% of use cases
4. **Purity** - No Node.js dependencies, pure ESM

### Trade-offs

**Gains:**

- Blazing fast parsing (<10ms for most files)
- Perfect Deno compatibility
- Simpler mental model (syntax only)
- Smaller memory footprint

**Limitations:**

- No semantic type analysis
- No type inference
- No cross-file symbol resolution
- Type information is textual only

### Future: Semantic Analysis

Semantic type analysis will be added as a separate, optional phase:

```typescript
//++ Future: Enriches syntax data with semantic types
export async function enrichWithTypes(
  parsed: ParsedModule,
  options?: TypeCheckOptions,
): Promise<EnrichedModule> {
  // Implementation using TypeScript compiler
  // Only invoked when semantic analysis is required
  // Does not affect fast syntax-only path
}
```

This two-phase approach ensures:

- Fast path remains fast
- Semantic analysis available when needed
- Clean separation of concerns
- No performance regression

## Testing

```typescript
Deno.test("parseSourceFile extracts functions", () => {
  const source = `
		export function greet(name: string): string {
			return "Hello, " + name
		}
	`;

  const parsed = parseSourceFile("test.ts", source);
  const functions = extractFunctions(parsed.program, parsed.sourceText);

  assertEquals(functions.length, 1);
  assertEquals(functions[0].name, "greet");
  assertEquals(functions[0].params[0].name, "name");
  assertEquals(functions[0].params[0].typeText, "string");
  assertEquals(functions[0].returnTypeText, "string");
});

Deno.test("extractComments preserves positions", () => {
  const source = `
		//++ Test function
		export function test(): void {}
	`;

  const parsed = parseSourceFile("test.ts", source);
  const comments = extractComments(parsed);

  assertEquals(comments.length, 1);
  assertEquals(comments[0].text, "Test function");
  assertEquals(comments[0].line, 2);
});

Deno.test("analyzeBranches detects conditionals", () => {
  const source = `
		export function check(x: number): string {
			if (x > 0) {
				return "positive"
			}
			
			return x === 0 ? "zero" : "negative"
		}
	`;

  const parsed = parseSourceFile("test.ts", source);
  const branches = analyzeBranches(parsed.program, parsed.sourceText);

  assertEquals(branches.length, 2);
  assertEquals(branches[0].kind, "if");
  assertEquals(branches[1].kind, "ternary");
});
```
