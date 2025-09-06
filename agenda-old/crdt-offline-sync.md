# CRDT-Based Offline Synchronization for Sitebender

## Executive Summary

CRDTs (Conflict-free Replicated Data Types) enable Sitebender applications to work seamlessly offline and sync automatically when reconnected, without conflicts or data loss. This document outlines our approach to implementing CRDTs in a way that aligns with progressive enhancement and functional programming principles.

## Why CRDTs Matter for Sitebender

Traditional web applications fail when offline. Even "offline-capable" apps often lose data or create conflicts. CRDTs solve this mathematically:

- **No conflicts by design**: Mathematical properties guarantee convergence
- **No central authority needed**: Every peer is equal
- **Works offline indefinitely**: Sync when you can, work when you can't
- **Progressive enhancement friendly**: Can fallback to server-side state

## CRDT Types and Use Cases

### 1. Last-Write-Wins Register (LWW-Register)

**Use for**: Single values where latest update wins

```typescript
// libraries/distributed/src/crdt/lww-register/index.ts
export default function createLWWRegister<T>(
	initialValue: T,
	nodeId: string,
): LWWRegister<T> {
	return {
		value: initialValue,
		timestamp: Date.now(),
		nodeId,

		set(newValue: T) {
			return {
				...this,
				value: newValue,
				timestamp: Date.now(),
			}
		},

		merge(other: LWWRegister<T>) {
			if (other.timestamp > this.timestamp) return other
			if (other.timestamp < this.timestamp) return this
			// Same timestamp: use nodeId for deterministic tie-breaking
			return other.nodeId > this.nodeId ? other : this
		},
	}
}
```

**Example**: User profile settings, configuration flags

### 2. Grow-Only Set (G-Set)

**Use for**: Collections that only grow (no deletions)

```typescript
// libraries/distributed/src/crdt/g-set/index.ts
export default function createGSet<T>(
	initialItems: Set<T> = new Set(),
): GSet<T> {
	return {
		items: new Set(initialItems),

		add(item: T) {
			const newItems = new Set(this.items)
			newItems.add(item)
			return { ...this, items: newItems }
		},

		merge(other: GSet<T>) {
			const merged = new Set([...this.items, ...other.items])
			return { ...this, items: merged }
		},

		has(item: T) {
			return this.items.has(item)
		},
	}
}
```

**Example**: Append-only logs, view history, bookmarks

### 3. Observed-Remove Set (OR-Set)

**Use for**: Collections with add and remove operations

```typescript
// libraries/distributed/src/crdt/or-set/index.ts
type ORSetItem<T> = {
	value: T
	id: string
	tombstone?: boolean
}

export default function createORSet<T>(
	initialItems: Array<ORSetItem<T>> = [],
): ORSet<T> {
	return {
		items: initialItems,

		add(value: T) {
			const id = generateUniqueId()
			return {
				...this,
				items: [...this.items, { value, id }],
			}
		},

		remove(value: T) {
			return {
				...this,
				items: this.items.map((item) =>
					item.value === value ? { ...item, tombstone: true } : item
				),
			}
		},

		merge(other: ORSet<T>) {
			// Union all items, keeping tombstones
			const allItems = [...this.items, ...other.items]
			const uniqueItems = deduplicateById(allItems)
			return { ...this, items: uniqueItems }
		},

		values() {
			return this.items
				.filter((item) => !item.tombstone)
				.map((item) => item.value)
		},
	}
}
```

**Example**: Shopping cart, todo lists, collaborative collections

### 4. Replicated Growable Array (RGA)

**Use for**: Ordered sequences with insertions

```typescript
// libraries/distributed/src/crdt/rga/index.ts
type RGANode<T> = {
	value: T
	id: string
	prev: string | null
	next: string | null
	tombstone?: boolean
}

export default function createRGA<T>(
	initialNodes: Array<RGANode<T>> = [],
): RGA<T> {
	return {
		nodes: initialNodes,

		insertAfter(afterId: string | null, value: T) {
			const id = generateUniqueId()
			const newNode: RGANode<T> = {
				value,
				id,
				prev: afterId,
				next: this.findNext(afterId),
			}
			return {
				...this,
				nodes: [...this.nodes, newNode],
			}
		},

		delete(id: string) {
			return {
				...this,
				nodes: this.nodes.map((node) =>
					node.id === id ? { ...node, tombstone: true } : node
				),
			}
		},

		merge(other: RGA<T>) {
			const allNodes = [...this.nodes, ...other.nodes]
			const uniqueNodes = deduplicateById(allNodes)
			return { ...this, nodes: this.sortTopologically(uniqueNodes) }
		},

		toArray() {
			return this.sortTopologically(this.nodes)
				.filter((node) => !node.tombstone)
				.map((node) => node.value)
		},
	}
}
```

**Example**: Collaborative text editing, ordered task lists

### 5. Counter CRDT

**Use for**: Distributed counting

```typescript
// libraries/distributed/src/crdt/counter/index.ts
export default function createCounter(
	nodeId: string,
	initialCounts: Map<string, number> = new Map(),
): Counter {
	return {
		counts: new Map(initialCounts),
		nodeId,

		increment(amount: number = 1) {
			const newCounts = new Map(this.counts)
			const current = newCounts.get(this.nodeId) || 0
			newCounts.set(this.nodeId, current + amount)
			return { ...this, counts: newCounts }
		},

		decrement(amount: number = 1) {
			return this.increment(-amount)
		},

		merge(other: Counter) {
			const merged = new Map(this.counts)
			for (const [nodeId, count] of other.counts) {
				const existing = merged.get(nodeId) || 0
				merged.set(nodeId, Math.max(existing, count))
			}
			return { ...this, counts: merged }
		},

		value() {
			let sum = 0
			for (const count of this.counts.values()) {
				sum += count
			}
			return sum
		},
	}
}
```

**Example**: View counts, likes, distributed metrics

## Sync Protocol

### 1. State-Based Replication

Send entire CRDT state periodically:

```typescript
// libraries/distributed/src/sync/state-based/index.ts
export default function createStateSyncProtocol<T extends CRDT>(
	crdt: T,
	transport: Transport,
): SyncProtocol<T> {
	return {
		async push() {
			await transport.send({
				type: "STATE",
				payload: crdt.serialize(),
			})
		},

		async pull() {
			const remoteState = await transport.receive()
			return crdt.merge(CRDT.deserialize(remoteState))
		},

		async sync() {
			const local = this.push()
			const remote = this.pull()
			await Promise.all([local, remote])
		},
	}
}
```

### 2. Operation-Based Replication

Send only operations as they occur:

```typescript
// libraries/distributed/src/sync/operation-based/index.ts
export default function createOpSyncProtocol<T extends CRDT>(
	crdt: T,
	transport: Transport,
): OpSyncProtocol<T> {
	const pendingOps: Array<Operation> = []

	return {
		recordOp(op: Operation) {
			pendingOps.push(op)
			if (transport.isConnected()) {
				this.flush()
			}
		},

		async flush() {
			if (pendingOps.length === 0) return

			await transport.send({
				type: "OPS",
				payload: pendingOps,
			})
			pendingOps.length = 0
		},

		async receive() {
			const ops = await transport.receive()
			for (const op of ops) {
				crdt = crdt.apply(op)
			}
			return crdt
		},
	}
}
```

### 3. Delta-Based Replication

Send only changes since last sync:

```typescript
// libraries/distributed/src/sync/delta-based/index.ts
export default function createDeltaSyncProtocol<T extends CRDT>(
	crdt: T,
	transport: Transport,
): DeltaSyncProtocol<T> {
	let lastSyncVersion = 0

	return {
		async sync() {
			const delta = crdt.getDeltaSince(lastSyncVersion)

			await transport.send({
				type: "DELTA",
				fromVersion: lastSyncVersion,
				toVersion: crdt.version,
				payload: delta,
			})

			const remoteDelta = await transport.receive()
			crdt = crdt.mergeDelta(remoteDelta)
			lastSyncVersion = crdt.version

			return crdt
		},
	}
}
```

## Storage Layer

### IndexedDB Persistence

```typescript
// libraries/distributed/src/storage/indexeddb/index.ts
export default function createIndexedDBStorage(
	dbName: string,
	storeName: string,
): Storage {
	return {
		async save(key: string, crdt: CRDT) {
			const db = await openDB(dbName)
			const tx = db.transaction(storeName, "readwrite")
			await tx.objectStore(storeName).put({
				key,
				data: crdt.serialize(),
				version: crdt.version,
				timestamp: Date.now(),
			})
		},

		async load(key: string) {
			const db = await openDB(dbName)
			const tx = db.transaction(storeName, "readonly")
			const record = await tx.objectStore(storeName).get(key)
			return record ? CRDT.deserialize(record.data) : null
		},

		async getAllKeys() {
			const db = await openDB(dbName)
			const tx = db.transaction(storeName, "readonly")
			return tx.objectStore(storeName).getAllKeys()
		},
	}
}
```

### Service Worker Integration

```typescript
// libraries/distributed/src/storage/service-worker/index.ts
self.addEventListener("sync", async (event) => {
	if (event.tag === "crdt-sync") {
		event.waitUntil(syncAllCRDTs())
	}
})

async function syncAllCRDTs() {
	const storage = createIndexedDBStorage("sitebender", "crdts")
	const keys = await storage.getAllKeys()

	for (const key of keys) {
		const crdt = await storage.load(key)
		if (crdt && crdt.hasLocalChanges()) {
			await syncToServer(key, crdt)
		}
	}
}
```

## Progressive Enhancement Strategy

### Level 1: Server-Side Only

No CRDTs, traditional request/response:

```html
<form method="POST" action="/update">
	<input name="value" value="current">
	<button type="submit">Save</button>
</form>
```

### Level 2: Optimistic Updates

CRDTs for instant feedback, server as source of truth:

```typescript
// Enhance form with CRDT
const form = document.querySelector("form")
const input = form.querySelector("input")
const crdt = createLWWRegister(input.value, getUserId())

input.addEventListener("input", (e) => {
	crdt.set(e.target.value)
	saveLocally(crdt)
	scheduleServerSync(crdt)
})
```

### Level 3: Full Offline

CRDTs as primary, server for backup/sharing:

```typescript
// Full offline-first with background sync
const crdt = await loadOrCreate("user-data")

// Work offline
crdt.update(newData)
await saveLocally(crdt)

// Sync when online
if (navigator.onLine) {
	await syncWithPeers(crdt)
} else {
	await scheduleBackgroundSync(crdt)
}
```

## Testing Strategies

### Property-Based Tests

```typescript
// tests/properties/crdt/index.test.ts
Deno.test("CRDT convergence property", () => {
	fc.assert(
		fc.property(
			fc.array(fc.record({
				op: fc.oneof(
					fc.constant("add"),
					fc.constant("remove"),
				),
				value: fc.string(),
			})),
			(operations) => {
				// Apply operations in different orders
				const crdt1 = applyInOrder(operations)
				const crdt2 = applyShuffled(operations)

				// Must converge to same state
				return crdt1.equals(crdt2)
			},
		),
	)
})
```

### Conflict Resolution Tests

```typescript
// tests/behaviors/sync/conflicts/index.test.ts
Deno.test("Concurrent edits merge correctly", async () => {
	// Create two CRDTs
	const alice = createORSet()
	const bob = createORSet()

	// Concurrent operations
	alice.add("item1")
	bob.add("item2")
	bob.remove("item1") // Remove before seeing add

	// Merge
	const merged1 = alice.merge(bob)
	const merged2 = bob.merge(alice)

	// Both should converge
	assertEquals(merged1.values(), merged2.values())
	assertEquals(merged1.values(), ["item1", "item2"])
})
```

### Network Partition Tests

```typescript
// tests/e2e/network/partition/index.test.ts
test("Handles network partition and recovery", async () => {
	const node1 = await createNode()
	const node2 = await createNode()

	// Work while connected
	await node1.set("key", "value1")
	await node2.set("key", "value2")
	await sync(node1, node2)

	// Partition network
	await disconnect(node1, node2)

	// Work offline
	await node1.set("key", "offline1")
	await node2.set("key", "offline2")

	// Reconnect and sync
	await reconnect(node1, node2)
	await sync(node1, node2)

	// Should converge (LWW based on timestamp)
	assertEquals(node1.get("key"), node2.get("key"))
})
```

## Performance Considerations

### Memory Management

- Garbage collect tombstones after convergence
- Compress state before storage
- Limit history depth

### Bandwidth Optimization

- Delta compression for large CRDTs
- Batch operations before sending
- Binary encoding (MessagePack/CBOR)

### CPU Optimization

- Lazy evaluation of derived state
- Incremental merging for large sets
- Web Workers for heavy computations

## Security and Privacy

### Encryption

- E2E encryption for sensitive CRDTs
- Separate encryption keys per CRDT type
- Key rotation without losing history

### Authentication

- Sign operations with user's private key
- Verify signatures before merging
- Revocation for compromised keys

### Access Control

- Capability-based permissions per CRDT
- Read/write/admin levels
- Time-bounded access tokens

## Implementation Roadmap

### Phase 1: Core CRDTs (Week 1)

- [ ] LWW-Register implementation
- [ ] OR-Set implementation
- [ ] Counter implementation
- [ ] Property-based tests

### Phase 2: Storage Layer (Week 2)

- [ ] IndexedDB adapter
- [ ] Service Worker integration
- [ ] Compression/encryption

### Phase 3: Sync Protocol (Week 3)

- [ ] State-based sync
- [ ] Delta-based optimization
- [ ] Conflict visualization

### Phase 4: Integration (Week 4)

- [ ] Form enhancement
- [ ] Real-time collaboration
- [ ] Offline indicators

## Conclusion

CRDTs provide the mathematical foundation for truly offline-first applications. By implementing them as pure functions with immutable data structures, we maintain Sitebender's functional programming principles while enabling powerful distributed features.

The key insight: **Conflicts are a UI problem, not a data problem**. CRDTs eliminate data conflicts mathematically, leaving us free to focus on the user experience of collaboration and offline work.

---

_"In a distributed system, the only certainty is uncertainty. CRDTs turn that uncertainty into eventual certainty."_
