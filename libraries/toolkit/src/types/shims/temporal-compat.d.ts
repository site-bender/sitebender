// Minimal Temporal type shims to satisfy TypeScript in environments
// where the lib definitions are incomplete. This file only declares
// types and members used by our toolkit code. It does not affect runtime.

// NOTE: Deno's lib.deno.unstable already declares Temporal types. To avoid conflicts,
// this shim only adds minimal interface merging via global augmentation for missing
// instance members we use. Do not redeclare classes or value-side globals here.
// Deno's lib.deno.unstable already declares Temporal fully. This shim is intentionally empty
// and only exists to keep import paths stable during workspace refactors.

export {}
