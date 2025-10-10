# Signal Protocol Integration in Sentinel

> **Status**: Implementation Plan
> **Last Updated**: 2025-01-10
> **Purpose**: Implementation plan for integrating Signal Protocol into Sentinel as cryptographic infrastructure for Agent, Operator, and Envoy

## Executive Summary

Signal Protocol will be integrated into **Sentinel** (Security Layer) as the foundation for end-to-end encryption across Sitebender Studio. This document outlines the implementation strategy for wrapping libsignal (Rust WASM) with pure functional TypeScript, storing session state as RDF triples, and exposing a decoupled API for consumption by Agent (encrypted CRDTs), Operator (encrypted events), and Envoy (encrypted debugging sessions).

## Architectural Placement

### Why Sentinel?

**Signal Protocol belongs in Sentinel because:**

1. **Layer dependencies**: Security Layer sits below Distribution Layer (Agent, Operator, Custodian) and Intelligence Layer (Envoy), allowing clean downward dependencies
2. **Semantic fit**: Sentinel handles authentication/authorization; Signal provides cryptographic authentication (key exchange) and secure channels
3. **Lowest common ancestor**: All consumers (Agent, Operator, Envoy) can depend on Sentinel without peer dependencies
4. **Separation of concerns**: Sentinel provides cryptographic primitives; consumers use them for domain-specific purposes

**Dependency flow:**
```
Toolsmith (Foundation)
    ↓
Sentinel (Security) ← Signal Protocol lives here
    ↓
Agent, Operator (Distribution) / Envoy (Intelligence)
```

## Implementation Phases

### Phase 1: WASM Wrapper and Pure Functional API (Week 1-2)

#### 1.1 libsignal WASM Integration

**Objective**: Wrap libsignal Rust crate in WASM and create pure functional TypeScript wrapper

**Tasks:**

- [ ] Compile libsignal to WASM using wasm-pack
- [ ] Create WASM loader in `sentinel/src/signal/_wasm/`
- [ ] Define WASM bridge layer between Rust and TypeScript
- [ ] Test WASM module loading and initialization
- [ ] Benchmark WASM performance vs native expectations

**Location:**
```
libraries/sentinel/src/signal/
├── _wasm/
│   ├── libsignal.wasm          # Compiled WASM binary
│   ├── loadWasm/index.ts       # WASM loader
│   └── wasmBridge/index.ts     # Rust ↔ TypeScript bridge
```

**WASM Loading Strategy:**

```typescript
// sentinel/src/signal/_wasm/loadWasm/index.ts
export function loadSignalWasm(): Promise<Result<SignalWasmModule, WasmLoadError>> {
	// Lazy load WASM on first use
	// Cache module for subsequent calls
	// Handle initialization failures gracefully
}
```

#### 1.2 Pure Functional TypeScript Wrapper

**Objective**: Wrap libsignal's object-oriented API in pure functions following constitutional rules

**Key principles:**
- No classes (wrap OO API in functions)
- No mutations (return new session state)
- All functions curried
- Return Result<T, E> for error handling
- Pure functions except IO boundaries

**Core functions to implement:**

```typescript
// Session creation
function createSession(
	identityKeyPair: IdentityKeyPair,
): (preKeyBundle: PreKeyBundle) => Result<SignalSession, SessionError>

// Message encryption
function encryptMessage(
	session: SignalSession,
): (plaintext: Uint8Array) => Result<EncryptedMessage, EncryptionError>

// Message decryption
function decryptMessage(
	session: SignalSession,
): (ciphertext: EncryptedMessage) => Result<DecryptedMessage, DecryptionError>

// Key rotation
function rotateKeys(
	session: SignalSession,
): Result<SignalSession, RotationError>

// Session serialization
function sessionToBytes(
	session: SignalSession,
): Result<Uint8Array, SerializationError>

function sessionFromBytes(
	bytes: Uint8Array,
): Result<SignalSession, DeserializationError>
```

**Location:**
```
libraries/sentinel/src/signal/
├── createSession/index.ts
├── encryptMessage/index.ts
├── decryptMessage/index.ts
├── rotateKeys/index.ts
├── sessionToBytes/index.ts
├── sessionFromBytes/index.ts
└── types/index.ts
```

**Tasks:**

- [ ] Define core Signal types (Session, PreKeyBundle, IdentityKeyPair, etc.)
- [ ] Implement `createSession` wrapper
- [ ] Implement `encryptMessage` wrapper
- [ ] Implement `decryptMessage` wrapper
- [ ] Implement `rotateKeys` wrapper
- [ ] Implement session serialization functions
- [ ] Write property tests for all cryptographic operations
- [ ] Benchmark performance vs direct WASM calls

### Phase 2: RDF Triple Store Integration (Week 2-3)

#### 2.1 Signal Protocol Ontology

**Objective**: Define RDF ontology for Signal Protocol concepts

**Ontology concepts:**

```turtle
@prefix signal: <https://sitebender.io/ontology/signal#> .
@prefix sec: <https://w3id.org/security#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# Session
signal:Session a rdfs:Class ;
    rdfs:label "Signal Protocol Session" ;
    rdfs:comment "Represents an end-to-end encrypted session between two parties" .

signal:peerIdentity a rdf:Property ;
    rdfs:domain signal:Session ;
    rdfs:range xsd:string ;
    rdfs:comment "DID of the peer in this session" .

signal:ratchetChainLength a rdf:Property ;
    rdfs:domain signal:Session ;
    rdfs:range xsd:nonNegativeInteger ;
    rdfs:comment "Current length of the ratchet chain" .

signal:lastRotation a rdf:Property ;
    rdfs:domain signal:Session ;
    rdfs:range xsd:dateTime ;
    rdfs:comment "Timestamp of last key rotation" .

signal:sendingChainKey a rdf:Property ;
    rdfs:domain signal:Session ;
    rdfs:range xsd:base64Binary ;
    rdfs:comment "Base64-encoded sending chain key" .

signal:receivingChainKey a rdf:Property ;
    rdfs:domain signal:Session ;
    rdfs:range xsd:base64Binary ;
    rdfs:comment "Base64-encoded receiving chain key" .

signal:rootKey a rdf:Property ;
    rdfs:domain signal:Session ;
    rdfs:range xsd:base64Binary ;
    rdfs:comment "Base64-encoded root key for double ratchet" .

signal:created a rdf:Property ;
    rdfs:domain signal:Session ;
    rdfs:range xsd:dateTime ;
    rdfs:comment "Session creation timestamp" .

signal:status a rdf:Property ;
    rdfs:domain signal:Session ;
    rdfs:range signal:SessionStatus ;
    rdfs:comment "Current session status" .

# Session status enumeration
signal:SessionStatus a rdfs:Class .
signal:active a signal:SessionStatus .
signal:expired a signal:SessionStatus .
signal:revoked a signal:SessionStatus .
signal:pending a signal:SessionStatus .

# Encrypted message
signal:EncryptedMessage a rdfs:Class ;
    rdfs:label "Signal Protocol Encrypted Message" ;
    rdfs:comment "An encrypted message with Signal Protocol metadata" .

signal:session a rdf:Property ;
    rdfs:domain signal:EncryptedMessage ;
    rdfs:range signal:Session ;
    rdfs:comment "Session used to encrypt this message" .

signal:messageNumber a rdf:Property ;
    rdfs:domain signal:EncryptedMessage ;
    rdfs:range xsd:nonNegativeInteger ;
    rdfs:comment "Message number in ratchet chain" .

signal:ciphertext a rdf:Property ;
    rdfs:domain signal:EncryptedMessage ;
    rdfs:range xsd:base64Binary ;
    rdfs:comment "Base64-encoded encrypted message body" .

signal:timestamp a rdf:Property ;
    rdfs:domain signal:EncryptedMessage ;
    rdfs:range xsd:dateTime ;
    rdfs:comment "Message encryption timestamp" .

# Key rotation event
signal:KeyRotation a rdfs:Class ;
    rdfs:label "Key Rotation Event" ;
    rdfs:comment "Represents a key rotation event in a session" .

signal:hadKeyRotation a rdf:Property ;
    rdfs:domain signal:Session ;
    rdfs:range signal:KeyRotation ;
    rdfs:comment "Links session to its key rotation events" .

signal:reason a rdf:Property ;
    rdfs:domain signal:KeyRotation ;
    rdfs:range xsd:string ;
    rdfs:comment "Reason for key rotation (scheduled, manual, security)" .

signal:previousChainLength a rdf:Property ;
    rdfs:domain signal:KeyRotation ;
    rdfs:range xsd:nonNegativeInteger ;
    rdfs:comment "Ratchet chain length before rotation" .
```

**Tasks:**

- [ ] Write complete Signal Protocol ontology (Turtle format)
- [ ] Define SHACL shapes for validation
- [ ] Create ontology documentation
- [ ] Validate ontology with Arborist/Auditor
- [ ] Store ontology in triple store

**Location:**
```
libraries/sentinel/ontologies/
└── signal.ttl
```

#### 2.2 Session State Serialization

**Objective**: Convert Signal session state to/from RDF triples

**Functions:**

```typescript
// sentinel/src/signal/sessionToTriples/index.ts
export function sessionToTriples(
	session: SignalSession,
): ReadonlyArray<Triple>

// sentinel/src/signal/tripledToSession/index.ts
export function tripledToSession(
	triples: ReadonlyArray<Triple>,
): Result<SignalSession, ParseError>
```

**Example serialization:**

```typescript
// Input: SignalSession object
const session: SignalSession = {
	id: "session:abc123",
	peerDid: "did:key:z6MkpTxyz...",
	chainLength: 142,
	lastRotation: new Date("2025-01-10T10:30:00Z"),
	sendingChainKey: new Uint8Array([...]),
	receivingChainKey: new Uint8Array([...]),
	rootKey: new Uint8Array([...]),
	created: new Date("2025-01-01T00:00:00Z"),
	status: "active",
}

// Output: RDF triples
const triples = sessionToTriples(session)
// [
//   { subject: "session:abc123", predicate: "rdf:type", object: "signal:Session" },
//   { subject: "session:abc123", predicate: "signal:peerIdentity", object: "did:key:z6MkpTxyz..." },
//   { subject: "session:abc123", predicate: "signal:ratchetChainLength", object: 142 },
//   // ... more triples
// ]
```

**Tasks:**

- [ ] Implement `sessionToTriples` converter
- [ ] Implement `tripledToSession` parser
- [ ] Handle base64 encoding for binary keys
- [ ] Write round-trip property tests
- [ ] Benchmark serialization performance

**Location:**
```
libraries/sentinel/src/signal/
├── sessionToTriples/index.ts
├── tripledToSession/index.ts
└── _base64/
    ├── encodeBytes/index.ts
    └── decodeBytes/index.ts
```

#### 2.3 SPARQL Query Interface

**Objective**: Enable querying Signal session state via SPARQL

**Example queries:**

```sparql
# Find sessions needing key rotation
SELECT ?session ?peerDid ?chainLength ?lastRotation WHERE {
  ?session a signal:Session ;
           signal:peerIdentity ?peerDid ;
           signal:ratchetChainLength ?chainLength ;
           signal:lastRotation ?lastRotation .
  FILTER(?chainLength > 100)
}

# Find all active sessions
SELECT ?session ?peer ?created WHERE {
  ?session a signal:Session ;
           signal:peerIdentity ?peer ;
           signal:created ?created ;
           signal:status signal:active .
} ORDER BY DESC(?created)

# Count encrypted messages per session
SELECT ?session (COUNT(?message) as ?messageCount) WHERE {
  ?message a signal:EncryptedMessage ;
           signal:session ?session .
} GROUP BY ?session
```

**Tasks:**

- [ ] Create query helper functions
- [ ] Define common SPARQL query templates
- [ ] Implement query result parsers
- [ ] Write query examples documentation

**Location:**
```
libraries/sentinel/src/signal/queries/
├── findSessionsNeedingRotation/index.ts
├── findActiveSessionsByPeer/index.ts
├── countMessagesBySession/index.ts
└── types/index.ts
```

### Phase 3: Public API Design (Week 3-4)

#### 3.1 Decoupled API Surface

**Objective**: Define clean, decoupled API for Agent, Operator, and Envoy consumption

**Design principles:**
- Libraries are black boxes
- No implementation details leaked
- Result types for all operations
- Pure functions throughout
- Composable operations

**Public API modules:**

```typescript
// @sitebender/sentinel/signal - Public API
export type { SignalSession, EncryptedMessage, DecryptedMessage }
export { createSession }
export { encryptMessage }
export { decryptMessage }
export { rotateKeys }
export { sessionToTriples }
export { tripledToSession }
```

**Tasks:**

- [ ] Define public type exports
- [ ] Create public function exports
- [ ] Write API documentation
- [ ] Create usage examples
- [ ] Verify no internal types leak

**Location:**
```
libraries/sentinel/src/signal/
└── index.ts  # Public API surface
```

#### 3.2 Consumer Integration Points

**Agent integration (encrypted CRDTs):**

```typescript
// Agent will import from Sentinel
import {
	createSession,
	encryptMessage,
	decryptMessage,
} from "@sitebender/sentinel/signal"

// Agent encrypts CRDT operation payload
function encryptCRDTOperation(
	operation: CRDTOperation,
	session: SignalSession,
): Result<EncryptedCRDTOperation, EncryptionError> {
	// Serialize operation to bytes
	const plaintext = operationToBytes(operation)
	// Encrypt with Signal
	return pipe(
		encryptMessage(session)(plaintext),
		map(encrypted => ({
			type: "crdt-operation" as const,
			replicaId: operation.replicaId, // Plaintext for CRDT merge
			timestamp: operation.timestamp,  // Plaintext for CRDT ordering
			operation: operation.type,       // Plaintext for CRDT semantics
			encryptedPayload: encrypted.ciphertext,
			session: session.id,
			messageNumber: encrypted.messageNumber,
		})),
	)
}
```

**Operator integration (encrypted events):**

```typescript
// Operator will import from Sentinel
import {
	createSession,
	encryptMessage,
	decryptMessage,
} from "@sitebender/sentinel/signal"

// Operator encrypts event payload
function encryptEvent(
	event: OperatorEvent,
	session: SignalSession,
): Result<EncryptedEvent, EncryptionError> {
	// Keep metadata plaintext for routing/filtering
	// Encrypt only sensitive payload
	const plaintext = eventPayloadToBytes(event.payload)
	return pipe(
		encryptMessage(session)(plaintext),
		map(encrypted => ({
			type: event.type,              // Plaintext for event routing
			timestamp: event.timestamp,    // Plaintext for ordering
			category: event.category,      // Plaintext for filtering
			encryptedPayload: encrypted.ciphertext,
			session: session.id,
			messageNumber: encrypted.messageNumber,
		})),
	)
}
```

**Envoy integration (encrypted debugging sessions):**

```typescript
// Envoy will import from Sentinel
import {
	createSession,
	encryptMessage,
	decryptMessage,
} from "@sitebender/sentinel/signal"

// Envoy encrypts shared debugging session
function encryptDebugSession(
	debugData: DebugSessionData,
	session: SignalSession,
): Result<EncryptedDebugSession, EncryptionError> {
	const plaintext = debugDataToBytes(debugData)
	return pipe(
		encryptMessage(session)(plaintext),
		map(encrypted => ({
			sessionId: debugData.sessionId,
			userId: debugData.userId,        // May be pseudonymized
			encryptedPayload: encrypted.ciphertext,
			session: session.id,
			messageNumber: encrypted.messageNumber,
		})),
	)
}
```

**Tasks:**

- [ ] Document integration patterns for Agent
- [ ] Document integration patterns for Operator
- [ ] Document integration patterns for Envoy
- [ ] Create example code for each consumer
- [ ] Write integration tests

**Location:**
```
libraries/sentinel/docs/
├── agent-integration.md
├── operator-integration.md
└── envoy-integration.md
```

### Phase 4: Declarative JSX Components (Week 4-5)

#### 4.1 Signal Protocol Components

**Objective**: Create declarative JSX API for Signal Protocol configuration

**Component design:**

```tsx
// Encrypted distributed counter (Agent)
<DistributedCounter id="private-votes">
	<EncryptWith protocol="signal">
		<Peers>
			<Peer did="did:key:alice..." />
			<Peer did="did:key:bob..." />
			<Peer did="did:key:carol..." />
		</Peers>
		<ForwardSecrecy enabled={true} />
		<RotateKeys every="PT24H" />
		<RequireAuthentication method="did-auth" />
	</EncryptWith>
	<SyncWithPeers />
	<PersistToTripleStore />
</DistributedCounter>

// Encrypted event channel (Operator)
<EventChannel name="sensitive-workflow">
	<EncryptWith protocol="signal">
		<Subscribers>
			<Subscriber did="did:key:admin1..." role="admin" />
			<Subscriber did="did:key:admin2..." role="admin" />
		</Subscribers>
		<DoubleRatchet enabled={true} />
		<DeniableAuthentication enabled={true} />
	</EncryptWith>
	<Subscribes to="workflow:started" />
	<Subscribes to="workflow:completed" />
</EventChannel>
```

**Component hierarchy:**

```
<EncryptWith protocol="signal">
  <Peers> | <Subscribers> | <Collaborators>
    <Peer did="..." /> | <Subscriber did="..." /> | <Collaborator did="..." />
  </Peers>
  <ForwardSecrecy enabled={boolean} />
  <RotateKeys every={duration} />
  <DoubleRatchet enabled={boolean} />
  <RequireAuthentication method="..." />
  <DeniableAuthentication enabled={boolean} />
</EncryptWith>
```

**Tasks:**

- [ ] Define `<EncryptWith>` component
- [ ] Define `<Peers>` / `<Subscribers>` / `<Collaborators>` containers
- [ ] Define peer identity components
- [ ] Define configuration components (ForwardSecrecy, RotateKeys, etc.)
- [ ] Implement component-to-IR compilation
- [ ] Write component usage documentation

**Location:**
```
libraries/sentinel/src/components/
├── EncryptWith/index.tsx
├── Peers/index.tsx
├── Peer/index.tsx
├── ForwardSecrecy/index.tsx
├── RotateKeys/index.tsx
└── types/index.ts
```

#### 4.2 Session Management Components

**Objective**: Declarative session lifecycle management

```tsx
<SignalSessionManager>
	<SessionPolicy>
		<MaxSessions perPeer={5} total={100} />
		<ExpiryDuration default="PT7D" inactive="PT24H" />
		<RotationTriggers>
			<AfterMessages count={1000} />
			<AfterDuration elapsed="PT24H" />
			<OnSecurityEvent type="key-compromise" />
		</RotationTriggers>
	</SessionPolicy>

	<SessionStorage backend="triple-store">
		<EncryptAtRest algorithm="xchacha20poly1305" />
		<BackupSchedule every="PT1H" />
	</SessionStorage>

	<SessionMonitoring>
		<AlertOnExpiry notifyPeers={true} />
		<MetricsCollection interval="PT5M" />
		<AuditLogging level="detailed" />
	</SessionMonitoring>
</SignalSessionManager>
```

**Tasks:**

- [ ] Define session management components
- [ ] Implement session lifecycle logic
- [ ] Create session cleanup/expiry handlers
- [ ] Write session monitoring integration

**Location:**
```
libraries/sentinel/src/components/
├── SignalSessionManager/index.tsx
├── SessionPolicy/index.tsx
├── SessionStorage/index.tsx
└── SessionMonitoring/index.tsx
```

### Phase 5: Testing and Verification (Week 5-6)

#### 5.1 Property-Based Testing

**Objective**: Comprehensive property tests for cryptographic operations

**Properties to test:**

1. **Encryption/decryption round-trip**: `decrypt(encrypt(plaintext)) === plaintext`
2. **Session state immutability**: `encryptMessage` returns new session, doesn't mutate
3. **Key rotation correctness**: Decryption still works after rotation
4. **Forward secrecy**: Old messages unreadable after key compromise
5. **Message ordering**: Message numbers increment monotonically
6. **Serialization round-trip**: `tripledToSession(sessionToTriples(session)) === session`

**Example property test:**

```typescript
import { property, forAll, uint8Array } from "@sitebender/quarrier"

// Property: Encryption/decryption round-trip
property("encrypt/decrypt round-trip preserves message",
	forAll(uint8Array({ minLength: 1, maxLength: 1024 }), (plaintext) => {
		const session = createTestSession()
		const encrypted = encryptMessage(session)(plaintext)
		const decrypted = pipe(
			encrypted,
			chain(msg => decryptMessage(session)(msg)),
		)

		return equals(
			decrypted,
			success(plaintext),
		)
	}),
)
```

**Tasks:**

- [ ] Write property tests for all core operations
- [ ] Test edge cases (empty messages, large messages, many rotations)
- [ ] Test error conditions (invalid session, corrupt ciphertext)
- [ ] Test serialization round-trips
- [ ] Benchmark performance under property testing

**Location:**
```
libraries/sentinel/src/signal/
├── createSession/index.test.ts
├── encryptMessage/index.test.ts
├── decryptMessage/index.test.ts
├── rotateKeys/index.test.ts
└── sessionToTriples/index.test.ts
```

#### 5.2 Formal Verification with Auditor

**Objective**: Use Auditor + Z3 to prove cryptographic properties

**Properties for Z3 verification:**

```tsx
// Property: All sensitive data must be encrypted before transmission
<PropertyTest name="SensitiveDataEncrypted">
	<ForAll concept="NetworkMessage">
		<Property>
			<IfContains field="sensitiveData">
				<MustBeEncrypted protocol="signal" />
			</IfContains>
		</Property>
	</ForAll>
</PropertyTest>

// Property: Forward secrecy guarantee
<PropertyTest name="ForwardSecrecyGuarantee">
	<ForAll concept="SignalSession">
		<Property>
			<IfKeyCompromised at="time-T" />
			<ThenMessagesBeforeT areStillSecure={true} />
		</Property>
	</ForAll>
</PropertyTest>

// Property: Session state never mutated
<PropertyTest name="SessionImmutability">
	<ForAll concept="SignalSession">
		<Property>
			<AfterOperation operation="encryptMessage">
				<OriginalSession isUnmodified={true} />
			</AfterOperation>
		</Property>
	</ForAll>
</PropertyTest>
```

**Tasks:**

- [ ] Define properties for Z3 verification
- [ ] Integrate with Auditor's proof generation
- [ ] Generate proof certificates
- [ ] Document verified properties
- [ ] Update docs with formal guarantees

**Location:**
```
libraries/sentinel/src/signal/
└── _proofs/
    ├── sensitive-data-encrypted.tsx
    ├── forward-secrecy.tsx
    └── session-immutability.tsx
```

### Phase 6: Performance Optimization (Week 6)

#### 6.1 Lazy Decryption Strategy

**Objective**: Defer decryption until data is accessed

**Pattern:**

```typescript
// Encrypted value with lazy decryption
export type EncryptedValue<T> = {
	readonly _tag: "EncryptedValue"
	readonly ciphertext: Uint8Array
	readonly sessionId: string
	readonly messageNumber: number
}

// Decrypt on demand
export function decrypt<T>(
	encryptedValue: EncryptedValue<T>,
): (session: SignalSession) => Result<T, DecryptionError> {
	return function decryptWithSession(
		session: SignalSession,
	): Result<T, DecryptionError> {
		// Decrypt only when called
		// Optionally cache result
	}
}
```

**Tasks:**

- [ ] Implement `EncryptedValue<T>` type
- [ ] Create lazy decryption functions
- [ ] Add optional result caching
- [ ] Benchmark vs eager decryption
- [ ] Document lazy decryption patterns

**Location:**
```
libraries/sentinel/src/signal/
├── EncryptedValue/index.ts
└── decrypt/index.ts
```

#### 6.2 Batch Operations

**Objective**: Optimize bulk encryption/decryption

```typescript
// Batch encrypt multiple messages
export function encryptMessagesBatch(
	session: SignalSession,
): (plaintexts: ReadonlyArray<Uint8Array>) => Result<ReadonlyArray<EncryptedMessage>, EncryptionError>

// Batch decrypt multiple messages
export function decryptMessagesBatch(
	session: SignalSession,
): (ciphertexts: ReadonlyArray<EncryptedMessage>) => Result<ReadonlyArray<DecryptedMessage>, DecryptionError>
```

**Tasks:**

- [ ] Implement batch encryption
- [ ] Implement batch decryption
- [ ] Optimize WASM boundary crossings
- [ ] Benchmark batch vs individual operations
- [ ] Document when to use batch operations

**Location:**
```
libraries/sentinel/src/signal/
├── encryptMessagesBatch/index.ts
└── decryptMessagesBatch/index.ts
```

#### 6.3 Performance Benchmarks

**Objective**: Measure and document performance characteristics

**Benchmarks to track:**

- Session creation time
- Encryption throughput (messages/sec)
- Decryption throughput (messages/sec)
- Key rotation latency
- Serialization/deserialization time
- SPARQL query performance on session triples

**Tasks:**

- [ ] Create benchmark suite
- [ ] Run benchmarks on target hardware
- [ ] Document performance characteristics
- [ ] Set performance regression tests
- [ ] Update docs with benchmark results

**Location:**
```
libraries/sentinel/benchmarks/
├── session-creation.bench.ts
├── encryption-throughput.bench.ts
├── decryption-throughput.bench.ts
└── serialization.bench.ts
```

### Phase 7: Documentation and Examples (Week 7)

#### 7.1 API Documentation

**Objective**: Comprehensive API reference for all public functions

**Documentation includes:**

- Function signatures
- Parameter descriptions
- Return types and error cases
- Usage examples
- Performance characteristics
- Security considerations

**Tasks:**

- [ ] Document all public functions
- [ ] Create type documentation
- [ ] Write security best practices guide
- [ ] Document error handling patterns
- [ ] Create troubleshooting guide

**Location:**
```
libraries/sentinel/docs/
├── api/
│   ├── create-session.md
│   ├── encrypt-message.md
│   ├── decrypt-message.md
│   ├── rotate-keys.md
│   └── serialization.md
├── security-guide.md
└── troubleshooting.md
```

#### 7.2 Integration Examples

**Objective**: Real-world examples for Agent, Operator, and Envoy

**Examples to create:**

1. **Agent**: Encrypted collaborative todo list with CRDTs
2. **Operator**: Encrypted event stream for sensitive workflows
3. **Envoy**: Encrypted pair programming session replay
4. **Combined**: Multi-library integration showing full E2E encryption

**Tasks:**

- [ ] Create Agent integration example
- [ ] Create Operator integration example
- [ ] Create Envoy integration example
- [ ] Create multi-library example
- [ ] Document setup and deployment

**Location:**
```
libraries/sentinel/examples/
├── agent-encrypted-crdt/
├── operator-encrypted-events/
├── envoy-encrypted-debugging/
└── multi-library-integration/
```

#### 7.3 Migration Guide

**Objective**: Help existing Sentinel users adopt Signal Protocol

**Guide sections:**

1. Installing Signal Protocol support
2. Migrating unencrypted sessions to encrypted
3. Key management and rotation strategies
4. Performance tuning
5. Security audit checklist

**Tasks:**

- [ ] Write migration guide
- [ ] Create migration scripts/helpers
- [ ] Document breaking changes
- [ ] Provide backward compatibility notes
- [ ] Test migration on sample projects

**Location:**
```
libraries/sentinel/docs/
└── migration-guide.md
```

## Success Criteria

### Functional Requirements

- [ ] All Signal Protocol operations wrapped in pure functions
- [ ] Session state stored as queryable RDF triples
- [ ] SPARQL queries work on session/message data
- [ ] Agent can encrypt/decrypt CRDT operations
- [ ] Operator can encrypt/decrypt event payloads
- [ ] Envoy can encrypt/decrypt debug sessions
- [ ] Declarative JSX components for encryption configuration
- [ ] Session lifecycle management automated

### Non-Functional Requirements

- [ ] Zero dependencies beyond libsignal WASM
- [ ] < 10ms encryption latency for typical messages
- [ ] < 10ms decryption latency for typical messages
- [ ] < 100ms key rotation latency
- [ ] 100% property test coverage
- [ ] Formal verification via Auditor/Z3
- [ ] Comprehensive documentation
- [ ] Performance benchmarks documented

### Quality Requirements

- [ ] All functions follow constitutional rules (no classes, no mutations, curried, etc.)
- [ ] Result types for all error conditions
- [ ] No leaked implementation details
- [ ] Clean separation between libraries
- [ ] Time-travel debugging works with encrypted state
- [ ] Warden contracts enforce encryption policies

## Risk Mitigation

### Technical Risks

**Risk**: WASM performance overhead
- **Mitigation**: Benchmark early, optimize batch operations, consider lazy decryption

**Risk**: CRDTs don't merge correctly with encrypted payloads
- **Mitigation**: Encrypt payloads only, keep CRDT metadata plaintext

**Risk**: Key management complexity at scale
- **Mitigation**: Store sessions as triples, query for lifecycle management, automate rotation

**Risk**: libsignal API changes
- **Mitigation**: Pin WASM version, abstract behind pure functional wrapper, test extensively

### Integration Risks

**Risk**: Breaking changes in Agent/Operator/Envoy
- **Mitigation**: Version public API, maintain backward compatibility, document breaking changes

**Risk**: Triple store performance with many sessions
- **Mitigation**: Benchmark SPARQL queries, add indexes, implement session cleanup

### Security Risks

**Risk**: Key material leaks in logs/errors
- **Mitigation**: Redact sensitive data in error messages, audit logging, formal verification

**Risk**: Session state corruption
- **Mitigation**: Immutable triples, validation on deserialization, backup/recovery

## Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Phase 1: WASM Wrapper | Week 1-2 | Pure functional API, WASM integration |
| Phase 2: RDF Integration | Week 2-3 | Ontology, triple serialization, SPARQL queries |
| Phase 3: Public API | Week 3-4 | Decoupled API, integration docs |
| Phase 4: JSX Components | Week 4-5 | Declarative components, session management |
| Phase 5: Testing | Week 5-6 | Property tests, formal verification |
| Phase 6: Optimization | Week 6 | Lazy decryption, batch operations, benchmarks |
| Phase 7: Documentation | Week 7 | API docs, examples, migration guide |

**Total: 7 weeks**

## Dependencies

### Internal (Sitebender)

- **Toolsmith**: Pure FP functions, monads (Result, pipe, map, chain)
- **Arborist**: AST parsing for JSX components
- **Architect**: IR definition and compilation
- **Auditor**: Formal verification via Z3
- **Warden**: Cryptographic governance contracts
- **Pathfinder**: SPARQL query building
- **Quarrier**: Property-based testing

### External

- **libsignal**: Rust crate compiled to WASM
- **wasm-pack**: Rust → WASM compilation
- **Deno**: Runtime and testing infrastructure

## Next Steps

1. **Immediate**: Compile libsignal to WASM, verify WASM loads in Deno
2. **Week 1**: Implement pure functional wrappers for session creation and message encryption
3. **Week 2**: Define Signal Protocol ontology and implement triple serialization
4. **Week 3**: Design and document public API for Agent/Operator/Envoy
5. **Ongoing**: Property tests from day one, formal verification as we build

## References

- **Signal Protocol Specification**: https://signal.org/docs/
- **libsignal GitHub**: https://github.com/signalapp/libsignal
- **X3DH Key Agreement**: https://signal.org/docs/specifications/x3dh/
- **Double Ratchet Algorithm**: https://signal.org/docs/specifications/doubleratchet/
- **Sitebender Signal Integration Doc**: `/docs/architecture/signal-protocol-integration.md`
- **Sentinel README**: `/libraries/sentinel/README.md`
- **Constitutional Rules**: `/CLAUDE.md`

---

**Built with zero dependencies. Proven with mathematics. Encrypted by default. This is Sitebender Studio.**
