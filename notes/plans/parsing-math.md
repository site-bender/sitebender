# Plan: Pure TypeScript formula parser

## Goals
- Optional, ergonomic `formula` attribute for Calculate component
- Zero Java/ANTLR dependency - pure TypeScript implementation
- Generate engine configuration objects using existing constructors
- Support all injector types (Constant, FromElement, etc.)

## Deliverables
- Pratt parser in TypeScript with precedence climbing
- Formula to engine config compiler using existing engine constructors
- Result/Either error handling throughout
- Behavior-driven tests (integration + property-based)
- Documentation with examples

## Architecture
```
maths/
├── parseFormula/           # Main entry point
│   └── index.ts
├── tokenizer/             # Lexical analysis
│   └── index.ts
├── parser/                # Pratt parser → AST
│   └── index.ts
├── compiler/              # AST + variables → Engine config
│   └── index.ts
├── types/                 # All type definitions
│   └── index.ts
├── constants/             # Operator precedence, etc.
│   └── index.ts
└── tests/                 # BDD test suite
    └── behaviors/
        ├── parsing/       # Formula parsing behaviors
        ├── compilation/   # Config generation behaviors
        └── helpers/       # Test utilities
```

## Implementation Steps

### Phase 1: Core Parser (Current)
1. Define types for tokens, AST nodes, and variable mappings
2. Write behavior tests for basic arithmetic expressions
3. Implement tokenizer for numbers, variables, operators, parentheses
4. Build Pratt parser with precedence for + - * / ^
5. Create compiler that uses engine constructors

### Phase 2: Extended Operations
- Comparison operators (==, !=, <, <=, >, >=)
- Logical operators (&&, ||)
- Unary operators (+, -, !)

### Phase 3: Functions
- Mathematical functions (sin, cos, sqrt, max, min)
- Function call syntax with arguments

### Phase 4: Type Hints (Future)
- Type annotations in formulas (e.g., `int(a + b)`)
- Type inference and validation

## Numeric Semantics
- Default datatype: "Number"
- Type inheritance from variables when uniform
- Mixed types default to "Number"
- No implicit conversions
