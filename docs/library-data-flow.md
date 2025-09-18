# The @sitebender Library Data Flow

## Overview

This document describes how data flows through the @sitebender ecosystem, what each library does, what data it produces, and how other libraries consume that data. Each library has ONE responsibility and cannot duplicate another's functionality.

## Layer 0: Foundation (Zero Dependencies)

### 🧰 **Toolkit**
**Purpose**: Pure functional utilities - the atoms everything else is built from  
**Exports**: Individual functions for arrays, objects, strings, predicates, combinators  
**Example Outputs**:
```typescript
// Just pure functions, no data structures
pipe(f, g, h) // Function composition
map(fn, array) // Array transformation
Either<Error, Value> // Error handling monad
```
**Used By**: Everyone uses these building blocks

### 🎲 **Foundry**
**Purpose**: Property-based testing and arbitrary data generation  
**Exports**: Generators for creating test data  
**Example Outputs**:
```typescript
Arbitrary<T> // Generator that produces random T values
Gen<T> // Generator monad for composing generators
TestProperty // Mathematical property to verify
```
**Used By**: Prover (to generate test inputs), Parser (for testing)

---

## Layer 1: Infrastructure

### 📜 **Parser** (Can use: Toolkit, Foundry)
**Purpose**: THE ONLY library that touches TypeScript compiler - parses all code  
**What It Does**: Reads `.ts`/`.tsx` files, extracts everything into normalized data  
**Exports**:
```typescript
ContractOutput<ParsedFile> {
  data: {
    filePath: string
    functions: ParsedFunction[] {
      name: string
      signature: string      // "add(a: number, b: number): number"
      parameters: Parameter[]
      returnType: string
      comments: Comment[] {  // Raw comments, NO interpretation
        text: string        // "//++ Adds two numbers"
        line: number
        type: "single" | "multi" | "jsdoc"
      }
    }
    types: ParsedType[]
    constants: ParsedConstant[]
    components: ParsedComponent[] // JSX components
  }
  metadata: { checksum, frozen: true }
}
```
**Critical**: Parser does NOT interpret comment syntax (`//++`, `//--`). It just extracts raw text.

---

## Layer 2: Services (Process Parser Output)

### 📚 **Envoy** (Can use: Parser, Toolkit, Foundry)
**Purpose**: Documentation generator - interprets Parser's comment syntax  
**What It Does**: Takes Parser output, interprets comment meanings, builds documentation graph  
**Receives from Parser**:
```typescript
ParsedFile.comments // Raw: "//++ This function adds numbers"
```
**Transforms Into**:
```typescript
ContractOutput<DocumentedModule> {
  data: {
    functions: DocumentedFunction[] {
      name: string
      signature: string     // From Parser unchanged
      description: string   // Extracted from //++ comments
      examples: string[]    // From //?? comments
      warnings: string[]    // From //!! comments
      techDebt: string[]   // From //-- comments
      links: string[]      // From //>> comments
    }
    graph: DependencyGraph {
      nodes: Map<string, DocNode>
      edges: Map<string, string[]> // Who imports whom
    }
  }
}
```
**FORBIDDEN**: 
- Cannot import TypeScript
- Cannot parse code
- Cannot use regex on TypeScript
- MUST use Parser data AS-IS

### 🧪 **Prover** (Can use: Parser, Toolkit, Foundry)
**Purpose**: Test generator - achieves 100% coverage automatically  
**What It Does**: Analyzes Parser's AST to find all branches, generates tests using Foundry  
**Receives from Parser**:
```typescript
ParsedFunction {
  signature: "divide(a: number, b: number): number"
  // ... includes implicit branch info in AST
}
```
**Receives from Foundry**:
```typescript
Arbitrary<number> // Generates random numbers for testing
```
**Produces**:
```typescript
ContractOutput<GeneratedTests> {
  data: {
    functionTests: FunctionTest[] {
      targetFunction: string
      propertyTests: PropertyTest[] {
        property: string  // "division by zero returns Error"
        generator: string // "Foundry.arbitrary.number()"
        assertion: string // "expect(result).toBeError()"
      }
      branchTests: BranchTest[] {
        branch: string   // "if (b === 0)"
        testInputs: any[] // Values that trigger this branch
        expectedPath: string[]
      }
      coverage: CoverageReport {
        lines: number
        branches: number
        percentage: 100  // Always 100 or it fails
      }
    }
  }
}
```

---

## Layer 3: Runtime

### 🎨 **Components** (Can use: Parser, Toolkit, Foundry)
**Purpose**: JSX component library that compiles to IR  
**What It Does**: Declarative components for everything (forms, validation, calculations)  
**Exports Components That Produce**:
```typescript
IRNode {
  type: "element" | "text" | "component" | "expression"
  tag?: string
  props?: Record<string, any>
  children?: IRNode[]
  expression?: string  // For calculations
}
```
**Example**: `<Button onClick={handleClick}>` → IR node → HTML

### ⚙️ **Engine** (Can use: Parser, Toolkit, Foundry)
**Purpose**: Evaluates IR from Components and Maths  
**What It Does**: Takes IR trees, evaluates them to HTML or executes calculations  
**Receives IR From Components/Maths**:
```typescript
IRTree {
  root: IRNode
  context: Map<string, any>  // Variables, state
  validators: Validator[]
  calculations: Calculation[]
}
```
**Produces**:
```typescript
EvaluationResult {
  html: string          // Rendered output
  state: Map<string, any>
  errors: ValidationError[]
  computedValues: Map<string, any>
}
```

### 🔢 **Maths** (Can use: Parser, Toolkit, Foundry)
**Purpose**: Mathematical expression parser  
**What It Does**: Parses math expressions, compiles to Engine IR  
**Input**: `"2 * x + sqrt(y)"`  
**Output**:
```typescript
IRNode {
  type: "expression"
  operator: "+"
  left: { type: "expression", operator: "*", ... }
  right: { type: "function", name: "sqrt", ... }
}
```

---

## Layer 4: Distribution

### 🌐 **Mesh** (Can use: Components, Engine, Toolkit, Foundry)
**Purpose**: Distributed data with CRDTs, P2P, IPFS, Solid  
**What It Does**: Synchronizes data across peers, handles offline-first  
**Uses from Components/Engine**:
```typescript
// Components for UI
<MeshProvider endpoint="...">
  <SyncStatus />
</MeshProvider>

// Engine for evaluating sync rules
IRNode // Sync conditions as IR expressions
```
**Produces**:
```typescript
MeshState {
  local: CRDT<T>       // Local state
  peers: PeerState[]   // Connected peers
  conflicts: Conflict[] // Need resolution
  syncLog: Event[]     // What synced when
}
```

---

## The Critical Rules

1. **Parser** is the ONLY source of TypeScript AST - everyone else transforms its output
2. **Envoy** ONLY interprets comment syntax - cannot parse code itself
3. **Toolkit/Foundry** cannot import ANY @sitebender libraries (they're the foundation)
4. **No circular dependencies** - data flows in one direction through layers
5. **All inter-library data** is wrapped in `ContractOutput<T>` - immutable and validated

## Data Flow Diagram

```
Layer 0: [Toolkit] [Foundry]
           ↓         ↓
Layer 1: [Parser] ←──┘
           ↓
Layer 2: [Envoy] [Prover] ←── Both consume Parser output
           ↓         ↓
Layer 3: [Components] [Engine] [Maths]
           ↓         ↓
Layer 4: [Mesh] ←────┘
           ↓
Layer 5: [Applications]
```

## Contract Enforcement

Each library is split into:
- `exports/` - Public API, can be imported by allowed consumers
- `internal/` - Private implementation, cannot be imported by other libraries

The contract system enforces these boundaries through:
- Git hooks that block commits with violations
- Automated tests that detect forbidden imports
- Runtime validation with ContractOutput<T> wrapper
- Immutable, checksummed data between libraries

## Why This Architecture?

This design ensures:
- **Single Responsibility**: Each library does ONE thing well
- **No Duplication**: No library can replicate another's functionality
- **Clear Dependencies**: Data flows in one direction, no cycles
- **Enforceable Contracts**: Physical separation makes violations obvious
- **Type Safety**: Full TypeScript types flow through the system
- **Tree Shaking**: Direct imports, no barrel files, optimal bundling

This architecture is self-defending - violations are caught at multiple layers before they can corrupt the system.
