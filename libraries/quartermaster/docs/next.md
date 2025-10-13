## Comprehensive Resume Prompt for Hot Reload Client Refactoring

### Current State Summary
You are in the middle of refactoring the `_hotReloadClient` folder in `libraries/quartermaster/src/client/hotReloadClient/`. The goal is to reorganize private functions according to the "lowest common ancestor" principle and fix structural issues.

### Completed Work
1. ✅ **Analyzed function usage**: Identified 11 private functions only used by `_connectionStateMachine`
2. ✅ **Removed unused imports**: Removed `createEventSource` and `createWebSocket` imports from `index.ts` (they were unused)
3. ✅ **Moved private functions**: Created `_connectionStateMachine/` subfolder and moved 11 functions there:
   - `_updateMetrics`
   - `_handleReloadEvent`
   - `_clearConnectionTimeout`
   - `_disconnectSSE`
   - `_disconnectWebSocket`
   - `_createEventSourceSafely`
   - `_createWebSocketSafely`
   - `_parseMessageSafely`
   - `_incrementAttempts`
   - `_incrementFallbacks`
   - `_calculateBackoffDelay`
4. ✅ **Updated imports**: Changed imports in `_connectionStateMachine/index.ts` to use relative paths (`./_functionName/index.ts`)
5. ✅ **Added default export**: Exported `_hotReloadClient` as default from `index.ts`
6. ✅ **Moved ConnectionEvent type**: Moved the `ConnectionEvent` union type from `_connectionStateMachine/index.ts` to `types/index.ts`

### Remaining Work
1. 🔄 **Fix naming consistency**: Update imports in `_connectionStateMachine/index.ts` to use underscore prefixes (e.g., `import _updateMetrics from "./_updateMetrics/index.ts"`) and update all function calls accordingly
2. 🔄 **Fix type errors**: Resolve remaining TypeScript errors, particularly:
   - `onDisconnect` callback signature mismatches (expecting 0 args but getting 1-2)
   - Any remaining import/export issues
3. 🔄 **Verify consumer**: Check if there's a consumer in the parent `hotReloadClient` folder that imports this module
4. 🔄 **Test functionality**: Run tests to ensure the refactored code works correctly

### Key Files to Focus On
- `libraries/quartermaster/src/client/hotReloadClient/index.ts` - Main entry point
- `libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/index.ts` - State machine with imports to fix
- `libraries/quartermaster/src/client/hotReloadClient/types/index.ts` - Type definitions
- All files in `libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/` - Moved private functions

### Constitutional Rules Reminder
- **NO classes, NO mutations, NO loops, NO exceptions, NO arrow functions**
- **One function per file, functions at lowest common ancestor**
- **Pure functions except explicit IO boundaries**
- **Curried functions, immutable data**
- Exception: Generators may use `let`/`while` loops internally

### Next Immediate Steps
1. Update all imports in `_connectionStateMachine/index.ts` to use underscore prefixes
2. Update all function calls in `_connectionStateMachine/index.ts` to use underscore prefixes
3. Fix the `onDisconnect` callback signature issues
4. Run TypeScript check to verify all errors are resolved
5. Check for consumer usage and test functionality

### Critical Context
- The hot reload client provides SSE/WebSocket fallback functionality
- Functions were moved because they're only used by the connection state machine
- The main export is now available for consumers
- There may be a duplicate folder structure (`hot-reload-client` vs `hotReloadClient`) that needs investigation
