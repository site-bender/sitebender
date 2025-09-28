# Quarrier Implementation Todos

## Core Philosophy
Build a pure functional property-based testing library with:
- Pipeline-based architecture
- Lazy shrink trees from day one
- Effects as values (not IO monads)
- Bidirectional generators (parse + generate)
- Proof-carrying properties
- Metamorphic testing capabilities
- Zero external dependencies

## Milestone 0: Clean Slate
### Clear existing implementation
- [ ] Archive current src to src.old for reference
- [ ] Create new folder structure per proposal
- [ ] Set up types/index.ts with core types
- [ ] Establish import conventions

**Definition of Done**: Empty folder structure ready, old code archived

## Milestone 1: Algebraic Foundations
### Core Types
- [ ] Generator protocol (next, shrink, parse?)
- [ ] GeneratorResult with size awareness
- [ ] ShrinkTree lazy implementation
- [ ] Effect ADT (Pure, Async, IO, Random)
- [ ] Pipeline Stage types
- [ ] Seed type with dual state

### PRNG Implementation
- [ ] PCG XSH RR 32 or SplitMix32 algorithm
- [ ] createSeed with validation
- [ ] nextUint32 pure function
- [ ] nextFloat53 for [0,1) range
- [ ] splitSeed for independence
- [ ] boundedInt without bias

### Pipeline Composition
- [ ] pipe function for stage composition
- [ ] identity stage
- [ ] kleisli composition for dependent generation

### Effect System
- [ ] Effect type hierarchy
- [ ] interpret function for boundary
- [ ] Effect combinators (map, chain, all)

**Definition of Done**: Can compose generators through pipelines, PRNG is deterministic and splittable, effects are values

## Milestone 2: Core Generators
### Primitive Generators
- [ ] boolean generator with shrinking
- [ ] integer generator with boundedInt
- [ ] float generator with precision control
- [ ] string generator with char sets
- [ ] bigint generator
- [ ] date generator

### Shrinking Strategies
- [ ] Integer shrinking (halve toward zero)
- [ ] String shrinking (length first)
- [ ] Boolean shrinking (true → false)
- [ ] Float shrinking (toward integers)

### Basic Combinators
- [ ] map combinator
- [ ] filter combinator with retry
- [ ] chain for dependent generation
- [ ] constant generator
- [ ] constantFrom for enums
- [ ] oneOf for unions

**Definition of Done**: All primitives generate and shrink correctly, combinators compose cleanly

## Milestone 3: Composite Generators
### Structure Generators
- [ ] arrayOf with size control
- [ ] tuple for fixed arrays
- [ ] record for objects
- [ ] unionOf with branch switching
- [ ] maybeOf (no null/undefined)
- [ ] fix for recursive structures

### Advanced Combinators
- [ ] sized for size-aware generation
- [ ] scaleSize for size transformation
- [ ] frequency for weighted choice
- [ ] suchThat as filter alias

### Bidirectional Features
- [ ] parse method on generators
- [ ] Round-trip properties
- [ ] Validation through parsing

**Definition of Done**: Can generate complex nested structures with proper shrinking

## Milestone 4: Property Engine
### Property Creation
- [ ] createProperty with normalization
- [ ] Property type with Effect predicate
- [ ] normalizePredicate helper
- [ ] PropertyProof types

### Test Runner
- [ ] checkProperty main runner
- [ ] Size progression (sqrt default)
- [ ] Deterministic seed threading
- [ ] Effect interpretation at boundary

### Shrink Search
- [ ] DFS with trampoline
- [ ] Resumable shrink state
- [ ] Step/time budgets
- [ ] Minimal counterexample finding
- [ ] Optional IDDFS mode

### Reporting
- [ ] Pure data structures for results
- [ ] Coverage collection
- [ ] Duration tracking
- [ ] Formatted output helpers

**Definition of Done**: Can run properties with shrinking and get minimal counterexamples

## Milestone 5: Proof & Metamorphic Features
### Proof-Carrying Properties
- [ ] ProofOf type system
- [ ] Determinism proofs
- [ ] Termination proofs
- [ ] Soundness proofs
- [ ] Proof verification

### Metamorphic Testing
- [ ] Metamorphic type
- [ ] Property derivation
- [ ] Idempotence properties
- [ ] Involution properties
- [ ] Length-preserving properties

### Law Builders
- [ ] Functor laws
- [ ] Monad laws
- [ ] Monoid laws
- [ ] Custom law builders

**Definition of Done**: Properties carry proofs, can derive related properties automatically

## Milestone 6: Integration Layer
### Arborist Integration
- [ ] fromTypeInfo entry point
- [ ] Primitive type mapping
- [ ] Array type handling
- [ ] Object type handling
- [ ] Union type handling
- [ ] Error reporting with paths

### Toolsmith Reuse
- [ ] Standardize Result imports
- [ ] Use array utilities
- [ ] Use functional helpers
- [ ] No reinvention policy

**Definition of Done**: Can generate arbitraries from TypeScript types

## Milestone 7: Advanced Features
### Statistical Testing
- [ ] Distribution properties
- [ ] Hypothesis testing
- [ ] Bayesian inference
- [ ] Coverage metrics

### Performance
- [ ] Parallel property checking
- [ ] Distributed shrinking
- [ ] Memory-efficient trees
- [ ] Benchmark suite

### Debugging
- [ ] Shrink path visualization
- [ ] Replay from seed
- [ ] Step-through shrinking
- [ ] Property traces

**Definition of Done**: Advanced testing patterns work efficiently

## Milestone 8: Fake Data Layer
### Person Generators
- [ ] Names (first, last, full)
- [ ] Emails with domains
- [ ] Phone numbers by region
- [ ] Addresses with validation

### Internet Data
- [ ] URLs with protocols
- [ ] IP addresses (v4/v6)
- [ ] User agents
- [ ] MAC addresses

### Commerce Data
- [ ] Products with categories
- [ ] Prices with currency
- [ ] SKUs with patterns
- [ ] Credit card numbers (valid)

### Identifiers
- [ ] UUIDs (v4, v7)
- [ ] ISBNs with check digits
- [ ] Barcodes (EAN, UPC)
- [ ] Social security formats

**Definition of Done**: Realistic fake data generation with proper formats

## Milestone 9: Semantic Web Features
### RDF Generation
- [ ] URI/IRI generators
- [ ] Triple generation
- [ ] Literal values with types
- [ ] Blank nodes

### Ontology Support
- [ ] OWL class generation
- [ ] Property generation
- [ ] Restriction generation
- [ ] Axiom generation

### Knowledge Graphs
- [ ] Graph structure generation
- [ ] Hub detection
- [ ] Community structure
- [ ] Scale-free networks

### Format Serializers
- [ ] Turtle serialization
- [ ] N-Triples format
- [ ] JSON-LD output
- [ ] RDF/XML generation

### Domain Ontologies
- [ ] FOAF person networks
- [ ] Dublin Core metadata
- [ ] Schema.org entities
- [ ] Custom domain support

### SPARQL Testing
- [ ] Query generation
- [ ] Result validation
- [ ] Query properties
- [ ] Fuseki integration

**Definition of Done**: Can generate and test semantic web data at scale

## Milestone 10: Documentation & Examples
### API Documentation
- [ ] Envoy comments on all exports
- [ ] Usage examples per function
- [ ] Gotchas and edge cases
- [ ] Performance notes

### Tutorials
- [ ] Getting started guide
- [ ] Property testing basics
- [ ] Shrinking explained
- [ ] Custom generators
- [ ] Integration patterns

### Examples
- [ ] Common properties
- [ ] Domain modeling
- [ ] Round-trip testing
- [ ] Metamorphic patterns
- [ ] Performance testing

**Definition of Done**: Fully documented with clear examples

## Milestone 11: Self-Testing
### Property Tests
- [ ] Test generators with themselves
- [ ] Shrinking properties
- [ ] Combinator laws
- [ ] PRNG properties

### Integration Tests
- [ ] End-to-end scenarios
- [ ] Arborist round-trips
- [ ] Performance benchmarks
- [ ] Memory profiling

**Definition of Done**: Library tests itself comprehensively

## Future Extensions (ASAP)
### Cloud Features
- [ ] Cloud-based generation
- [ ] Distributed property runs
- [ ] Result aggregation
- [ ] Real-time monitoring

### Formal Methods
- [ ] SMT solver integration
- [ ] Symbolic execution
- [ ] Model checking hooks
- [ ] Proof extraction

### AI Integration
- [ ] ML-guided shrinking
- [ ] Pattern learning
- [ ] Anomaly detection
- [ ] Test synthesis

## Implementation Notes

### Order of Attack
1. Start with clean slate and core types
2. Build PRNG and basic generators
3. Add shrinking immediately (not deferred)
4. Property engine with effects
5. Integration points
6. Advanced features
7. Documentation throughout

### Key Principles
- One function per file
- Named exports only
- No classes ever
- No mutation (except PRNG state)
- Result monad everywhere
- Direct imports (no barrels)
- Envoy comments mandatory

### Review Points
Stop for review after:
- PRNG implementation
- First 3 generators
- Shrink tree implementation
- Property runner
- Arborist integration
- Each major milestone

## Success Metrics
- Zero external dependencies achieved
- All properties deterministic
- Shrinking finds true minimal cases
- Performance competitive with fast-check
- Integration seamless with ecosystem
- Documentation comprehensive

## Current Status
**Phase**: Pre-implementation
**Next Step**: Archive current code, create folder structure
**Blocker**: None
**Timeline**: Rapid iteration, review-driven

---

*"The pipeline paradigm delivers everything immediately through compositional simplicity."*
