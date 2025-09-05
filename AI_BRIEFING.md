# AI Briefing: Test Generator Core (CRITICAL PATH)

## Your Identity
- **Workspace:** Main repository (sitebender)
- **Branch:** ai/test-generator
- **Role:** Build the core test generator that will achieve 100% coverage on 874 toolkit functions
- **Priority:** MOST CRITICAL - Everything depends on this

## Essential Reading (Read These First!)
1. `CLAUDE.md` - Project manifesto and rules
2. `TESTING.md` - Testing philosophy with test generator section
3. `agenda/libraries/toolkit/suggestions.md` - Complete test generator architecture (READ ALL)
4. `agenda/libraries/toolkit/planned.md` - Phase 0 test generator plan
5. `TOOLKIT_PARALLEL_TASKS.md` - See what other AIs are building

## Your Mission: Build the Test Generator Core

### The Test Generator's Role
```
Function → TEST GENERATOR → Comprehensive Test Suite → 100% Coverage
              ↑
        Your responsibility
```

### What You're Building

The core orchestrator that:
1. **Parses** TypeScript function signatures
2. **Analyzes** code for branches and paths
3. **Generates** comprehensive test suites
4. **Validates** 100% coverage
5. **Writes** test files automatically

### Core Components to Build

#### 1. Type Signature Parser (`scripts/test-generator/src/parser/index.ts`)
```typescript
import * as ts from "typescript"

export class TypeSignatureParser {
  parse(filePath: string): FunctionSignature {
    // Parse TypeScript file
    // Extract function signature
    // Identify parameters, return type, generics
    // Detect currying patterns
    // Return structured signature data
  }
}
```

#### 2. Main Orchestrator (`scripts/test-generator/src/index.ts`)
```typescript
export class TestGenerator {
  parser: TypeSignatureParser
  propertyGenerator: PropertyTestGenerator  // Being built by Claude #2
  branchAnalyzer: BranchAnalyzer
  coverageValidator: CoverageValidator
  testWriter: TestFileWriter
  
  async generateTests(functionPath: string): Promise<TestSuite> {
    // 1. Parse signature
    // 2. Analyze branches
    // 3. Generate tests
    // 4. Validate coverage
    // 5. Write test file
  }
}
```

#### 3. Branch Analyzer (`scripts/test-generator/src/coverage/branch-analyzer.ts`)
```typescript
export class BranchAnalyzer {
  analyze(sourceCode: string): BranchPath[] {
    // Parse AST
    // Find all if/else branches
    // Find all ternary operators
    // Find all null checks
    // Find all try/catch blocks
    // Return all paths through code
  }
}
```

#### 4. Coverage Validator (`scripts/test-generator/src/coverage/validator.ts`)
```typescript
export class CoverageValidator {
  async validate(functionPath: string, tests: TestCase[]): Promise<CoverageResult> {
    // Write temp test file
    // Run with Deno coverage
    // Check if 100%
    // If not, generate more tests
    // If still not, add coverage ignores with reasons
    // Return final coverage report
  }
}
```

#### 5. Test File Writer (`scripts/test-generator/src/writer/index.ts`)
```typescript
export class TestFileWriter {
  write(functionPath: string, tests: TestCase[]): Promise<void> {
    // Determine test file path
    // Generate imports
    // Write test cases
    // Format with deno fmt
    // Save to disk
  }
}
```

### Directory Structure to Create
```
scripts/test-generator/
├── src/
│   ├── index.ts              # Main orchestrator
│   ├── parser/
│   │   └── index.ts          # TypeScript parser
│   ├── generators/           # (Claude #2 is building this)
│   │   └── property.ts       
│   ├── coverage/
│   │   ├── branch-analyzer.ts
│   │   └── validator.ts
│   ├── writer/
│   │   └── index.ts          # Test file writer
│   └── types/
│       └── index.ts          # Shared types
├── tests/                    # Test the test generator!
└── generate-all.ts           # Script to run on all 874 functions
```

### Current State & Coordination

**Other AIs are building:**
- **Claude #2:** Property test generator component (`generators/property.ts`)
- **Claude Sonnet:** Engine for the demo
- **ChatGPT-5:** Components for the demo

**Your component must:**
- Integrate with Claude #2's property generator
- Call all sub-components in correct order
- Achieve 100% coverage or add justified ignores

### Implementation Order

1. **First: Create directory structure**
2. **Second: Define types in `types/index.ts`**
3. **Third: Build TypeSignatureParser**
4. **Fourth: Build BranchAnalyzer**
5. **Fifth: Build CoverageValidator**
6. **Sixth: Build TestFileWriter**
7. **Seventh: Build main orchestrator**
8. **Eighth: Test on sample functions**
9. **Ninth: Create generate-all.ts script**

### Success Criteria

The test generator succeeds when:
1. It can parse any toolkit function signature
2. It generates comprehensive test suites
3. It achieves 100% coverage (or adds justified ignores)
4. It writes properly formatted test files
5. It runs on all 874 functions successfully

### Example Usage

```bash
# Generate tests for a single function
deno run --allow-all scripts/test-generator/src/index.ts \
  libraries/toolkit/src/simple/array/map/index.ts

# Generate tests for all functions
deno run --allow-all scripts/test-generator/generate-all.ts

# Expected output:
# ✅ Generated tests for 874 functions
# ✅ Average coverage: 100%
# ✅ Files with ignores: 12 (with reasons)
# ✅ Total test cases created: 52,344
```

### Critical Requirements

1. **100% coverage is non-negotiable** - Add ignores with REASONS if truly untestable
2. **No manual test writing** - Everything automated
3. **Property-based testing** - Use fast-check for comprehensiveness
4. **Algebraic laws** - Detect and test mathematical properties
5. **Edge cases** - Automatically generate null, undefined, empty, etc.

### The Christmas Demo Connection

While the test generator isn't directly in the demo, it:
1. Proves the toolkit is rock-solid
2. Enables rapid development with confidence
3. Shows the power of metaprogramming
4. Achieves 100% coverage mandate

### Notes from Previous Session

- We have 4 AIs working in parallel
- Two Claude instances are running (amazing!)
- The setup uses git worktrees to avoid conflicts
- Everyone is focused on the Christmas demo
- Test generator is the foundation for everything

## Start Here

1. Check if any work was already started
2. Create the directory structure
3. Start with TypeSignatureParser
4. Build each component in order
5. Test on `libraries/toolkit/src/simple/math/add/index.ts` first
6. Expand to more complex functions
7. Achieve 100% coverage!

The entire project's quality depends on this test generator. Build it right!