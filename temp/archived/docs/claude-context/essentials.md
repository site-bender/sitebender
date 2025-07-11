# Development Guidelines for Claude

**WHEN READING THESE GUIDELINES IN THIS FOLDER, READ ALL—EVERY SINGLE LINE—OF ALL FOUR FILES. DO NOT SKIP ANYTHING. READING A SMALL SUBSET OF EACH FILE IN ABSOLUTELY NOT SUFFICIENT.**

**IF YOU ARE WORKING AND DISCOVER SOMETHING NEW THAT WE DIDN'T DISCUSS, STOP AND ASK ME. DO NOT MAKE CHANGES WITHOUT DISCUSSING THEM FIRST.**

## 🚨 CRITICAL PRODUCTION BLOCKER

**HOME PAGE STATUS**: The site currently has a placeholder home page at `/` that shows "Nothing to see here" to hide the site from public view. The functional "home" page is at `/backstage`.

**BEFORE PRODUCTION**: 
- The real home page MUST replace the placeholder at `/` 
- All behavioral tests MUST be updated to start from `/` instead of `/backstage`
- See `docs/production-readiness-checklist.md` for complete pre-production requirements

**CURRENT TESTING**: Behavioral tests start from `/backstage` and include TODO comments for this change.

## Core Philosophy

**BEHAVIOR-DRIVEN DEVELOPMENT IS NON-NEGOTIABLE.** Every single line of production code must be written in response to a failing test. No exceptions. This is not a suggestion or a preference - it is the fundamental practice that enables all other principles in this document.

I follow Behavior-Driven Development (BDD) with a strong emphasis on behavior-driven testing and functional programming principles. All work should be done in small, incremental changes that maintain a working state throughout development.

## Quick Reference

**Key Principles:**

- **One function, route, component, or feature per file, exported as the default export. No exceptions.**
- **No global state** - all state must be encapsulated within functions, components, or modules
- **No side effects** - all functions must be pure, returning new data without modifying inputs
  - Exceptions for IO operations like API calls, but these must be isolated
- **No OOP** - no classes, inheritance, or mutable state. Use functional programming patterns exclusively.
- **No global variables** - all data must be passed explicitly through function parameters
- **No interfaces or abstract classes** - use concrete types and functions
- **No magic strings or numbers** - use constants or enums for all fixed values
- **No client-side dependencies** - use only built-in browser APIs and Deno's standard library on the client
- **Edge function dependencies** - third-party libraries are acceptable in edge functions when necessary and practical, but add dependencies last, not first
- **No frameworks** - use vanilla TypeScript, HTML, and CSS. No React, Angular, Vue, or similar frameworks.
- Write tests first (BDD)
- Test behavior, not implementation
- No `any` types or type assertions
- Immutable data only (use `const` never `let` or `var`)
- Small, pure functions (always FP! no OOP!)
- TypeScript strict mode always
- Use real schemas/types in tests, never redefine them
- Names of functions, components, routes, etc. go on *folders*, not files (see naming below)
  - All files are named `index.ts` or `index.tsx` or `index.css` or `index.test.ts` or `index.test.tsx`
- No comments in code - code should be self-documenting
  - Name **carefully** to make intent clear

**Preferred Tools:**

- **Platform**: Deno + Deno Deploy for edge functions and global distribution
- **Database**: PostgreSQL (via Supabase) with postgres.js for type-safe database access
- **Languages**: TypeScript (strict mode), HTML, CSS, JavaScript, SQL
- **Testing**: Deno test + fast-check + MSW + Playwright - see [testing.md](./testing.md)
- **Development**: See [development.md](./development.md) for BDD workflow and build process
- **Deployment**: See [deployment.md](./deployment.md) for CI/CD and production setup

## Architecture Overview

**Database-First Design**: PostgreSQL domains and constraints are the single source of truth for all data validation. TypeScript types are generated from the database schema to maintain consistency.

**Edge-First Deployment**: All dynamic functionality runs on Deno Deploy's global edge network using edge functions. Static assets are served from edge cache.

**Functional Architecture**: No classes or OOP patterns. Pure functions, immutable data, and composition are the primary building blocks.

**Framework-Free Frontend**: Vanilla TypeScript, HTML, and CSS with progressive enhancement. No React, Vue, or similar frameworks.

**Progressive Enhancement**: Applications work with JavaScript disabled and are enhanced with vanilla JS for better user experience.

## TypeScript Guidelines

**Strict Mode Always**: TypeScript strict mode is non-negotiable. See [development.md](./development.md) for complete TypeScript configuration and patterns.

**Core Rules:**
- **No `any`** - ever. Use `unknown` if type is truly unknown
- **No type assertions** (`as SomeType`) unless absolutely necessary with clear justification
- **Prefer `type` over `interface`** in all cases
- **Database-first types** - Generate all types from PostgreSQL schema using pg-to-ts
- These rules apply to test code as well as production code

## Code Style

**Functional Programming**: Follow "functional light" approach with immutable data, pure functions, and composition. See [development.md](./development.md) for detailed patterns and examples.

**Key Patterns:**
- No data mutation - work with immutable data structures
- Pure functions wherever possible
- Composition as primary mechanism for code reuse
- Curried utility functions for common operations (use arrow functions for curried functions)
- Options objects for function parameters (not positional parameters)
- **Named functions must be exported as default using `export default function functionName() {}`. Use anonymous functions only for small inline callbacks or when returning a function from another function.**
- **Curried functions should use arrow function syntax.**
- **Group all single-line const assignments at the top (as practicable), then a blank line. Add blank lines around any multiline blocks (if, loops, etc.), but not at the start or end of a block.**

**Code Structure:**
- No nested if/else statements - use early returns or composition
- Functions small and focused (≤20 lines target)
- No comments in code - self-documenting through clear naming
- Prefer flat, readable code over clever abstractions

### Naming Conventions

- **Functions**: `camelCase`, verb-based (e.g., `calculateTotal`, `validatePayment`)
- **Components**: `PascalCase` (e.g., `OrderSummary`, `PaymentForm`)
- **Types**: `PascalCase` (e.g., `PaymentRequest`, `UserProfile`)
- **Constants**: `SCREAMING_SNAKE_CASE` for true constants, `camelCase` for configuration
- **Folders/Files**: `PascalCase` for components, `camelCase` for utility functions, **name on folders**, not files; files named `index.*`
  - **Example**: `PaymentProcessor/index.tsx`, `calculateTotal/index.ts`
- **Routes**: `kebab-case/index.tsx` for all page files (mirrors URL structure)
- **Test files**: `index.test.ts`

## Working with Claude

**Core Expectations:**

1. **ALWAYS FOLLOW BDD** - No production code without a failing test. Non-negotiable.
2. **Think from first principles** - Understand context before making changes
3. **Ask clarifying questions** when requirements are ambiguous
4. **Keep changes small and incremental** - Maintain working state throughout
5. **Update documentation** for meaningful changes

**Complete BDD workflow and refactoring guidelines**: See [development.md](./development.md)

**Code Change Process:**
- Start with failing test → Make it pass → Assess refactoring → Commit
- Respect existing patterns and conventions
- Provide rationale for significant design decisions

## Related Documentation

- **[development.md](./development.md)** - BDD workflow, build process, functional programming patterns
- **[testing.md](./testing.md)** - Testing principles, tools (Deno test, fast-check, MSW, Playwright), patterns
- **[deployment.md](./deployment.md)** - Deno Deploy configuration, CI/CD, production setup

## Quick Examples

### Error Handling

```typescript
// Good - Result type pattern
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false, error: E };

const processPayment = (payment: Payment): Result<ProcessedPayment, PaymentError> => {
  if (!isValidPayment(payment)) {
    return { success: false, error: new PaymentError("Invalid payment") };
  }
  return { success: true, data: executePayment(payment) };
};
```

### Anti-patterns

```typescript
// Avoid: Mutation
const addItem = (items: Item[], newItem: Item) => {
  items.push(newItem); // Mutates array
  return items;
};

// Prefer: Immutable update
const addItem = (items: Item[], newItem: Item): Item[] => {
  return [...items, newItem];
};

// Avoid: Nested conditionals
if (user) {
  if (user.isActive) {
    if (user.hasPermission) {
      // do something
    }
  }
}

// Prefer: Early returns
if (!user || !user.isActive || !user.hasPermission) {
  return;
}
// do something
```

For more examples and development patterns, see [development.md](./development.md).

# Accessibility and Forms Essentials

- All accessibility (a11y) utility functions must be strictly functional, one function per file, default export, and placed at the correct hierarchy.
- All code must have no comments, use grouped const declarations, and blank lines between logical sections.
- All imports must be sorted and formatting enforced for all relevant folders.
- Each form field and composite must use semantic HTML and accessible, backwards-compatible CSS.
- All accessibility tests must be strictly functional, one per file, and cover labeling, landmarks, and dynamic help/error text.
- **Help text is always used for both guidance and error states.**
  - The Help component uses `aria-live="polite"` and is referenced by `aria-describedby` on the relevant input(s).
  - Error messages should be phrased as guidance, not blame. If the data is incorrect, update the help message to guide the user to workable data, not to scold or blame.
  - Users do not make errors; the form should be self-explanatory. If a user enters data that cannot be accepted, the help text should clearly explain what is needed.
- For composite fields (e.g., CheckboxGroup), each input must use `aria-describedby` to reference both the legend and help text.
- If a field or group is required, the required status must be reflected in the help text and the `required` attribute set on the input(s).
- **If a composite field's options array is empty, always render the group with a visible Help message (e.g., "No options available at this time.").**
  - This makes missing or broken data obvious to both users and developers, and should cause tests to fail if not intentional.
  - Never silently hide the field or group if options are empty.
- For empty options arrays in composite fields, discuss whether to render nothing or a disabled state.
