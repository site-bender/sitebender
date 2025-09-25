# Custodian Implementation Plan

## Vision

A state management library that works without JavaScript, enhances progressively, and treats the server as the source of truth. State transitions through idempotent operations, UI state lives in URLs, and complex workflows use secure continuations.

## Core Principles

1. **No JavaScript Required**: Everything must work in Lynx/Mosaic
2. **Idempotent Operations**: UUID-based operations prevent duplication
3. **URL as State**: Complete UI state encoded in URLs
4. **Secure Continuations**: Signed, time-bound tokens for workflows
5. **Progressive Enhancement**: Same model with or without JS
6. **Privacy First**: Clear boundaries between public/private state
7. **Pure Functions**: No classes, no mutations, functional only
8. **Test-Driven Development**: Write tests FIRST, then implementation

## Testing Philosophy

### Approach

- **TDD Throughout**: Write failing tests first, then implement to pass
- **Test Location**: Tests live alongside code as `index.test.ts`
- **Test Behavior**: Test what it does, not how it does it
- **Integration Focus**: Prioritize end-to-end and integration tests
- **Property Testing**: Use fast-check to find edge cases
- **No Internal Mocking**: Studio libraries work - trust them
- **External Mocking**: Use msw only for external APIs/side effects
- **Accessibility**: Test with axe where UI is involved

### Testing Stack

- `Deno.test` and `t.step` for structure
- `fast-check` for property-based testing (temporary until Quarrier)
- `msw` for external API mocking
- `playwright` for browser E2E (if needed)
- `axe` for accessibility testing
- No other testing libraries

### What to Mock

- External API calls (payment gateways, email services)
- Database writes that would persist
- Time-based operations (use fake timers)
- Random number generation (seed for determinism)

### What NOT to Mock

- Toolsmith functions
- Architect behaviors
- Agent operations
- Pagewright components
- Any Studio library internals

## Phase 1: Foundation

### Milestone: Core Types and Contracts (TDD)

**Definition of Done**:

- All behavior tests written first and passing
- Type definitions complete and documented
- All types use Envoy comment syntax
- 100% pure (no classes, no mutations)
- Follows all Studio rules

**Tasks**:

1. Core types with TDD
   - [ ] Write `Operation.test.ts` for UUID validation, method constraints
   - [ ] Implement `Operation` type with UUID, method, data
   - [ ] Write `CustodianConfig.test.ts` for secure defaults
   - [ ] Implement `CustodianConfig` with secure defaults
   - [ ] Write `PrivacyAwareState.test.ts` for data classification
   - [ ] Implement `PrivacyAwareState` with public/private/ephemeral
   - [ ] Write `WizardContinuation.test.ts` for serialization/security
   - [ ] Implement `WizardContinuation` with security fields
   - [ ] Write `StateMachine.test.ts` for transition behavior
   - [ ] Implement `StateMachine<S, E>` generic definition

2. Security types with TDD
   - [ ] Write `SecureState.test.ts` for tamper detection
   - [ ] Implement `SecureState` with signature and nonce
   - [ ] Write `SecurityError.test.ts` for error handling
   - [ ] Implement `SecurityError` union type
   - [ ] Write `CRDTOperation.test.ts` for convergence properties
   - [ ] Implement `CRDTOperation` for Agent integration
   - [ ] Write `ResumptionToken.test.ts` for zero-knowledge behavior
   - [ ] Implement `ResumptionToken` with zero-knowledge proof

## Phase 2: No-JS Implementation

### Milestone: Server-Side State Management (TDD)

**Definition of Done**:

- E2E tests pass without JavaScript enabled
- Forms work in text browsers (Lynx)
- State persists through URLs correctly
- All operations proven idempotent via property tests

**Tasks**:

1. Form processing with TDD
   - [ ] Write E2E test: form submission without JS
   - [ ] Write `generateFormUUID.test.ts` with uniqueness properties
   - [ ] Implement `generateFormUUID`: Server-side UUID generation
   - [ ] Write `embedUUIDinForm.test.ts` for HTML generation
   - [ ] Implement `embedUUIDinForm`: Add UUID to hidden input
   - [ ] Write `validateFormUUID.test.ts` for validation behavior
   - [ ] Implement `validateFormUUID`: Check UUID validity
   - [ ] Write `processFormSubmission.test.ts` for method override
   - [ ] Implement `processFormSubmission`: Handle POST with \_method

2. URL state management with TDD
   - [ ] Write E2E test: UI state persistence in URL
   - [ ] Write `parseUIState.test.ts` for query parsing
   - [ ] Implement `parseUIState`: Extract state from URL
   - [ ] Write `encodeUIState.test.ts` for serialization
   - [ ] Implement `encodeUIState`: Serialize to query params
   - [ ] Write `mergeUIState.test.ts` for state composition
   - [ ] Implement `mergeUIState`: Combine current with updates

3. Property-based idempotency tests
   - [ ] Write property test: UUID operations are idempotent
   - [ ] Write property test: State merges are associative
   - [ ] Write property test: URL encoding is reversible

## Phase 3: Continuations

### Milestone: Resumable Workflows (TDD)

**Definition of Done**:

- E2E test: Complete wizard, bookmark, resume days later
- Continuations cannot be tampered with (security tests)
- Back button behavior correct (browser tests)
- Property tests prove continuation invariants

**Tasks**:

1. Continuation behavior tests
   - [ ] Write E2E test: multi-step form save/resume
   - [ ] Write E2E test: back button through wizard
   - [ ] Write E2E test: bookmark and return
   - [ ] Write security test: tampered token rejection
   - [ ] Write property test: continuation serialization

2. Continuation implementation with TDD
   - [ ] Write `createContinuation.test.ts` for state capture
   - [ ] Implement `createContinuation`: Build from current state
   - [ ] Write `signContinuation.test.ts` for cryptography
   - [ ] Implement `signContinuation`: Add signature
   - [ ] Write `verifyContinuation.test.ts` for validation
   - [ ] Implement `verifyContinuation`: Check signature/expiry
   - [ ] Write `encryptSensitiveFields.test.ts` for privacy
   - [ ] Implement `encryptSensitiveFields`: Protect private data

3. Flow control with TDD
   - [ ] Write integration test: complete wizard flow
   - [ ] Write `rollbackContinuation.test.ts` for back behavior
   - [ ] Implement `rollbackContinuation`: Back button support
   - [ ] Write `branchContinuation.test.ts` for conditionals
   - [ ] Implement `branchContinuation`: Handle conditional flows

## Phase 4: State Machines

### Milestone: Declarative State Transitions (TDD)

**Definition of Done**:

- Property tests prove state machine invariants
- Integration tests cover all transitions
- Guards and actions tested in isolation
- Invalid transitions properly rejected

**Tasks**:

1. State machine properties
   - [ ] Write property test: valid states only
   - [ ] Write property test: transitions deterministic
   - [ ] Write property test: guards preserve invariants
   - [ ] Write integration test: complete state flow

2. Implementation with TDD
   - [ ] Write `transition.test.ts` for state changes
   - [ ] Implement `transition`: Apply with guards
   - [ ] Write `evaluateGuard.test.ts` for conditions
   - [ ] Implement `evaluateGuard`: Safe evaluation
   - [ ] Write `executeActions.test.ts` for side effects
   - [ ] Implement `executeActions`: Run effects
   - [ ] Write `serializeState.test.ts` for persistence
   - [ ] Implement `serializeState`: To URL/continuation

## Phase 5: Progressive Enhancement

### Milestone: JavaScript Enhancement Layer (TDD)

**Definition of Done**:

- E2E tests pass with and without JavaScript
- Form fallback tested when JS errors occur
- Offline behavior tested with service worker
- Property tests prove optimistic updates correct

**Tasks**:

1. Enhancement behavior tests
   - [ ] Write E2E test: form works with JS disabled
   - [ ] Write E2E test: form enhanced when JS enabled
   - [ ] Write E2E test: offline queue and sync
   - [ ] Write integration test: JS error fallback
   - [ ] Write property test: optimistic update reconciliation

2. Implementation with TDD
   - [ ] Write `enhanceForm.test.ts` for interception
   - [ ] Implement `enhanceForm`: Add listeners safely
   - [ ] Write `deriveOperation.test.ts` for extraction
   - [ ] Implement `deriveOperation`: Extract from form
   - [ ] Write `applyOperationLocally.test.ts` for updates
   - [ ] Implement `applyOperationLocally`: Optimistic changes
   - [ ] Write `queueOperation.test.ts` for offline
   - [ ] Implement `queueOperation`: IndexedDB queue

## Phase 6: Security

### Milestone: Production Security (TDD)

**Definition of Done**:

- Security tests attempt real attacks and fail
- Property tests prove cryptographic properties
- Rate limiting tested under load
- Privacy boundaries enforced in tests

**Tasks**:

1. Security test suite
   - [ ] Write penetration test: token tampering
   - [ ] Write penetration test: replay attacks
   - [ ] Write penetration test: session hijacking
   - [ ] Write load test: rate limiting
   - [ ] Write property test: constant time comparison

2. Implementation with TDD
   - [ ] Write `signToken.test.ts` for signatures
   - [ ] Implement `signToken`: HMAC signing
   - [ ] Write `verifyToken.test.ts` for validation
   - [ ] Implement `verifyToken`: Signature check
   - [ ] Write `constantTimeCompare.test.ts` for timing
   - [ ] Implement `constantTimeCompare`: Prevent timing attacks
   - [ ] Write `rateLimit.test.ts` for throttling
   - [ ] Implement `rateLimit`: Request limiting

## Phase 7: Integration

### Milestone: Studio Ecosystem (TDD)

**Definition of Done**:

- Integration tests with real Architect components
- Agent sync tested with mock CRDT operations
- SPARQL generation validated against schema
- All integrations follow Studio patterns

**Tasks**:

1. Integration test suite
   - [ ] Write integration test: Architect DOM behaviors
   - [ ] Write integration test: Agent CRDT sync
   - [ ] Write integration test: Triple store updates
   - [ ] Write E2E test: Full stack with all libraries

2. Implementation with TDD
   - [ ] Write `triggerCalculation.test.ts` for Architect
   - [ ] Implement `triggerCalculation`: Call `__sbCalculate`
   - [ ] Write `toCRDTOperation.test.ts` for Agent
   - [ ] Implement `toCRDTOperation`: Convert format
   - [ ] Write `toSparqlUpdate.test.ts` for triple store
   - [ ] Implement `toSparqlUpdate`: Generate SPARQL

## Phase 8: Documentation & Polish

### Milestone: Production Ready

**Definition of Done**:

- All functions have Envoy comments
- Examples run as executable tests
- Performance benchmarks in tests
- Accessibility tests passing

**Tasks**:

1. Documentation as tests
   - [ ] Write executable examples as tests
   - [ ] Add accessibility tests where applicable
   - [ ] Create performance benchmark tests
   - [ ] Write security guide with test examples

2. Final testing
   - [ ] Browser compatibility suite (Lynx, w3m, modern)
   - [ ] Full E2E suite without JavaScript
   - [ ] Property test suite for all invariants
   - [ ] Load and performance test suite

## Success Criteria

### Testing

- [ ] All tests written before implementation
- [ ] 100% behavior coverage (not line coverage)
- [ ] Property tests find no counterexamples
- [ ] E2E tests pass without JavaScript
- [ ] Security tests prevent all attacks
- [ ] Performance tests meet targets

### Technical

- [ ] Works without JavaScript in all browsers
- [ ] Progressive enhancement seamless
- [ ] All operations idempotent
- [ ] State machines pure and deterministic
- [ ] Zero external dependencies
- [ ] Follows all Studio rules

### Security

- [ ] All tokens cryptographically signed
- [ ] Time bounds enforced
- [ ] Replay attacks prevented
- [ ] Private data never in URLs
- [ ] Rate limiting effective

## Test Examples

### Property Test Example

```typescript
//++ Tests UUID operation idempotency
Deno.test("Operation idempotency", async function (t) {
  await t.step("same UUID produces same result", function () {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.record({
          title: fc.string(),
          value: fc.integer(),
        }),
        function (uuid, data) {
          const op1 = createOperation(uuid)(data);
          const op2 = createOperation(uuid)(data);

          return equals(applyOperation(op1))(applyOperation(op2));
        },
      ),
    );
  });
});
```

### Behavior Test Example

```typescript
//++ Tests form submission without JavaScript
Deno.test("Form submission no-JS", async function (t) {
  await t.step("submits with UUID", async function () {
    // Setup mock server
    const server = setupMockServer([
      rest.post("/api/items", function (req, res, ctx) {
        const formData = await req.formData();
        const uuid = formData.get("_uuid");

        assert(isUuid(uuid), "UUID required");
        return res(ctx.status(201));
      }),
    ]);

    // Test form submission
    const form = createTestForm({
      action: "/api/items",
      method: "POST",
    });

    const result = await submitForm(form);
    assertEquals(result.status, 201);
  });
});
```

### E2E Test Example

```typescript
//++ Tests complete wizard flow
Deno.test("Wizard flow E2E", async function (t) {
  await t.step("complete, save, resume", async function () {
    // Start wizard
    const step1 = await navigateTo("/wizard/step1");
    await fillField("name", "John");
    await clickButton("Next");

    // Save continuation
    const saveResult = await clickButton("Save for Later");
    const continuationUrl = saveResult.url;

    // Clear session
    await clearAllData();

    // Resume from URL
    const resumed = await navigateTo(continuationUrl);
    assertEquals(getFieldValue("name"), "John");
  });
});
```

## Parallel Execution Strategy

Since we're working with a swarm of AIs in parallel, here's how to divide the work:

### Independent Workstreams

These can be developed completely in parallel:

- **Types & Contracts** (Phase 1): Pure types, no dependencies
- **State Machines** (Phase 4): Pure logic, testable in isolation
- **Security Primitives** (Phase 6): Cryptography functions are standalone

### Sequential Dependencies

These must follow order:

1. **No-JS Implementation** (Phase 2) → **Continuations** (Phase 3): Continuations build on form processing
2. **Progressive Enhancement** (Phase 5): Requires Phases 2-4 complete
3. **Integration** (Phase 7): Requires most other phases

### AI Task Assignment

Each AI can take a complete test+implementation pair:

- AI 1: "Write and implement `Operation` type with tests"
- AI 2: "Write and implement `signContinuation` with tests"
- AI 3: "Write and implement state machine transitions with tests"

With proper context (rules, examples, this plan), AIs should produce correct code first time.

## Notes

- Write tests that tell a story about behavior
- Use property tests to find edge cases we didn't consider
- Test the unhappy paths extensively
- Accessibility is not optional - test it
- Performance is measurable - benchmark it
- Security is critical - try to break it
- With RAG/Weviate/MCP, AIs have full context and should nail it

## Definition of Done (Overall)

- [ ] All tests written first and passing
- [ ] No mocking of Studio internals
- [ ] Property tests prove invariants
- [ ] E2E tests work without JavaScript
- [ ] Security tests prevent attacks
- [ ] Accessibility tests pass
- [ ] Performance benchmarks met
- [ ] Works in Lynx text browser
- [ ] The Architect approves
