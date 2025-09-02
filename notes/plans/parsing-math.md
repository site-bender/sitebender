# Plan: Pure TypeScript formula parser

## Goals
- Optional, ergonomic `formula` attribute; zero Java/ANTLR dependency.

## Deliverables
- Pratt/recursive-descent parser in TS.
- Evaluator with immutable environment; Result/Either error handling.
- Tests (unit + property-based) and docs.

## Steps
1. Implement tokenizer + parser (numbers, vars, parens, + - * / ^).
2. Integrate with Calculate variables (Set.Variable, From.*); no eval.
3. Add functions table (sin, cos, sqrt, max, min) as a second pass.
4. Decide numeric semantics (decimal/bigint) and document.
