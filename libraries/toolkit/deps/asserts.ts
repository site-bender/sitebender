// Centralized re-export of Deno std asserts to appease editor module resolution
// and provide a stable import path for tests.
export {
  assert,
  assertEquals,
  assertNotEquals,
  assertThrows,
  assertRejects,
  assertMatch,
  assertExists,
} from "https://deno.land/std@0.218.0/assert/mod.ts";
