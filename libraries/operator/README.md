# Operator

Pure functional pub/sub system enabling reactive communication through declarative TSX components. Events flow as triples through a multi-layer transport fabric that scales seamlessly from local DOM events to distributed global systems.

## Overview

Operator treats events as first-class data in Studio's triple store architecture. Every event is a triple (subject-predicate-object), making your entire event history queryable via SPARQL, perfectly reproducible, and cryptographically verifiable.

## Installation

```typescript
import Channel from "@sitebender/operator/components/Channel/index.ts"
import Publishes from "@sitebender/operator/components/Publishes/index.ts"
import Subscribes from "@sitebender/operator/components/Subscribes/index.ts"
```

## Core Concepts

### Events as Triples

All events in Operator are RDF triples stored in the triple store:

```tsx
<Publisher
	subject="user-123"
	predicate="clicked"
	object="button-save"
	timestamp="temporal"
/>
```

This enables:

- SPARQL queries over event history
- Time-travel debugging
- Perfect event replay
- Cryptographic verification

### Transport Layers

Operator automatically selects optimal transport based on scope:

1. **Local** (same tab): Custom DOM events with WeakMap registry
2. **Broadcast** (cross-tab): BroadcastChannel with localStorage fallback
3. **Network** (cross-device): WebTransport (HTTP/3) → WebRTC → WebSocket fallback chain
4. **Distributed** (global): libp2p pubsub with IPFS content addressing

## Basic Usage

### Publishing Events

```tsx
<Channel id="user-actions" scope="local">
	<Button>
		<Publishes event="click" as="user:clicked:button" />
		Save
	</Button>
</Channel>
```

### Subscribing to Events

```tsx
<Panel>
	<Subscribes to="user:clicked:*" then={<Effect apply={updatePanel} />} />
</Panel>
```

### Event Transformation

```tsx
<Button>
	<Publishes
		event="click"
		as="payment:initiated"
		with={<Transform map={clickToPayment} />}
	/>
	Pay Now
</Button>
```

### Event Filtering

```tsx
<Dashboard>
	<Subscribes
		to="metrics:*"
		when={<Filter match={isAboveThreshold} />}
		then={<Effect apply={showAlert} />}
	/>
</Dashboard>
```

## Advanced Patterns

### Cross-Scope Bridging

Connect different transport layers seamlessly:

```tsx
<Bridge from="local:user-actions" to="broadcast:user-actions">
	<Encrypt with="nacl-box" for={["did:key:xyz", "did:key:abc"]} />
</Bridge>
```

### Monadic Event Pipelines

Compose complex event processing with Toolsmith monads:

```tsx
<Subscribes to="sensor:reading">
	<Pipe>
		<Map with={parseReading} />
		<Filter with={isValid} />
		<FlatMap with={enrichWithContext} />
		<Fold with={calculateAverage} into={0} />
		<Fork>
			<Left>
				<Log to="metrics" />
			</Left>
			<Right>
				<Render to="display" />
			</Right>
		</Fork>
	</Pipe>
</Subscribes>
```

### Temporal Event Lattices

Events form a partially ordered lattice with vector clocks:

```tsx
<Channel id="collaborative" ordering="causal">
	<VectorClock />
	<CrdtMerge strategy="lww-element-set" />
</Channel>
```

### Homomorphic Processing

Process encrypted events without decryption:

```tsx
<Subscribes to="salary:updated">
	<HomomorphicSum
		compute="average"
		without="decrypting"
		reveal="only-to-authorized"
	/>
</Subscribes>
```

### Quantum Superposition

Events exist in superposition until observed:

```tsx
<Publisher entangled="true">
	<Superpose states={["saved", "saving", "error"]} />
	<Collapse when={<Observe by="user-interface" />} />
</Publisher>
```

## Security & Privacy

### Capability-Based Authorization

```tsx
<Capability
	issuer="did:key:publisher"
	bearer="did:key:subscriber"
	allows={["subscribe", "replay"]}
	expires="PT1H"
/>
```

### Ring Signatures

Anonymous publishing with cryptographic proof of group membership:

```tsx
<Publisher anonymous="ring">
	<RingMembers did={["alice", "bob", "carol"]} />
	<Publishes event="whistleblower:report" />
</Publisher>
```

### Differential Privacy

Add calibrated noise for privacy-preserving analytics:

```tsx
<Analytics epsilon="1.0">
	<Subscribes to="*" aggregate="count" noise="laplacian" />
</Analytics>
```

### Zero-Knowledge Proofs

Verify event properties without revealing content:

```tsx
<Subscribes to="transaction:*">
	<VerifyProof that="amount > 1000" without="revealing-amount" />
</Subscribes>
```

## Smart Contract Events

Execute deterministic computations on events:

```tsx
<Channel blockchain="local-first">
	<SmartEvent
		condition="balance > 100"
		execute="transfer"
		verify="zero-knowledge"
	/>
</Channel>
```

## Neural Event Routing

ML-optimized event prediction and routing:

```tsx
<Optimizer mode="neural">
	<Learn from="event-history" />
	<Predict next="likely-subscribers" />
	<Preload components={predicted} />
</Optimizer>
```

## Server-Side Usage

Identical TSX components work server-side with Deno:

```tsx
<Server transport="quic">
	<Channel id="global">
		<Subscribes to="client:*" from="anywhere" />
		<Publishes to="client:*" everywhere="true" />
	</Channel>
</Server>
```

## WebAssembly Modules

Performance-critical operations run in WASM:

- **Crypto**: libsodium-wasm for all cryptographic operations
- **CRDT**: Automerge-wasm for conflict-free replicated data
- **Routing**: High-performance event routing tables
- **Compression**: Zstandard dictionary compression for event streams

## Testing

Operator integrates with Studio's declarative testing:

```tsx
<TestHarness>
	<MockPublisher id="test-source">
		<EmitSequence events={testEvents} timing="realistic" />
	</MockPublisher>

	<AssertSubscriber to="test:*">
		<Receives exactly={3} within="PT1S" />
		<Ordering is="causal" />
	</AssertSubscriber>
</TestHarness>
```

## Debugging

### Event Replay

```tsx
<Replay from="2024-01-01T00:00:00Z" to="2024-01-01T01:00:00Z">
	<Speed factor={10} />
	<Filter match={debugPredicate} />
</Replay>
```

### Visual Event Flow

The Workshop provides real-time visualization of event flow through your DAG, with filters, breakpoints, and time-travel debugging.

## Performance Measurement

Every event includes timing metadata stored as triples:

- Latency at each transport layer
- Throughput measurements
- Queue depths and backpressure
- All queryable via SPARQL for trend analysis

### Real Metrics, Not Marketing

Operator measures actual performance in production:

```tsx
<PerformanceMonitor>
	<Measure latency="p50,p90,p99" />
	<Measure throughput="events/second" />
	<Measure backpressure="queue-depth" />
	<StoreTo triple-store="metrics" />
</PerformanceMonitor>
```

Query your actual performance:

```sparql
SELECT ?transport ?p99_latency
WHERE {
  ?event op:transport ?transport ;
         op:latency_p99 ?p99_latency ;
         op:timestamp ?time .
  FILTER(?time > NOW() - "PT1H"^^xsd:duration)
}
```

### Baseline Performance Targets

- **Local events**: < 1μs latency
- **Broadcast**: < 1ms latency
- **Network**: < 10ms latency (same region)
- **Distributed**: < 100ms latency (global)
- **Throughput**: 1M+ events/second (local), 100K+ events/second (network)

## Integration with Studio Libraries

### Architect

Operator events trigger DOM updates through Architect's reactive pipeline without VDOM overhead.

### Agent

Distributed events sync through Agent's CRDT adapters for eventual consistency.

### Warden

All event permissions enforced by Warden's capability-based contracts.

### Envoy

Complete event observability through Envoy's documentation graph.

### Auditor

Mathematical proofs verify event ordering and causality invariants.

### Sentinel

Authentication and authorization for event streams via DIDs and VCs.

### Formulator

Dynamic event expressions compiled from formulas.

## Examples

### Real-time Collaboration

```tsx
<Document collaborative="true">
	<Channel scope="network" ordering="causal">
		<Publishes event="cursor:moved" throttle="16ms" />
		<Publishes event="text:changed" debounce="300ms" />
		<Subscribes to="peer:cursor:*" then={<ShowCursor />} />
		<Subscribes to="peer:text:*" then={<MergeText />} />
	</Channel>
</Document>
```

### IoT Sensor Network

```tsx
<SensorNetwork>
	<Channel scope="distributed" transport="mqtt">
		<Subscribes to="sensor:temperature:*">
			<Window size="PT5M" slide="PT1M">
				<Aggregate function="mean" />
				<Alert when={<Threshold above={30} />} />
			</Window>
		</Subscribes>
	</Channel>
</SensorNetwork>
```

### Financial Trading

```tsx
<TradingSystem>
	<Channel scope="network" priority="realtime">
		<Subscribes to="market:tick:*">
			<Pipe>
				<Map with={normalizePrice} />
				<Filter with={isSignificant} />
				<Fork>
					<Left>
						<Execute trade={strategy} />
					</Left>
					<Right>
						<Log to="audit-trail" />
					</Right>
				</Fork>
			</Pipe>
		</Subscribes>
	</Channel>
</TradingSystem>
```

## API Reference

See the [API documentation](https://sitebender.studio/operator/api) for complete component and function references.

## License

MIT
