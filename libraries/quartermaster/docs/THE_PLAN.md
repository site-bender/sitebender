# Comprehensive Cleanup Plan for Quartermaster Client Library

Based on the analysis, here's a systematic plan to clean up the client code while strictly following CLAUDE.md and rules-reference.md. Each phase addresses one major issue at a time to avoid introducing new violations. The plan is designed to be incremental, with each phase building on the previous one.

## Phase 1: Separate Functions from Constants (FUNC_ONE_PER_FILE_001)
**Goal:** Ensure each file exports exactly one function, separating functions from constants.  
**Rules to Follow:** FUNC_ONE_PER_FILE_001, FUNC_EXPORT_001, COLOCATION_OVER_TYPE_001, ANTI_MULTIPLE_FUNCTIONS_001

- [ ] Identify all files with mixed functions and constants (currently: `hotReloadClient/constants/index.ts`)
- [ ] Create new folder `hotReloadClient/_onReload/` with `index.ts` file
- [ ] Move `onReload` function from constants to `hotReloadClient/_onReload/index.ts`
- [ ] Ensure the function is properly curried (will be addressed in Phase 2)
- [ ] Update constants file to reference the new function location using proper imports
- [ ] Verify constants file contains only data (no functions)
- [ ] Run `deno task lint` to check for import/export violations
- [ ] Test that hot reload functionality still works

## Phase 2: Implement Currying for All Functions (ANTI_NON_CURRIED_001)
**Goal:** Convert all functions to curried form.  
**Rules to Follow:** ANTI_NON_CURRIED_001, FUNC_DECLARATION_001, FUNC_NAMING_001, FUNC_CLOSURE_NAMING_001

- [ ] Identify all non-curried functions in the codebase
- [ ] For each function, convert to curried form: `function name(param1) { return function innerName(param2) { ... } }`
- [ ] Update function names to follow closure naming: inner functions named after what they carry
- [ ] Ensure all functions use named function declarations (no arrow functions)
- [ ] Update type signatures to reflect curried structure
- [ ] Test each function individually to ensure behavior is preserved
- [ ] Run `deno task fp:check` to verify functional programming compliance

## Phase 3: Fix Function Declarations and Anonymous Functions (FUNC_DECLARATION_001)
**Goal:** Replace all anonymous function expressions with named declarations.  
**Rules to Follow:** FUNC_DECLARATION_001, TYPE_ARROW_SYNTAX_001, FUNC_NAMING_001

- [ ] Find all anonymous function expressions (e.g., in object literals, callbacks)
- [ ] Convert each to named function declarations
- [ ] For type signatures, use named type aliases instead of arrow syntax where possible
- [ ] Ensure function names are descriptive and follow camelCase
- [ ] Update all references to use the new named functions
- [ ] Verify no arrow function syntax remains (except in type signatures)
- [ ] Test functionality after each conversion

## Phase 4: Replace Native Operators with Toolsmith Functions (SUBSTITUTE_*_001)
**Goal:** Replace all native operators with Toolsmith equivalents.  
**Rules to Follow:** SUBSTITUTE_STRICT_EQUAL_001, SUBSTITUTE_NOT_001, SUBSTITUTE_AND_001, etc., SEMANTIC_FUNCTIONS_001

- [ ] Import required Toolsmith functions: `isEqual`, `isUnequal`, `not`, `and`, `or`, etc.
- [ ] Replace all `===` with `isEqual()`
- [ ] Replace all `!==` with `isUnequal()`
- [ ] Replace all `!` with `not()`
- [ ] Replace all `&&` with `and()`
- [ ] Replace all `||` with `or()`
- [ ] Replace math operators with Toolsmith equivalents where applicable
- [ ] Test each replacement to ensure logical equivalence
- [ ] Run tests to verify no behavioral changes

## Phase 5: Fix Type Safety and Remove 'unknown' Types (TS_ANY_007)
**Goal:** Replace all `unknown` and `any` types with proper discriminated unions.  
**Rules to Follow:** TS_ANY_007, TS_UNK_008, TS_ADT_001, TS_BRT_002, TS_ERR_013

- [ ] Identify all uses of `unknown` and `any` types
- [ ] Create discriminated unions with `_tag` properties for error types
- [ ] Implement branded types for domain-specific values
- [ ] Add type guards for runtime checking of unknown values
- [ ] Update function signatures to use new types
- [ ] Ensure all types are explicitly annotated
- [ ] Run TypeScript compiler to verify no type errors

## Phase 6: Address Abbreviations and Formatting Issues (NO_ABBREVIATIONS_001, STYLE_*_001)
**Goal:** Fix naming conventions and code formatting.  
**Rules to Follow:** NO_ABBREVIATIONS_001, STYLE_OPERATOR_SPACING_001, STYLE_INDENT_001, STYLE_LINE_LENGTH_001, etc.

- [ ] Replace all abbreviations with full words (e.g., `wsEndpoint` → `webSocketEndpoint`)
- [ ] Fix operator spacing (add spaces around `=`, `+`, etc.)
- [ ] Ensure consistent indentation (tabs for .ts files)
- [ ] Check line length (80 characters max)
- [ ] Apply other formatting rules: trailing commas, final newlines, etc.
- [ ] Run `deno task fmt` to auto-format where possible
- [ ] Manually review and fix any remaining formatting issues

## Phase 7: Final Verification and Testing
**Goal:** Ensure all rules are followed and functionality is preserved.  
**Rules to Follow:** All rules from CLAUDE.md and rules-reference.md

- [ ] Run `deno task lint` and fix any remaining issues
- [ ] Run `deno task fp:check` for functional programming compliance
- [ ] Run `deno task test` to ensure all tests pass
- [ ] Manually test hot reload functionality in browser
- [ ] Verify connection fallback works (SSE → WebSocket)
- [ ] Check metrics and logging functionality
- [ ] Update any documentation if needed
- [ ] Final code review to ensure no regressions

## General Guidelines for All Phases
- **Query MCP Servers First:** Before making changes, query relevant MCP servers for specific rules
- **One Change at a Time:** Make small, incremental changes and test after each
- **Preserve Functionality:** Ensure hot reload and connection logic work after each phase
- **Documentation:** Update any affected documentation to reflect changes
- **Backup:** Consider creating backups before major changes
- **Testing:** Run tests after each phase to catch regressions early

This plan addresses the most critical violations first while maintaining code functionality. Each phase is self-contained and can be completed independently, allowing for careful verification at each step.
