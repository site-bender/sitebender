## Maths — current

Status
- Phase 1 implemented: arithmetic, grouping, unary ops, variables, precedence, and type inference.
- Variables accept injector constructors (Constant, FromElement…), enabling direct Engine IR compilation.

Example
```ts
parseFormula("(a / b) + (c / d)", variables) // -> Result<{ op: 'Op.Add', args: [...] }>
```

Quality
- Zero dependencies; unit tests cover happy paths and syntax errors. More property tests planned.
