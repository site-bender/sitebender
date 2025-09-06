# Automatic Documentation Generator @sitebender/scribe

## Vision

Replace JSDoc with automatic documentation generation that extracts everything from TypeScript code and proven properties. All developers need to write is a single-line description.

## What We Can Extract Automatically

### From TypeScript AST

- **Full type signatures** (parameters, returns, generics)
- **Type constraints** and bounds
- **Optional parameters** and defaults
- **Overloads** and variations
- **Async/generator** status
- **Export type** (default, named, type-only)

### From Code Analysis (via Prover)

- **Purity** - No side effects detected
- **Idempotence** - `f(f(x)) = f(x)`
- **Commutativity** - `f(a,b) = f(b,a)`
- **Associativity** - `f(f(a,b),c) = f(a,f(b,c))`
- **Currying levels** - Already detected by prover
- **Null safety** - How it handles null/undefined
- **Complexity** - O(n), O(1), O(n²), etc.
- **Determinism** - Same input → same output

### From Generated Tests

- **Usage examples** - Real, working code
- **Edge cases** - What happens at boundaries
- **Property proofs** - Mathematical guarantees
- **Performance characteristics** - From benchmarks

## The Documentation Generator Architecture

### Input: Minimal Comments

```typescript
// Adds two numbers with automatic type coercion
export default function add(augend: number) {
  return function (addend: number): number {
    return augend + addend;
  };
}
```

### Output: Complete Documentation

```typescript
/**
 * add
 * Adds two numbers with automatic type coercion
 *
 * Properties: Pure | Curried | Commutative | Associative
 *
 * Signature:
 *   add(augend: number) => (addend: number) => number
 *
 * Examples:
 *   add(2)(3) // 5
 *   pipe([add(5), add(10)])(0) // 15
 *
 * Mathematical Properties:
 *   - Commutative: add(a)(b) = add(b)(a)
 *   - Associative: add(add(a)(b))(c) = add(a)(add(b)(c))
 *   - Identity: add(0)(x) = x
 *
 * Complexity: O(1)
 * Since: v1.0.0
 * See also: subtract, multiply, divide
 */
```

## Implementation Strategy

```typescript
interface DocGenerator {
  // Extract from TypeScript AST
  extractSignature(file: string): FunctionSignature;

  // Detect mathematical properties
  detectProperties(ast: ASTNode): Properties;

  // Extract from existing tests
  findExamples(functionName: string): Examples;

  // Generate full documentation
  generateDocs(info: FunctionInfo): Documentation;
}

type Properties = {
  isPure: boolean;
  isCurried: boolean;
  isIdempotent: boolean;
  isCommutative: boolean;
  isAssociative: boolean;
  isDistributive: boolean;
  complexity: ComplexityClass;
  nullHandling: NullStrategy;
};

type Documentation = {
  name: string;
  description: string;
  signature: string;
  properties: Properties;
  examples: Array<Example>;
  mathematicalLaws: Array<Law>;
  complexity: string;
  relatedFunctions: Array<string>;
};
```

## Property Detection Strategies

### Purity Detection

```typescript
function isPure(ast: ASTNode): boolean {
  return (
    !hasSideEffects(ast) &&
    !hasIO(ast) &&
    !hasMutations(ast) &&
    !hasRandomness(ast) &&
    !hasDateAccess(ast)
  );
}
```

### Idempotence Detection

```typescript
function isIdempotent(fn: Function): boolean {
  // Property test: f(f(x)) === f(x) for various x
  return propertyTest((x) => deepEqual(fn(fn(x)), fn(x)));
}
```

### Commutativity Detection

```typescript
function isCommutative(fn: Function): boolean {
  // Property test: f(a, b) === f(b, a)
  return propertyTest((a, b) => deepEqual(fn(a, b), fn(b, a)));
}
```

### Complexity Analysis

```typescript
function analyzeComplexity(ast: ASTNode): ComplexityClass {
  // Analyze loops, recursion, data structure operations
  const loops = countLoops(ast);
  const recursion = detectRecursion(ast);
  const nestedLoops = countNestedLoops(ast);

  if (nestedLoops > 0) return `O(n^${nestedLoops + 1})`;
  if (loops > 0) return "O(n)";
  if (recursion) return analyzeRecursiveComplexity(ast);
  return "O(1)";
}
```

## Integration with Prover

The documenter becomes part of the prover ecosystem:

```typescript
import { generateDocs } from "@sitebender/prover/documenter";

// Generate docs for all toolkit functions
const docs = await generateDocs("libraries/toolkit/src", {
  includeExamples: true,
  includeBenchmarks: true,
  includeProperties: true,
  outputFormat: "markdown" | "html" | "json",
});

// Write to files
await writeDocs(docs, "docs/api/toolkit");
```

## Benefits Over JSDoc

1. **No clutter** - Just one-line descriptions in code
2. **Always accurate** - Generated from actual code, not comments
3. **Richer information** - Properties JSDoc can't express
4. **Automatic updates** - Docs regenerate with code changes
5. **Verified examples** - From actual passing tests
6. **Mathematical proofs** - Properties proven, not claimed
7. **Complexity analysis** - Automatic Big-O notation
8. **Relationship mapping** - Auto-detect related functions

## Advanced Features

### Live Documentation

```typescript
// Documentation that updates in real-time
interface LiveDocs {
  // Shows actual current behavior
  currentBehavior(): string;

  // Includes live playground for each function
  playground(): InteractiveExample;

  // Properties verified on every build
  verifiedProperties(): ProofResults;

  // Performance from actual benchmarks
  performanceMetrics(): BenchmarkResults;
}
```

### Cross-Reference Generation

- Automatically link related functions
- Build dependency graphs
- Create category indexes
- Generate usage patterns

### Version Tracking

- Track when functions were added
- Document breaking changes
- Show deprecation warnings
- Migration guides from old signatures

## Output Formats

### Markdown

For static site generators, GitHub, READMEs

### HTML

For interactive documentation sites with:

- Live examples
- Search functionality
- Property filters
- Playground integration

### JSON

For tooling integration:

- IDE hints
- API clients
- Type generation
- Documentation APIs

## Future Enhancements

1. **Visual function signatures** - Graphical representation of currying
2. **Interactive property explorer** - Test properties with custom inputs
3. **Automatic changelog generation** - From git history and signature changes
4. **Documentation coverage** - Like code coverage but for docs
5. **Multi-language generation** - TypeScript → Python/Go/Rust docs
6. **AI-enhanced descriptions** - Suggest better descriptions based on function behavior

## Implementation Plan

### Phase 1: Core Extraction

- [ ] TypeScript AST parser for signatures
- [ ] Basic property detection (pure, curried)
- [ ] Simple markdown generation

### Phase 2: Property Detection

- [ ] Mathematical property detection
- [ ] Complexity analysis
- [ ] Null safety analysis
- [ ] Example extraction from tests

### Phase 3: Rich Documentation

- [ ] Multiple output formats
- [ ] Cross-referencing
- [ ] Live documentation
- [ ] Playground integration

### Phase 4: Advanced Features

- [ ] Visual representations
- [ ] Version tracking
- [ ] Multi-language support
- [ ] AI enhancements

## Conclusion

By combining TypeScript's type system with the prover's analysis capabilities, we can generate documentation that is:

- More accurate than hand-written docs
- Richer in information
- Always up-to-date
- Mathematically proven
- Free from JSDoc clutter

This aligns perfectly with the @sitebender philosophy: pure functions are self-documenting, and with the right tooling, we can extract and present that documentation automatically.
