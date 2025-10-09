# G-Counter: Grow-Only Counter CRDT

## What Is It?

A **G-Counter** (Grow-only Counter) is the simplest CRDT - a distributed counter that can only increase. It's the "hello world" of conflict-free replicated data types.

### The Core Idea

Instead of storing a single number, each peer maintains a **map of counters**:

```javascript
{
  "alice": 3,
  "bob": 5,
  "charlie": 2
}
```

The **total value** is the sum: `3 + 5 + 2 = 10`

When peers sync, they take the **maximum** value for each peer's entry.

## What Does It Do?

### Basic Operations

1. **Increment**: Only the local peer can increment their own counter
2. **Read**: Sum all counters in the map
3. **Merge**: Take max of each peer's counter from both states

### Why It Works

**No conflicts are possible** because:

- Each peer only modifies their own entry
- Merge operation (max) is commutative, associative, and idempotent
- Order of operations doesn't matter

### Example Flow

```
Initial:
Alice: {"alice": 0}
Bob:   {"bob": 0}

Alice increments 3 times:
Alice: {"alice": 3}

Bob increments 5 times:
Bob:   {"bob": 5}

They sync (merge):
Alice: {"alice": 3, "bob": 5}  // total: 8
Bob:   {"alice": 3, "bob": 5}  // total: 8

Alice increments 2 more:
Alice: {"alice": 5, "bob": 5}  // total: 10

They sync again:
Both:  {"alice": 5, "bob": 5}  // total: 10
```

## The Gotchas

### 1. **Grow-Only Limitation**

- ❌ **Cannot decrement** - it's in the name!
- ❌ **Cannot reset** - counters only go up
- ✅ Use PN-Counter (Positive-Negative) if you need decrements

### 2. **Memory Growth**

- Each new peer adds an entry **forever**
- If peer "temp-xyz-123" increments once and disconnects, that entry stays
- **Mitigation**: Garbage collection strategies (discussed later)

### 3. **Identity Management**

- **Must have stable peer IDs** - if peer changes ID, old counter is orphaned
- Peer ID collision = data corruption
- **Best practice**: Use DID or cryptographic identities

### 4. **Tombstone Problem**

- Old peer entries accumulate
- "Zombie" peers that never reconnect still take space
- **Solution**: Prune entries older than X days with no activity

### 5. **Not Causally Consistent**

- Two peers can see different values at the same time
- Eventually consistent, not immediately
- **Example**: Alice sees 8, Bob sees 10, both are "correct" given their view

## Declarative JSX Configuration

### Basic G-Counter

```jsx
<GCounter id="pageViews" nodeId={userId}>
	<InitialValue>0</InitialValue>

	<SyncWith protocol="state-based" interval={5000}>
		<AllPeers />
	</SyncWith>

	<PersistTo>
		<LocalStorage key="pageViews" />
	</PersistTo>
</GCounter>
```

## The Transformation Pipeline

```
JSX → AST → IR → RDF Triples → Storage → JSON/YAML/TOML → Runtime Function Composition
```

### Step 1: JSX → AST (Parse Time)

The JSX compiler produces an abstract syntax tree:

```typescript
{
  type: "GCounter",
  props: {
    id: "pageViews",
    nodeId: { binding: "userId" }
  },
  children: [
    {
      type: "InitialValue",
      props: {},
      children: [{ type: "text", value: "0" }]
    },
    {
      type: "SyncWith",
      props: { protocol: "state-based", interval: 5000 },
      children: [
        { type: "AllPeers", props: {}, children: [] }
      ]
    },
    {
      type: "PersistTo",
      props: {},
      children: [
        { 
          type: "LocalStorage", 
          props: { key: "pageViews" }, 
          children: [] 
        }
      ]
    }
  ]
}
```

### Step 2: AST → Intermediate Representation

Transform AST into a normalized IR using Schema.org-like linked data vocabulary:

```json
{
	"@context": {
		"@vocab": "https://sitebender.io/ontology/agent#",
		"schema": "https://schema.org/",
		"crdt": "https://sitebender.io/ontology/crdt#",
		"sync": "https://sitebender.io/ontology/sync#",
		"persist": "https://sitebender.io/ontology/persist#"
	},
	"@type": "crdt:GCounter",
	"@id": "urn:uuid:pageViews",

	"schema:identifier": "pageViews",
	"crdt:nodeId": {
		"@type": "schema:PropertyValue",
		"schema:propertyID": "runtime-binding",
		"schema:value": "userId"
	},

	"crdt:initialValue": {
		"@type": "schema:Number",
		"@value": 0
	},

	"crdt:initialState": {
		"@type": "crdt:GCounterState",
		"crdt:entries": {}
	},

	"sync:protocol": {
		"@type": "sync:StateBasedProtocol",
		"sync:interval": {
			"@type": "schema:Duration",
			"@value": "PT5S"
		},
		"sync:peerSelection": {
			"@type": "sync:AllPeers",
			"sync:discoveryMode": "automatic"
		}
	},

	"persist:storage": {
		"@type": "persist:LocalStorageAdapter",
		"schema:identifier": "pageViews",
		"persist:serialization": "application/json"
	}
}
```

### Step 3: IR → RDF Triples (Turtle)

Store in triple store for querying, reasoning, and distribution:

```turtle
@prefix : <https://sitebender.io/ontology/agent#> .
@prefix schema: <https://schema.org/> .
@prefix crdt: <https://sitebender.io/ontology/crdt#> .
@prefix sync: <https://sitebender.io/ontology/sync#> .
@prefix persist: <https://sitebender.io/ontology/persist#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<urn:uuid:pageViews> 
    a crdt:GCounter ;
    schema:identifier "pageViews" ;
    crdt:nodeId [
        a schema:PropertyValue ;
        schema:propertyID "runtime-binding" ;
        schema:value "userId"
    ] ;
    crdt:initialValue "0"^^xsd:integer ;
    crdt:initialState [
        a crdt:GCounterState ;
        crdt:entries []
    ] ;
    sync:protocol [
        a sync:StateBasedProtocol ;
        sync:interval "PT5S"^^xsd:duration ;
        sync:peerSelection [
            a sync:AllPeers ;
            sync:discoveryMode "automatic"
        ]
    ] ;
    persist:storage [
        a persist:LocalStorageAdapter ;
        schema:identifier "pageViews" ;
        persist:serialization "application/json"
    ] .
```

### Step 4: Triples → Configuration Formats

#### JSON (for JavaScript runtime)

```json
{
	"id": "pageViews",
	"type": "GCounter",
	"nodeId": "${userId}",
	"config": {
		"initialValue": 0,
		"sync": {
			"protocol": "state-based",
			"interval": 5000,
			"peers": "all"
		},
		"persistence": {
			"type": "localStorage",
			"key": "pageViews"
		}
	}
}
```

#### YAML (for DevOps)

```yaml
id: pageViews
type: GCounter
nodeId: ${userId}
config:
  initialValue: 0
  sync:
    protocol: state-based
    interval: 5000
    peers: all
  persistence:
    type: localStorage
    key: pageViews
```

#### TOML (for configuration files)

```toml
id = "pageViews"
type = "GCounter"
nodeId = "${userId}"

[config]
initialValue = 0

[config.sync]
protocol = "state-based"
interval = 5000
peers = "all"

[config.persistence]
type = "localStorage"
key = "pageViews"
```

## Pure Functional Implementation

All functions are curried, named using `function` keyword, and use functional utilities from Toolsmith.

### Core CRDT Logic

```typescript
// filepath: /libraries/agent/crdt/gcounter/core.ts
import {
	entries,
	filter,
	fromEntries,
	keys,
	reduce,
	values,
} from "@sitebender/toolsmith/functional/object"
import { max } from "@sitebender/toolsmith/functional/math"
import { pipe } from "@sitebender/toolsmith/functional/composition"

// Types
export type GCounterState = {
	readonly entries: Record<string, number>
}

export type GCounterOperation =
	| { type: "increment"; nodeId: string; amount: number }
	| { type: "merge"; otherState: GCounterState }

// Pure function: Increment a node's counter
export function increment(nodeId: string) {
	return function incrementWithNode(amount: number) {
		return function incrementWithAmount(state: GCounterState): GCounterState {
			const currentValue = state.entries[nodeId] ?? 0
			return {
				entries: {
					...state.entries,
					[nodeId]: currentValue + amount,
				},
			}
		}
	}
}

// Pure function: Get total value by summing all entries
export function getValue(state: GCounterState): number {
	return pipe(
		values,
		reduce((sum: number) => (val: number) => sum + val)(0),
	)(state.entries)
}

// Pure function: Merge two G-Counter states (take max for each node)
export function merge(otherState: GCounterState) {
	return function mergeWithOther(state: GCounterState): GCounterState {
		const allNodeIds = new Set([
			...keys(state.entries),
			...keys(otherState.entries),
		])

		const mergedEntries = reduce(
			(acc: Record<string, number>) => (nodeId: string) => ({
				...acc,
				[nodeId]: max(
					state.entries[nodeId] ?? 0,
					otherState.entries[nodeId] ?? 0,
				),
			}),
		)({})(Array.from(allNodeIds))

		return { entries: mergedEntries }
	}
}

// Pure function: Compact state by removing inactive nodes
export function compact(activeNodes: Set<string>) {
	return function compactWithActiveNodes(state: GCounterState): GCounterState {
		return {
			entries: pipe(
				entries,
				filter(([nodeId]: [string, number]) => activeNodes.has(nodeId)),
				fromEntries,
			)(state.entries),
		}
	}
}

// Pure function: Check if state is empty
export function isEmpty(state: GCounterState): boolean {
	return isEmpty(state.entries)
}

// Pure function: Get node count
export function getNodeCount(state: GCounterState): number {
	return pipe(
		keys,
		length,
	)(state.entries)
}

// Pure function: Get value for specific node
export function getNodeValue(nodeId: string) {
	return function getValueForNode(state: GCounterState): number {
		return state.entries[nodeId] ?? 0
	}
}
```

### Using Result and Validation (Lifted Functions)

```typescript
// filepath: /libraries/agent/crdt/gcounter/safe.ts
import { err, ok, Result } from "@sitebender/toolsmith/functional/result"
import {
	invalid,
	valid,
	Validation,
} from "@sitebender/toolsmith/functional/validation"
import { pipe } from "@sitebender/toolsmith/functional/composition"
import * as Core from "./core.ts"

// Validate increment operation
export function validateIncrement(nodeId: string) {
	return function validateIncrementWithNode(
		amount: number,
	): Validation<number> {
		if (amount <= 0) {
			return invalid(["G-Counter can only increment by positive amounts"])
		}
		if (!nodeId || nodeId.trim() === "") {
			return invalid(["Node ID cannot be empty"])
		}
		return valid(amount)
	}
}

// Safe increment returning Result
export function safeIncrement(nodeId: string) {
	return function safeIncrementWithNode(amount: number) {
		return function safeIncrementWithAmount(
			state: Core.GCounterState,
		): Result<Core.GCounterState> {
			const validation = validateIncrement(nodeId)(amount)

			if (validation.type === "invalid") {
				return err(validation.errors.join("; "))
			}

			return ok(Core.increment(nodeId)(amount)(state))
		}
	}
}

// Safe merge with validation
export function safeMerge(otherState: Core.GCounterState) {
	return function safeMergeWithOther(
		state: Core.GCounterState,
	): Result<Core.GCounterState> {
		// Validate both states have the expected structure
		if (!otherState.entries || typeof otherState.entries !== "object") {
			return err("Invalid state structure for merge")
		}

		return ok(Core.merge(otherState)(state))
	}
}

// Validate and compact
export function safeCompact(activeNodes: Set<string>) {
	return function safeCompactWithActiveNodes(
		state: Core.GCounterState,
	): Result<Core.GCounterState> {
		if (activeNodes.size === 0) {
			return err("Cannot compact with empty active nodes set")
		}

		return ok(Core.compact(activeNodes)(state))
	}
}
```

### Function Composition from Config

```typescript
// filepath: /libraries/agent/runtime/crdt-factory.ts
import { compose, pipe } from "@sitebender/toolsmith/functional/composition"
import { chain, err, map, ok } from "@sitebender/toolsmith/functional/result"
import * as GCounter from "../crdt/gcounter/safe.ts"

export function createGCounterFromConfig(config: CrdtConfiguration) {
	const nodeId = resolveBinding(config.identity.nodeId)
	const initialState = config.initialization.initialState

	return {
		// Current state (immutable)
		state: initialState,

		// Pure increment operation (returns Result)
		increment: function increment(amount: number) {
			return GCounter.safeIncrement(nodeId)(amount)(this.state)
		},

		// Pure getValue (always succeeds)
		value: function value() {
			return GCounter.Core.getValue(this.state)
		},

		// Pure merge operation (returns Result)
		merge: function merge(otherState: GCounter.Core.GCounterState) {
			return GCounter.safeMerge(otherState)(this.state)
		},

		// Pure compact operation (returns Result)
		compact: function compact(activeNodes: Set<string>) {
			return GCounter.safeCompact(activeNodes)(this.state)
		},

		// Effects separated (return functions that perform side effects)
		effects: {
			sync: createSyncEffect(config.synchronization),
			persist: createPersistEffect(config.persistence),
		},
	}
}

// Helper to resolve runtime bindings
function resolveBinding(binding: any): string {
	if (binding["@type"] === "RuntimeBinding") {
		return runtime.get(binding.source)
	}
	return binding
}

// Create sync effect (returns function that performs sync)
function createSyncEffect(syncConfig: any) {
	return function sync(state: GCounter.Core.GCounterState) {
		// Returns a function that performs the actual sync side effect
		return function performSync() {
			// Actual sync logic here
			const peers = discoverPeers(syncConfig)
			return broadcastState(state)(peers)
		}
	}
}

// Create persist effect (returns function that performs persistence)
function createPersistEffect(persistConfig: any) {
	return function persist(state: GCounter.Core.GCounterState) {
		// Returns a function that performs the actual persist side effect
		return function performPersist() {
			// Actual persistence logic here
			return saveToStorage(persistConfig)(state)
		}
	}
}
```

## Advanced Configuration Examples

### With Garbage Collection

```jsx
<GCounter id="likes" nodeId={currentUser.did}>
	<InitialValue>0</InitialValue>

	<SyncStrategy>
		<When condition="online">
			<StateBasedSync interval={3000} />
		</When>
		<When condition="offline">
			<QueueOperations />
		</When>
	</SyncStrategy>

	<GarbageCollection>
		<RemoveEntriesOlderThan days={30} />
		<KeepMinimumPeers count={5} />
		<OnlyIfInactive duration="P7D" />
	</GarbageCollection>

	<PersistTo>
		<IndexedDB database="counters" store="gcounters" />
		<IPFS pin={true} />
	</PersistTo>
</GCounter>
```

### With Anomaly Detection

```jsx
<GCounter id="votes">
	<InitialValue>0</InitialValue>

	<VerifyPeerIdentity>
		<RequireSignature algorithm="ed25519" />
		<CheckCertificate chain={trustedCerts} />
	</VerifyPeerIdentity>

	<DetectAnomalies>
		<When>
			<PeerIncrementRate exceeds={100} per="minute" />
		</When>
		<Action>
			<QuarantinePeer />
			<NotifyAdmin />
		</Action>
	</DetectAnomalies>

	<OnMerge>
		<ValidateMonotonic />
		<CheckForSplitBrain />
		<LogMergeEvents to="audit-log" />
	</OnMerge>
</GCounter>
```

### Multi-Region with Hierarchical Sync

```jsx
<GCounter id="globalPageViews">
	<Topology>
		<Regions>
			<Region name="us-east" peers={usEastPeers} />
			<Region name="eu-west" peers={euWestPeers} />
			<Region name="asia" peers={asiaPeers} />
		</Regions>

		<HierarchicalSync>
			<Level type="intra-region" interval={1000} />
			<Level type="inter-region" interval={10000} />
		</HierarchicalSync>
	</Topology>

	<Optimization>
		<CompressMerges algorithm="delta-encoding" />
		<BatchUpdates size={10} />
		<OnlyShareChanges />
	</Optimization>
</GCounter>
```

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         JSX Source                              │
│  <GCounter id="pageViews" nodeId={userId}>                     │
│    <InitialValue>0</InitialValue>                              │
│    <SyncWith protocol="state-based" interval={5000}>           │
│      <AllPeers />                                               │
│    </SyncWith>                                                  │
│    <PersistTo>                                                  │
│      <LocalStorage key="pageViews" />                          │
│    </PersistTo>                                                 │
│  </GCounter>                                                    │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                    [JSX Compiler]
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                          AST                                    │
│  { type: "GCounter", props: {...}, children: [...] }            │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                [Architect Transformer]
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│     Intermediate Representation (Schema.org Linked Data)        │
│  {                                                              │
│    "@context": { "@vocab": "https://sitebender.io/..." },       │
│    "@type": "crdt:GCounter",                                    │
│    "schema:identifier": "pageViews",                            │
│    ...                                                          │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                   [RDF Serializer]
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    RDF Triples (Turtle)                         │
│  @prefix crdt: <https://sitebender.io/ontology/crdt#> .         │
│  <urn:uuid:pageViews> a crdt:GCounter ;                         │
│    crdt:initialValue "0"^^xsd:integer ;                         │
│    sync:protocol [ a sync:StateBasedProtocol ] .                │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                    [Triple Store]
                            ↓
              ┌─────────────┴─────────────┐
              ↓                           ↓
    [SPARQL Queries]              [Export Formats]
              ↓                           ↓
         [Reasoning]          ┌───────────┴───────────┐
                              ↓           ↓           ↓
                            JSON        YAML        TOML
                              ↓
                      [Runtime Config]
                              ↓
            [Curried Function Composition]
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│            Composed Pure Functions (Toolsmith)                  │
│                                                                 │
│  import { pipe, compose } from "@sitebender/toolsmith"          │
│  import { increment, merge, getValue } from "./gcounter"        │
│                                                                 │
│  const counter = {                                              │
│    increment: increment(nodeId)(amount),                        │
│    merge: merge(otherState),                                    │
│    value: getValue                                              │
│  }                                                              │
│                                                                 │
│  // Usage (pure, returns new state)                             │
│  const result = counter.increment(1)(currentState)              │
│  // result is Result<GCounterState>                             │
└─────────────────────────────────────────────────────────────────┘
```

## Key Design Principles

1. **JSX is purely declarative** - No runtime behavior, just configuration
2. **IR uses Schema.org vocabulary** - Standard, well-understood linked data
3. **RDF in Turtle format** - Human-readable, SPARQL-queryable
4. **All functions are curried** - Enables partial application and composition
5. **Named functions only** - No arrow functions, all use `function` keyword
6. **Functional utilities from Toolsmith** - `entries`, `keys`, `values`, `reduce`, etc.
7. **Lifted functions return Result/Validation** - Type-safe error handling
8. **Effects are separated** - Pure core, side effects isolated

## Performance Characteristics

- **Increment**: O(1) - Direct map update
- **getValue**: O(n) where n = number of peers
- **Merge**: O(m + n) where m, n = peer counts in each state
- **Compact**: O(n) where n = number of peers
- **Memory**: O(n) where n = number of unique peers ever seen
- **Network**: ~200 bytes per state-based sync (before compression)

## Next Steps

This G-Counter implementation provides the foundation for:

1. **PN-Counter** - Positive-Negative counter (can increment AND decrement)
2. **LWW-Register** - Last-Write-Wins register for single values
3. **OR-Set** - Observed-Remove set for collections
4. **RGA** - Replicated Growable Array for collaborative text editing
5. **OR-Map** - Observed-Remove map for complex nested state

Each builds on these same principles: pure functions, curried composition, lifted error handling, and separation of pure logic from effects.
