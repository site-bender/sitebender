# Operator Component API Specifications

## Core Components

### Channel

The root container that establishes event scope and transport.

```tsx
type ChannelProps = {
	id: string // Unique channel identifier
	scope: "local" | "broadcast" | "network" | "distributed"
	ordering?: "causal" | "total" | "partial" // Event ordering guarantee
	transport?: TransportOptions // Override transport selection
	encryption?: EncryptionOptions // E2E encryption config
	persistence?: PersistenceOptions // Event log settings
	children: JSX.Element | Array<JSX.Element>
}

// Example
<Channel id="app-events" scope="broadcast" ordering="causal">
	{children}
</Channel>
```

### Publisher

Declares an event publisher with triple structure.

```tsx
type PublisherProps = {
	subject: string | (() => string) // RDF subject
	predicate: string // RDF predicate
	object?: string | (() => unknown) // RDF object
	timestamp?: "temporal" | "logical" | "hybrid" // Timestamp strategy
	anonymous?: "ring" | "group" | false // Anonymous publishing
	entangled?: boolean // Quantum entanglement
	children?: JSX.Element
}

// Example
<Publisher subject={() => userId} predicate="clicked" object="save-button">
	<Button>Save</Button>
</Publisher>
```

### Publishes

Child component that declares what events an element publishes.

```tsx
type PublishesProps = {
	event: keyof HTMLElementEventMap // DOM event to capture
	as: string | EventPattern // Event name/pattern
	with?: JSX.Element // Transform component
	throttle?: string // ISO 8601 duration
	debounce?: string // ISO 8601 duration
	batch?: BatchOptions // Event batching
}

// Example
<Button>
	<Publishes event="click" as="user:action:save" debounce="PT0.3S" />
	Save Document
</Button>
```

### Subscribes

Declares event subscriptions with pattern matching.

```tsx
type SubscribesProps = {
	to: string | Array<string> | RegExp // Event patterns
	when?: JSX.Element // Filter component
	then: JSX.Element | Array<JSX.Element> // Effect components
	priority?: number // Subscription priority
	replay?: boolean // Replay missed events
	window?: WindowOptions // Windowing for aggregation
}

// Example
<Dashboard>
	<Subscribes
		to="metrics:temperature:*"
		when={<Filter match={isHighTemp} />}
		then={<Effect apply={showAlert} />}
	/>
</Dashboard>
```

## Transform Components

### Transform

Pure function transformation of events.

```tsx
type TransformProps = {
	map: (event: EventTriple) => EventTriple // Transform function
	validate?: boolean // Validate output
}

// Example
<Publishes event="submit" as="form:submitted">
	<Transform map={formDataToTriple} />
</Publishes>
```

### Filter

Predicate-based event filtering.

```tsx
type FilterProps = {
	match: (event: EventTriple) => boolean // Filter predicate
	invert?: boolean // Invert the match
}

// Example
<Subscribes to="user:*">
	<Filter match={(event) => event.object.role === "admin"} />
</Subscribes>
```

### Effect

Side effect execution on events.

```tsx
type EffectProps = {
	apply: (event: EventTriple) => Promise<void> // Effect function
	rollback?: (event: EventTriple) => Promise<void>
	idempotent?: boolean // Guarantee idempotency
}

// Example
<Subscribes to="payment:completed">
	<Effect apply={sendReceipt} rollback={cancelReceipt} idempotent={true} />
</Subscribes>
```

## Monadic Pipeline Components

### Pipe

Compose a pipeline of event transformations.

```tsx
type PipeProps = {
	children: JSX.Element | Array<JSX.Element> // Pipeline stages
}

// Example
<Subscribes to="sensor:reading">
	<Pipe>
		<Map with={normalize} />
		<Filter with={isValid} />
		<Fold with={average} into={0} />
	</Pipe>
</Subscribes>
```

### Map

Functor map over events.

```tsx
type MapProps = {
	with: <A, B>(a: A) => B // Mapping function
}
```

### FlatMap

Monadic bind for event streams.

```tsx
type FlatMapProps = {
	with: <A, B>(a: A) => EventStream<B> // Bind function
}
```

### Fold

Fold/reduce over event windows.

```tsx
type FoldProps = {
	with: <A, B>(acc: B, curr: A) => B // Fold function
	into: unknown // Initial value
}
```

### Fork

Split processing into parallel branches.

```tsx
type ForkProps = {
	children: [JSX.Element, JSX.Element] // Exactly two branches
}

// Example
<Fork>
	<Left>
		<Log to="audit" />
	</Left>
	<Right>
		<Render to="ui" />
	</Right>
</Fork>
```

## Security Components

### Encrypt

End-to-end encryption configuration.

```tsx
type EncryptProps = {
	with: "nacl-box" | "nacl-secretbox" | "age" // Encryption algorithm
	for?: Array<string> // DID recipients
	children?: JSX.Element
}
```

### Sign

Digital signatures for events.

```tsx
type SignProps = {
	with: "ed25519" | "secp256k1" | "bls" // Signature algorithm
	key?: string // Signing key ID
}
```

### Capability

Capability-based access control.

```tsx
type CapabilityProps = {
	issuer: string // DID of issuer
	bearer: string // DID of bearer
	allows: Array<"subscribe" | "publish" | "replay">
	expires?: string // ISO 8601 duration
}
```

## Advanced Components

### Bridge

Connect different transport scopes.

```tsx
type BridgeProps = {
	from: string // Source channel
	to: string // Target channel
	filter?: JSX.Element // Optional filter
	transform?: JSX.Element // Optional transform
	children?: JSX.Element // Encryption, etc.
}

// Example
<Bridge from="local:ui" to="network:backend">
	<Encrypt with="nacl-box" />
	<Filter match={isUserEvent} />
</Bridge>
```

### Replay

Replay historical events.

```tsx
type ReplayProps = {
	from: string // ISO 8601 timestamp
	to?: string // ISO 8601 timestamp
	speed?: number // Replay speed factor
	filter?: JSX.Element // Event filter
	children?: JSX.Element
}
```

### Window

Time-based or count-based windowing.

```tsx
type WindowProps = {
	size: string | number // Duration or count
	slide?: string | number // Sliding window
	align?: "left" | "right" | "center" // Window alignment
	children: JSX.Element
}
```

### VectorClock

Attach vector clocks for causal ordering.

```tsx
type VectorClockProps = {
	nodeId?: string // Node identifier
	merge?: "lww" | "mvreg" | "orset" // CRDT merge strategy
}
```

### HomomorphicSum

Compute on encrypted events.

```tsx
type HomomorphicSumProps = {
	compute: "sum" | "average" | "count" // Computation type
	without: "decrypting" // Must be "decrypting"
	reveal: string | Array<string> // Who can decrypt
}
```

### Superpose

Quantum-inspired superposition.

```tsx
type SuperposeProps = {
	states: Array<string> // Superposed states
	collapse?: JSX.Element // Collapse condition
}
```

### SmartEvent

Blockchain-anchored smart contract events.

```tsx
type SmartEventProps = {
	condition: string // Execution condition
	execute: string // Contract method
	verify: "zero-knowledge" | "merkle" // Proof type
	blockchain?: "local-first" | "ethereum" | "cosmos"
}
```

### Neural Optimizer

ML-based event routing optimization.

```tsx
type OptimizerProps = {
	mode: "neural" | "statistical" // Optimization type
	children: JSX.Element | Array<JSX.Element> // Learn, Predict, etc.
}

type LearnProps = {
	from: "event-history" | string // Training data source
	model?: "attention" | "gnn" | "lstm" // Model architecture
}

type PredictProps = {
	next: "likely-subscribers" | "event-pattern" // Prediction target
	confidence?: number // Min confidence threshold
}
```

## Testing Components

### TestHarness

Root testing container.

```tsx
type TestHarnessProps = {
	scenario?: string // Test scenario name
	deterministic?: boolean // Deterministic replay
	children: JSX.Element | Array<JSX.Element>
}
```

### MockPublisher

Scripted event emission for tests.

```tsx
type MockPublisherProps = {
	id: string // Publisher ID
	children: JSX.Element | Array<JSX.Element> // EmitSequence, etc.
}
```

### EmitSequence

Emit a sequence of test events.

```tsx
type EmitSequenceProps = {
	events: Array<EventTriple> // Events to emit
	timing?: "immediate" | "realistic" | TimingFunction
}
```

### AssertSubscriber

Assert events were received.

```tsx
type AssertSubscriberProps = {
	to: string | Array<string> // Event patterns
	children: JSX.Element | Array<JSX.Element> // Assertions
}
```

### Receives

Assert receipt conditions.

```tsx
type ReceivesProps = {
	exactly?: number // Exact count
	atLeast?: number // Minimum count
	atMost?: number // Maximum count
	within?: string // ISO 8601 duration
}
```

### Ordering

Assert event ordering.

```tsx
type OrderingProps = {
	is: "causal" | "total" | "partial" // Expected ordering
	strict?: boolean // Strict checking
}
```

## Type Definitions

```typescript
type EventTriple = {
	subject: string
	predicate: string
	object: unknown
	metadata?: EventMetadata
}

type EventMetadata = {
	id: string
	timestamp: Temporal.Instant
	vectorClock?: VectorClock
	signature?: Signature
	encryption?: EncryptionMetadata
}

type EventPattern =
	| string
	| RegExp
	| {
		subject?: string | RegExp
		predicate?: string | RegExp
		object?: unknown
	}

type EventStream<T> = AsyncIterable<T>

type TransportOptions = {
	preferred?: "webtransport" | "webrtc" | "websocket"
	fallback?: boolean
	timeout?: number
}

type EncryptionOptions = {
	algorithm: "nacl-box" | "nacl-secretbox" | "age"
	recipients?: Array<string>
	ephemeral?: boolean
}

type PersistenceOptions = {
	store: "triple-store" | "event-log" | "none"
	retention?: string // ISO 8601 duration
	compression?: "zstd" | "lz4" | "none"
}

type BatchOptions = {
	size?: number
	timeout?: string // ISO 8601 duration
	strategy?: "eager" | "lazy"
}

type WindowOptions = {
	type: "tumbling" | "sliding" | "session"
	size: string | number
	grace?: string // Late arrival grace period
}
```

## Component Composition Rules

1. **Channel** is the root container for a pub/sub scope
2. **Publisher/Publishes** must be within a Channel
3. **Subscribes** can be anywhere (finds nearest Channel)
4. **Transform/Filter/Effect** must be children of Publishes or Subscribes
5. **Pipe** stages execute in document order
6. **Fork** requires exactly two children (Left/Right)
7. **Bridge** connects two Channels by ID
8. **TestHarness** replaces Channel in test files

## IR Compilation

These TSX components compile to IR that captures:

- Event topology as a directed graph
- Transport configurations
- Security policies
- Transform/filter/effect functions as data
- CRDT merge strategies
- Persistence requirements

The IR then serializes to JSON/YAML/TOML/Turtle for storage in the triple store, enabling complete application reconstruction from data.
