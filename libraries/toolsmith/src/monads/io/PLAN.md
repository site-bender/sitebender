# IO Monad Refactoring Plan

## Goal

Refactor the IO monad implementation to:
1. Fix naming violations (`IO` → `Io` in type and folder names)
2. Add missing types (`IoValidation`, `AsyncIoValidation`, etc.)
3. Add missing conversion functions (`fromResult`, `fromValidation`)
4. Add missing chain functions (`chainIoResult`, `chainIoValidation`)
5. Clarify Either's purpose (branching, not errors)

## Context

**Why this refactor?**
- Current naming uses `IO` (all caps) which violates naming conventions
- Should be `Io` (first letter only capitalized for initialism)
- Missing support for Validation monad in IO context
- Either is being misunderstood as error handling (it's for branching)

**Monad purposes:**
- **Either:** Branching logic where BOTH sides are valid outcomes (not for errors)
- **Result:** Fail-fast error handling (sequential operations)
- **Validation:** Error accumulation (parallel/tree operations)
- **Maybe:** Optional values

## Checklist

**IMPORTANT: Update this checklist after completing each step. Mark with ✅ when done.**

### Phase 1: Planning and Preparation
- [✅] Document current state (types, functions, dependencies)
- [✅] Identify all files that need renaming
- [✅] Identify all type references that need updating
- [✅] Identify all import paths that need updating
- [✅] Create list of new types needed
- [✅] Create list of new functions needed

### Phase 2: Type Definitions
- [✅] Update `types/fp/io/index.ts` - rename `IO` to `Io`
- [✅] Update `types/fp/io/index.ts` - rename `IOMaybe` to `IoMaybe`
- [✅] Update `types/fp/io/index.ts` - rename `IOEither<E, A>` to `IoEither<L, R>` (Left, Right - NOT error!)
- [✅] Update `types/fp/io/index.ts` - rename `IOResult<T, E>` to `IoResult<E, T>` (Error LEFT, value RIGHT)
- [✅] Update `types/fp/io/index.ts` - rename `AsyncIOResult<T, E>` to `AsyncIoResult<E, T>` (Error LEFT, value RIGHT)
- [✅] Add `IoValidation<E, A>` type (Error LEFT, value RIGHT)
- [✅] Add `AsyncIoValidation<E, A>` type (Error LEFT, value RIGHT)
- [✅] Add `AsyncIoMaybe<A>` type
- [✅] Add `AsyncIoEither<L, R>` type (Left, Right - NOT error!)
- [✅] Add Envoy comments explaining each type's purpose
- [✅] Add Validation import

### Phase 3: Core Constructor Functions
- [✅] Update `io/index.ts` - change type references `IO<A>` → `Io<A>`
- [✅] Update `ioMaybe/index.ts` - change type references `IOMaybe` → `IoMaybe`
- [✅] Update `ioEither/index.ts` - change type refs + params `<E, A>` → `<L, R>` + clarify Either purpose
- [✅] Update `ioResult/index.ts` - change type refs + fix params `<T, E>` → `<E, T>`
- [✅] Update `asyncIoResult/index.ts` - change type refs + fix params `<T, E>` → `<E, T>`
- [✅] Create `ioValidation/index.ts` - new constructor for error accumulation
- [✅] Create `asyncIoValidation/index.ts` - new async constructor for error accumulation
- [✅] Create `asyncIoMaybe/index.ts` - new async constructor for optional async values
- [✅] Create `asyncIoEither/index.ts` - new async constructor for async branching logic

### Phase 4: Conversion Functions (from* and lift*)
- [✅] Update `fromIO/index.ts` - rename to `fromIo/` folder, update type refs
- [✅] Update `fromEither/index.ts` - update type references
- [✅] Update `fromMaybe/index.ts` - update type references
- [✅] Create `fromResult/index.ts` - lift Result into IoResult
- [✅] Create `fromValidation/index.ts` - lift Validation into IoValidation
- [✅] Update `liftEither/index.ts` - update type references
- [✅] Update `liftMaybe/index.ts` - update type references

### Phase 5: Transformation Functions (map, ap)
- [✅] Update `map/index.ts` - update type references `IO` → `Io`
- [✅] Update `ap/index.ts` - update type references
- [✅] Update `mapIOEither/index.ts` - rename to `mapIoEither/`, update refs
- [✅] Update `mapIOMaybe/index.ts` - rename to `mapIoMaybe/`, update refs
- [✅] Create `mapIoResult/index.ts` - map for IoResult
- [✅] Create `mapIoValidation/index.ts` - map for IoValidation

### Phase 6: Chain Functions (flatMap/bind)
- [✅] Update `chain/index.ts` - update type references
- [✅] Update `chainIOEither/index.ts` - rename to `chainIoEither/`, update refs
- [✅] Update `chainIOMaybe/index.ts` - rename to `chainIoMaybe/`, update refs
- [✅] Create `chainIoResult/index.ts` - chain for IoResult
- [✅] Create `chainIoValidation/index.ts` - chain for IoValidation

### Phase 7: Execution Functions (run*)
- [ ] Update `runIO/index.ts` - rename to `runIo/`, update type refs
- [ ] Update `runAsyncIO/index.ts` - rename to `runAsyncIo/`, update refs
- [ ] Create `runAsyncIoValidation/index.ts` - execute AsyncIoValidation
- [ ] Create `runAsyncIoMaybe/index.ts` - execute AsyncIoMaybe
- [ ] Create `runAsyncIoEither/index.ts` - execute AsyncIoEither

### Phase 8: Conversion Between IO Variants
- [ ] Update `ioToIOEither/index.ts` - rename to `ioToIoEither/`, update refs
- [ ] Update `ioToIOMaybe/index.ts` - rename to `ioToIoMaybe/`, update refs
- [ ] Create `ioToIoResult/index.ts` - if needed
- [ ] Create `ioToIoValidation/index.ts` - if needed

### Phase 9: Update All Imports Throughout Codebase
- [ ] Search codebase for imports from `monads/io/`
- [ ] Update all import paths for renamed folders
- [ ] Update all type imports for renamed types
- [ ] Verify no broken imports remain

### Phase 10: Documentation
- [ ] Add Envoy comment to `types/fp/io/index.ts` clarifying Either purpose
- [ ] Update all function Envoy comments to use correct type names
- [ ] Add examples of Either usage (branching, not errors)
- [ ] Document when to use IoResult vs IoValidation

### Phase 11: Testing
- [ ] Run all existing IO tests
- [ ] Add tests for new IoValidation functions
- [ ] Add tests for new conversion functions
- [ ] Verify type checking passes

### Phase 12: Final Verification
- [ ] Run `deno task fmt` - format all code
- [ ] Run `deno task lint` - lint all code
- [ ] Run `deno task test` - run all tests
- [ ] Verify no TypeScript errors
- [ ] Review all changes for completeness

---

## Current State Inventory (Phase 1 Complete ✅)

### Existing Types (in `types/fp/io/index.ts`)
- `IO<A>` - Basic thunk: `() => A`
- `IOMaybe<A>` - `IO<Maybe<A>>`
- `IOEither<E, A>` - `IO<Either<E, A>>` **WARNING: E should be L (Left), not error!**
- `IOResult<T, E>` - `IO<Result<E, T>>` **WARNING: params backwards! Should be <E, T> (error LEFT)**
- `AsyncIOResult<T, E>` - `() => Promise<Result<E, T>>` **WARNING: params backwards!**

**Issues with current types:**
1. Either uses `<E, A>` implying error, but Either is for branching (both valid)
2. Result/AsyncResult have params backwards `<T, E>` - should be `<E, T>` (error LEFT)

**Missing types needed:**
- `IoValidation<E, A>` - `Io<Validation<E, A>>` (error LEFT, value RIGHT)
- `AsyncIoValidation<E, A>` - `() => Promise<Validation<E, A>>`

### Existing Folders/Functions (in `monads/io/`) - 22 Total

**Constructors (5):**
- `io/` - Create basic IO - `function io<A>(value: A): IO<A>`
- `ioEither/` - Create IOEither - `function ioEither<E, A>(thunk: () => Either<E, A>): IOEither<E, A>`
- `ioMaybe/` - Create IOMaybe - `function ioMaybe<A>(thunk: () => Maybe<A>): IOMaybe<A>`
- `ioResult/` - Create IOResult - `function ioResult<T, E>(thunk: () => Result<E, T>): IOResult<T, E>`
- `asyncIoResult/` - Create AsyncIOResult - `function asyncIoResult<T, E>(thunk: () => Promise<Result<E, T>>): AsyncIOResult<T, E>`

**From/Lift Conversions (4):**
- `fromEither/` - Lift Either into IOEither - `function fromEither<E, A>(either: Either<E, A>): IOEither<E, A>`
- `fromIO/` - Convert IO to IOMaybe - `function fromIO<A>(io: IO<A>): IOMaybe<A>`
- `fromMaybe/` - Lift Maybe into IOMaybe - `function fromMaybe<A>(maybe: Maybe<A>): IOMaybe<A>`
- `liftEither/` - Lift thunk returning Either - `const liftEither = <E, A>(f: () => Either<E, A>): IOEither<E, A>` (ARROW FUNCTION VIOLATION!)
- `liftMaybe/` - Lift thunk returning Maybe - `function liftMaybe<A>(f: () => Maybe<A>): IOMaybe<A>`

**Transformation (4):**
- `map/` - Map over IO - `function map<A, B>(f: (a: A) => B): (io: IO<A>) => IO<B>`
- `mapIOEither/` - Map over IOEither - needs review
- `mapIOMaybe/` - Map over IOMaybe - `const mapIOMaybe = <A, B>(f: (a: A) => B) => (ioMaybe: IOMaybe<A>): IOMaybe<B>` (ARROW FUNCTION VIOLATION!)
- `ap/` - Apply IO function to IO value - `function ap<A, B>(ioF: IO<(a: A) => B>): (ioA: IO<A>) => IO<B>`

**Chain/FlatMap (3):**
- `chain/` - Chain IO operations - `function chain<A, B>(f: (a: A) => IO<B>): (io: IO<A>) => IO<B>`
- `chainIOEither/` - Chain IOEither operations - `function chainIOEither<E, A, B>(f: (a: A) => IOEither<E, B>): (io: IOEither<E, A>) => IOEither<E, B>`
- `chainIOMaybe/` - Chain IOMaybe operations - needs review

**Conversion Between IO Variants (2):**
- `ioToIOEither/` - Convert IO to IOEither
- `ioToIOMaybe/` - Convert IO to IOMaybe

**Execution (2):**
- `runIO/` - Execute IO - `const runIO = <A>(io: IO<A>): A => io()` (ARROW FUNCTION VIOLATION!)
- `runAsyncIO/` - Execute AsyncIOResult - `function runAsyncIO<T, E>(asyncIo: AsyncIOResult<T, E>): Promise<Result<E, T>>`

**Other (2):**
- `of/` - Alias for `io` - `const of = io`
- `PLAN.md` - This file

### Code Violations Found

**Arrow function violations (3):**
1. `liftEither/index.ts` - line 5
2. `mapIOMaybe/index.ts` - line 14-15
3. `runIO/index.ts` - line 4

**Missing Envoy comments (2):**
1. `liftEither/index.ts` - has `[REFACTOR]` comment
2. `of/index.ts` - has `[REFACTOR]` comment

### Dependencies Analysis

**No external imports from io monad found in toolsmith codebase** (count: 0)
- This is good - means refactoring is isolated to io monad folder
- All usage is internal to the io monad module

**Type references in io monad:**
- All 22 functions reference types from `types/fp/io/index.ts`
- All type updates will cascade through function signatures

---

## Naming Conventions

**From naming skill:**
- Initialisms capitalize first letter only: `IO` → `Io`
- Folder names: camelCase for functions
- Type names: PascalCase
- File names: always `index.ts`

**Correct forms:**
- Type: `Io<A>`, `IoMaybe<A>`, `IoResult<T, E>`, `IoValidation<T, E>`
- Folder: `fromIo/`, `runIo/`, `chainIoResult/`
- Function: `fromIo`, `runIo`, `chainIoResult`

---

## New Types Needed

```typescript
// In types/fp/io/index.ts

export type Io<A> = () => A

export type IoMaybe<A> = Io<Maybe<A>>

//++ Either represents branching logic where BOTH left and right are valid outcomes.
//++ It is NOT for error handling - use Result (fail-fast) or Validation (accumulation).
//++ Example: Either<CachedData, FreshData> - both sides are successful outcomes.
export type IoEither<L, R> = Io<Either<L, R>>

//++ Result for fail-fast error handling (sequential operations)
//++ Error on LEFT, value on RIGHT
export type IoResult<E, T> = Io<Result<E, T>>

//++ Validation for error accumulation (parallel/tree operations)
//++ Error on LEFT, value on RIGHT
export type IoValidation<E, A> = Io<Validation<E, A>>

export type AsyncIoResult<E, T> = () => Promise<Result<E, T>>

export type AsyncIoValidation<E, A> = () => Promise<Validation<E, A>>

export type AsyncIoMaybe<A> = () => Promise<Maybe<A>>

export type AsyncIoEither<L, R> = () => Promise<Either<L, R>>
```

---

## New Functions Needed

### Constructors
- `ioValidation<E, A>(thunk: () => Validation<E, A>): IoValidation<E, A>` ✅
- `asyncIoValidation<E, A>(thunk: () => Promise<Validation<E, A>>): AsyncIoValidation<E, A>` ✅
- `asyncIoMaybe<A>(thunk: () => Promise<Maybe<A>>): AsyncIoMaybe<A>` (MISSING)
- `asyncIoEither<L, R>(thunk: () => Promise<Either<L, R>>): AsyncIoEither<L, R>` (MISSING)

### From/Lift Conversions
- `fromResult<E, T>(result: Result<E, T>): IoResult<E, T>` (params corrected)
- `fromValidation<E, A>(validation: Validation<E, A>): IoValidation<E, A>`

### Chain Operations
- `chainIoResult<E, A, B>(f: (a: A) => IoResult<E, B>): (io: IoResult<E, A>) => IoResult<E, B>` (params corrected)
- `chainIoValidation<E, A, B>(f: (a: A) => IoValidation<E, B>): (io: IoValidation<E, A>) => IoValidation<E, B>` (params corrected)

### Map Operations (if needed)
- `mapIoResult<E, A, B>(f: (a: A) => B): (io: IoResult<E, A>) => IoResult<E, B>` (params corrected)
- `mapIoValidation<E, A, B>(f: (a: A) => B): (io: IoValidation<E, A>) => IoValidation<E, B>` (params corrected)

### Run Operations
- `runAsyncIoValidation<E, A>(asyncIo: AsyncIoValidation<E, A>): Promise<Validation<E, A>>`
- `runAsyncIoMaybe<A>(asyncIo: AsyncIoMaybe<A>): Promise<Maybe<A>>`
- `runAsyncIoEither<L, R>(asyncIo: AsyncIoEither<L, R>): Promise<Either<L, R>>`

---

## Implementation Order

**Work through phases sequentially:**
1. Phase 1: Document and plan (this file)
2. Phase 2: Update type definitions first (foundation)
3. Phase 3-8: Update/create functions (build on types)
4. Phase 9: Fix all imports (integration)
5. Phase 10-12: Document, test, verify (quality)

**After each step:**
1. Update the checklist above with ✅
2. **If you created a new function, WRITE COMPREHENSIVE TESTS** (look at sibling test files for patterns)
3. Commit the change (or note it)
4. Verify no TypeScript errors
5. Stop and review before next step

**CRITICAL: NEVER mark a task complete if you created new functions without tests. Tests are MANDATORY. USE TDD!**

---

## Design Decisions

### Polymorphic vs Separate Functions

**Question:** Should async runners be polymorphic (one `runAsync` that handles any monad) or separate functions?

**Decision:** Use **separate functions** for each async monad type:

**Reasons:**
1. **Type safety** - Each function has precise type signature without complex overloads
2. **Performance** - No runtime type checking needed, direct execution
3. **Simplicity** - Clear what each function does, no conditional logic
4. **Consistency** - Matches existing pattern (separate constructors for each monad)
5. **Discovery** - Easier to find the right function with autocomplete

**Implementation:**
- `runAsyncIoResult<E, T>` - for AsyncIoResult
- `runAsyncIoValidation<E, A>` - for AsyncIoValidation
- `runAsyncIoMaybe<A>` - for AsyncIoMaybe
- `runAsyncIoEither<L, R>` - for AsyncIoEither

Each is a simple wrapper: `return asyncIo()` - the type signature does the work.

---

## Notes

### Either Purpose Clarification

**Add to `types/fp/io/index.ts`:**
```typescript
//++ Either represents branching logic where BOTH left and right are valid outcomes.
//++ It is NOT for error handling - use Result (fail-fast) or Validation (accumulation).
//++ Example: Either<CachedData, FreshData> - both sides are successful outcomes.
export type IoEither<E, A> = Io<Either<E, A>>
```

### When to Use Each Monad

**In IO context:**
- `IoMaybe<A>` - Optional result from side effect
- `IoEither<E, A>` - Branching side effect (both outcomes valid)
- `IoResult<T, E>` - Side effect with fail-fast error handling
- `IoValidation<T, E>` - Side effect with error accumulation

**File operations:**
- Sync: Usually `IoValidation` (collect all errors)
- Async: Usually `AsyncIoValidation` (collect all errors)
- Use `IoResult`/`AsyncIoResult` when fail-fast is desired

---

## Progress Summary

### Completed ✅
- **Phase 1:** Planning and preparation (all inventory and analysis)
- **Phase 2:** All type definitions updated with correct naming and params
- **Phase 3:** All core constructors updated/created (including new async constructors)
- **Constitutional violations fixed:** Arrow functions converted to named functions, [REFACTOR] comments replaced with Envoy descriptions

### Next Steps
- **Phase 4:** Conversion functions (from* and lift*)
- **Phase 5:** Transformation functions (map, ap)
- **Phase 6:** Chain functions
- **Phase 7:** Execution functions (including new async runners)
- **Phase 8:** Conversion between IO variants
- **Phase 9:** Update all imports throughout codebase
- **Phases 10-12:** Documentation, testing, verification

### Critical Additions to Plan
- Added missing async constructors: `asyncIoMaybe`, `asyncIoEither`
- Added missing async runners: `runAsyncIoValidation`, `runAsyncIoMaybe`, `runAsyncIoEither`
- Corrected all parameter ordering in function signatures (Error LEFT, Value RIGHT)
- Added design decision: separate functions (not polymorphic) for type safety and performance

---

## Ready to Begin

Once this plan is reviewed and approved:
1. Start with Phase 1 checklist ✅
2. Complete each phase fully before moving to next
3. Update checklist after each step
4. Stop for review between major changes
5. Test continuously

**IMPORTANT:** Do not skip steps. Do not batch multiple steps. Complete one step, update checklist, verify, then proceed.
