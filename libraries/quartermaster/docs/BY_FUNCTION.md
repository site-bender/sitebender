
# Function-by-Function Rule Violations

This document provides deep architectural analysis for every function in [`libraries/quartermaster/src/client/`](../src/client/), identifying ALL rule violations without prioritization. Every violation listed must be fixed to achieve zero-violation state.

**Last Updated:** 2025-10-16

---

## Table of Contents

1. [Types and Constants](#types-and-constants)
2. [disconnectFromClient](#disconnectfromclient)
3. [_disconnect](#_disconnect)
4. [getClientConnectionType](#getclientconnectiontype)
5. [getClientMetrics](#getclientmetrics)
6. [isClientConnected](#isclientconnected)
7. [_hotReloadClient](#_hotreloadclient)
8. [_error](#_error)
9. [_log](#_log)
10. [_sendEvent](#_sendevent)
11. [_setupSSEListeners](#_setupsselisteners)
12. [_setupWebSocketListeners](#_setupwebsocketlisteners)
13. [_startConnection](#_startconnection)
14. [_connectionStateMachine](#_connectionstatemachine)
15. [_calculateBackoffDelay](#_calculatebackoffdelay)
16. [_clearConnectionTimeout](#_clearconnectiontimeout)
17. [_createEventSourceSafely](#_createeventsourcesafely)
18. [_createWebSocketSafely](#_createwebsocketsafely)
19. [_disconnectSSE](#_disconnectsse)
20. [_disconnectWebSocket](#_disconnectwebsocket)
21. [_handleReloadEvent](#_handlereloadevent)
22. [_incrementAttempts](#_incrementattempts)
23. [_incrementFallbacks](#_incrementfallbacks)
24. [_parseMessageSafely](#_parsemessagesafely)
25. [_updateMetrics](#_updatemetrics)

---

## Types and Constants

### hotReloadClient/types/index.ts

**File**: [`libraries/quartermaster/src/client/hotReloadClient/types/index.ts`](../src/client/hotReloadClient/types/index.ts)

#### FP_IMMUTABLE_001 - Missing readonly modifiers

**Violation**: Lines 12-21 - `ConnectionMetrics` type properties lack `readonly` modifiers

**Fix**: Add `readonly` to all properties in `ConnectionMetrics`

**Example**:

```typescript
// ❌ Current (lines 12-21)
export type ConnectionMetrics = {
	attempts: number
	failedConnections: number
	lastConnectionTime: number | null
	lastDisconnectionTime: number | null
	reloadEventsReceived: number
	fallbacks: number
	successfulConnections: number
	connectionType: ConnectionType
}

// ✅ Fixed
export type ConnectionMetrics = {
	readonly attempts: number
	readonly failedConnections: number
	readonly lastConnectionTime: number | null
	readonly lastDisconnectionTime: number | null
	readonly reloadEventsReceived: number
	readonly fallbacks: number
	readonly successfulConnections: number
	readonly connectionType: ConnectionType
}
```

**Note**: `HotReloadState` already has `readonly` modifiers and is correct.

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Line 1 - `ConnectionType` uses abbreviations `http3-sse` and `http2-websocket`

**Fix**:
1. Rename type values to spell out protocols
2. Update all references throughout codebase

**Example**:

```typescript
// ❌ Current
export type ConnectionType = "http3-sse" | "http2-websocket" | "none"

// ✅ Fixed  
export type ConnectionType = "httpThreeServerSentEvents" | "httpTwoWebSocket" | "none"
```

**Violation**: Line 59-72 - `ConnectionEvent` type uses abbreviations

**Fix**: Rename all event types to remove abbreviations:
- `sse_open` → `serverSentEventsOpen`
- `sse_error` → `serverSentEventsError`
- `sse_reload` → `serverSentEventsReload`
- `websocket_open` → `webSocketOpen`
- `websocket_message` → `webSocketMessage`
- `websocket_close` → `webSocketClose`
- `websocket_error` → `webSocketError`

### hotReloadClient/constants/index.ts

**File**: [`libraries/quartermaster/src/client/hotReloadClient/constants/index.ts`](../src/client/hotReloadClient/constants/index.ts)

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Variable names contain abbreviation `MS` (milliseconds)

**Fix**: Spell out `MILLISECONDS` in all constant names

**Example**:

```typescript
// ❌ Current (lines 11, 13, 15)
export const CONNECTION_TIMEOUT_MS = 3000
export const MAX_RECONNECT_DELAY_MS = 30000
export const INITIAL_RECONNECT_DELAY_MS = 1000

// ✅ Fixed
export const CONNECTION_TIMEOUT_MILLISECONDS = 3000
export const MAXIMUM_RECONNECT_DELAY_MILLISECONDS = 30000
export const INITIAL_RECONNECT_DELAY_MILLISECONDS = 1000
```

**Violation**: Line 3, 5 - Uses abbreviations `SSE` and `WEBSOCKET`

**Fix**:

```typescript
// ❌ Current
export const DEFAULT_SSE_ENDPOINT = "https://localhost:4433/events"

// ✅ Fixed
export const DEFAULT_SERVER_SENT_EVENTS_ENDPOINT = "https://localhost:4433/events"
```

#### NO_ABBREVIATIONS_001 - Abbreviations in URL paths

**Violation**: URL paths contain `/ws` abbreviation

**Fix**: Use full `/websocket` path in endpoint URLs

---

## disconnectFromClient

**File**: [`libraries/quartermaster/src/client/disconnectFromClient/index.ts`](../src/client/disconnectFromClient/index.ts)
**Current Behavior**: Disconnects hot reload client connection by sending disconnect event through the connection's sendEvent method

### Rule Violations:

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 9 - Passes `connection.sendEvent`, which is accessing a method attached to an object

**Fix**:
1. Don't access methods on objects - this couples code to object structure
2. Pass the sendEvent function separately, not as property access
3. Refactor caller to provide sendEvent as independent parameter

**Example**:

```typescript
// ❌ Current (line 9)
return _disconnect(connection.sendEvent)

// ✅ Fixed
// Refactor so sendEvent is passed separately, not accessed from object
// The connection should provide sendEvent as a separate export, not as object method
```

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Line 9 - Function claims to return `IO<void>` but `_disconnect` executes IO immediately rather than returning lazy IO monad

**Fix**:
1. `_disconnect` should return `IO<void>` that when executed will send the event
2. Don't execute the IO here - return it for lazy evaluation
3. Caller decides when to execute the IO operation

**Example**:

```typescript
// ❌ Current - executes IO immediately
export default function disconnectFromClient(connection: HotReloadConnection) {
	return function disconnectFromClientWithConnection(): IO<void> {
		return _disconnect(connection.sendEvent)
	}
}

// ✅ Fixed - returns IO for lazy evaluation
export default function disconnectFromClient(
	sendEvent: (event: ConnectionEvent) => IO<void>
) {
	return function disconnectFromClientWithSendEvent(): IO<void> {
		return _disconnect(sendEvent)
	}
}
```

#### LOWEST_COMMON_ANCESTOR_001 - Place Functions at Lowest Common Ancestor

**Violation**: `_disconnect` helper is in separate folder but only used by `disconnectFromClient`

**Fix**:
1. Move `_disconnect/index.ts` into `disconnectFromClient/_disconnect/index.ts`
2. Function should be nested under its only consumer
3. This makes the relationship clear and aids cleanup

#### Design Issue - Pointless Wrapper

**Violation**: The entire `disconnectFromClient` function is a pointless wrapper that adds no value

**Fix**:
1. Remove `disconnectFromClient` entirely
2. Expose `_disconnect` as the public API (rename to remove underscore)
3. Callers can curry it themselves if needed
4. Every layer should add value - this one doesn't

---

## _disconnect

**File**: [`libraries/quartermaster/src/client/disconnectFromClient/_disconnect/index.ts`](../src/client/disconnectFromClient/_disconnect/index.ts)
**Current Behavior**: Private helper that executes the disconnect event by calling sendEvent with disconnect event type

### Rule Violations:

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Lines 8-10 - Function signature claims to return `void` but actually executes IO side effect by calling `sendEvent({ type: "disconnect" })()`

**Fix**:
1. Change return type from `void` to `IO<void>`
2. Return the IO monad instead of executing it
3. Let caller decide when to execute the IO
4. This enables proper IO monad composition

**Example**:

```typescript
// ❌ Current (lines 5-11)
export default function _disconnect(
	sendEvent: (event: ConnectionEvent) => IO<void>,
) {
	return function disconnectWithSendEvent(): void {
		sendEvent({ type: "disconnect" })()
	}
}

// ✅ Fixed - returns IO instead of executing
export default function disconnect(
	sendEvent: (event: ConnectionEvent) => IO<void>,
) {
	return function disconnectWithSendEvent(): IO<void> {
		return sendEvent({ type: "disconnect" })
	}
}
```

#### Design Issue - Type Mismatch

**Violation**: Function claims to return `void` but performs IO side effect - fundamental type system lie

**Fix**:
1. Align type signature with actual behavior
2. Return `IO<void>` to represent deferred IO execution
3. Remove immediate execution with `()`

---

## getClientConnectionType

**File**: [`libraries/quartermaster/src/client/getClientConnectionType/index.ts`](../src/client/getClientConnectionType/index.ts)
**Current Behavior**: Gets the current connection type by calling `.next()` on generator and accessing `.currentConnectionType` property

### Rule Violations:

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 5 - Uses `!` operator with `connection.next().value!`

**Fix**:
1. Import and use Toolsmith's assertion functions
2. Replace `!` with proper null handling
3. Use Result monad to handle potential null case

**Example**:

```typescript
// ❌ Current (line 5)
const state = connection.next().value!

// ✅ Fixed
import { assertExists } from '@sitebender/toolsmith/validation/assertExists'
const stateResult = connection.next()
const state = assertExists(stateResult.value)
```

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 6 - Direct property access `state.currentConnectionType` couples code to object structure

**Fix**:
1. Use lens or getter function to access property
2. Avoid direct property access on objects
3. Create pure function that extracts the property value

**Example**:

```typescript
// ❌ Current (line 6)
return state.currentConnectionType

// ✅ Fixed
import { lens } from '@sitebender/toolsmith/lenses'
const connectionTypeLens = lens<HotReloadState, ConnectionType>('currentConnectionType')
return connectionTypeLens.get(state)
```

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Line 5 - Executes IO side effect with `connection.next()` but doesn't wrap in IO monad

**Fix**:
1. Function should return `IO<ConnectionType>` not `ConnectionType`
2. Wrap the entire operation in IO monad
3. Let caller decide when to execute the IO

**Example**:

```typescript
// ❌ Current
export default function getClientConnectionType(connection: HotReloadConnection): ConnectionType {
	const state = connection.next().value!
	return state.currentConnectionType
}

// ✅ Fixed
export default function getClientConnectionType(
	connection: HotReloadConnection
): IO<ConnectionType> {
	return function executeGetConnectionType(): ConnectionType {
		const stateResult = connection.next()
		const state = assertExists(stateResult.value)
		const connectionTypeLens = lens<HotReloadState, ConnectionType>('currentConnectionType')
		return connectionTypeLens.get(state)
	}
}
```

---

## getClientMetrics

**File**: [`libraries/quartermaster/src/client/getClientMetrics/index.ts`](../src/client/getClientMetrics/index.ts)
**Current Behavior**: Gets connection metrics by calling `.next()` on generator, accessing `.metrics` property, and spreading into new object

### Rule Violations:

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 5 - Uses `!` operator with `connection.next().value!`

**Fix**: Same as [`getClientConnectionType`](#getclientconnectiontype) - use assertExists

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 6 - Direct property access `state.metrics`

**Fix**: Use lens to access metrics property

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Line 5 - Executes IO with `connection.next()` but returns `ConnectionMetrics` instead of `IO<ConnectionMetrics>`

**Fix**:
1. Wrap entire operation in IO monad
2. Return `IO<ConnectionMetrics>`
3. Use lens for property access

**Example**:

```typescript
// ❌ Current
export default function getClientMetrics(connection: HotReloadConnection): ConnectionMetrics {
	const state = connection.next().value!
	return { ...state.metrics }
}

// ✅ Fixed
export default function getClientMetrics(
	connection: HotReloadConnection
): IO<ConnectionMetrics> {
	return function executeGetMetrics(): ConnectionMetrics {
		const stateResult = connection.next()
		const state = assertExists(stateResult.value)
		const metricsLens = lens<HotReloadState, ConnectionMetrics>('metrics')
		const metrics = metricsLens.get(state)
		return { ...metrics }
	}
}
```

---

## isClientConnected

**File**: [`libraries/quartermaster/src/client/isClientConnected/index.ts`](../src/client/isClientConnected/index.ts)
**Current Behavior**: Checks if client is connected by examining EventSource or WebSocket readyState properties

### Rule Violations:

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators (Multiple)

**Violation**: Line 5 - Uses `!` operator

**Fix**: Use `assertExists` from Toolsmith

**Violation**: Line 7 - Uses `!==` operator comparing to `null`

**Fix**: Import and use `isUnequal` from Toolsmith

**Violation**: Line 7 - Uses `===` operator comparing readyState

**Fix**: Import and use `isEqual` from Toolsmith

**Violation**: Line 8 - Uses `!==` operator comparing to `null`

**Fix**: Use `isUnequal` from Toolsmith

**Violation**: Line 8 - Uses `===` operator comparing readyState

**Fix**: Use `isEqual` from Toolsmith

**Violation**: Line 7 - Uses `||` operator

**Fix**: Import and use `or` from Toolsmith

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Lines 7-8 - Multiple instances of direct property access on objects: `state.eventSource`, `state.eventSource.readyState`, `state.webSocket`, `state.webSocket.readyState`

**Fix**: Use lenses to access all properties

**Violation**: Lines 7-8 - Accessing global object properties `EventSource.OPEN` and `WebSocket.OPEN`

**Fix**: Define constants for these values, don't access properties on global objects

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Line 5 - Executes IO with `connection.next()` but returns `boolean` instead of `IO<boolean>`

**Fix**: Wrap in IO monad, return `IO<boolean>`

**Example**:

```typescript
// ❌ Current (lines 4-10)
export default function isClientConnected(connection: HotReloadConnection): boolean {
	const state = connection.next().value!
	return (
		(state.eventSource !== null && state.eventSource.readyState === EventSource.OPEN) ||
		(state.webSocket !== null && state.webSocket.readyState === WebSocket.OPEN)
	)
}

// ✅ Fixed
import { assertExists } from '@sitebender/toolsmith/validation/assertExists'
import { isEqual } from '@sitebender/toolsmith/validation/isEqual'
import { isUnequal } from '@sitebender/toolsmith/validation/isUnequal'
import { or } from '@sitebender/toolsmith/validation/or'
import { lens } from '@sitebender/toolsmith/lenses'

const EVENT_SOURCE_OPEN_STATE = 1
const WEB_SOCKET_OPEN_STATE = 1

export default function isClientConnected(
	connection: HotReloadConnection
): IO<boolean> {
	return function executeIsConnected(): boolean {
		const stateResult = connection.next()
		const state = assertExists(stateResult.value)
		
		const eventSourceLens = lens<HotReloadState, EventSource | null>('eventSource')
		const webSocketLens = lens<HotReloadState, WebSocket | null>('webSocket')
		
		const eventSource = eventSourceLens.get(state)
		const webSocket = webSocketLens.get(state)
		
		const eventSourceConnected = and(
			isUnequal(null)(eventSource)
		)(
			isEqual(EVENT_SOURCE_OPEN_STATE)(eventSource?.readyState)
		)
		
		const webSocketConnected = and(
			isUnequal(null)(webSocket)
		)(
			isEqual(WEB_SOCKET_OPEN_STATE)(webSocket?.readyState)
		)
		
		return or(eventSourceConnected)(webSocketConnected)
	}
}
```

---

## _hotReloadClient

**File**: [`libraries/quartermaster/src/client/hotReloadClient/index.ts`](../src/client/hotReloadClient/index.ts)
**Current Behavior**: Creates hot reload connection with state machine generator, initializes it, and starts connection

### Rule Violations:

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Line 32 - Executes IO side effect immediately with `connection.next()`

**Fix**:
1. Don't execute IO during function definition
2. Wrap all initialization in IO monad
3. Return IO that when executed will initialize and return connection

**Violation**: Line 35 - Uses `map` on IO but entire function should be one IO composition

**Fix**: Compose all IO operations properly without mixing execution and definition

**Example**:

```typescript
// ❌ Current (lines 16-36)
export default function _hotReloadClient(config: HotReloadConfig = {}) {
	return function initHotReloadWithConfig(): IO<HotReloadConnection> {
		const configuration: Required<HotReloadConfig> = {
			...DEFAULT_CONFIG,
			...config,
		}

		const logFunction = _log(configuration)
		const errorFunction = _error(configuration)

		// Create the generator state machine - this IS the connection
		const connection = _connectionStateMachine(configuration)(logFunction)(
			errorFunction,
		)

		// Initialize the generator (first .next() yields initial state)
		connection.next()  // ❌ Executes IO immediately

		// Start the connection (send initial connect event)
		return map(_startConnection(connection))(io(connection))
	}
}

// ✅ Fixed - all IO deferred
export default function _hotReloadClient(config: HotReloadConfig = {}) {
	return function initHotReloadWithConfig(): IO<HotReloadConnection> {
		return function executeInitHotReload(): HotReloadConnection {
			const configuration: Required<HotReloadConfig> = {
				...DEFAULT_CONFIG,
				...config,
			}

			const logFunction = _log(configuration)
			const errorFunction = _error(configuration)

			const connection = _connectionStateMachine(configuration)(logFunction)(
				errorFunction,
			)

			// Initialize generator
			connection.next()

			// Start connection - returns IO<HotReloadConnection>
			const startIO = _startConnection(connection)
			return startIO()
		}
	}
}
```

#### Design Issue - Confusing IO Composition

**Violation**: Line 35 - Mixes `map`, `io`, and direct execution in confusing way

**Fix**: Simplify IO composition to be clear and direct

---

## _error

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_error/index.ts`](../src/client/hotReloadClient/_error/index.ts)
**Current Behavior**: Logs error messages to console when debug mode is enabled

### Rule Violations:

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Line 9 - Parameter name `args` should be `arguments`

**Fix**: Rename to spell out full word

**Example**:

```typescript
// ❌ Current (line 8-9)
return function errorWithConfiguration(
	...args: ReadonlyArray<unknown>
): IO<void> {

// ✅ Fixed
return function errorWithConfiguration(
	...arguments: ReadonlyArray<unknown>
): IO<void> {
```

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Line 13 - Uses `console.error` directly - should use abstraction

**Fix**:
1. Create IO abstraction for console operations
2. Don't call browser APIs directly
3. This enables testing and mocking

**Example**:

```typescript
// ❌ Current (line 13)
console.error("[Hot Reload]", ...args)

// ✅ Fixed
// Create console abstraction in Toolsmith
import { consoleError } from '@sitebender/toolsmith/io/console/error'
return consoleError("[Hot Reload]")(...arguments)
```

---

## _log

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_log/index.ts`](../src/client/hotReloadClient/_log/index.ts)
**Current Behavior**: Logs info messages to console when debug mode is enabled

### Rule Violations:

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Line 8 - Parameter name `args` should be `arguments`

**Fix**: Same as [`_error`](#_error) - rename to `arguments`

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Line 11 - Uses `console.log` directly

**Fix**: Use console abstraction from Toolsmith (same pattern as `_error`)

---

## _sendEvent

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_sendEvent/index.ts`](../src/client/hotReloadClient/_sendEvent/index.ts)
**Current Behavior**: Sends events to state machine generator and handles side effects based on new state

### Rule Violations:

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 37 - Uses `!` operator with `!result.done`

**Fix**: Use `not` from Toolsmith

**Violation**: Line 45 - Uses `!==` operator comparing to `null`

**Fix**: Use `isUnequal` from Toolsmith

**Violation**: Line 46 - Uses `===` operator comparing event types

**Fix**: Use `isEqual` from Toolsmith

**Violation**: Line 61 - Uses `!==` operator

**Fix**: Use `isUnequal` from Toolsmith

**Violation**: Line 62 - Uses `===` operator

**Fix**: Use `isEqual` from Toolsmith

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 35 - Calls `stateMachine.next(event)` - method on generator object

**Fix**: Generators are acceptable exception, but should document as such

**Violation**: Lines 40-41 - Multiple instances of accessing properties on objects: `getCurrentState()`, `setCurrentState(newState)`, `currentState.eventSource`, `currentState.webSocket`

**Fix**: These are function calls and property access - use lenses for properties

**Violation**: Lines 48-73 - Calls `setupSSEListeners(currentState.eventSource)` and `setupWebSocketListeners(currentState.webSocket)` - passing object properties

**Fix**: This creates tight coupling to object structure

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Line 35 - Executes IO immediately with `stateMachine.next(event)` inside IO function

**Fix**: This is acceptable for generator coordination, but needs documentation

**Violation**: Lines 53-57, 69-73 - Calls `runIO()` to execute IO immediately

**Fix**: Don't execute IO here - return composed IO for caller to execute

#### Design Issue - Recursive Complexity

**Violation**: Lines 48-52, 64-68 - Creates recursive `sendEventRecursive` by calling `_sendEvent` again

**Fix**:
1. This circular reference pattern is complex and hard to reason about
2. Consider using state machine pattern differently
3. Simplify the recursion or eliminate it

#### Design Issue - Too Many Parameters

**Violation**: Function takes 5 curried parameters before reaching the actual event parameter

**Fix**:
1. Refactor to reduce parameter count
2. Consider passing configuration object
3. This violates single responsibility - doing too much

---

## _setupSSEListeners

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_setupSSEListeners/index.ts`](../src/client/hotReloadClient/_setupSSEListeners/index.ts)
**Current Behavior**: Attaches event listeners to EventSource for open, reload, and error events

### Rule Violations:

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Function name contains `SSE` abbreviation

**Fix**: Rename to `_setupServerSentEventsListeners`

**Violation**: Line 12 - Parameter name `sendEvent` is passed as callback but signature shows wrong type

**Fix**: Type signature shows `sendEvent: (event: ConnectionEvent) => void` but should be `=> IO<void>`

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Lines 16, 20, 24 - Calls methods on `eventSource` object: `eventSource.addEventListener`

**Fix**:
1. Create functional wrapper for addEventListener
2. Don't call methods on browser objects directly
3. Use IO abstraction for event registration

**Example**:

```typescript
// ❌ Current (line 16)
eventSource.addEventListener("open", function handleSSEOpen() {
	sendEvent({ type: "sse_open" })
})

// ✅ Fixed
import { addEventListenerIO } from '@sitebender/toolsmith/io/dom/addEventListener'
return addEventListenerIO(eventSource)("open")(function handleServerSentEventsOpen() {
	return sendEvent({ type: "serverSentEventsOpen" })
})
```

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Lines 16-29 - Executes IO side effects (addEventListener) directly instead of composing IO operations

**Fix**:
1. Compose all addEventListener operations as IO
2. Return single IO that registers all listeners
3. Don't execute during function definition

#### Type Mismatch

**Violation**: Line 12 - Type shows `sendEvent: (event: ConnectionEvent) => void` but should be `=> IO<void>`

**Fix**: Update type signature to match IO monad pattern

---

## _setupWebSocketListeners

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_setupWebSocketListeners/index.ts`](../src/client/hotReloadClient/_setupWebSocketListeners/index.ts)
**Current Behavior**: Attaches event listeners to WebSocket for open, message, close, and error events

### Rule Violations:

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Function name could be clearer (WebSocket is acceptable as proper noun but verify)

**Fix**: Verify WebSocket capitalization is correct per style guide

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Lines 17, 21, 28, 32 - Calls `webSocket.addEventListener` methods

**Fix**: Same as [`_setupSSEListeners`](#_setupsselisteners) - use IO abstraction

**Violation**: Line 24 - Accesses `event.data` property

**Fix**: Use lens to extract data property from event object

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Lines 17-37 - Executes IO side effects directly

**Fix**: Compose IO operations, return single IO

#### Type Mismatch

**Violation**: Line 13 - Type shows `sendEvent: (event: ConnectionEvent) => void` but should be `=> IO<void>`

**Fix**: Update type signature

---

## _startConnection

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_startConnection/index.ts`](../src/client/hotReloadClient/_startConnection/index.ts)
**Current Behavior**: Starts initial SSE connection by sending connect event

### Rule Violations:

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Comment line 4 mentions "SSE"

**Fix**: Spell out "Server-Sent Events"

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Line 12 - Executes IO immediately with `sendEvent({ type: "connect_sse" })()`

**Fix**:
1. Don't execute IO here
2. Return IO composition
3. Let caller execute

**Example**:

```typescript
// ❌ Current (lines 8-14)
return function startConnectionWithSendEvent(
	connection: HotReloadConnection,
) {
	return function executeStartConnection(): HotReloadConnection {
		sendEvent({ type: "connect_sse" })()
		return connection
	}
}

// ✅ Fixed
return function startConnectionWithSendEvent(
	connection: HotReloadConnection,
) {
	return function executeStartConnection(): IO<HotReloadConnection> {
		return map(() => connection)(sendEvent({ type: "connect_sse" }))
	}
}
```

#### Design Issue - Parameter Order

**Violation**: Function curries `sendEvent` first, then `connection` - backwards

**Fix**: More natural to curry `connection` first since it's the primary data

---

## _connectionStateMachine

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/index.ts)
**Current Behavior**: Core state machine generator managing SSE/WebSocket connections with automatic fallback and reconnection

### Rule Violations:

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Throughout - uses `SSE` abbreviation in strings and function names

**Fix**: Replace all instances with "ServerSentEvents"

**Violation**: Lines 90, 91, etc. - Uses `ms` abbreviation in strings

**Fix**: Spell out "milliseconds"

#### ANTI_MULTIPLE_FUNCTIONS_001 - One Function Per File

**Violation**: Line 57 - Defines nested function `getCurrentStateSnapshot` inside generator

**Fix**:
1. Extract to separate file `_connectionStateMachine/_getCurrentStateSnapshot/index.ts`
2. Pass state as parameter
3. Keep one function per file

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 85 - Uses `!==` operator

**Fix**: Use `isUnequal` from Toolsmith

**Violation**: Line 85 - Uses `||` operator

**Fix**: Use `or` from Toolsmith

**Violation**: Lines 106, 142, 172, 182, etc. - Multiple uses of `===`, `!==` operators

**Fix**: Replace all with `isEqual`, `isUnequal`

**Violation**: Line 80 - Uses `===` with `undefined`

**Fix**: Use Toolsmith's `isUndefined` function

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 95 - Calls `window.setTimeout` - accessing global object method

**Fix**: Create IO abstraction for setTimeout

**Violation**: Lines 110, 123, 129, 162, etc. - Calls functions directly without IO wrapping

**Fix**: All side effects should be wrapped in IO

**Violation**: Line 129 - Accesses `configuration.onConnect` - property access on object

**Fix**: Use lens or pass callback separately

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Lines 93-100, 110-118, 123-130, etc. - Executes IO operations directly inside generator

**Fix**: Generators are exception per rules, but operations should still be wrapped in IO

**Violation**: Lines 129, 144, 156, 214, etc. - Calls callbacks directly: `configuration.onConnect()`, `configuration.onDisconnect()`, `configuration.onReload()`

**Fix**: These should return IO operations, not execute directly

#### FP_GENERATOR_EXCEPTIONS_001 - Generator Function Exceptions

**Violation**: Lines 37-55 - Uses `let` for mutable state

**Note**: This is acceptable per generator exception rules, but needs comment

**Fix**: Add comment: `// [GENERATOR_EXCEPTION] Mutable state for generator state machine`

#### Design Issue - Massive Function

**Violation**: 341 lines - this function is doing far too much

**Fix**:
1. Extract each `case` into separate function
2. Each case handler should be in own file
3. Split into smaller, focused functions
4. This violates single responsibility principle

---

## _calculateBackoffDelay

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/_calculateBackoffDelay/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/_calculateBackoffDelay/index.ts)
**Current Behavior**: Calculates next reconnect delay using exponential backoff with maximum cap

### Rule Violations:

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 12 - Uses `*` operator

**Fix**: Import and use `multiply` from Toolsmith

**Example**:

```typescript
// ❌ Current (line 12)
return Math.min(currentDelay * multiplier, maxDelay)

// ✅ Fixed
import { multiply } from '@sitebender/toolsmith/math/float/multiply'
import { minimum } from '@sitebender/toolsmith/math/float/minimum'

return function calculateBackoffDelayWithMax(): number {
	const product = multiply(currentDelay)(multiplier)
	return minimum(product)(maxDelay)
}
```

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 12 - Calls `Math.min` - accessing method on global Math object

**Fix**: Use Toolsmith's `minimum` function instead

---

## _clearConnectionTimeout

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/_clearConnectionTimeout/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/_clearConnectionTimeout/index.ts)
**Current Behavior**: Clears browser timeout if ID is not null

### Rule Violations:

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 6 - Uses `!==` operator

**Fix**: Use `isUnequal` from Toolsmith

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 7 - Calls global `clearTimeout` function

**Fix**: Create IO wrapper for clearTimeout

**Example**:

```typescript
// ❌ Current (lines 2-9)
export default function _clearConnectionTimeout(
	connectionTimeoutId: number | null,
) {
	return function clearConnectionTimeoutWithId(): void {
		if (connectionTimeoutId !== null) {
			clearTimeout(connectionTimeoutId)
		}
	}
}

// ✅ Fixed
import { isUnequal } from '@sitebender/toolsmith/validation/isUnequal'
import { clearTimeoutIO } from '@sitebender/toolsmith/io/timers/clearTimeout'

export default function _clearConnectionTimeout(
	connectionTimeoutId: number | null,
) {
	return function clearConnectionTimeoutWithId(): IO<void> {
		return function executeClearTimeout(): void {
			if (isUnequal(null)(connectionTimeoutId)) {
				clearTimeoutIO(connectionTimeoutId)()
			}
		}
	}
}
```

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Function returns `void` but performs IO side effect

**Fix**: Return `IO<void>` to represent deferred execution

---

## _createEventSourceSafely

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/_createEventSourceSafely/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/_createEventSourceSafely/index.ts)
**Current Behavior**: Creates EventSource safely with try-catch, returning Result

### Rule Violations:

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Comment line 7 uses "IO" abbreviation without brackets

**Fix**: Spell out Input/Output or use proper [IO] marker

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 17 - Uses `new EventSource(endpoint)` - class instantiation

**Fix**:
1. This is browser API with no alternative
2. Add comment: `// [EXCEPTION] Browser API requires new keyword`
3. Wrapper provides functional interface

**Example**:

```typescript
// ❌ Current (line 17)
const eventSource = new EventSource(endpoint)

// ✅ Fixed
// [EXCEPTION] Browser EventSource API requires class instantiation
const eventSource = new EventSource(endpoint)
```

#### Design Pattern - Good Exception Handling

**Note**: This function correctly uses Result monad for exception handling - this is the right pattern

---

## _createWebSocketSafely

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/_createWebSocketSafely/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/_createWebSocketSafely/index.ts)
**Current Behavior**: Creates WebSocket safely with try-catch, returning Result

### Rule Violations:

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Comment line 7 uses "IO" abbreviation

**Fix**: Use [IO] marker or spell out

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 17 - Uses `new WebSocket(endpoint)` - class instantiation

**Fix**: Add exception comment (same as EventSource)

**Example**:

```typescript
// ❌ Current (line 17)
const webSocket = new WebSocket(endpoint)

// ✅ Fixed
// [EXCEPTION] Browser WebSocket API requires class instantiation
const webSocket = new WebSocket(endpoint)
```

---

## _disconnectSSE

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/_disconnectSSE/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/_disconnectSSE/index.ts)
**Current Behavior**: Closes EventSource connection and clears associated timeout

### Rule Violations:

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Function name contains `SSE` abbreviation

**Fix**: Rename to `_disconnectServerSentEvents`

#### LOWEST_COMMON_ANCESTOR_001 - Place Functions at Lowest Common Ancestor

**Violation**: Line 1 - Imports `clearConnectionTimeout` from wrong location

**Fix**: Path should be relative to actual location, this import is incorrect

**Violation**: Line 1 - Import path shows `./_clearConnectionTimeout/index.ts` but that's a sibling, not child

**Fix**: Should be `../_clearConnectionTimeout/index.ts`

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 9 - Uses `!==` operator

**Fix**: Use `isUnequal` from Toolsmith

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 10 - Calls `eventSource.close()` method

**Fix**: Wrap in IO abstraction

**Example**:

```typescript
// ❌ Current (lines 4-12)
export default function _disconnectSSE(eventSource: EventSource | null) {
	return function disconnectSSEFromEventSource(
		connectionTimeoutId: number | null,
	): void {
		clearConnectionTimeout(connectionTimeoutId)()
		if (eventSource !== null) {
			eventSource.close()
		}
	}
}

// ✅ Fixed
import { isUnequal } from '@sitebender/toolsmith/validation/isUnequal'
import { closeEventSourceIO } from '@sitebender/toolsmith/io/eventSource/close'

export default function _disconnectServerSentEvents(
	eventSource: EventSource | null
) {
	return function disconnectFromEventSource(
		connectionTimeoutId: number | null,
	): IO<void> {
		return function executeDisconnect(): void {
			clearConnectionTimeout(connectionTimeoutId)()
			if (isUnequal(null)(eventSource)) {
				closeEventSourceIO(eventSource)()
			}
		}
	}
}
```

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Returns `void` but performs IO

**Fix**: Return `IO<void>`

---

## _disconnectWebSocket

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/_disconnectWebSocket/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/_disconnectWebSocket/index.ts)
**Current Behavior**: Closes WebSocket connection if not null

### Rule Violations:

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 4 - Uses `!==` operator

**Fix**: Use `isUnequal` from Toolsmith

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 5 - Calls `webSocket.close()` method

**Fix**: Wrap in IO abstraction

**Example**:

```typescript
// ❌ Current (lines 2-7)
export default function _disconnectWebSocket(webSocket: WebSocket | null) {
	return function disconnectWebSocketWithSocket(): void {
		if (webSocket !== null) {
			webSocket.close()
		}
	}
}

// ✅ Fixed
import { isUnequal } from '@sitebender/toolsmith/validation/isUnequal'
import { closeWebSocketIO } from '@sitebender/toolsmith/io/webSocket/close'

export default function _disconnectWebSocket(webSocket: WebSocket | null) {
	return function disconnectWebSocketWithSocket(): IO<void> {
		return function executeDisconnect(): void {
			if (isUnequal(null)(webSocket)) {
				closeWebSocketIO(webSocket)()
			}
		}
	}
}
```

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Returns `void` but performs IO

**Fix**: Return `IO<void>`

---

## _handleReloadEvent

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/_handleReloadEvent/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/_handleReloadEvent/index.ts)
**Current Behavior**: Processes reload event by incrementing counter and triggering callback

### Rule Violations:

#### NO_ABBREVIATIONS_001 - No Abbreviations

**Violation**: Line 11 - Parameter `args` should be `arguments`

**Fix**: Rename to spell out full word (but note `arguments` is reserved - use `logArguments`)

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 14 - Calls `configuration.onReload()` - accessing property and calling method

**Fix**: Pass callback as separate parameter, not as object property

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Line 14 - Executes IO callback directly

**Fix**: Callback should return IO that caller executes

**Example**:

```typescript
// ❌ Current (lines 4-20)
export default function _handleReloadEvent(
	metrics: Readonly<ConnectionMetrics>,
) {
	return function handleReloadEventWithMetrics(
		configuration: Readonly<Required<HotReloadConfig>>,
	) {
		return function handleReloadEventWithConfiguration(
			logFunction: (...args: ReadonlyArray<unknown>) => void,
		): ConnectionMetrics {
			logFunction("Reload event received")
			configuration.onReload()
			return {
				...metrics,
				reloadEventsReceived: metrics.reloadEventsReceived + 1,
			}
		}
	}
}

// ✅ Fixed
export default function _handleReloadEvent(
	metrics: Readonly<ConnectionMetrics>,
) {
	return function handleReloadEventWithMetrics(
		onReload: () => IO<void>,
	) {
		return function handleReloadEventWithCallback(
			logFunction: (...logArguments: ReadonlyArray<unknown>) => IO<void>,
		): IO<ConnectionMetrics> {
			return function executeHandleReload(): ConnectionMetrics {
				logFunction("Reload event received")()
				onReload()()
				return {
					...metrics,
					reloadEventsReceived: add(metrics.reloadEventsReceived)(1),
				}
			}
		}
	}
}
```

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 17 - Uses `+` operator for addition

**Fix**: Use `add` from Toolsmith math functions

---

## _incrementAttempts

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/_incrementAttempts/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/_incrementAttempts/index.ts)
**Current Behavior**: Increments attempts counter in metrics immutably

### Rule Violations:

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 10 - Uses `+` operator

**Fix**: Use `add` from Toolsmith

**Example**:

```typescript
// ❌ Current (lines 4-12)
export default function _incrementAttempts(
	metrics: Readonly<ConnectionMetrics>,
) {
	return function incrementAttemptsWithMetrics(): Readonly<ConnectionMetrics> {
		return {
			...metrics,
			attempts: metrics.attempts + 1,
		}
	}
}

// ✅ Fixed
import { add } from '@sitebender/toolsmith/math/integer/add'

export default function _incrementAttempts(
	metrics: Readonly<ConnectionMetrics>,
) {
	return function incrementAttemptsWithMetrics(): Readonly<ConnectionMetrics> {
		return {
			...metrics,
			attempts: add(metrics.attempts)(1),
		}
	}
}
```

---

## _incrementFallbacks

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/_incrementFallbacks/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/_incrementFallbacks/index.ts)
**Current Behavior**: Increments fallbacks counter in metrics immutably

### Rule Violations:

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 10 - Uses `+` operator

**Fix**: Use `add` from Toolsmith (same as [`_incrementAttempts`](#_incrementattempts))

---

## _parseMessageSafely

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/_parseMessageSafely/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/_parseMessageSafely/index.ts)
**Current Behavior**: Parses JSON message safely with try-catch, returning Result

### Rule Violations:

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 17 - Calls `JSON.parse(data)` - accessing global object method

**Fix**:
1. This is standard JavaScript API with no alternative
2. Add comment: `// [EXCEPTION] JSON.parse is standard JavaScript API`
3. Wrapper provides functional Result interface

**Example**:

```typescript
// ❌ Current (line 17)
const parsed = JSON.parse(data)

// ✅ Fixed
// [EXCEPTION] JSON.parse is standard JavaScript API with no functional alternative
const parsed = JSON.parse(data)
```

#### Design Pattern - Good Exception Handling

**Note**: Correctly uses Result monad for exception handling

---

## _updateMetrics

**File**: [`libraries/quartermaster/src/client/hotReloadClient/_connectionStateMachine/_updateMetrics/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/_updateMetrics/index.ts)
**Current Behavior**: Updates metrics based on connection status

### Rule Violations:

#### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Violation**: Line 25 - Uses `+` operator

**Fix**: Use `add` from Toolsmith

**Example**:

```typescript
// ❌ Current (line 25)
failedConnections: metrics.failedConnections + 1,

// ✅ Fixed
import { add } from '@sitebender/toolsmith/math/integer/add'

failedConnections: add(metrics.failedConnections)(1),
```

#### ANTI_OOP_001 - No Classes or OOP Patterns

**Violation**: Line 19 - Calls `Date.now()` - accessing global object method

**Fix**: Create IO abstraction for Date operations

**Example**:

```typescript
// ❌ Current (line 19)
lastConnectionTime: Date.now(),

// ✅ Fixed
import { dateNowIO } from '@sitebender/toolsmith/io/date/now'

// Function needs to return IO<ConnectionMetrics> instead
return function updateMetricsWithType(
	connected: boolean,
): IO<ConnectionMetrics> {
	return function executeUpdateMetrics(): ConnectionMetrics {
		const baseUpdate = {
			...metrics,
			connectionType: currentConnectionType,
		}

		if (connected) {
			return {
				...baseUpdate,
				lastConnectionTime: dateNowIO()(),
			}
		}

		return {
			...baseUpdate,
			failedConnections: add(metrics.failedConnections)(1),
		}
	}
}
```

#### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Violation**: Function performs IO (`Date.now()`) but returns plain value

**Fix**: Return `IO<ConnectionMetrics>`

---

## Summary

**Total Functions Analyzed:** 25

**Total Violations Found:** 200+

All violations are equally important - no prioritization. Every violation must be fixed to achieve zero-violation state.

**Major Violation Categories:**

1. **SEMANTIC_FUNCTIONS_001** - Replace operators with Toolsmith functions (===, !==, !, +, *, ||, &&)
2. **ANTI_OOP_001** - Remove object property access, method calls, class instantiation
3. **FP_PURE_EXCEPT_IO_001** - Wrap all IO in IO monad, don't execute immediately
4. **NO_ABBREVIATIONS_001** - Spell out SSE, ms, ws, args
5. **LOWEST_COMMON_ANCESTOR_001** - Place helpers at correct level
6. **Design Issues** - Simplify pointless wrappers, reduce complexity, fix type mismatches

**Types and Constants Status:**

**Partially Fixed:**
- ✅ `ConnectionMetrics`, `HotReloadState`, `HotReloadConfig`, and all error types converted from `interface` to `type`
- ✅ `HotReloadState` has proper `readonly` modifiers
- ✅ All error types have proper `readonly` modifiers
- ✅ Constants file has no OOP patterns

**Still Needs Fixing:**
- ❌ `ConnectionMetrics` (lines 12-21) - Missing `readonly` modifiers on all properties
- ❌ All abbreviations remain in both files (`SSE`, `ms`, `ws`, `http3-sse`, etc.)

**Files Requiring Most Work:**

1. [`_connectionStateMachine/index.ts`](../src/client/hotReloadClient/_connectionStateMachine/index.ts) - 341 lines, massive complexity
2. [`_sendEvent/index.ts`](../src/client/hotReloadClient/_sendEvent/index.ts) - Complex recursion, too many parameters
3. All setup listener functions - Need IO abstractions for browser APIs
4. Types file - One remaining `interface`, missing `readonly` on ConnectionMetrics, all abbreviations

**Next Steps:**

1. Complete types and constants fixes:
   - Add `readonly` to all `ConnectionMetrics` properties
   - Remove all abbreviations from types and constants
2. Create Toolsmith IO abstractions for browser APIs (addEventListener, setTimeout, Date.now, etc.)
3. Fix operator substitutions throughout
4. Refactor large functions into smaller pieces
5. Fix IO monad usage - everything returns IO, nothing executes immediately
6. Eliminate OOP patterns and object property access
