# CRDT Algorithms for Distributed Consistency

## Overview

Operator uses Conflict-free Replicated Data Types (CRDTs) to ensure eventual consistency across distributed event streams without coordination. All CRDTs are implemented in pure functional style with immutable data structures.

## Core CRDT Types

### 1. LWW-Element-Set (Last-Write-Wins Element Set)

Used for: Channel membership, subscription lists, simple state

```typescript
//++ LWW-Element-Set CRDT implementation
type LwwElementSet<T> = {
  adds: Map<T, Timestamp>
  removes: Map<T, Timestamp>
}

//++ Add element to set
// File: src/crdt/lww/add/index.ts
export default function add<T>(
  set: LwwElementSet<T>
) (
  element: T
) (
  timestamp: Timestamp
): LwwElementSet<T> {
  return {
    ...set,
    adds: new Map([...set.adds, [element, timestamp]])
  }
}

//++ Remove element from set
// File: src/crdt/lww/remove/index.ts
export default function remove<T>(
  set: LwwElementSet<T>
) (
  element: T
) (
  timestamp: Timestamp
): LwwElementSet<T> {
  return {
    ...set,
    removes: new Map([...set.removes, [element, timestamp]])
  }
}

//++ Check if element exists
// File: src/crdt/lww/has/index.ts
export default function has<T>(
  set: LwwElementSet<T>
) (
  element: T
): boolean {
  const addTime = set.adds.get(element)
  const removeTime = set.removes.get(element)

  if (!addTime) return false
  if (!removeTime) return true
  return addTime > removeTime
}

//++ Merge two LWW sets
// File: src/crdt/lww/merge/index.ts
export default function merge<T>(
  set1: LwwElementSet<T>
) (
  set2: LwwElementSet<T>
): LwwElementSet<T> {
  const mergedAdds = new Map<T, Timestamp>()
  const mergedRemoves = new Map<T, Timestamp>()

  // Merge adds - keep latest timestamp
  for (const [elem, time] of [...set1.adds, ...set2.adds]) {
    const existing = mergedAdds.get(elem)
    mergedAdds.set(elem, existing ? Math.max(existing, time) : time)
  }

  // Merge removes - keep latest timestamp
  for (const [elem, time] of [...set1.removes, ...set2.removes]) {
    const existing = mergedRemoves.get(elem)
    mergedRemoves.set(elem, existing ? Math.max(existing, time) : time)
  }

  return { adds: mergedAdds, removes: mergedRemoves }
}
```

### 2. OR-Set (Observed-Remove Set)

Used for: Event subscribers, complex membership

```typescript
//++ OR-Set with unique tags
type OrSet<T> = {
  elements: Map<T, Set<UniqueTag>>
  tombstones: Set<UniqueTag>
}

type UniqueTag = {
  replica: string
  timestamp: Timestamp
  uuid: string
}

//++ Add element with unique tag
// File: src/crdt/orset/add/index.ts
export default function add<T>(
  set: OrSet<T>
) (
  element: T
) (
  replica: string
): OrSet<T> {
  const tag: UniqueTag = {
    replica,
    timestamp: Temporal.Now.instant(),
    uuid: crypto.randomUUID()
  }

  const tags = set.elements.get(element) ?? new Set()
  tags.add(tag)

  return {
    ...set,
    elements: new Map([...set.elements, [element, tags]])
  }
}

//++ Remove element by observing its tags
// File: src/crdt/orset/remove/index.ts
export default function remove<T>(
  set: OrSet<T>
) (
  element: T
): OrSet<T> {
  const tags = set.elements.get(element)
  if (!tags) return set

  return {
    ...set,
    tombstones: new Set([...set.tombstones, ...tags]),
    elements: new Map(
      [...set.elements].filter(([e]) => e !== element)
    )
  }
}

//++ Merge two OR-Sets
// File: src/crdt/orset/merge/index.ts
export default function merge<T>(
  set1: OrSet<T>
) (
  set2: OrSet<T>
): OrSet<T> {
  const mergedElements = new Map<T, Set<UniqueTag>>()
  const mergedTombstones = new Set([...set1.tombstones, ...set2.tombstones])

  // Merge all elements
  const allElements = new Set([
    ...set1.elements.keys(),
    ...set2.elements.keys()
  ])

  for (const elem of allElements) {
    const tags1 = set1.elements.get(elem) ?? new Set()
    const tags2 = set2.elements.get(elem) ?? new Set()
    const allTags = new Set([...tags1, ...tags2])

    // Remove tombstoned tags
    const liveTags = new Set(
      [...allTags].filter(tag => !mergedTombstones.has(tag))
    )

    if (liveTags.size > 0) {
      mergedElements.set(elem, liveTags)
    }
  }

  return { elements: mergedElements, tombstones: mergedTombstones }
}
```

### 3. Vector Clocks

Used for: Causal ordering of events

```typescript
//++ Vector clock for causal ordering
type VectorClock = Map<ReplicaId, LogicalTime>
type ReplicaId = string
type LogicalTime = number

//++ Increment clock for replica
// File: src/crdt/vectorclock/tick/index.ts
export default function tick(
  clock: VectorClock
) (
  replica: ReplicaId
): VectorClock {
  const current = clock.get(replica) ?? 0
  return new Map([...clock, [replica, current + 1]])
}

//++ Merge two vector clocks (join/supremum)
// File: src/crdt/vectorclock/merge/index.ts
export default function merge(
  clock1: VectorClock
) (
  clock2: VectorClock
): VectorClock {
  const merged = new Map<ReplicaId, LogicalTime>()
  const allReplicas = new Set([...clock1.keys(), ...clock2.keys()])

  for (const replica of allReplicas) {
    const time1 = clock1.get(replica) ?? 0
    const time2 = clock2.get(replica) ?? 0
    merged.set(replica, Math.max(time1, time2))
  }

  return merged
}

//++ Check if clock1 happened before clock2
// File: src/crdt/vectorclock/happenedBefore/index.ts
export default function happenedBefore(
  clock1: VectorClock
) (
  clock2: VectorClock
): boolean {
  let hasStrictlyLess = false

  for (const [replica, time1] of clock1) {
    const time2 = clock2.get(replica) ?? 0
    if (time1 > time2) return false
    if (time1 < time2) hasStrictlyLess = true
  }

  // Check replicas only in clock2
  for (const replica of clock2.keys()) {
    if (!clock1.has(replica)) {
      hasStrictlyLess = true
    }
  }

  return hasStrictlyLess
}

//++ Check if events are concurrent
// File: src/crdt/vectorclock/concurrent/index.ts
export default function concurrent(
  clock1: VectorClock
) (
  clock2: VectorClock
): boolean {
  return !happenedBefore(clock1)(clock2) &&
         !happenedBefore(clock2)(clock1) &&
         !equal(clock1)(clock2)
}
```

### 4. RGA (Replicated Growable Array)

Used for: Ordered event sequences, collaborative text

```typescript
//++ RGA for ordered sequences
type Rga<T> = Array<RgaNode<T>>

type RgaNode<T> = {
  id: NodeId
  value: T
  tombstone: boolean
  next?: NodeId
}

type NodeId = {
  replica: string
  timestamp: Timestamp
  counter: number
}

//++ Insert element after position
// File: src/crdt/rga/insertAfter/index.ts
export default function insertAfter<T>(
  rga: Rga<T>
) (
  afterId: NodeId | null
) (
  value: T
) (
  replica: string
): Rga<T> {
  const newNode: RgaNode<T> = {
    id: {
      replica,
      timestamp: Temporal.Now.instant(),
      counter: generateCounter()
    },
    value,
    tombstone: false,
    next: findNextId(rga)(afterId)
  }

  // Insert maintaining causal order
  const insertIndex = afterId
    ? rga.findIndex(n => equal(n.id)(afterId)) + 1
    : 0

  return [
    ...rga.slice(0, insertIndex),
    newNode,
    ...rga.slice(insertIndex)
  ]
}

//++ Remove element (tombstone)
// File: src/crdt/rga/remove/index.ts
export default function remove<T>(
  rga: Rga<T>
) (
  nodeId: NodeId
): Rga<T> {
  return rga.map(node =>
    equal(node.id)(nodeId)
      ? { ...node, tombstone: true }
      : node
  )
}

//++ Merge two RGAs
// File: src/crdt/rga/merge/index.ts
export default function merge<T>(
  rga1: Rga<T>
) (
  rga2: Rga<T>
): Rga<T> {
  const allNodes = new Map<string, RgaNode<T>>()

  // Collect all unique nodes
  for (const node of [...rga1, ...rga2]) {
    const key = nodeIdToString(node.id)
    const existing = allNodes.get(key)

    // Keep tombstoned version if any
    if (!existing || node.tombstone) {
      allNodes.set(key, node)
    }
  }

  // Sort by causal order
  return Array.from(allNodes.values()).sort((a, b) => {
    // First by timestamp
    const timeDiff = a.id.timestamp.epochNanoseconds -
                    b.id.timestamp.epochNanoseconds
    if (timeDiff !== 0) return timeDiff

    // Then by replica ID for determinism
    return a.id.replica.localeCompare(b.id.replica)
  })
}
```

### 5. MV-Register (Multi-Value Register)

Used for: Concurrent value updates with all values preserved

```typescript
//++ Multi-value register for concurrent updates
type MvRegister<T> = {
  values: Set<VersionedValue<T>>
}

type VersionedValue<T> = {
  value: T
  version: VectorClock
}

//++ Set value in register
// File: src/crdt/mvregister/set/index.ts
export default function set<T>(
  register: MvRegister<T>
) (
  value: T
) (
  replica: string
): MvRegister<T> {
  // Increment vector clock
  const maxClock = mergeAll(
    Array.from(register.values).map(v => v.version)
  )
  const newClock = tick(maxClock)(replica)

  // Remove dominated values
  const newValues = new Set(
    Array.from(register.values).filter(
      v => !happenedBefore(v.version)(newClock)
    )
  )

  newValues.add({ value, version: newClock })

  return { values: newValues }
}

//++ Get all concurrent values
// File: src/crdt/mvregister/get/index.ts
export default function get<T>(
  register: MvRegister<T>
): Array<T> {
  return Array.from(register.values).map(v => v.value)
}

//++ Merge two MV-Registers
// File: src/crdt/mvregister/merge/index.ts
export default function merge<T>(
  reg1: MvRegister<T>
) (
  reg2: MvRegister<T>
): MvRegister<T> {
  const allValues = new Set([...reg1.values, ...reg2.values])
  const nonDominated = new Set<VersionedValue<T>>()

  for (const v1 of allValues) {
    let dominated = false
    for (const v2 of allValues) {
      if (v1 !== v2 && happenedBefore(v1.version)(v2.version)) {
        dominated = true
        break
      }
    }
    if (!dominated) {
      nonDominated.add(v1)
    }
  }

  return { values: nonDominated }
}
```

## Event-Specific CRDTs

### Event Counter CRDT

For counting events across replicas:

```typescript
//++ G-Counter for incrementing event counts
type GCounter = Map<ReplicaId, number>

// File: src/crdt/gcounter/increment/index.ts
export default function increment(
  counter: GCounter
) (
  replica: ReplicaId
): GCounter {
  const current = counter.get(replica) ?? 0
  return new Map([...counter, [replica, current + 1]])
}

// File: src/crdt/gcounter/value/index.ts
export default function value(counter: GCounter): number {
  return Array.from(counter.values()).reduce((a, b) => a + b, 0)
}

// File: src/crdt/gcounter/merge/index.ts
export default function merge(
  counter1: GCounter
) (
  counter2: GCounter
): GCounter {
  const merged = new Map<ReplicaId, number>()
  const allReplicas = new Set([...counter1.keys(), ...counter2.keys()])

  for (const replica of allReplicas) {
    merged.set(
      replica,
      Math.max(counter1.get(replica) ?? 0, counter2.get(replica) ?? 0)
    )
  }

  return merged
}
```

### Event Ordering CRDT

For maintaining total order of events:

```typescript
//++ Logoot-style ordering CRDT
type Position = Array<PositionId>
type PositionId = {
  digit: number
  replica: string
}

// File: src/crdt/logoot/generatePosition/index.ts
export default function generatePosition(
  before: Position
) (
  after: Position
) (
  replica: string
): Position {
  const result: Position = []
  let i = 0

  while (i < before.length || i < after.length) {
    const beforeId = before[i] ?? { digit: 0, replica: "" }
    const afterId = after[i] ?? { digit: MAX_DIGIT, replica: "￿" }

    if (beforeId.digit + 1 < afterId.digit) {
      // Found gap, insert here
      result.push({
        digit: Math.floor((beforeId.digit + afterId.digit) / 2),
        replica
      })
      return result
    }

    // Copy identical prefix
    result.push(beforeId)
    i++
  }

  // Extend position
  result.push({ digit: MID_DIGIT, replica })
  return result
}

// File: src/crdt/logoot/comparePositions/index.ts
export default function comparePositions(
  pos1: Position
) (
  pos2: Position
): number {
  for (let i = 0; i < Math.max(pos1.length, pos2.length); i++) {
    const id1 = pos1[i] ?? { digit: 0, replica: "" }
    const id2 = pos2[i] ?? { digit: 0, replica: "" }

    if (id1.digit !== id2.digit) {
      return id1.digit - id2.digit
    }

    if (id1.replica !== id2.replica) {
      return id1.replica.localeCompare(id2.replica)
    }
  }

  return 0
}
```

## Pure Functional GUN Algorithm

Implementing GUN.js's algorithm in pure FP:

```typescript
//++ GUN-style soul-based CRDT
type Soul = string  // Unique content address
type Gun<T> = Map<Soul, GunNode<T>>

type GunNode<T> = {
  soul: Soul
  state: StateVector
  value: T
  edges: Map<string, Soul>  // References to other nodes
}

type StateVector = Map<string, Timestamp>

//++ Put value with conflict resolution
// File: src/crdt/gun/put/index.ts
export default function put<T>(
  gun: Gun<T>
) (
  soul: Soul
) (
  key: string
) (
  value: T | Soul
) (
  machineId: string
): Gun<T> {
  const node = gun.get(soul) ?? {
    soul,
    state: new Map(),
    value: {} as T,
    edges: new Map()
  }

  const timestamp = Temporal.Now.instant()
  const currentState = node.state.get(key)

  // HAM (Hypothetical Amnesia Machine) conflict resolution
  if (!currentState || timestamp > currentState) {
    const newState = new Map([...node.state, [key, timestamp]])

    if (typeof value === "string") {
      // Edge to another node
      return new Map([...gun, [soul, {
        ...node,
        state: newState,
        edges: new Map([...node.edges, [key, value]])
      }]])
    } else {
      // Direct value
      return new Map([...gun, [soul, {
        ...node,
        state: newState,
        value: { ...node.value, [key]: value }
      }]])
    }
  }

  return gun  // Timestamp not newer, ignore
}

//++ Merge two GUN graphs
// File: src/crdt/gun/merge/index.ts
export default function merge<T>(
  gun1: Gun<T>
) (
  gun2: Gun<T>
): Gun<T> {
  const merged = new Map(gun1)

  for (const [soul, node2] of gun2) {
    const node1 = merged.get(soul)

    if (!node1) {
      merged.set(soul, node2)
    } else {
      // Merge nodes using HAM
      const mergedState = new Map<string, Timestamp>()
      const mergedValue = {} as T
      const mergedEdges = new Map<string, Soul>()

      const allKeys = new Set([
        ...node1.state.keys(),
        ...node2.state.keys()
      ])

      for (const key of allKeys) {
        const time1 = node1.state.get(key)
        const time2 = node2.state.get(key)

        if (!time1 || (time2 && time2 > time1)) {
          mergedState.set(key, time2!)
          if (node2.edges.has(key)) {
            mergedEdges.set(key, node2.edges.get(key)!)
          } else {
            mergedValue[key] = node2.value[key]
          }
        } else {
          mergedState.set(key, time1)
          if (node1.edges.has(key)) {
            mergedEdges.set(key, node1.edges.get(key)!)
          } else {
            mergedValue[key] = node1.value[key]
          }
        }
      }

      merged.set(soul, {
        soul,
        state: mergedState,
        value: mergedValue,
        edges: mergedEdges
      })
    }
  }

  return merged
}
```

## TSX Integration

These CRDTs are used transparently in TSX components:

```tsx
<Channel id="collaborative" ordering="causal">
  <CrdtMerge strategy="lww-element-set" />
  <VectorClock />
</Channel>

<Subscribes to="doc:edit:*">
  <CrdtMerge strategy="rga" />
  <Effect apply={updateDocument} />
</Subscribes>

<Publisher entangled="true">
  <CrdtMerge strategy="mv-register" />
  <Superpose states={getCurrentValues()} />
</Publisher>
```

## Properties and Guarantees

All CRDTs provide:

1. **Strong Eventual Consistency**: Replicas converge when they've seen the same events
2. **Commutativity**: Merge order doesn't matter: `merge(a)(merge(b)(c)) = merge(b)(merge(a)(c))`
3. **Associativity**: Grouping doesn't matter: `merge(a)(merge(b)(c)) = merge(merge(a)(b))(c)`
4. **Idempotency**: Merging same state is no-op: `merge(a)(a) = a`

These properties are verified by Auditor using property-based testing and formal proofs.
