# Custodian Master Implementation Plan

> **Single source of truth for Custodian implementation progress**
>
> **Last Updated**: 2025-01-10  
> **Current Phase**: Phase 1 - Foundation (Not Started)  
> **Overall Progress**: 0/467 tasks complete (0%)  
> **MVP Progress**: 0/168 tasks complete (0%)  

---

## 📍 **NEXT SESSION STARTS HERE**

**Current Focus**: Phase 1, Milestone 1.1 - Core Types with TDD

**Next Task**: Write `operation/index.test.ts` for UUID validation and method constraints

**Context Needed**:
- Query `functional_programming_rules` MCP for: "Result monad", "error handling", "discriminated unions"
- Query `typescript_rules` MCP for: "branded types", "type-level programming"
- Query `syntax_rules` MCP for: "naming conventions", "function declarations"

**Files to Create**: `src/types/Operation/index.test.ts` (test first!)

---

## Vision & Core Principles

### What We're Building

A **progressive state management library** that:
- Works without JavaScript (Lynx/IE11 compatibility)
- Encodes all UI state in URLs (stateless HTTP)
- Uses cryptographic continuations for resumable workflows
- Provides declarative state machines
- Integrates event sourcing via Operator
- Progressive enhancement (same model ± JS)

### Non-Negotiable Principles

1. **No JavaScript Required**: Everything must work in text browsers
2. **Idempotent Operations**: UUID-based, exactly-once semantics
3. **URL as State**: Complete UI state in query parameters
4. **Secure Continuations**: Signed, time-bound, tamper-proof tokens
5. **Progressive Enhancement**: Same behavior with/without JS (just faster)
6. **Privacy First**: Public/private/ephemeral data boundaries
7. **Pure Functions**: No classes, no mutations, curried functions only
8. **Test-Driven Development**: Write tests FIRST, then implementation

### Testing Philosophy

- **TDD Throughout**: Failing tests first, implement to pass
- **Test Location**: Alongside code as `index.test.ts`
- **Test Behavior**: What it does, not how
- **Integration Focus**: E2E and integration over unit tests
- **Property Testing**: Use `fast-check` (temporary until Quarrier)
- **No Internal Mocking**: Studio libraries work - trust them
- **External Mocking**: Use `msw` only for external APIs
- **Accessibility**: Test with `axe` where UI involved

**What to Mock**: External APIs, database writes, time operations, RNG
**What NOT to Mock**: Toolsmith, Artificer, Agent, Architect, any Studio internals

---

## MVP Scope (Phases 1-5)

The **minimum viable product** includes:

- ✅ **Phase 1**: Foundation - Core types and contracts
- ✅ **Phase 2**: No-JS Implementation - Server-side state management
- ✅ **Phase 3**: Continuations - Resumable workflows
- ✅ **Phase 4**: State Machines - Declarative transitions
- ✅ **Phase 5**: Progressive Enhancement - JavaScript layer

**MVP Goal**: Working state management in Lynx, enhanced in modern browsers. State machines with continuations. No visual designer, no collaboration, no analytics.

**Post-MVP** (Phases 6-15): Visual designer, real-time collaboration, analytics, etc.

---

## Phase 1: Foundation

**Goal**: Core types and contracts following Studio rules  
**Status**: ⬜ Not Started  
**Progress**: 0/34 tasks  
**Dependencies**: None

### Milestone 1.1: Core Types with TDD (0/20 tasks)

#### Operation Type (0/4 tasks)

- [ ] **T1.1.1** Write `operation/index.test.ts` for UUID validation
  - Test: UUID must be valid v4 format
  - Test: Method must be POST/PUT/PATCH/DELETE
  - Test: Data must be FormData or serializable
  - Property test: Operation structure never invalid

- [ ] **T1.1.2** Implement `Operation` type
  - Discriminated union with `_tag: 'Operation'`
  - UUID branded type from Toolsmith
  - HTTP method enum
  - FormData or Record<string, unknown> for data
  - Envoy comment syntax

- [ ] **T1.1.3** Write `operation/index.test.ts` for method constraints
  - Test: GET not allowed
  - Test: Invalid methods rejected
  - Test: Idempotency key equals UUID

- [ ] **T1.1.4** Implement method validation
  - Guard function for HTTP methods
  - Result<Operation, MethodError>
  - Curried validation function

#### CustodianConfig Type (0/4 tasks)

- [ ] **T1.1.5** Write `custodianConfig/index.test.ts` for secure defaults
  - Test: Encryption enabled by default
  - Test: Signing enabled by default
  - Test: Session binding enabled by default
  - Test: Secure defaults prevent common vulnerabilities

- [ ] **T1.1.6** Implement `CustodianConfig` with secure defaults
  - All security options enabled
  - Reasonable expiration (15 minutes)
  - Max continuation size (64KB)
  - sameSite: 'strict'
  - Envoy comments

- [ ] **T1.1.7** Write `custodianConfig/index.test.ts` for override validation
  - Test: Can disable features for development
  - Test: Cannot disable security in production
  - Test: Invalid configs rejected

- [ ] **T1.1.8** Implement config validation
  - Environment check (dev vs prod)
  - Result<CustodianConfig, ConfigError>
  - Curried config builder

#### PrivacyAwareState Type (0/4 tasks)

- [ ] **T1.1.9** Write `privacyAwareState/index.test.ts` for data classification
  - Test: Public data goes in URLs
  - Test: Private data never in URLs
  - Test: Ephemeral data never persisted
  - Property test: Classification never leaks

- [ ] **T1.1.10** Implement `PrivacyAwareState`
  - Three-part discriminated union
  - Public: Readonly<Record<string, Primitive>>
  - Private: Readonly<Record<string, unknown>>
  - Ephemeral: Readonly<Record<string, unknown>>

- [ ] **T1.1.11** Write `privacyAwareState/index.test.ts` for serialization
  - Test: Only public data serializes to URL
  - Test: Private data requires encryption
  - Test: Ephemeral data excluded from all serialization

- [ ] **T1.1.12** Implement privacy-aware serialization
  - URL serialization (public only)
  - Encrypted serialization (public + private)
  - Ephemeral excluded always

#### WizardContinuation Type (0/4 tasks)

- [ ] **T1.1.13** Write `wizardContinuation/index.test.ts` for structure
  - Test: Step number valid (≥ 0)
  - Test: Data immutable
  - Test: Remaining steps array
  - Test: Rollback chain intact

- [ ] **T1.1.14** Implement `WizardContinuation`
  - Step: NonNegativeInteger (Toolsmith branded type)
  - Data: Readonly<Record<string, unknown>>
  - Remaining: ReadonlyArray<NonNegativeInteger>
  - Rollback: string (previous continuation token)
  - Expires: Timestamp
  - Nonce: UUID
  - Signature: Hex string

- [ ] **T1.1.15** Write `wizardContinuation/index.test.ts` for security
  - Test: Expiration enforced
  - Test: Nonce prevents replay
  - Test: Signature tamper detection
  - Property test: Security properties hold

- [ ] **T1.1.16** Implement continuation security
  - Expiration check function
  - Nonce uniqueness validation
  - Signature verification stub (implement in Phase 3)

#### StateMachine Type (0/4 tasks)

- [ ] **T1.1.17** Write `stateMachine/index.test.ts` for structure
  - Test: Generic over State and Event types
  - Test: Initial state required
  - Test: States map defined
  - Test: Transitions deterministic

- [ ] **T1.1.18** Implement `StateMachine<S, E>`
  - Generic discriminated union types
  - ID: string
  - Initial: S
  - States: Record<S, StateDefinition<S, E>>
  - Transitions pure functions

- [ ] **T1.1.19** Write `stateMachine/index.test.ts` for transitions
  - Test: Valid transitions only
  - Test: Guards evaluated
  - Test: Actions executed
  - Property test: State machine laws hold

- [ ] **T1.1.20** Implement state machine primitives
  - StateDefinition type
  - Transition type
  - Guard predicate type
  - Action type (side-effect description)

**Milestone 1.1 Definition of Done**:
- ✅ All 20 tests written and passing
- ✅ Types use Envoy comment syntax
- ✅ 100% pure (no classes, no mutations)
- ✅ Follows all Studio constitutional rules
- ✅ Property tests prove type invariants

---

### Milestone 1.2: Security Types with TDD (0/14 tasks)

#### SecureState Type (0/2 tasks)

- [ ] **T1.2.1** Write `secureState/index.test.ts` for tamper detection
  - Test: Signature attached to all state
  - Test: Nonce prevents replay
  - Test: Tampering detected
  - Property test: Tamper detection never fails

- [ ] **T1.2.2** Implement `SecureState<S>`
  - Generic wrapper over state
  - State: S
  - Signature: Hex string
  - Nonce: UUID
  - Timestamp: number

#### SecurityError Type (0/2 tasks)

- [ ] **T1.2.3** Write `securityError/index.test.ts` for error types
  - Test: Discriminated union covers all cases
  - Test: Error messages informative
  - Test: No sensitive data in errors

- [ ] **T1.2.4** Implement `SecurityError` union
  - InvalidSignature
  - ExpiredToken
  - ReplayAttempt
  - TamperDetected
  - InvalidNonce
  - All with _tag and message

#### CrdtOperation Type (0/4 tasks)

- [ ] **T1.2.5** Write `crdtOperation/index.test.ts` for Agent integration
  - Test: Compatible with Agent CRDT types
  - Test: Vector clock attached
  - Test: Timestamp monotonic
  - Property test: Convergence properties hold

- [ ] **T1.2.6** Implement `CrdtOperation`
  - ID: UUID
  - Type: OperationType
  - Timestamp: number
  - Payload: Record<string, unknown>
  - VectorClock: Map<NodeId, number>

- [ ] **T1.2.7** Write `crdtOperation/index.test.ts` for commutativity
  - Property test: Operations commute
  - Property test: Idempotent application
  - Test: Merge function correct

- [ ] **T1.2.8** Implement CRDT merge semantics
  - LWW (Last-Write-Wins) for simple cases
  - Vector clock comparison
  - Conflict resolution strategy

#### ResumptionToken Type (0/6 tasks)

- [ ] **T1.2.9** Write `resumptionToken/index.test.ts` for zero-knowledge
  - Test: No private data in token
  - Test: Proof validates without exposure
  - Test: Server can verify without decryption
  - Property test: Zero-knowledge property holds

- [ ] **T1.2.10** Implement `ResumptionToken`
  - Public: PrivacyAwareState['public']
  - Proof: Hex string (hash of private data)
  - Expires: Timestamp
  - Signature: Hex string

- [ ] **T1.2.11** Write `resumptionToken/index.test.ts` for proof generation
  - Test: Proof deterministic from same input
  - Test: Different private data → different proof
  - Test: Collision resistant

- [ ] **T1.2.12** Implement proof generation
  - Hash private data with salt
  - Commitment scheme (hash + nonce)
  - Verification function

- [ ] **T1.2.13** Write `resumptionToken/index.test.ts` for serialization
  - Test: URL-safe encoding
  - Test: Size limits enforced
  - Test: Deserialization inverse
  - Property test: Serialize/deserialize identity

- [ ] **T1.2.14** Implement token serialization
  - Base64URL encoding
  - Size limit check (64KB)
  - Curried serialization functions

**Milestone 1.2 Definition of Done**:
- ✅ All 14 tests written and passing
- ✅ Security types complete and documented
- ✅ Integration stubs for Agent/Operator
- ✅ Property tests prove security invariants
- ✅ Follows all Studio rules

---

**Phase 1 Definition of Done**:
- ✅ All 34 tasks complete
- ✅ All behavior tests written first and passing
- ✅ Type definitions complete with Envoy comments
- ✅ 100% pure functional (no classes, no mutations)
- ✅ Property tests prove all type invariants
- ✅ Ready for Phase 2 implementation

---

## Phase 2: No-JS Implementation

**Goal**: Server-side state management working in Lynx  
**Status**: ⬜ Not Started  
**Progress**: 0/42 tasks  
**Dependencies**: Phase 1 complete

### Milestone 2.1: Form Processing with TDD (0/21 tasks)

#### UUID Generation (0/3 tasks)

- [ ] **T2.1.1** Write `generateFormUuid/index.test.ts` E2E
  - E2E test: Form renders with UUID
  - E2E test: UUID in hidden input
  - E2E test: UUID persists through submission

- [ ] **T2.1.2** Write `generateFormUuid/index.test.ts` with uniqueness properties
  - Property test: UUIDs always unique
  - Property test: UUIDs always v4 format
  - Test: Server-side generation (no client dependency)

- [ ] **T2.1.3** Implement `generateFormUuid`
  - Use Web Crypto API (Deno.std)
  - UUID v4 generation
  - Curried function signature
  - Envoy comments

#### UUID Embedding (0/3 tasks)

- [ ] **T2.1.4** Write `embedUuidInForm/index.test.ts` for HTML generation
  - Test: Hidden input created
  - Test: Name attribute "_uuid"
  - Test: Value is valid UUID
  - Test: Accessible form still accessible

- [ ] **T2.1.5** Implement `embedUuidInForm`
  - Pure function (returns new HTML string)
  - Architect integration
  - JSX: `<input type="hidden" name="_uuid" value={uuid} />`
  - Envoy comments

- [ ] **T2.1.6** Write `embedUuidInForm/index.test.ts` accessibility
  - Accessibility test: Hidden input doesn't affect screen readers
  - Test: Form still keyboard navigable
  - axe test: No violations

#### UUID Validation (0/6 tasks)

- [ ] **T2.1.7** Write `validateFormUuid/index.test.ts` for validation
  - Test: Valid UUID passes
  - Test: Invalid UUID rejected
  - Test: Missing UUID rejected
  - Test: Duplicate UUID rejected (idempotency check)

- [ ] **T2.1.8** Implement `validateFormUuid`
  - Parse from FormData
  - Validate format (v4)
  - Check idempotency store
  - Result<UUID, ValidationError>

- [ ] **T2.1.9** Write `validateFormUuid/index.test.ts` idempotency
  - Property test: Same UUID returns cached result
  - Test: Different UUID processes normally
  - Test: Cache expiration works

- [ ] **T2.1.10** Implement idempotency checking
  - In-memory cache (Map<Uuid, OperationResult>)
  - Expiration (1 hour default)
  - LRU eviction
  - Curried cache functions

- [ ] **T2.1.11** Write `validateFormUuid/index.test.ts` security
  - Security test: UUID brute force prevented
  - Security test: Rate limiting on validation
  - Test: Timing attacks prevented

- [ ] **T2.1.12** Implement validation security
  - Rate limiting (max 100 validations/minute per IP)
  - Constant-time comparison
  - Brute force detection

#### Form Submission Processing (0/9 tasks)

- [ ] **T2.1.13** Write E2E test: form submission without JS
  - E2E test: Form submits via POST
  - E2E test: Server receives FormData
  - E2E test: UUID extracted correctly
  - E2E test: Redirects to new URL
  - E2E test: Works in Lynx browser

- [ ] **T2.1.14** Write `processFormSubmission/index.test.ts` for method override
  - Test: _method=PUT becomes PUT
  - Test: _method=PATCH becomes PATCH
  - Test: _method=DELETE becomes DELETE
  - Test: No _method defaults to POST

- [ ] **T2.1.15** Implement `processFormSubmission`
  - Parse FormData
  - Extract _method override
  - Extract _uuid
  - Create Operation from data
  - Result<Operation, ProcessingError>

- [ ] **T2.1.16** Write `processFormSubmission/index.test.ts` validation
  - Test: Validates UUID
  - Test: Validates required fields
  - Test: Sanitizes input
  - Integration test: With Architect form

- [ ] **T2.1.17** Implement form validation
  - Required field checking
  - Type coercion (strings to numbers, etc.)
  - XSS prevention
  - CSRF token validation

- [ ] **T2.1.18** Write `processFormSubmission/index.test.ts` state transition
  - Test: Operation applied to state
  - Test: New state computed
  - Test: State serialized to URL
  - Integration test: Full form→state→URL flow

- [ ] **T2.1.19** Implement state transition
  - Apply operation to current state
  - Compute new state (pure function)
  - Generate redirect URL
  - HTTP 303 See Other redirect

- [ ] **T2.1.20** Write `processFormSubmission/index.test.ts` error handling
  - Test: Validation errors shown
  - Test: Processing errors handled
  - Test: State rollback on error
  - Test: Error messages accessible

- [ ] **T2.1.21** Implement error handling
  - Validation error display
  - Processing error recovery
  - Automatic rollback
  - Accessible error messages

**Milestone 2.1 Definition of Done**:
- ✅ Forms work without JavaScript
- ✅ UUID idempotency enforced
- ✅ Method override functional
- ✅ Works in Lynx text browser
- ✅ All E2E tests passing

---

### Milestone 2.2: URL State Management with TDD (0/15 tasks)

#### State Parsing (0/5 tasks)

- [ ] **T2.2.1** Write E2E test: UI state persistence in URL
  - E2E test: Click accordion → URL updates
  - E2E test: Reload → accordion state preserved
  - E2E test: Share URL → same state
  - E2E test: Works without JavaScript

- [ ] **T2.2.2** Write `parseUiState/index.test.ts` for query parsing
  - Test: Parses query parameters
  - Test: Handles empty params
  - Test: Type coercion correct
  - Test: Invalid params ignored

- [ ] **T2.2.3** Implement `parseUiState`
  - Parse URLSearchParams
  - Type coercion (strings to primitives)
  - Validation against schema
  - Result<UIState, ParseError>

- [ ] **T2.2.4** Write `parseUiState/index.test.ts` edge cases
  - Test: URL length limits
  - Test: Special characters escaped
  - Test: Array parameters
  - Property test: Parse never throws

- [ ] **T2.2.5** Implement edge case handling
  - URL length check (2000 char warning, 64KB max)
  - URL encoding/decoding
  - Array parameter parsing (foo=1&foo=2 → [1,2])
  - Graceful degradation

#### State Encoding (0/5 tasks)

- [ ] **T2.2.6** Write `encodeUiState/index.test.ts` for serialization
  - Test: State to query string
  - Test: Primitives encoded correctly
  - Test: Objects flattened
  - Test: Arrays encoded

- [ ] **T2.2.7** Implement `encodeUiState`
  - State to URLSearchParams
  - Primitive encoding
  - Object flattening (dot notation)
  - Array encoding (repeated params)

- [ ] **T2.2.8** Write `encodeUiState/index.test.ts` reversibility
  - Property test: encode ∘ parse = identity
  - Property test: URL-safe characters only
  - Test: No data loss

- [ ] **T2.2.9** Implement encoding guarantees
  - URL-safe encoding (encodeURIComponent)
  - Reversibility checks
  - Data loss detection
  - Size optimization

- [ ] **T2.2.10** Write `encodeUiState/index.test.ts` compression
  - Test: Large state compressed
  - Test: Compression optional
  - Test: Decompression inverse

#### State Merging (0/5 tasks)

- [ ] **T2.2.11** Write `mergeUiState/index.test.ts` for composition
  - Test: Current + updates = new state
  - Test: Updates override current
  - Test: Null updates delete keys
  - Property test: Merge associative

- [ ] **T2.2.12** Implement `mergeUiState`
  - Merge current with updates
  - Override semantics
  - Null deletion
  - Deep merge for objects

- [ ] **T2.2.13** Write `mergeUiState/index.test.ts` immutability
  - Test: Original state unchanged
  - Test: Returns new state object
  - Property test: Pure function

- [ ] **T2.2.14** Implement immutable merge
  - Object spread
  - Deep copy
  - ReadonlyArray preservation
  - Type safety

- [ ] **T2.2.15** Write integration test: URL state full flow
  - Integration test: Parse → modify → merge → encode
  - Integration test: With form submission
  - Integration test: With Artificer reactivity
  - E2E test: Complete user interaction

**Milestone 2.2 Definition of Done**:
- ✅ URL state parsing complete
- ✅ State encoding URL-safe
- ✅ State merging pure and associative
- ✅ Property tests prove reversibility
- ✅ Works in Lynx

---

### Milestone 2.3: Property-Based Idempotency Tests (0/6 tasks)

- [ ] **T2.3.1** Write property test: UUID operations are idempotent
  - Property: apply(op1, uuid) = apply(op2, uuid) where op1.id = op2.id
  - Property: Multiple applications = single application
  - Test with 1000+ random operations

- [ ] **T2.3.2** Verify idempotency implementation
  - Run property tests
  - Fix any counterexamples
  - Document idempotency guarantees

- [ ] **T2.3.3** Write property test: State merges are associative
  - Property: merge(merge(a, b), c) = merge(a, merge(b, c))
  - Property: merge(a, empty) = a
  - Property: merge(empty, a) = a

- [ ] **T2.3.4** Verify merge associativity
  - Run property tests
  - Fix any counterexamples
  - Document merge semantics

- [ ] **T2.3.5** Write property test: URL encoding is reversible
  - Property: parse(encode(state)) = state
  - Property: encode(parse(url)) = url (modulo whitespace)
  - Test with complex nested state

- [ ] **T2.3.6** Verify encoding reversibility
  - Run property tests with 10,000+ examples
  - Fix any data loss
  - Document encoding guarantees

**Milestone 2.3 Definition of Done**:
- ✅ Property tests run with 1000+ examples each
- ✅ No counterexamples found
- ✅ Idempotency proven mathematically
- ✅ Associativity proven
- ✅ Reversibility proven

---

**Phase 2 Definition of Done**:
- ✅ All 42 tasks complete
- ✅ E2E tests pass without JavaScript
- ✅ Forms work in Lynx text browser
- ✅ State persists through URLs correctly
- ✅ Property tests prove idempotency
- ✅ Ready for Phase 3 (Continuations)

---

## Phase 3: Continuations

**Goal**: Resumable multi-step workflows with cryptographic security  
**Status**: ⬜ Not Started  
**Progress**: 0/30 tasks  
**Dependencies**: Phase 2 complete

### Milestone 3.1: Continuation Behavior Tests (0/10 tasks)

#### E2E Wizard Flow (0/4 tasks)

- [ ] **T3.1.1** Write E2E test: multi-step form save/resume
  - E2E: Start wizard
  - E2E: Fill step 1
  - E2E: Click "Save for Later"
  - E2E: Get continuation URL
  - E2E: Clear session
  - E2E: Navigate to continuation URL
  - E2E: Resume at step 1 with data intact

- [ ] **T3.1.2** Write E2E test: back button through wizard
  - E2E: Navigate forward through steps
  - E2E: Click back button
  - E2E: Verify rollback to previous step
  - E2E: Data preserved
  - E2E: Works without JavaScript

- [ ] **T3.1.3** Write E2E test: bookmark and return
  - E2E: Save continuation mid-wizard
  - E2E: Close browser
  - E2E: Return days later
  - E2E: Resume from bookmark
  - E2E: Within expiration window

- [ ] **T3.1.4** Write E2E test: expiration handling
  - E2E: Save continuation
  - E2E: Wait for expiration (mock time)
  - E2E: Attempt resume
  - E2E: Graceful error message
  - E2E: Option to restart

#### Security Tests (0/4 tasks)

- [ ] **T3.1.5** Write security test: tampered token rejection
  - Security test: Modify signature → rejection
  - Security test: Modify payload → rejection
  - Security test: Modify expiration → rejection
  - Security test: Modify nonce → rejection

- [ ] **T3.1.6** Write security test: replay attack prevention
  - Security test: Same nonce twice → rejection
  - Security test: Nonce tracking works
  - Security test: Nonce expiration

- [ ] **T3.1.7** Write security test: token forgery
  - Security test: Generate fake token → rejection
  - Security test: Signature verification required
  - Security test: Cannot skip verification

- [ ] **T3.1.8** Write security test: timing attacks
  - Security test: Constant-time signature verification
  - Security test: No timing leak in validation
  - Measure verification time variance

#### Property Tests (0/2 tasks)

- [ ] **T3.1.9** Write property test: continuation serialization
  - Property: serialize ∘ deserialize = identity
  - Property: Continuation always valid after serialize/deserialize
  - Property: Size limits enforced
  - Test with 1000+ random continuations

- [ ] **T3.1.10** Write property test: cryptographic properties
  - Property: Different data → different signature
  - Property: Same data → same signature
  - Property: Signature verification deterministic
  - Property: Tamper always detected

**Milestone 3.1 Definition of Done**:
- ✅ E2E wizard flow tests passing
- ✅ Security tests prevent all attacks
- ✅ Property tests prove crypto invariants
- ✅ Continuation behavior fully specified

---

### Milestone 3.2: Continuation Implementation with TDD (0/16 tasks)

#### Continuation Creation (0/4 tasks)

- [ ] **T3.2.1** Write `createContinuation/index.test.ts` for state capture
  - Test: Current step captured
  - Test: Accumulated data captured
  - Test: Remaining steps calculated
  - Test: Rollback chain maintained

- [ ] **T3.2.2** Implement `createContinuation`
  - Capture wizard state
  - Calculate remaining steps
  - Create rollback link
  - Generate nonce
  - Set expiration
  - Result<WizardContinuation, CreationError>

- [ ] **T3.2.3** Write `createContinuation/index.test.ts` validation
  - Test: Step validation
  - Test: Data validation
  - Test: Expiration validation
  - Test: Complete continuation valid

- [ ] **T3.2.4** Implement continuation validation
  - Step bounds checking
  - Data schema validation
  - Expiration range check
  - Curried validation functions

#### Cryptographic Signing (0/4 tasks)

- [ ] **T3.2.5** Write `signContinuation/index.test.ts` for cryptography
  - Test: Ed25519 signature generated
  - Test: Signature attached to continuation
  - Test: Signature deterministic
  - Test: Different data → different signature

- [ ] **T3.2.6** Implement `signContinuation`
  - Serialize continuation to JSON
  - Sign with Ed25519 (Web Crypto API)
  - Attach signature
  - Return signed continuation
  - Curried function

- [ ] **T3.2.7** Write `signContinuation/index.test.ts` key management
  - Test: Key rotation support
  - Test: Multiple keys supported
  - Test: Old signatures still verify
  - Test: Key derivation from secret

- [ ] **T3.2.8** Implement key management
  - Key derivation (HKDF)
  - Key rotation strategy
  - Multi-key verification
  - Key expiration

#### Continuation Verification (0/4 tasks)

- [ ] **T3.2.9** Write `verifyContinuation/index.test.ts` for validation
  - Test: Valid signature passes
  - Test: Invalid signature rejected
  - Test: Expiration checked
  - Test: Nonce uniqueness enforced

- [ ] **T3.2.10** Implement `verifyContinuation`
  - Deserialize continuation
  - Verify signature (constant-time)
  - Check expiration
  - Check nonce uniqueness
  - Result<WizardContinuation, SecurityError>

- [ ] **T3.2.11** Write `verifyContinuation/index.test.ts` security
  - Security test: Constant-time verification
  - Security test: Replay prevention
  - Security test: All tampering detected

- [ ] **T3.2.12** Implement verification security
  - Constant-time comparison
  - Nonce tracking (in-memory store)
  - Tamper detection
  - Timing attack prevention

#### Sensitive Field Encryption (0/4 tasks)

- [ ] **T3.2.13** Write `encryptSensitiveFields/index.test.ts` for privacy
  - Test: Private data encrypted
  - Test: Public data not encrypted
  - Test: Ephemeral data excluded
  - Test: Decryption inverse

- [ ] **T3.2.14** Implement `encryptSensitiveFields`
  - Classify fields (public/private/ephemeral)
  - Encrypt private fields (AES-GCM)
  - Attach IV and auth tag
  - Result<EncryptedContinuation, EncryptionError>

- [ ] **T3.2.15** Write `encryptSensitiveFields/index.test.ts` security
  - Test: Encryption authenticated
  - Test: IV unique per encryption
  - Test: Key derivation correct
  - Property test: Encryption/decryption identity

- [ ] **T3.2.16** Implement encryption security
  - AES-GCM authenticated encryption
  - Unique IV generation
  - Key derivation (HKDF)
  - Authentication tag verification

**Milestone 3.2 Definition of Done**:
- ✅ Continuation creation working
- ✅ Ed25519 signing implemented
- ✅ Verification prevents all attacks
- ✅ Sensitive data encrypted
- ✅ All tests passing

---

### Milestone 3.3: Flow Control with TDD (0/4 tasks)

#### Rollback Support (0/2 tasks)

- [ ] **T3.3.1** Write `rollbackContinuation/index.test.ts` for back behavior
  - Test: Rollback to previous continuation
  - Test: Rollback chain traversed
  - Test: Data preserved through rollback
  - Integration test: Back button in wizard

- [ ] **T3.3.2** Implement `rollbackContinuation`
  - Parse rollback token
  - Verify rollback continuation
  - Restore previous state
  - Update URL
  - Result<WizardContinuation, RollbackError>

#### Branching Support (0/2 tasks)

- [ ] **T3.3.3** Write `branchContinuation/index.test.ts` for conditionals
  - Test: Conditional step branching
  - Test: Different paths from same step
  - Test: Branch data isolated
  - Integration test: Wizard with conditions

- [ ] **T3.3.4** Implement `branchContinuation`
  - Evaluate branch condition
  - Create new continuation for branch
  - Update remaining steps
  - Maintain rollback chain
  - Result<WizardContinuation, BranchError>

**Milestone 3.3 Definition of Done**:
- ✅ Rollback functional
- ✅ Branching functional
- ✅ Integration tests passing
- ✅ Complex wizard flows working

---

**Phase 3 Definition of Done**:
- ✅ All 30 tasks complete
- ✅ E2E test: Complete wizard, save, resume days later
- ✅ Continuations cryptographically secure
- ✅ Back button behavior correct
- ✅ Property tests prove continuation invariants
- ✅ Ready for Phase 4 (State Machines)

---

## Phase 4: State Machines

**Goal**: Declarative state machines with pure transitions  
**Status**: ⬜ Not Started  
**Progress**: 0/32 tasks  
**Dependencies**: Phase 3 complete

### Milestone 4.1: State Machine Properties (0/8 tasks)

#### Property Tests (0/4 tasks)

- [ ] **T4.1.1** Write property test: valid states only
  - Property: Current state always in states map
  - Property: Transitions always to valid states
  - Property: Initial state always valid
  - Test with 1000+ random state machines

- [ ] **T4.1.2** Write property test: transitions deterministic
  - Property: Same (state, event) → same next state
  - Property: Guard result deterministic
  - Property: Actions deterministic

- [ ] **T4.1.3** Write property test: guards preserve invariants
  - Property: Guard true → transition allowed
  - Property: Guard false → transition blocked
  - Property: Invalid transitions never allowed

- [ ] **T4.1.4** Write property test: actions pure
  - Property: Actions don't modify state directly
  - Property: Actions return effect descriptions
  - Property: Effects isolated from transitions

#### Integration Tests (0/4 tasks)

- [ ] **T4.1.5** Write integration test: complete state flow
  - Integration: Multi-step state machine
  - Integration: Guards evaluated correctly
  - Integration: Actions executed
  - Integration: State transitions logged

- [ ] **T4.1.6** Write integration test: error states
  - Integration: Error transitions
  - Integration: Rollback on error
  - Integration: Error recovery paths

- [ ] **T4.1.7** Write integration test: form-driven state machine
  - Integration: Form submission triggers event
  - Integration: Server computes next state
  - Integration: Redirect to new state URL
  - E2E: Works without JavaScript

- [ ] **T4.1.8** Write integration test: client-enhanced state machine
  - Integration: JavaScript intercepts form
  - Integration: Local state transition
  - Integration: Background sync
  - E2E: Identical to server-side behavior

**Milestone 4.1 Definition of Done**:
- ✅ Property tests prove state machine laws
- ✅ Integration tests cover complete flows
- ✅ Error handling tested
- ✅ Server and client behavior identical

---

### Milestone 4.2: State Machine Implementation with TDD (0/24 tasks)

#### Transition Function (0/6 tasks)

- [ ] **T4.2.1** Write `transition/index.test.ts` for state changes
  - Test: Valid transition succeeds
  - Test: Invalid transition rejected
  - Test: Guard blocks transition
  - Test: Guard allows transition

- [ ] **T4.2.2** Implement `transition`
  - Look up transition in states map
  - Evaluate guard
  - Apply transition if allowed
  - Execute actions
  - Result<SecureState<S>, TransitionError>

- [ ] **T4.2.3** Write `transition/index.test.ts` immutability
  - Test: Original state unchanged
  - Test: Returns new state
  - Property test: Pure function

- [ ] **T4.2.4** Implement immutable transitions
  - Deep copy state
  - Immutable updates
  - Type-safe state changes

- [ ] **T4.2.5** Write `transition/index.test.ts` logging
  - Test: Transition logged
  - Test: Event logged
  - Test: Timestamp attached
  - Integration: With Operator events

- [ ] **T4.2.6** Implement transition logging
  - Create transition event
  - Publish to Operator (stub for now)
  - Include metadata (timestamp, from, to, event)
  - SPARQL-queryable format

#### Guard Evaluation (0/6 tasks)

- [ ] **T4.2.7** Write `evaluateGuard/index.test.ts` for conditions
  - Test: Guard predicate evaluation
  - Test: Access to current state
  - Test: Access to event data
  - Test: Pure evaluation (no side effects)

- [ ] **T4.2.8** Implement `evaluateGuard`
  - Evaluate guard predicate
  - Pass state and event
  - Return boolean
  - Curried function signature

- [ ] **T4.2.9** Write `evaluateGuard/index.test.ts` safety
  - Test: Guard exceptions caught
  - Test: Invalid guards rejected
  - Test: Type safety enforced

- [ ] **T4.2.10** Implement guard safety
  - Try/catch around evaluation (exceptional IO boundary)
  - Default to false on exception
  - Guard validation
  - Type constraints

- [ ] **T4.2.11** Write `evaluateGuard/index.test.ts` complex guards
  - Test: Compound guards (AND, OR, NOT)
  - Test: Nested conditions
  - Test: Guard composition

- [ ] **T4.2.12** Implement guard composition
  - AND combinator
  - OR combinator
  - NOT combinator
  - Curried guard builders

#### Action Execution (0/6 tasks)

- [ ] **T4.2.13** Write `executeActions/index.test.ts` for side effects
  - Test: Actions return effect descriptions
  - Test: Effects don't modify state
  - Test: Effects can be logged
  - Test: Effects serializable

- [ ] **T4.2.14** Implement `executeActions`
  - Map actions to effect descriptions
  - No side effects here (deferred)
  - Return effect list
  - Curried function

- [ ] **T4.2.15** Write `executeActions/index.test.ts` effect types
  - Test: Log effect
  - Test: HTTP effect
  - Test: Email effect
  - Test: Custom effects

- [ ] **T4.2.16** Implement effect types
  - Discriminated union of effect types
  - LogEffect { level, message }
  - HttpEffect { method, url, body }
  - EmailEffect { to, subject, body }
  - CustomEffect { type, data }

- [ ] **T4.2.17** Write `executeActions/index.test.ts` effect execution
  - Integration: Execute effects after transition
  - Integration: Effect failures don't block transition
  - Integration: Effects logged

- [ ] **T4.2.18** Implement effect execution
  - Execute effects after state change
  - Wrap in Result monad
  - Log failures
  - Don't block on failures

#### State Serialization (0/6 tasks)

- [ ] **T4.2.19** Write `serializeState/index.test.ts` for persistence
  - Test: Serialize to URL
  - Test: Serialize to continuation
  - Test: Serialize to RDF triples
  - Property test: Reversible

- [ ] **T4.2.20** Implement `serializeState`
  - State to URL (query params)
  - State to continuation token
  - State to RDF (Turtle/JSON-LD)
  - Curried serializers

- [ ] **T4.2.21** Write `serializeState/index.test.ts` deserialization
  - Test: Deserialize from URL
  - Test: Deserialize from continuation
  - Test: Deserialize from RDF
  - Property test: serialize ∘ deserialize = identity

- [ ] **T4.2.22** Implement state deserialization
  - URL to state
  - Continuation to state
  - RDF to state
  - Validation after deserialization

- [ ] **T4.2.23** Write `serializeState/index.test.ts` RDF integration
  - Test: State machines as triples
  - Test: SPARQL queries work
  - Integration: With Pathfinder

- [ ] **T4.2.24** Implement RDF serialization
  - State machine to RDF graph
  - State to RDF node
  - Transitions to RDF edges
  - Pathfinder integration

**Milestone 4.2 Definition of Done**:
- ✅ Transitions pure and deterministic
- ✅ Guards evaluated safely
- ✅ Actions return effect descriptions
- ✅ State serializable to URL/continuation/RDF
- ✅ All tests passing

---

**Phase 4 Definition of Done**:
- ✅ All 32 tasks complete
- ✅ Property tests prove state machine invariants
- ✅ Integration tests cover all transitions
- ✅ Guards and actions tested in isolation
- ✅ Invalid transitions properly rejected
- ✅ State machines stored as RDF triples
- ✅ Ready for Phase 5 (Progressive Enhancement)

---

## Phase 5: Progressive Enhancement

**Goal**: JavaScript enhancement layer maintaining identical behavior  
**Status**: ⬜ Not Started  
**Progress**: 0/30 tasks  
**Dependencies**: Phases 1-4 complete

### Milestone 5.1: Enhancement Behavior Tests (0/10 tasks)

#### Dual-Mode Testing (0/5 tasks)

- [ ] **T5.1.1** Write E2E test: form works with JS disabled
  - E2E: Disable JavaScript
  - E2E: Submit form
  - E2E: Verify server-side processing
  - E2E: Verify redirect
  - E2E: Works in Lynx

- [ ] **T5.1.2** Write E2E test: form enhanced when JS enabled
  - E2E: Enable JavaScript
  - E2E: Submit form
  - E2E: Verify preventDefault
  - E2E: Verify local state update
  - E2E: Verify background sync
  - E2E: Verify identical result

- [ ] **T5.1.3** Write E2E test: enhancement attribute detection
  - E2E: Form with `data-enhance="validate"`
  - E2E: Enhancement script runs
  - E2E: Client-side validation active
  - E2E: Server-side validation still runs

- [ ] **T5.1.4** Write E2E test: enhancement attribute types
  - E2E: `data-enhance="optimistic"` → optimistic updates
  - E2E: `data-enhance="validate"` → client validation
  - E2E: `data-enhance="offline"` → offline queue
  - E2E: Multiple enhancements combined

- [ ] **T5.1.5** Write E2E test: enhancement failure graceful
  - E2E: JavaScript error occurs
  - E2E: Form falls back to server-side
  - E2E: User sees no breakage
  - E2E: Error logged

#### Offline Testing (0/3 tasks)

- [ ] **T5.1.6** Write E2E test: offline queue and sync
  - E2E: Go offline
  - E2E: Submit forms
  - E2E: Operations queued
  - E2E: Go online
  - E2E: Operations synced
  - E2E: No data loss

- [ ] **T5.1.7** Write E2E test: offline conflict resolution
  - E2E: Two devices offline
  - E2E: Both submit operations
  - E2E: Both go online
  - E2E: CRDT merge via Agent
  - E2E: Conflicts resolved

- [ ] **T5.1.8** Write E2E test: offline storage limits
  - E2E: Queue many operations offline
  - E2E: IndexedDB storage used
  - E2E: Storage limits respected
  - E2E: LRU eviction if needed

#### Optimistic Update Testing (0/2 tasks)

- [ ] **T5.1.9** Write property test: optimistic update reconciliation
  - Property: Local update + server response = same state
  - Property: Rollback on server rejection
  - Property: No data loss
  - Test with 1000+ random operations

- [ ] **T5.1.10** Write integration test: JS error fallback
  - Integration: Enhancement script crashes
  - Integration: Form still works
  - Integration: Server-side processing continues
  - Integration: User experience degraded but functional

**Milestone 5.1 Definition of Done**:
- ✅ E2E tests pass with and without JavaScript
- ✅ Enhancement detection working
- ✅ Offline behavior tested
- ✅ Optimistic updates proven correct

---

### Milestone 5.2: Enhancement Implementation with TDD (0/20 tasks)

#### Form Enhancement (0/5 tasks)

- [ ] **T5.2.1** Write `enhanceForm/index.test.ts` for interception
  - Test: addEventListener on submit
  - Test: preventDefault called
  - Test: Original form behavior preserved
  - Test: Enhancement opt-in (data-enhance attribute)

- [ ] **T5.2.2** Implement `enhanceForm`
  - Query for `[data-enhance]` forms
  - Add submit listener
  - Call preventDefault
  - Delegate to enhancement handlers
  - Curried function signature

- [ ] **T5.2.3** Write `enhanceForm/index.test.ts` enhancement types
  - Test: "validate" → client validation
  - Test: "optimistic" → optimistic update
  - Test: "offline" → queue operation
  - Test: Multiple types combine

- [ ] **T5.2.4** Implement enhancement handlers
  - Parse data-enhance attribute
  - Apply enhancements in order
  - Compose enhancement functions
  - Each enhancement returns Result

- [ ] **T5.2.5** Write `enhanceForm/index.test.ts` error handling
  - Test: Enhancement error logged
  - Test: Fallback to server-side
  - Test: User sees error message
  - Test: Form still submittable

#### Operation Derivation (0/4 tasks)

- [ ] **T5.2.6** Write `deriveOperation/index.test.ts` for extraction
  - Test: Extract from FormData
  - Test: Extract UUID
  - Test: Extract method override
  - Test: Create Operation object

- [ ] **T5.2.7** Implement `deriveOperation`
  - Extract FormData from form
  - Parse _uuid field
  - Parse _method field
  - Build Operation
  - Result<Operation, ExtractionError>

- [ ] **T5.2.8** Write `deriveOperation/index.test.ts` validation
  - Test: Validates UUID
  - Test: Validates method
  - Test: Validates required fields
  - Integration: With form enhancement

- [ ] **T5.2.9** Implement operation validation
  - UUID format check
  - Method whitelist
  - Required field check
  - Type coercion

#### Local State Application (0/5 tasks)

- [ ] **T5.2.10** Write `applyOperationLocally/index.test.ts` for updates
  - Test: Operation applied to local state
  - Test: DOM updated
  - Test: Artificer behaviors triggered
  - Test: State machine transition

- [ ] **T5.2.11** Implement `applyOperationLocally`
  - Apply operation to state
  - Compute new state
  - Update DOM (Artificer)
  - Trigger state machine transition
  - Result<State, ApplicationError>

- [ ] **T5.2.12** Write `applyOperationLocally/index.test.ts` optimistic
  - Test: Optimistic UI update
  - Test: Server response confirmation
  - Test: Rollback on server rejection
  - Property test: Eventual consistency

- [ ] **T5.2.13** Implement optimistic updates
  - Apply immediately to local state
  - Mark as "pending"
  - Await server response
  - Confirm or rollback
  - Update UI accordingly

- [ ] **T5.2.14** Write `applyOperationLocally/index.test.ts` Artificer integration
  - Integration: Trigger `__sbCalculate`
  - Integration: Trigger `__sbValidate`
  - Integration: Trigger `__sbFormat`
  - Integration: Reactive updates work

#### Offline Queue (0/6 tasks)

- [ ] **T5.2.15** Write `queueOperation/index.test.ts` for offline
  - Test: Operation queued to IndexedDB
  - Test: Queue persists through reload
  - Test: Queue survives crashes
  - Test: LRU eviction on full

- [ ] **T5.2.16** Implement `queueOperation`
  - Store operation in IndexedDB
  - Add timestamp
  - Add retry count
  - Set expiration
  - Result<QueuedOperation, QueueError>

- [ ] **T5.2.17** Write `queueOperation/index.test.ts` sync
  - Test: Online event triggers sync
  - Test: Operations sent in order
  - Test: Successful operations removed
  - Test: Failed operations retried

- [ ] **T5.2.18** Implement queue sync
  - Listen for online event
  - Process queue in order
  - Send operations to server
  - Remove on success, retry on failure
  - Exponential backoff

- [ ] **T5.2.19** Write `queueOperation/index.test.ts` conflict resolution
  - Test: Local operation + server state = merged
  - Integration: With Agent CRDTs
  - Test: Conflicts resolved
  - Property test: Convergence

- [ ] **T5.2.20** Implement conflict resolution
  - Detect conflicts
  - Apply CRDT merge via Agent
  - Update local state
  - Notify user of conflicts

**Milestone 5.2 Definition of Done**:
- ✅ Form enhancement functional
- ✅ Operation derivation correct
- ✅ Optimistic updates working
- ✅ Offline queue implemented
- ✅ All tests passing

---

**Phase 5 Definition of Done**:
- ✅ All 30 tasks complete
- ✅ E2E tests pass with and without JavaScript
- ✅ Form fallback tested when JS errors occur
- ✅ Offline behavior tested with service worker
- ✅ Property tests prove optimistic updates correct
- ✅ Progressive enhancement seamless
- ✅ **MVP COMPLETE** - Ready for production use

---

## Post-MVP Phases (6-15)

**Note**: These phases are **not part of MVP**. They add visual designer, collaboration, analytics, and other advanced features. Implement only after MVP is proven in production.

### Phase 6-15 Summary

- **Phase 6**: Visual State Machine Designer (n8n-style)
- **Phase 7**: Real-Time State Execution Visualization
- **Phase 8**: Collaborative State Machine Design
- **Phase 9**: Workflow State Recovery
- **Phase 10**: State Machine Analytics
- **Phase 11**: Workflow Integration
- **Phase 12**: State Monad Integration
- **Phase 13**: Integration & Ecosystem
- **Phase 14**: Documentation & Developer Experience
- **Phase 15**: Production Hardening & Release

**Total Post-MVP**: 299 tasks

For detailed breakdown of Phases 6-15, see `docs/plan.md` and `docs/plan.yaml`.

---

## Progress Tracking

### Overall Statistics

- **MVP Tasks**: 168 (Phases 1-5)
- **Post-MVP Tasks**: 299 (Phases 6-15, see POST_MVP_ROADMAP.md)
- **Completed**: 0
- **In Progress**: 0
- **Remaining**: 168 MVP tasks
- **MVP Progress**: 0%

### MVP Progress

- **Phase 1**: 0/34 tasks (0%)
- **Phase 2**: 0/42 tasks (0%)
- **Phase 3**: 0/30 tasks (0%)
- **Phase 4**: 0/32 tasks (0%)
- **Phase 5**: 0/30 tasks (0%)
- **Total MVP**: 0/168 tasks (0%)

### Session Tracking

**Session 1** (Current):
- Started: 2025-01-10
- Focus: Phase 1 setup
- Tasks Planned: Create master plan
- Tasks Completed: 0
- Next Session: Start Phase 1, Milestone 1.1

---

## Session Resumption Guide

### For Future AI Sessions

When resuming work on Custodian:

1. **Read this file first** - It's the single source of truth
2. **Check "NEXT SESSION STARTS HERE"** marker at the top
3. **Read the current phase/milestone** context
4. **Query MCP servers** as indicated
5. **Write tests first** following TDD
6. **Implement to pass tests**
7. **Update checkboxes** as you go
8. **Update progress counters**
9. **Move "NEXT SESSION" marker** to next task
10. **Update "Last Updated"** timestamp

### Context Each Session Needs

- **Current Phase Goal**: What we're building
- **Dependencies**: What must be complete first
- **Testing Stack**: Deno.test, fast-check, msw, axe
- **Studio Rules**: Query MCP before coding
- **File Structure**: One function per file, tests alongside

### Common Pitfalls to Avoid

- ❌ Don't implement before writing tests
- ❌ Don't mock Studio library internals
- ❌ Don't use classes, mutations, or arrow functions
- ❌ Don't skip property tests
- ❌ Don't forget Envoy comment syntax
- ❌ Don't violate constitutional rules

### Session Checklist

- [ ] Read MASTER_PLAN.md completely
- [ ] Check current phase and milestone
- [ ] Query MCP servers for context
- [ ] Write tests first (TDD)
- [ ] Implement to pass tests
- [ ] Update checkboxes and progress
- [ ] Run `deno task test`
- [ ] Run `deno task fmt && deno task lint`
- [ ] Move "NEXT SESSION" marker
- [ ] Update timestamps

---

## Testing Strategy Reference

### Test Types by Phase

**Phase 1 (Foundation)**:
- Unit tests for types
- Property tests for type invariants
- No E2E (no behavior yet)

**Phase 2 (No-JS)**:
- E2E tests in Lynx
- Property tests for idempotency
- Integration tests with forms

**Phase 3 (Continuations)**:
- E2E tests for wizard flows
- Security penetration tests
- Property tests for crypto

**Phase 4 (State Machines)**:
- Property tests for state laws
- Integration tests for complete flows
- RDF serialization tests

**Phase 5 (Enhancement)**:
- E2E tests with/without JS
- Offline behavior tests
- Property tests for optimistic updates

### Property Test Examples

```typescript
// Idempotency
fc.property(fc.uuid(), fc.anything(), (uuid, data) =>
  equals(apply(op1, uuid))(apply(op2, uuid))
)

// Reversibility
fc.property(fc.anything(), (state) =>
  equals(parse(encode(state)))(state)
)

// Associativity
fc.property(fc.anything(), fc.anything(), fc.anything(), (a, b, c) =>
  equals(merge(merge(a, b), c))(merge(a, merge(b, c)))
)

// State machine determinism
fc.property(fc.state(), fc.event(), (state, event) =>
  equals(transition(sm, state, event))(transition(sm, state, event))
)
```

---

## Dependencies Reference

### Internal (Studio Libraries)

- **Toolsmith**: Functional utilities, branded types, Either/Maybe
- **Operator**: Event sourcing, CQRS (Phase 4+)
- **Agent**: CRDTs, distributed sync (Phase 5+)
- **Warden**: Contracts, validation (Phases 4-5)
- **Sentinel**: Auth/authz (Post-MVP)
- **Architect**: HTML components (Phase 2+)
- **Pathfinder**: Triple store, SPARQL (Phase 4+)
- **Envoy**: Documentation (Phase 8+)

### External (Whitelisted)

- **Deno**: Runtime, std library
- **Web Crypto API**: Ed25519, AES-GCM
- **IndexedDB**: Offline queue
- **Temporal**: Timestamps (future)
- **fast-check**: Property tests (temporary)
- **msw**: Mock Service Worker
- **axe**: Accessibility testing

### Testing Stack

- `Deno.test` and `t.step`
- `fast-check` for property tests
- `msw` for external API mocks
- `playwright` for E2E (if needed)
- `axe` for accessibility

---

## File Structure Guide

### Directory Layout

```
libraries/custodian/
├── MASTER_PLAN.md (this file)
├── README.md
├── docs/
│   ├── plan.md (comprehensive details)
│   ├── plan.yaml (structured data)
│   └── todos.md (old checklist - deprecated)
├── src/
│   ├── types/
│   │   ├── Operation/
│   │   │   ├── index.ts
│   │   │   └── index.test.ts
│   │   ├── CustodianConfig/
│   │   ├── PrivacyAwareState/
│   │   └── ...
│   ├── functions/
│   │   ├── generateFormUUID/
│   │   ├── parseUIState/
│   │   └── ...
│   └── integrations/
│       ├── artificer/
│       ├── agent/
│       └── ...
└── tests/
    ├── e2e/
    ├── integration/
    └── property/
```

### Naming Conventions

- **Types**: PascalCase (`Operation`, `CustodianConfig`)
- **Functions**: camelCase (`generateFormUUID`, `parseUIState`)
- **Tests**: `index.test.ts` alongside code
- **Folders**: camelCase, one function per folder

---

## Success Criteria

### MVP (Phases 1-5)

- [ ] Works without JavaScript in all browsers
- [ ] Works in Lynx text browser
- [ ] All UI state in URLs
- [ ] Forms use idempotent operations
- [ ] Continuations cryptographically secure
- [ ] State machines pure and deterministic
- [ ] Progressive enhancement seamless
- [ ] All tests passing
- [ ] 100% behavior coverage
- [ ] Property tests prove invariants
- [ ] No Studio rule violations
- [ ] Documentation complete (Envoy comments)

### Post-MVP (Phases 6-15)

- [ ] Visual designer functional
- [ ] Collaborative editing works
- [ ] Analytics dashboard operational
- [ ] Security audit passed
- [ ] Performance targets met
- [ ] Production deployed
- [ ] v1.0.0 released

---

## Notes for Maintainers

- This file is the **single source of truth**
- Update checkboxes as tasks complete
- Update progress counters after each session
- Move "NEXT SESSION" marker to current task
- Keep "Last Updated" timestamp current
- Don't delete completed tasks (shows progress)
- Add session notes below completed phases

---

## Session Notes

### Session 1 (2025-01-10)

- Created MASTER_PLAN.md
- Consolidated todos.md, plan.md, plan.yaml
- Added session resumption features
- Added granular task breakdowns
- Ready to start Phase 1

### Session 2 (TBD)

_Notes will be added here when session 2 completes_

---

**END OF MASTER PLAN**

This plan will evolve as we learn, but the core structure remains. Test-first, pure functional, progressive enhancement, greenfield only.

Let's build the future of web state management. 🚀
