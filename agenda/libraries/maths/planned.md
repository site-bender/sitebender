## Maths — planned

Phase 1 — completeness and safety

- [ ] Comparison ops: <, <=, >, >=, ==, != (emit comparator nodes)
- [ ] Logical ops: &&, || (emit Is.And/Is.Or)
- [ ] Depth/size guard with configurable limits; clear error messages

Phase 2 — functions and constants

- [ ] Math functions: sin, cos, sqrt, min, max
- [ ] Constants: PI, E
- [ ] Type promotion rules for integer/float operations documented

Phase 3 — testing and docs

- [ ] Property-based tests: parse → compile → evaluate vs known results for samples
- [ ] Performance notes and complexity; examples integrating with Engine ops in docs

Acceptance criteria

- Parser goldens for common formulas; comparator/logical IR matches engine naming
- Safety guards trigger on pathological inputs with actionable errors
