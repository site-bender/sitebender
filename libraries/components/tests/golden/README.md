# Golden tests (JSX → Engine IR)

This folder contains small, focused “golden” tests that assert how JSX control components compile to Engine IR. Each file captures a scenario end-to-end and acts as a stability contract.

Scenarios covered

- conditional.to_engine_ir.test.ts
  - <If> compiles to Act.If with a comparator condition and two branch actions.
- on_inference.to_engine_ir.test.ts
  - On infers its target anchor from a From.Element found in action args; explicit `target` overrides inference.
- if_first_action_selected.to_engine_ir.test.ts
  - When multiple actions are provided in a branch, the compiler selects the first action for each branch.
- nested_if_in_branches.to_engine_ir.test.ts
  - A nested <If> can be used as the executable in a branch; compiles to nested Act.If actions.
- if_props_children_sugar.to_engine_ir.test.ts
  - <If> sugar: when slots aren’t used, the first/second child map to then/else branches.
- if_with_matches_condition.to_engine_ir.test.ts
  - <If> condition built with Matches; comparator wires operand, pattern, and optional flags.
- validation.minimal_compile.test.ts
  - Minimal compiler attaches <Validation> to the nearest prior element.

Run tests

```sh
# Components suite (strict types)
deno task test:components:strict

# (Optional) Engine suite if you’re iterating on runtime behaviors
deno task test:engine:strict
```

Notes

- Tests are intentionally small and avoid extra assertions; they exist to lock shapes and wiring.
- If compiler surface grows, prefer adding a new golden over expanding one excessively.
