# AI Briefing: Property Test Generator Component

## Your Identity
- **Workspace:** toolkit-ai
- **Branch:** ai/toolkit  
- **Role:** Build property test generators for the automated test generator

## Essential Reading (Read These First!)
1. `CLAUDE.md` - Project manifesto and rules
2. `TESTING.md` - Testing philosophy (100% coverage mandate)
3. `agenda/libraries/toolkit/suggestions.md` - Test generator architecture (READ SECTION 2!)
4. `agenda/libraries/toolkit/planned.md` - Phase 0 details

## Your Specific Mission

### Build Property Test Generators
**Location:** `scripts/test-generator/src/generators/property.ts`

### Core Requirements

Create a `PropertyTestGenerator` class that:

1. **Generates tests from TypeScript signatures**
   - Parse function parameters and return types
   - Create appropriate fast-check arbitraries
   - Generate property-based test cases

2. **Type-to-Generator Mapping**
   ```typescript
   - number → fc.integer(), fc.float(), fc.double()
   - string → fc.string(), fc.unicode(), fc.ascii()
   - boolean → fc.boolean()
   - Array<T> → fc.array(generatorForT)
   - object → fc.object(), fc.record()
   - Function → fc.func(fc.anything())
   ```

3. **Algebraic Laws Detection**
   - Functor laws (map-like functions)
   - Monoid laws (concat-like functions)
   - Commutative laws (add, multiply)
   - Associative laws

4. **Edge Case Generation**
   - null/undefined inputs
   - Empty arrays/strings
   - Single element arrays
   - Zero, negative numbers, NaN, Infinity
   - Empty objects

### Example Implementation

```typescript
import * as fc from "npm:fast-check"

export class PropertyTestGenerator {
  generateForSignature(sig: FunctionSignature): TestCase[] {
    const tests: TestCase[] = []
    
    // Generate type-based properties
    tests.push(...this.generateTypeProperties(sig))
    
    // Generate algebraic law tests
    tests.push(...this.generateAlgebraicLaws(sig))
    
    // Generate edge cases
    tests.push(...this.generateEdgeCases(sig))
    
    return tests
  }
  
  private generateTypeProperties(sig: FunctionSignature): TestCase[] {
    // Implementation here
  }
}
```

### Expected Output

For a function like `map<A, B>(f: (a: A) => B) => (arr: A[]) => B[]`, generate:

```typescript
// Length preservation test
fc.assert(fc.property(
  fc.array(fc.anything()),
  fc.func(fc.anything()),
  (arr, fn) => {
    assertEquals(map(fn)(arr).length, arr.length)
  }
))

// Identity law test
fc.assert(fc.property(
  fc.array(fc.anything()),
  (arr) => {
    const identity = (x: any) => x
    assertEquals(map(identity)(arr), arr)
  }
))

// Composition law test
// map(f ∘ g) = map(f) ∘ map(g)
```

### Directory Structure to Create

```
scripts/test-generator/
├── src/
│   ├── generators/
│   │   ├── property.ts         # Your main file
│   │   ├── edge-cases.ts       # Edge case generators
│   │   ├── algebraic-laws.ts   # Law-based test generators
│   │   └── type-mappings.ts    # Type to fc generator mappings
│   └── types/
│       └── index.ts             # Shared types
```

## Success Criteria

Your component is successful when:
1. It can generate property tests for any toolkit function signature
2. It detects and applies relevant algebraic laws
3. It generates comprehensive edge cases
4. The generated tests achieve 100% branch coverage
5. It integrates with the main test generator

## Coordination

- The main test generator (being built in the main workspace) will call your PropertyTestGenerator
- Export a clean interface that the orchestrator can use
- Follow the manifesto: one function per file, pure functions, no classes (except this generator class)

## Start Here

1. Create the directory structure
2. Implement the basic PropertyTestGenerator class
3. Start with simple types (number, string, boolean)
4. Add array and object generation
5. Implement algebraic law detection
6. Add edge case generation

The test generator MUST achieve 100% coverage automatically - no exceptions!