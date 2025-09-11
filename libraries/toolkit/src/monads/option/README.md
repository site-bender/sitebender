# Option

A lightweight alias around Maybe for some code paths. If both exist, keep their semantics aligned.

- Curried, inference-first helpers
- Constructors: just/nothing
- Type guards: n/a or reuse from Maybe as appropriate

## Notes

Prefer using Maybe as the canonical optional; Option can remain a thin shim for compatibility in certain modules. Follow the validation README sections when you expand this module.
