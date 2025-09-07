# @sitebender/foundry

> Pure functional property-based testing and data generation for TypeScript. Zero dependencies. Zero classes. Zero compromises.

## What is Foundry?

Foundry is a pure functional library that serves three complementary purposes:

1. **Property-Based Testing** - Generate thousands of test cases from mathematical properties (like QuickCheck/fast-check)
2. **Deterministic Data Generation** - Create realistic fake data for testing, demos, and development
3. **Semantic Web Data Generation** - Generate RDF triples, ontologies, and knowledge graphs for triple stores like Apache Jena Fuseki

Built with the same uncompromising functional principles as the rest of @sitebender:
- ZERO dependencies
- ZERO classes or OOP
- ZERO mutations (except seeded random)
- ZERO null/undefined (Result monad everywhere)
- 100% pure functions
- 100% type-safe

## Architecture

```
libraries/foundry/
├── src/
│   ├── arbitrary/          # Core generators (primitives & combinators)
│   │   ├── integer/        # Generate integers with constraints
│   │   ├── string/         # Generate strings with patterns
│   │   ├── array/          # Generate arrays of arbitrary values
│   │   ├── record/         # Generate objects from schemas
│   │   ├── union/          # Generate union types
│   │   ├── map/            # Transform generator outputs
│   │   ├── filter/         # Filter generator outputs
│   │   └── chain/          # Monadic composition
│   │
│   ├── property/           # Property testing engine
│   │   ├── check/          # Run property tests
│   │   ├── assert/         # Property assertions
│   │   ├── laws/           # Mathematical law generators
│   │   │   ├── functor/    # Functor laws
│   │   │   ├── monad/      # Monad laws
│   │   │   └── monoid/     # Monoid laws
│   │   └── shrink/         # Minimal counterexample finder
│   │
│   ├── fake/               # Realistic data generators
│   │   ├── person/         # Names, emails, phones
│   │   ├── address/        # Streets, cities, postcodes
│   │   ├── company/        # Company names, departments
│   │   ├── internet/       # URLs, IPs, user agents
│   │   ├── commerce/       # Products, prices, SKUs
│   │   ├── identifier/     # UUIDs, ISBNs, barcodes
│   │   └── semantic/       # RDF/semantic web data
│   │       ├── triple/     # RDF triple generation
│   │       ├── ontology/   # OWL ontology generation
│   │       ├── graph/      # Knowledge graph generation
│   │       ├── uri/        # URI/IRI generation
│   │       ├── literal/    # RDF literal generation
│   │       ├── formats/    # Turtle, N-Triples, JSON-LD
│   │       └── domains/    # Domain ontologies (FOAF, Dublin Core, etc.)
│   │
│   ├── random/             # Seedable PRNG
│   │   ├── seed/           # Seed generation/validation
│   │   ├── next/           # Generate next random value
│   │   └── split/          # Split seed for independence
│   │
│   └── types/              # Type definitions
│       └── index.ts        # All foundry types (named exports)
│
└── tests/
    ├── behaviors/          # Behavioral tests
    └── properties/         # Self-hosted property tests
```

## Core Concepts

### 1. Arbitrary (Generator)

An Arbitrary is a pure function that generates values from a seed:

```typescript
type Arbitrary<T> = {
  readonly generate: (seed: Seed) => Result<T, GeneratorError>
  readonly shrink: (value: T) => ReadonlyArray<T>
}
```

### 2. Property

A Property is a mathematical law that should hold for all inputs:

```typescript
type Property<Arguments extends ReadonlyArray<unknown>> = {
  readonly name: string
  readonly arbitraries: { readonly [K in keyof Arguments]: Arbitrary<Arguments[K]> }
  readonly predicate: (arguments: Arguments) => Result<boolean, PropertyError>
}
```

### 3. Shrinking

When a property fails, shrinking finds the minimal counterexample:

```typescript
// Start with failing: [1000, -500, 777]
// Shrink to minimal: [1, 0, 1]
```

## How It Works

### Property Testing Flow

1. **Define Property** - Specify a mathematical law
2. **Generate Cases** - Create test inputs from arbitraries
3. **Check Property** - Verify the law holds
4. **Shrink Failures** - Find minimal counterexample
5. **Report Results** - Return success or minimal failure

### Data Generation Flow

1. **Choose Generator** - Select appropriate fake data type
2. **Configure Options** - Set constraints and patterns
3. **Supply Seed** - Provide deterministic seed
4. **Generate Data** - Produce consistent, realistic data

## Integration with Ecosystem

### With @sitebender/parser

Foundry uses Parser to understand TypeScript types:

```typescript
// Use parser to extract type information
import extractTypes from "@sitebender/parser/extractTypes/index.ts"
import { TypeInfo, TypeKind } from "@sitebender/parser/types/index.ts"

// Generate data that matches TypeScript types
function createGeneratorFromType(typeInfo: TypeInfo) {
  switch (typeInfo.kind) {
    case TypeKind.Primitive: return generatePrimitive(typeInfo)
    case TypeKind.Array: return generateArray(typeInfo.elementType)
    case TypeKind.Object: return generateRecord(typeInfo.members)
    // etc.
  }
}
```

### What Parser Provides to Foundry
- Type extraction from interfaces/types
- Constraint analysis for bounded types
- Union/intersection type decomposition
- Literal type values
- Generic type parameters

### With @sitebender/prover

Prover uses Foundry to generate test inputs:

```typescript
// Prover gets signature from parser
import extractSignature from "@sitebender/parser/extractSignature/index.ts"

// Foundry generates appropriate test data
import generateInteger from "@sitebender/foundry/arbitrary/generateInteger/index.ts"
import generateString from "@sitebender/foundry/arbitrary/generateString/index.ts"

const signature = extractSignature(sourceCode)
const testData = signature.parameters.map(param => 
  generateFromType(param.type)
)
```

### What Foundry Provides to Prover
- Deterministic test data generation
- Property-based testing infrastructure
- Edge case generators
- Shrinking algorithms for minimal counterexamples

### With @sitebender/scribe

Scribe uses Foundry for realistic documentation examples:

```typescript
// Scribe gets function info from parser
import extractSignature from "@sitebender/parser/extractSignature/index.ts"

// Foundry generates realistic examples
import generatePerson from "@sitebender/foundry/fake/generatePerson/index.ts"
import generateCompany from "@sitebender/foundry/fake/generateCompany/index.ts"

// Include in documentation
const examples = generateExamplesForFunction(signature)
```

### What Foundry Provides to Scribe
- Realistic fake data for examples
- Property test examples
- Edge case demonstrations
- Domain-specific data (RDF, ontologies)

## Coordination with Other Libraries

### Communication Protocol

**WHEN working on Foundry:**
- Check parser for type extraction capabilities
- Coordinate with prover on generator needs
- Align with scribe on example generation

**TELL other teams when:**
- Adding new generator types
- Changing generator interfaces
- Adding domain-specific generators (RDF, etc.)
- Improving shrinking algorithms

**USE parser for:**
- All TypeScript type analysis
- Constraint extraction
- Union/intersection decomposition
- Never parse TypeScript directly

## For AI Agents Working on Foundry

**COORDINATE on:**
1. Generator naming conventions with prover
2. Example data formats with scribe
3. Type extraction needs with parser

**NEVER:**
1. Parse TypeScript directly (use parser)
2. Duplicate type analysis (use parser)
3. Create incompatible generator interfaces

**ALWAYS:**
1. Use descriptive function names (no namespacing)
2. Follow pure functional principles
3. Return Result monads for errors
4. Document generator constraints

## Implementation Plan

### Phase 1: Core (Week 1)
- [ ] Seed-based PRNG
- [ ] Basic arbitraries (integer, string, boolean)
- [ ] Combinators (map, filter, chain)
- [ ] Property runner
- [ ] Basic shrinking

### Phase 2: Arbitraries (Week 2)
- [ ] Complex types (array, record, union)
- [ ] Recursive arbitraries
- [ ] Weighted unions
- [ ] Frequency combinators
- [ ] Size control

### Phase 3: Properties (Week 3)
- [ ] Mathematical laws (functor, monad, monoid)
- [ ] Custom property builders
- [ ] Async property support
- [ ] Property composition
- [ ] Coverage tracking

### Phase 4: Fake Data (Week 4)
- [ ] Person generators (names, emails)
- [ ] Address generators
- [ ] Company generators
- [ ] Internet generators
- [ ] Commerce generators

### Phase 5: Semantic Web Data (Week 5)
- [ ] URI/IRI generators
- [ ] RDF triple generation
- [ ] Ontology generation (OWL)
- [ ] Knowledge graph generation
- [ ] Format serializers (Turtle, N-Triples, JSON-LD)
- [ ] Domain ontologies (FOAF, Dublin Core, Schema.org)
- [ ] SPARQL query property testing

### Phase 6: Integration (Week 6)
- [ ] Prover integration
- [ ] Scribe integration
- [ ] Apache Jena Fuseki integration examples
- [ ] Performance optimization
- [ ] Documentation
- [ ] Examples

## Usage Examples

### Property Testing

```typescript
import generateInteger from "@sitebender/foundry/arbitrary/generateInteger/index.ts"
import createProperty from "@sitebender/foundry/property/createProperty/index.ts"
import checkProperty from "@sitebender/foundry/property/checkProperty/index.ts"

// Define a property: addition is commutative
const commutative = createProperty(
  "addition is commutative",
  [generateInteger(), generateInteger()],
  ([a, b]) => add(a, b) === add(b, a)
)

// Check the property
const result = checkProperty(commutative, { runs: 1000 })
result.fold(
  failure => console.error(`Failed with: ${failure.counterexample}`),
  success => console.log(`Passed ${success.runs} tests`)
)
```

### Fake Data Generation

```typescript
import generatePerson from "@sitebender/foundry/fake/generatePerson/index.ts"
import generateCompany from "@sitebender/foundry/fake/generateCompany/index.ts"
import createSeed from "@sitebender/foundry/random/createSeed/index.ts"

// Generate consistent test data
const testSeed = createSeed(12345)
const testPerson = generatePerson(testSeed)
  .map(p => ({
    ...p,
    company: generateCompany(testSeed).getOrElse("ACME Corp")
  }))

// Result: { 
//   firstName: "Alice",
//   lastName: "Smith",
//   email: "alice.smith@example.com",
//   company: "TechCorp Industries"
// }
```

### Law Verification

```typescript
import { functorLaws } from "@sitebender/foundry/property/laws"
import { arrayArbitrary } from "@sitebender/foundry"

// Verify that Array is a lawful Functor
const arrayFunctorLaws = functorLaws(
  arrayArbitrary(integer()),
  map,  // Your map implementation
)

arrayFunctorLaws.forEach(law => {
  check(law, { runs: 1000 }).fold(
    failure => console.error(`${law.name} violated!`),
    success => console.log(`${law.name} verified`)
  )
})
```

### Semantic Web / RDF Generation

```typescript
import generateTriple from "@sitebender/foundry/fake/semantic/generateTriple/index.ts"
import generateOntology from "@sitebender/foundry/fake/semantic/generateOntology/index.ts"
import generateKnowledgeGraph from "@sitebender/foundry/fake/semantic/generateKnowledgeGraph/index.ts"
import convertToTurtle from "@sitebender/foundry/fake/semantic/formats/convertToTurtle/index.ts"
import generateFoafPerson from "@sitebender/foundry/fake/semantic/domains/foaf/generateFoafPerson/index.ts"

// Generate an ontology
const myOntology = generateOntology().generate(createSeed(42))
  .map(onto => ({
    ...onto,
    namespace: "http://example.org/my-onto#"
  }))

// Generate RDF triples
const triples = generateTriple(myOntology)
  .array({ min: 100, max: 500 })
  .generate(createSeed(123))

// Convert to Turtle format
const turtleData = triples.map(convertToTurtle)

// Generate a knowledge graph with realistic structure
const graph = knowledgeGraph({
  nodes: 1000,
  hubCount: 10,  // High-connectivity nodes
  averageDegree: 6,
  ontology: myOntology
}).generate(seed(456))

// Generate FOAF social network
const socialNetwork = foafPerson()
  .array({ min: 50, max: 100 })
  .map(people => connectPeople(people))  // Add knows relationships
  .generate(seed(789))

// Upload to Apache Jena Fuseki
const uploadToFuseki = async (data: string) => {
  const response = await fetch("http://localhost:3030/dataset/data", {
    method: "POST",
    headers: { "Content-Type": "text/turtle" },
    body: data
  })
  return response.ok
}

// Test SPARQL queries with properties
const sparqlProperty = property(
  "UNION is commutative",
  [knowledgeGraph(100), sparqlPattern(), sparqlPattern()],
  ([graph, pattern1, pattern2]) => {
    const query1 = `SELECT * WHERE { ${pattern1} UNION ${pattern2} }`
    const query2 = `SELECT * WHERE { ${pattern2} UNION ${pattern1} }`
    const result1 = executeSparql(query1, graph)
    const result2 = executeSparql(query2, graph)
    return setsEqual(result1, result2)
  }
)
```

## Design Principles

1. **Pure Functions Only** - No classes, no mutations, no side effects
2. **Result Monad Everywhere** - No null, no undefined, no throws
3. **Deterministic Generation** - Same seed = same output, always
4. **Type-Safe** - Full TypeScript types, no any
5. **Composable** - Small functions that combine into complex behaviors
6. **Zero Dependencies** - Complete control, no supply chain risks

## Code Organization

Following @sitebender's sacred structure:

### Functions
- **One function per file** - Each function in its own `index.ts`
- **Named functions only** - `export default function functionName(...)`
- **Helper functions in subfolders** - Dependencies nest below consumers
- **camelCase folder names** - `generateInteger`, not `generate-integer`

### Types & Constants
- **Types grouped in `types/index.ts`** - Named exports at lowest common ancestor
- **Constants grouped in `constants/index.ts`** - Named exports where shared
- **Local constants stay local** - If only one function uses it, keep it there

### Example Structure
```
arbitrary/
├── integer/
│   ├── index.ts           # Main integer generator function
│   ├── shrinkInteger/     # Helper function
│   │   └── index.ts
│   └── types/
│       └── index.ts       # Types used by integer and its helpers
└── types/
    └── index.ts           # Types used across all arbitraries
```

## Why Not fast-check?

- **Zero dependencies** - We control everything
- **Pure functional** - No classes or OOP patterns
- **Result monad** - Better error handling
- **Custom features** - Exactly what we need
- **Integration** - Designed for @sitebender ecosystem
- **Learning** - Understanding by building

## Status

🚧 **Under Construction** - This library is being actively developed.

## License

MIT

---

*"In the foundry of code, we forge unbreakable software through mathematical truth."*