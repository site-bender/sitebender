# Agenda leftovers (to migrate from agenda-old)

This file lists items present in `agenda-old/` that haven’t been explicitly folded into the new `agenda/` docs yet. Each line references the source file and the topic to port.

- agenda-old/charter.md — Project charter language; ensure a distilled charter appears in `agenda/README.md` and per-library overviews where relevant.
- agenda-old/naming.md — Naming conventions and rationale; weave into Components and Engine docs (constructor naming, Is._/Op._ patterns) and Toolkit guidance.
- agenda-old/plan_of_attack.md — Phased roadmap; most is reflected in Engine/Components planned, but verify temporal/comparator matrices and capability gates are fully captured.
- agenda-old/testing.md — Testing strategy (unit, golden, E2E, a11y); cross-check that each agenda leaf’s planned section references relevant tests.
- agenda-old/viz.md — Visualization adapters and container nodes; add explicit entries in Engine planned (viz nodes) and Components planned (Viz.* wrappers).
- agenda-old/hosts.md + local.md — Local domain conventions and mkcert/Caddy notes; align with Infrastructure planned and Scripts suggestions.
- agenda-old/dependency_injection.md — DI stance (explicit registries, no global singletons); ensure it’s stated in Engine overview/planned and Components overview.
- agenda-old/synopsis.md — High-level pitch; ensure `agenda/README.md` captures this as an intro.
- agenda-old/distributed-rdf.md + distributed-triple-store-recommendations.md — Distributed RDF posture; reflect in Web3 Lab overview/planned and in a future `libraries/distributed` plan.
- agenda-old/web3-experimentation-guide.md + web3-implementation-recommendations.md — Guidance for experiments; confirm Web3 Lab planned references guardrails and isolation.
- agenda-old/prompt.md + next_session_prompt.md + brainstorming.md + ideas/ + plans/ — Meta-process and future ideas; keep a small “Process notes” section in `agenda/README.md` or archive as reference until incorporated as concrete tasks.
- agenda-old/todo.md — Ensure each actionable is reflected in the appropriate `planned.md`; anything unplaced stays listed here until assigned.
- agenda-old/auth.md — Policy registry and When.Authenticated/When.Authorized authoring; reflected partially in Engine planned and Components planned, but keep this line until wrappers, policies, and tests exist.
- agenda-old/beacons.md — Telemetry/logging hooks; align with Engine planned (logger/bus) and add a note in Components suggestions if UI affordances are needed.

Review this list after the next pass of planned/suggestions updates; remove lines as items are migrated.
