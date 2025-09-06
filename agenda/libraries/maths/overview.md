## Maths — overview

Purpose

- Parse math-like expressions and compile to Engine operator graphs (IR) using zero-dependency, pure TypeScript.

Contract

- Inputs: formula string + variable map (injector constructors for variables).
- Output: Engine op tree (e.g., Op.Divide(Op.Variable a, Op.Variable b)) or Result error with rich context.
- Guarantees: precedence correct; unary/binary operators well-typed; depth/size limits enforced.

Supported (current per README)

- Arithmetic: +, -, *, /, ^; parentheses; unary +/-; variables; type inference based on variable definitions.

Design

- Tokenizer + Pratt parser + compiler to Engine ops. No evaluation; compilation only.
