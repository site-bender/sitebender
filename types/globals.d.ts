// Project-wide globals & ambient references.
// Provide Deno namespace types for editor (VSCode) without needing per-file refs.
// Lightweight ambient Deno namespace declaration for editor when Deno LS types not picked up.
// (Runtime still uses real Deno; this is only to silence TS complaints in VSCode.)
// Extend cautiously; prefer real Deno type acquisition if available.
// deno-lint-ignore no-explicit-any
declare const Deno: any

// Extend here with any additional custom global declarations if needed later.
