# Skill Design Notes

## Session Goal
Create new Claude Code skills to enforce Sitebender architectural patterns and functional programming rules.

---

## Skill Landscape

### Existing Skills
1. `file-system-organization` - File/folder structure (will reference `naming`)
2. `operator-substitutions` - Toolsmith vs JS operators
3. `sitebender-predicates` - Predicate functions (will reference `naming`)

### New Skills Created
4. **Naming** ✅ COMPLETE - Foundational naming conventions (referenced by others)
5. **Abbreviations** ✅ COMPLETE - Whitelist and approval process (referenced by `naming`)

### New Skills To Do
6. **Function writing** - Function structure, currying, purity, types (will reference `naming`)
7. **Type writing** - Unions, intersections, discriminated unions, generics
8. **Branded types** - Creating and working with newtypes
9. **Monads** - Working with Result/Validation/IO (don't reach inside!)
10. **IO** - Handling impure functions with IO monad

---

## 1. Naming Skill ✅ COMPLETE

### File Naming Rules

**ALL files are named `index.*` - NO EXCEPTIONS except:**
1. `README.md`
2. `mod.ts` (contains only Envoy comments + module description)

**Examples:**
- Test files: `index.test.ts` (in same folder as tested code)
- Type files: `index.ts` (in their own folder)
- Component files: `index.tsx` (in their own folder)
- Style files: `index.css` (in their own folder)
- Everything else: `index.*`

**The folder name carries the semantic meaning, not the file name.**

### Casing Rules by Context

- **Functions & object keys:** `camelCase`
- **Types & components:** `PascalCase` (NOT "UpperCamelCase")
- **Constants:** `SCREAMING_SNAKE_CASE`
- **URL paths:** `kebab-case`

### General Principles

- No abbreviations unless whitelisted (use abbreviations skill)
- Clear plain English
- **Goal:** Code reads like plain English to minimize cognitive load

### Cross-References

- Use abbreviations skill for abbreviation/initialism/acronym handling
- Referenced by: file-system-organization, sitebender-predicates, function-writing, type-writing, etc.

### Skill Behavior

- Includes specific patterns (*.test.ts, type naming, etc.)
- Has extensive examples following safe pattern (no full wrong code blocks)
- Proactively queried when naming anything
- Located: `.claude/skills/naming/SKILL.md`

### Implementation Notes

- Avoided full "wrong" code examples to prevent reinforcing anti-patterns
- Uses "**Never use:**" statements with minimal inline snippets
- Correct examples shown in full code blocks

---

## 2. Abbreviations Skill ✅ COMPLETE

### Scope

**Definitions:**
- **Abbreviation** (general shortening): `msg`, `btn`, `pkg`
- **Initialism** (say letters): `HTML`, `CSS`, `API`
- **Acronym** (pronounce as word): `RISC`, `RAID`, `NASA`

Note: These are progressive subsets (all acronyms are initialisms, all initialisms are abbreviations)

### Rules

- Approved whitelist (embedded in skill)
- Request approval process for new abbreviations
- **Initialism/acronym casing:** First letter only capitalized
  - ✅ `innerHtml`, `astNode`, `riscProcessor`
  - ❌ `innerHTML`, `ASTNode`, `RISCProcessor`
  - **Rationale:** Prevents garbage in kebab/snake case (`ast-node` not `a-s-t-node`)

### Whitelist (Approved Abbreviations)

**Mathematical/Numeric:**
- `max`, `min`, `avg`, `sum`

**Technical:**
- `id`, `url`, `uri`, `api`, `json`, `xml`, `html`, `css`, `sql`, `http`, `https`, `svg`

**Data:**
- `src`, `dest`

**Units (unambiguous lowercase only):**
- `px`, `ms`, `sec`, `rem`, `em`, `vh`, `vw`
- **Never:** `kb`, `mb`, `gb` (case-ambiguous - spell out `kilobytes`, `megabytes`, etc.)

**NOT on whitelist:**
- `tmp`, `ref`, `abs`, `addr`, `calc`, `usr`, `btn`, `msg`, `pkg`, `fmt`, `len`, `val`, `obj`, `arr`, `str`, `num`, `bool`, `fn`, `cb`, `err`, `res`, `req`, `cfg`, `opts`, `args`, `params`

### Units Rule

Only abbreviate units if canonical form is all lowercase or unambiguous:
- ✅ `TIMEOUT_MS`, `WIDTH_PX` (canonical: ms, px)
- ❌ `maxKb` (kilobits or kilobytes?) - spell out: `maxKilobytes`

### Skill Behavior

- Always proactive - queries automatically when creating names
- Whitelist embedded directly in skill docs
- Approval process documented
- Located: `.claude/skills/abbreviations/SKILL.md`

### Implementation Notes

- Follows safe example pattern (no full wrong code blocks)
- Clear approval criteria for new abbreviations
- Explains abbreviation ⊃ initialism ⊃ acronym hierarchy

---

## 3. Function Writing Skill (TO DO)

### All Functions Must:

1. Be named (no anonymous functions)
2. Use `function` keyword (no arrow functions `=>`)
3. Be properly typed (no `any`, `unknown` only with explicit permission)
4. Be exported as default on same line as declaration
5. Be pure with no side effects (unless IO)
6. Use Toolsmith utility functions instead of JS OOP methods
7. Use full words, no abbreviations (unless whitelisted - use abbreviations skill)
8. Be curried (all inner functions also named descriptively)
9. Be immutable:
   - No `var` or `let`
   - No loops
   - Types use `readonly`
   - **Deep freeze: skipped for now** (rely on TypeScript readonly)
10. Performance exceptions allowed with `[EXCEPTION]` comment

### Type Policy

- No `any` without explicit permission
- `unknown` primarily in predicates only
- Other functions should be properly typed (use generics for polymorphism)
- **Point:** Use the type system, don't bypass it

### Performance Exceptions

- ALL Toolsmith FP functions that wrap JS OOP methods (map, reduce, split, join, replace, filter, find, etc.) wrap the native method with `[EXCEPTION]` comment
- ALL other code uses Toolsmith functions (never raw JS methods)
- Toolsmith wrappers provide error handling options (Result/Validation)

### Naming Patterns for Curried Functions

- Use "With" for operations: `mapWithFunction`, `reduceWithFunction`
- Use "To" for transformations: `addToAugend`
- Descriptive compound names as parameters accumulate

### Complex Patterns

- Function overloading for different input types
- Helper functions in `_subfolder/` directories (prefixed with `_`)
- Fallback handling for invalid inputs

### Return Types by Library

- **Toolsmith predicates:** vanilla boolean return
- **Toolsmith other functions:** vanilla | Result (fail-fast) | Validation (error accumulation)
- **Other libraries (sentinel, steward, etc.):**
  - Result for **sequential** operations
  - Validation for **parallel/tree** operations

### Error Handling

- No exceptions thrown anywhere
- Internal exceptions converted to Error (currently named ValidationError, will be renamed)
- Reference as "Error" in documentation (future state)

### Skill Behavior

- Generator templates/examples integrated in skill
- Query proactively before writing any function
- Include deep freeze utility usage patterns (when we implement it)

### Example Structure

```typescript
// Simple curried function
export default function add(augend: number) {
  return function addToAugend(addend: number): number {
    return augend + addend
  }
}

// Complex curried function with overloads (see reduce example)
export default function reduce<T, U>(fn: (accumulator: U, item: T) => U) {
	return function reduceWithFunction(initialValue: U) {
		// Overload signatures
		function reduceWithFunctionAndInitialValue(array: ReadonlyArray<T>): U
		function reduceWithFunctionAndInitialValue(
			array: Result<Error, ReadonlyArray<T>>,
		): Result<Error, U>
		function reduceWithFunctionAndInitialValue(
			array: Validation<Error, ReadonlyArray<T>>,
		): Validation<Error, U>

		// Implementation
		function reduceWithFunctionAndInitialValue(
			array: ReadonlyArray<T> | Result<Error, ReadonlyArray<T>> | Validation<Error, ReadonlyArray<T>>,
		): U | Result<Error, U> | Validation<Error, U> {
			// Implementation with type checking and routing
		}

		return reduceWithFunctionAndInitialValue
	}
}
```

---

## 4. Currying Rules (Part of Function Writing Skill)

### Core Principle: Data Last!

- OOP: `array.map(fn)` → FP: `map(fn)(array)`
- OOP: `array.reduce(fn, init)` → FP: `reduce(fn)(init)(array)`
- **Enables partial application:** `const doubleList = map(double)`

### Function Structure

- All functions named with `function` keyword (no arrows)
- All curried inner functions also named
- Data last rule still being refined (may have exceptions)

---

## 5. IO Monad Skill (TO DO - Next Topic)

### TODO
- Rules for IO monad
- When to use IO
- How impure functions work
- IO monad structure

---

## 6. Monads Skill (TO DO)

### Core Principle: Don't Reach Inside!

Use monadic operations instead:
- `getOrElse`
- `fold`
- `bimap`
- `isOk`
- `isErr`
- `isSuccess`
- `isFailure`
- `chain`
- etc.

### TODO
- Complete list of monad operations
- Examples of good/bad usage
- Chaining patterns

---

## 7. Branded Types Skill (TO DO)

### Scope

- Creating branded types (newtypes)
- Working with branded types
- Smart constructors
- Validation

### Reference Location

See `@libraries/toolsmith/src/newtypes/` for examples:
- `constants/`
- `numericTypes/`
- `stringTypes/`
- `types/`
- `webTypes/`

### TODO
- Document patterns
- Provide examples
- Explain validation flows

---

## 8. Type Writing Skill (TO DO)

### Rules

- No interfaces! Use types
- Unions and intersections
- Branded types
- Discriminated unions
- Type aliases
- Generics
- **NEVER use `any`** (very few approved exceptions, e.g., `pipe` and `compose`)
- `unknown` as little as possible (predicates OK)

### TODO
- Document each pattern
- Provide examples
- Explain when to use each

---

## Notes & Decisions

### Skill Behavior Decisions
- **Naming skill:** Always proactive ✅
- **Abbreviations skill:** Always proactive ✅
- **Function writing skill:** Always proactive (to do)

### Implementation Decisions
- Abbreviation whitelist: Embedded in skill docs ✅
- Deep freeze: Skipped for now, rely on TypeScript readonly
- Error naming: Use "Error" in docs (future state, currently ValidationError)
- Example pattern: Avoid full wrong code blocks, use "Never use" with minimal snippets ✅

### Cross-Skill References
- Multiple skills will reference the naming skill
- Naming skill references abbreviations skill
- Function writing references naming skill
- File-system-organization references naming skill
- Sitebender-predicates references naming skill

---

## Questions to Resolve

1. ~~What are the specific naming patterns for different file contexts?~~ ✅ RESOLVED: All files are index.*
2. ~~Get abbreviation whitelist from user~~ ✅ RESOLVED: Created whitelist
3. Data last rule - are there any exceptions? (Still being refined)
4. ~~Additional naming patterns beyond With/To?~~ ✅ RESOLVED: No additional patterns yet
5. Complete IO monad requirements
6. Complete monads skill requirements
7. Complete branded types skill requirements
8. Complete type writing skill requirements

## Skills Completed This Session

1. ✅ **Naming skill** - `.claude/skills/naming/SKILL.md`
2. ✅ **Abbreviations skill** - `.claude/skills/abbreviations/SKILL.md`

## Next Steps

Continue gathering requirements for remaining skills:
- Function writing (have most notes, ready to create)
- Type writing
- Branded types
- Monads
- IO monad
