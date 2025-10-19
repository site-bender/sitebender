# Hot Reload Client Refactor - Next Session Context

## Current State

We are refactoring `libraries/quartermaster/src/client/hotReloadClient/` from an **OOP object-with-methods approach** to a **pure FP data-and-functions approach**.

## Critical Understanding - DO NOT REGRESS

### The FP Architecture (CORRECT)

**The Connection:**
- The connection IS just the state machine generator itself
- Type: `Generator<HotReloadState, void, ConnectionEvent>`
- NOT an object with methods
- Just raw data that functions operate on

**The Functions:**
- Pure or IO functions that take the generator and operate on it
- Examples:
  - `disconnectFromClient(connection): IO<Result<boolean, DisconnectError>>`
  - `isClientConnected(connection): boolean`
  - `getClientConnectionType(connection): ConnectionType`
  - `getClientMetrics(connection): ConnectionMetrics`

**Consumer Usage:**
```typescript
// Get the connection (just the generator)
const connection = runIO(createConnection(config))

// Use functions that operate on it
const disconnectResult = runIO(disconnectFromClient(connection))
const isConnected = isClientConnected(connection)
```

### What We Changed So Far

1. ✅ Fixed `_printHelp` to use IO monad properly
2. ✅ Extracted helper functions to separate files (one function per file)
3. ✅ Removed type assertions
4. ✅ Fixed imports to keep underscore prefix (e.g., `_log`, `_error`, not renaming to public names)
5. ✅ Changed return type from `HotReloadClient` to `HotReloadConnection`
6. ⚠️ **INCOMPLETE**: Still returning an object with methods instead of just the generator

### What Needs To Be Done

**Current Problem:**
The `HotReloadConnection` type (in `types/index.ts`) is still defined as:
```typescript
export type HotReloadConnection = {
  readonly getCurrentState: () => HotReloadState
  readonly sendEvent: (event: ConnectionEvent) => () => void
}
```

This is **WRONG** - it's an object with methods (OOP).

**Correct Approach:**
```typescript
// Connection is just the generator
export type HotReloadConnection = Generator<HotReloadState, void, ConnectionEvent>
```

**Refactoring Steps:**

1. **Change `HotReloadConnection` type** to just be the generator
2. **Refactor `_hotReloadClient`** to:
   - Still create the state machine generator
   - Return `IO<Generator<...>>` directly
   - Remove the wrapper object with `getCurrentState` and `sendEvent` methods
3. **Refactor operation functions** to work with the raw generator:
   - `disconnectFromClient(connection)` - Send disconnect event to generator, return `IO<Result<boolean, Error>>`
   - `isClientConnected(connection)` - Get current state from generator, check if connected
   - `getClientConnectionType(connection)` - Get current state, return type
   - `getClientMetrics(connection)` - Get current state, return metrics
4. **Create helper function** `_getCurrentState(generator): HotReloadState` to safely get current state from generator
5. **Update all existing code** that uses the old object-based approach

### Files That Need Changes

- `src/client/hotReloadClient/types/index.ts` - Change `HotReloadConnection` type
- `src/client/hotReloadClient/index.ts` - Remove object wrapper, return just generator
- `src/client/hotReloadClient/disconnectFromClient/index.ts` - Work with raw generator
- `src/client/hotReloadClient/isClientConnected/index.ts` - Work with raw generator
- `src/client/hotReloadClient/getClientConnectionType/index.ts` - Work with raw generator
- `src/client/hotReloadClient/getClientMetrics/index.ts` - Work with raw generator
- Potentially `_sendEvent` and other helpers need adjustment

### Key Principles (DO NOT VIOLATE)

1. **No classes** - Use pure functions
2. **No mutations** - Except inside generators with `[EXCEPTION]` comment
3. **No loops** - Use map/filter/reduce
4. **No exceptions** - Use Result monad
5. **One function per file** - Except curried functions
6. **Pure functions** - Mark IO boundaries with `// [IO]` comment
7. **No arrow functions** - Use `function` keyword
8. **All functions curried** - For composition
9. **Keep underscore on private imports** - Don't rename `_log` to `log`
10. **Data + Functions, NOT Objects with Methods** - This is the key error being fixed

### Generator State Machine Notes

- Generators are **allowed and encouraged** for stateful operations like state machines
- Mutation **inside** generators is allowed with `[EXCEPTION]` comment
- The generator itself must be **externally pure**
- First `.next()` always yields initial state (use `!` assertion is acceptable)
- Use `ConnectionEvent` discriminated union for type-safe events

### Import Conventions

- Use `@sitebender/toolsmith` NOT `../../../toolsmith/src`
- Keep underscore prefix on private function imports
- Example: `import _log from "./_log/index.ts"` then use `_log(config)`

## What You Should Do First

1. Read this document completely
2. Change `HotReloadConnection` type to just be the generator
3. Refactor `_hotReloadClient` to return the generator directly (not wrapped in object)
4. Update ONE operation function (start with `isClientConnected`) as a proof of concept
5. STOP and show the user before continuing
6. Get approval before refactoring the rest

## Questions to Clarify

1. How do we track mutable `currentState` if we're just returning the generator?
   - Answer: The generator ITSELF maintains state internally - that's what generators do
   - We call `.next()` to get the current state when needed

2. How do we send events if we're not wrapping in an object?
   - Answer: Call `generator.next(event)` directly in the operation functions

3. Do we need `getCurrentState` and `setCurrentState` closures anymore?
   - Answer: NO - the generator manages this internally. We just call `.next()`

## Final Note

This is a **fundamental architecture change** from OOP (objects with methods) to FP (data + functions). Take it slow, do one piece at a time, and STOP if confused. Do NOT make a mess.
