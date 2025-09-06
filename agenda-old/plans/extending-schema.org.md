# Plan: Extend schema.org with OWL + SHACL (portable)

## Goals

- Model our vocabulary as OWL; validate with portable SHACL constraints.

## Deliverables

- `vocab.ttl` (OWL) and `shapes.ttl` (SHACL) with standard constraints only.
- JSON-LD `@context` for our namespace.
- CI validation using a portable toolchain.

## Steps

1. Model initial classes/properties (subclasses of schema.org); pin schema.org version.
2. Write SHACL shapes using core features (cardinality, datatype, pattern, node shapes).
3. Add example instances and CI validation.
4. Document versioning and changelog policy.
