# Formulator Implementation Plan

> **Comprehensive roadmap to complete the Formulator library following all architectural rules**

## Current State Assessment

The library is partially functional but broken due to an incomplete refactor and rule violations:

### Working Components

- ✅ Basic tokenizer (handles math operators, numbers, identifiers)
- ✅ Original parser (OOP-style with mutable context - violates FP rules)
- ✅ Compiler to Architect IR (one direction only)
- ✅ Support for arithmetic operators (+, -, \*, /, ^)
- ✅ Support for comparison operators (<, >, ==, !=, <=, >=)
- ✅ Variable resolution from injector configs

### Broken Components

- ❌ State monad refactor incomplete (import errors from toolsmith)
- ❌ Tests broken (wrong Result type usage, import errors)
- ❌ Demo crashes (Result type handling issues)
- ❌ Mixed Result patterns (homemade vs toolsmith)
- ❌ No decompiler (IR → formula string)
- ❌ No chemical formula support
- ❌ No MathML/ChemML generation

## Phase 1: Fix Critical Infrastructure (Week 1)

### 1.1 Fix Result Type Usage Throughout

- [ ] Replace ALL homemade Result usage with toolsmith Result
- [ ] Update all `.ok`/`.value` patterns to use `isOk()`/`isErr()`/`.right`/`.left`
- [ ] Fix demo Result handling to use proper destructuring
- [ ] Ensure consistent Result usage in tokenizer, parser, compiler

### 1.2 Complete State Monad Parser Refactor

- [ ] Fix toolsmith import paths in state parser files
- [ ] Complete Phase 3 Step 2: Add USE_STATE_PARSER feature flag
- [ ] Complete Phase 3 Step 3: Verify parity between old and new parsers
- [ ] Complete Phase 4: Migrate to state parser and remove old implementation
- [ ] Delete all OOP-style parser code

### 1.3 Fix Test Infrastructure

- [ ] Convert ALL tests to use Deno.test (no describe/it)
- [ ] Fix test directory configuration in deno.jsonc
- [ ] Ensure all tests use toolsmith Result properly
- [ ] Achieve 100% test pass rate
- [ ] Add coverage reporting

### 1.4 Fix Demo Application

- [ ] Fix Result handling in formatDemoResult
- [ ] Add more comprehensive demo cases
- [ ] Ensure demo runs without errors
- [ ] Add demo for each operator type

## Phase 2: Implement Decompilation (Week 2)

### 2.1 Create Decompiler Core

- [ ] Create `src/decompiler/index.ts`
- [ ] Create `src/decompiler/decompileNode/index.ts` for AST → string
- [ ] Create `src/decompiler/fromIr/index.ts` for IR → AST reverse
- [ ] Handle operator precedence with minimal parentheses
- [ ] Support all existing operators

### 2.2 Variable Name Generation

- [ ] Create `src/decompiler/generateVariableName/index.ts`
- [ ] Extract names from FromElement (sanitize IDs)
- [ ] Extract names from FromQueryString params
- [ ] Extract names from storage keys
- [ ] Handle anonymous constants (x, y, z sequence)
- [ ] Implement collision resolution strategies

### 2.3 Decompiler Testing

- [ ] Property test: parse → decompile → parse preserves structure
- [ ] Test precedence preservation
- [ ] Test variable naming strategies
- [ ] Test collision handling
- [ ] Add decompiler demos

## Phase 3: Extend Mathematical Support (Week 3)

### 3.1 Logical Operators

- [ ] Add tokenizer support for &&, ||, !, ^^ (xor), -> (implies)
- [ ] Add Unicode variants (∧, ∨, ¬, ⊕, →)
- [ ] Add parser support with correct precedence
- [ ] Add compiler support to Architect logical operators
- [ ] Add decompiler support

### 3.2 Smart Symbol Recognition

- [ ] Create `src/tokenizer/symbolMap/index.ts` for romanization mapping
- [ ] Map Greek letters: alpha→α, beta→β, gamma→γ, delta→δ, etc.
- [ ] Map uppercase Greek: Alpha→Α, Beta→Β, Gamma→Γ, Delta→Δ, etc.
- [ ] Map math operators: times→×, div→÷, leq→≤, geq→≥, neq→≠, etc.
- [ ] Map calculus: integral→∫, partial→∂, nabla→∇, grad→∇
- [ ] Map set theory: subset→⊂, union→∪, intersection→∩, in→∈
- [ ] Map logic: forall→∀, exists→∃, and→∧, or→∨, not→¬
- [ ] Add symbol recognition to tokenizer pipeline
- [ ] Support both ASCII and romanized input
- [ ] Add tests for all symbol mappings

### 3.3 Mathematical Functions

- [ ] Create `src/functions/index.ts` registry
- [ ] Add trigonometric: sin, cos, tan, asin, acos, atan
- [ ] Add logarithmic: log, ln, exp
- [ ] Add rounding: round, floor, ceil, trunc
- [ ] Add statistical: sum, avg, min, max, median, stdev
- [ ] Add other: abs, sign, sqrt, cbrt
- [ ] Update tokenizer for function calls
- [ ] Update parser for function syntax
- [ ] Map to Architect function operators

### 3.3 Mathematical Constants

- [ ] Add PI/π, E/e, PHI/φ support
- [ ] Add infinity (∞) support
- [ ] Map to Architect constants
- [ ] Handle in decompiler

### 3.4 Advanced Operators

- [ ] Add modulo (%, mod)
- [ ] Add factorial (!)
- [ ] Add permutation/combination (nPr, nCr)
- [ ] Add summation/product notation (Σ, Π)

## Phase 4: Chemical Formula Support (Week 4)

### 4.1 Chemical Tokenizer

- [ ] Create `src/chemical/tokenizer/index.ts`
- [ ] Parse element symbols (H, He, Li, etc.)
- [ ] Parse subscripts (H2O → H₂O)
- [ ] Parse superscripts for charges (Na+ → Na⁺)
- [ ] Parse parentheses for groups (Ca(OH)2)
- [ ] Parse arrows (→, ⇌)
- [ ] Parse phase indicators ((s), (l), (g), (aq))

### 4.2 Chemical Parser

- [ ] Create `src/chemical/parser/index.ts`
- [ ] Build molecule AST nodes
- [ ] Handle nested groups
- [ ] Parse equations (reactants → products)
- [ ] Parse equilibrium notation
- [ ] Parse catalysts

### 4.3 Chemical Compiler

- [ ] Create `src/chemical/compiler/index.ts`
- [ ] Define Molecule IR structure
- [ ] Define Reaction IR structure
- [ ] Map to Architect chemical operators (if they exist)
- [ ] Calculate molecular weights
- [ ] Balance equations (stretch goal)

### 4.4 Chemical Decompiler

- [ ] Create `src/chemical/decompiler/index.ts`
- [ ] IR → chemical formula string
- [ ] Preserve subscripts/superscripts
- [ ] Format equations properly

## Phase 5: MathML & ChemML Generation (Week 5)

### 5.1 MathML Generator

- [ ] Create `src/converters/toMathML/index.ts`
- [ ] Map AST nodes to MathML elements
- [ ] Handle operators: `<mo>`, `<mrow>`
- [ ] Handle identifiers: `<mi>`
- [ ] Handle numbers: `<mn>`
- [ ] Handle fractions: `<mfrac>`
- [ ] Handle exponents: `<msup>`
- [ ] Handle roots: `<msqrt>`, `<mroot>`
- [ ] Handle functions: `<mrow><mi>sin</mi><mo>(</mo>...`
- [ ] Add proper `<math>` wrapper with namespace

### 5.2 ChemML Generator

- [ ] Create `src/converters/toChemML/index.ts`
- [ ] Research ChemML/CML standards
- [ ] Map molecule AST to ChemML
- [ ] Handle subscripts/superscripts semantically
- [ ] Include atomic data (atomic number, mass)
- [ ] Support reaction notation

### 5.3 Molecular Structure Visualization

- [ ] Create `src/converters/toMolecularStructure/index.ts`
- [ ] Generate 2D bond-line structures with proper angles
- [ ] Calculate 3D coordinates for ball-and-stick models
- [ ] Generate Lewis dot structures with lone pairs
- [ ] Support space-filling (CPK) models
- [ ] Create orbital diagrams for electron configuration
- [ ] Handle resonance structures
- [ ] Support Newman projections for conformational analysis
- [ ] Support Fischer projections for stereochemistry
- [ ] Create bond angle and length calculations
- [ ] Add hybridization detection (sp, sp², sp³)

### 5.4 Pagewright Components

- [ ] Create `libraries/pagewright/src/scientific/MathMLDisplay/index.tsx`
- [ ] Create `libraries/pagewright/src/scientific/ChemMLDisplay/index.tsx`
- [ ] Create `libraries/pagewright/src/scientific/MoleculeViewer/index.tsx`
- [ ] Ensure semantic HTML wrapper
- [ ] Add fallback for non-MathML browsers
- [ ] Include print styles
- [ ] Add interactive features via data-enhance

### 5.5 Reverse Converters

- [ ] Create `src/converters/fromMathML/index.ts`
- [ ] Create `src/converters/fromChemML/index.ts`
- [ ] Parse MathML → AST
- [ ] Parse ChemML → molecule AST
- [ ] Enable round-trip conversion

## Phase 6: Advanced Features (Week 6)

### 6.1 Type System Enhancements

- [ ] Create `src/types/dimensions/index.ts` for unit analysis
- [ ] Support units in formulas (5m, 10kg, 3m/s)
- [ ] Dimensional analysis (catch m + kg errors)
- [ ] Automatic unit conversion where sensible

### 6.2 Formula Optimization

- [ ] Create `src/optimizer/index.ts`
- [ ] Simplify expressions (x \* 1 → x, x + 0 → x)
- [ ] Constant folding (2 + 3 → 5)
- [ ] Common subexpression elimination
- [ ] Algebraic simplification

### 6.3 Error Recovery

- [ ] Implement error recovery in parser
- [ ] Suggest fixes for common mistakes
- [ ] Handle Unicode normalization issues
- [ ] Provide detailed error messages with positions

### 6.4 Performance Optimization

- [ ] Add formula caching layer
- [ ] Implement streaming parser for large formulas
- [ ] Add benchmarks for all operations
- [ ] Optimize hot paths

## Phase 7: Testing & Documentation (Ongoing)

### 7.1 Property-Based Testing

- [ ] Use Quarrier for property test generation
- [ ] Test parse/decompile round-trip
- [ ] Test operator precedence properties
- [ ] Test type inference properties
- [ ] Test chemical formula properties
- [ ] Test MathML/ChemML round-trip

### 7.2 Integration Testing

- [ ] Test with Architect library
- [ ] Test with Pagewright components
- [ ] Test in SSR context
- [ ] Test in browser context
- [ ] Test with various injector types

### 7.3 Documentation

- [ ] Add Envoy comments to ALL functions
- [ ] Create comprehensive examples
- [ ] Document all operators and functions
- [ ] Create formula syntax guide
- [ ] Add troubleshooting guide

### 7.4 Demos

- [ ] Interactive formula playground
- [ ] Chemical equation balancer
- [ ] Unit converter
- [ ] Mathematical function grapher
- [ ] Formula simplifier

## Phase 8: Polish & Release (Week 8)

### 8.1 Code Quality

- [ ] Ensure 100% test coverage
- [ ] Zero lint errors
- [ ] Zero type errors
- [ ] All functions in separate files
- [ ] All Envoy comments present
- [ ] No tech debt markers

### 8.2 Performance

- [ ] Benchmark against similar libraries
- [ ] Optimize critical paths
- [ ] Ensure tree-shaking works
- [ ] Minimize bundle size

### 8.3 Developer Experience

- [ ] Helpful error messages
- [ ] TypeScript types for all APIs
- [ ] IDE autocomplete support
- [ ] Clear examples for each use case

### 8.4 Release Preparation

- [ ] Update version number
- [ ] Generate changelog
- [ ] Update all documentation
- [ ] Create migration guide from broken version
- [ ] Publish to JSR/npm

## Priority Order

1. **Critical** (Must fix first):
   - Fix Result type usage
   - Complete state monad refactor
   - Fix tests and demo

2. **Essential** (Core functionality):
   - Implement decompiler
   - Add logical operators
   - Add mathematical functions

3. **Important** (Key features):
   - Chemical formula support
   - MathML generation
   - ChemML generation

4. **Nice to Have** (Polish):
   - Formula optimization
   - Unit analysis
   - Advanced error recovery

## Success Criteria

- [ ] All tests passing (100% pass rate)
- [ ] 100% test coverage (or documented exceptions)
- [ ] Zero lint/type errors
- [ ] Demo runs without errors
- [ ] Round-trip parse/decompile works perfectly
- [ ] Mathematical formulas fully supported
- [ ] Chemical formulas fully supported
- [ ] MathML/ChemML generation working
- [ ] Full Architect integration
- [ ] Follows ALL rules from rules/index.json

## Notes

- The previous AI left a mess with mixed patterns and half-done refactors
- Priority is fixing infrastructure before adding features
- Must maintain backward compatibility during migration
- Chemical support is new scope but essential for completeness
- MathML/ChemML output enables proper semantic web formulas
- Everything must be pure functional (no classes, no mutations)
- One function per file (no exceptions)
- Use toolsmith functions (no homemade utilities)

## Timeline Estimate

- **Week 1**: Fix critical infrastructure
- **Week 2**: Implement decompilation
- **Week 3**: Extend mathematical support
- **Week 4**: Add chemical formula support
- **Week 5**: MathML & ChemML generation
- **Week 6**: Advanced features
- **Week 7**: Testing & documentation
- **Week 8**: Polish & release

Total: 8 weeks to production-ready library

## Dependencies

- **Toolsmith**: For Result, State monad, and FP utilities
- **Architect**: For IR types and constructors
- **Pagewright**: For MathML/ChemML display components
- **Quarrier**: For property-based testing
- **Envoy**: For documentation generation

No external dependencies beyond @sitebender libraries.
