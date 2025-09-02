# Plan: JSON ↔ Turtle pipeline (JSON-LD centric)

## Goals
- Canonicalize on JSON-LD; reliable round-trips via framing.

## Deliverables
- Versioned `@context` and frames.
- Conversion utilities using `jsonld` + `n3`.
- CI round-trip tests and fixtures.

## Steps
1. Author `@context` and frames; pin vocab versions.
2. Implement conversion helpers (Deno-friendly) and documentation.
3. Add fixtures and CI asserting JSON-LD → Turtle → JSON-LD ≃ original.
