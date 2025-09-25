# Custodian

State management that respects the web's fundamental architecture. Works without JavaScript, enhances progressively, and treats the server as the source of truth.

## Philosophy

Custodian rejects the modern antipattern of duplicating server state on the client. Instead, it embraces the web's original design: stateless requests with state encoded in URLs and forms. When JavaScript is available, Custodian intercepts these interactions for optimistic updates and offline support, but the fundamental model remains unchanged.

Every interaction works identically with or without JavaScript:

- **Lynx/Mosaic**: Form submission → server processes → new page
- **Modern browser (no JS)**: Same as above
- **Modern browser (JS)**: Form submission → preventDefault → local state update → background sync

## Core Concepts

### Idempotent Operations

All state mutations use UUID-based idempotent operations. Forms include server-generated UUIDs that guarantee exactly-once semantics:

```typescript
//++ Transforms HTML form into idempotent operation
export function deriveOperation(form: HTMLFormElement): Operation {
  const method = getFormMethod(form);
  const uuid = getFormUUID(form);

  if (isNil(uuid)) {
    return Left(new Error("All operations require a UUID"));
  }

  return Right({
    id: uuid,
    method: method,
    idempotencyKey: uuid,
    resource: extractResourcePath(form),
    data: new FormData(form),
  });
}
```

### URL as State Container

UI state lives entirely in the URL. Every UI interaction is a navigation:

```
/dashboard
  ?accordion=2          // Which accordion is open
  &tab=settings        // Active tab
  &sort=date           // Table sort
  &order=asc           // Sort order
  &filters=active,new  // Active filters
  &page=3              // Current page
  #row-42              // Scroll position
```

The server reads this URL and renders the appropriate state. With JavaScript, we intercept navigation and update locally.

### Continuations for Complex Flows

Form wizards and multi-step processes use cryptographically signed continuation tokens:

```typescript
//++ Secure continuation for resumable workflows
type WizardContinuation = {
  step: number;
  data: Record<string, unknown>; // Accumulated data
  remaining: Array<number>; // Steps left
  rollback: string; // Previous continuation
  expires: number; // Time-bound
  nonce: string; // Prevent replay
  signature: string; // Tamper-proof
};
```

Users can bookmark a form halfway through and resume weeks later. The continuation is the computation frozen in time.

### State Machines

All state transitions follow pure, declarative state machines:

```typescript
//++ State machine definition
type StateMachine<S, E> = {
  id: string;
  initial: S;
  states: {
    [K in S]: {
      on: {
        [Event in E]?: {
          target: S;
          guard?: string;
          actions?: Array<string>;
        };
      };
    };
  };
};
```

State machines work identically server-side (from form submissions) or client-side (from intercepted events).

## Progressive Enhancement Architecture

### Layer 0: Pure HTML (No JavaScript)

```html
<!-- State in URL -->
<a href="/app?tab=profile">Profile</a>

<!-- State via forms -->
<form method="POST" action="/api/items">
  <input type="hidden" name="_method" value="PUT" />
  <input type="hidden" name="_uuid" value="550e8400-e29b-41d4-a716" />
  <input name="title" required />
  <button>Save</button>
</form>
```

### Layer 1: Enhanced with JavaScript

```typescript
//++ Intercepts forms for local state management
export function enhanceForm(form: HTMLFormElement): void {
  const operation = deriveOperation(form);

  if (isLeft(operation)) {
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Apply optimistically
    applyOperationLocally(operation.value);

    // Queue for sync (works offline)
    queueOperation(operation.value);

    // Update URL for shareability
    updateURL(operation.value);
  });
}
```

## Security & Privacy

### Signed Continuations

All continuations are cryptographically signed and time-bound:

```typescript
//++ Creates tamper-proof continuation
export function signContinuation(
  data: WizardContinuation,
  secret: string,
): string {
  const payload = toJson(0)(data);
  const signature = hashHex(concat(payload)(secret));

  return concat(base64Encode(payload))(".")(base64Encode(signature));
}
```

### Privacy-Aware State

```typescript
//++ State classification for privacy
type PrivacyAwareState = {
  public: Record<string, unknown>; // Can go in URL
  private: Record<string, unknown>; // Server-side only
  ephemeral: Record<string, unknown>; // Never persisted
};
```

### Zero-Knowledge Proofs

Sensitive data stays server-side with only proof of validity exposed:

```typescript
//++ Zero-knowledge resumption token
export function createResumptionToken(state: PrivacyAwareState): string {
  const proof = hashPrivateData(state.private);

  return signToken({
    public: state.public,
    proof, // Verify without exposing
    expires: add(Date.now())(86400000),
  });
}
```

## Integration

### With Architect

Custodian triggers Architect's reactive behaviors via DOM events:

```typescript
//++ Triggers Architect calculations after state change
function notifyArchitect(element: HTMLElement): void {
  const event = new InputEvent("input", {
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
}
```

### With Agent

State operations become distributed CRDT operations:

```typescript
//++ Converts operations to CRDT format
export function toCRDTOperation(op: Operation): CRDTOperation {
  return {
    id: op.id,
    type: op.method,
    timestamp: now(),
    payload: objectFromFormData(op.data),
    vector: getCurrentVectorClock(),
  };
}
```

### With Triple Store

Forms generate SPARQL updates:

```typescript
//++ Generates SPARQL from form submission
export function toSparqlUpdate(operation: Operation): string {
  const uuid = operation.id;
  const triples = formDataToTriples(operation.data);

  return buildSparqlInsert(uuid)(triples);
}
```

## API

### Core Functions

```typescript
//++ Creates a Custodian instance
export function createCustodian(config: CustodianConfig): Custodian;

//++ Derives operation from HTML form
export function deriveOperation(
  form: HTMLFormElement,
): Either<Error, Operation>;

//++ Signs continuation for secure resumption
export function signContinuation(
  data: WizardContinuation,
  secret: string,
): string;

//++ Verifies and deserializes continuation
export function verifyContinuation(
  token: string,
  secret: string,
): Either<SecurityError, WizardContinuation>;

//++ Updates URL with new UI state
export function updateUIState(
  current: URL,
  updates: Record<string, string | null>,
): URL;

//++ Applies state machine transition
export function transition<S, E>(
  machine: StateMachine<S, E>,
  current: SecureState<S>,
  event: E,
): Either<SecurityError, SecureState<S>>;
```

### Configuration

```typescript
type CustodianConfig = {
  encryption: boolean; // Enable encryption
  signing: boolean; // Sign all operations
  sessionBinding: boolean; // Bind to session
  expirationMinutes: number; // Token expiration
  maxContinuationSize: number; // Prevent DoS
  allowedOrigins: Array<string>; // CORS protection
  sameSite: "strict" | "lax"; // Cookie policy
  secure: boolean; // HTTPS only
  httpOnly: boolean; // Cookie access
};
```

## Examples

### Multi-Step Form Wizard

```typescript
//++ Wizard with continuations
const wizardMachine: StateMachine<WizardState, WizardEvent> = {
  id: "onboarding",
  initial: "name",
  states: {
    name: {
      on: {
        NEXT: { target: "address", guard: "hasValidName" },
        SAVE: { target: "suspended", actions: ["saveContinuation"] },
      },
    },
    address: {
      on: {
        NEXT: { target: "payment" },
        BACK: { target: "name" },
      },
    },
    suspended: {
      on: {
        RESUME: { target: "name", actions: ["restoreContinuation"] },
      },
    },
  },
};
```

### UI State Management

```typescript
//++ Accordion state in URL
export function toggleAccordion(current: URL, accordionId: string): URL {
  const isOpen = equals(current.searchParams.get("accordion"))(accordionId);

  return updateUIState(current, {
    accordion: isOpen ? null : accordionId,
  });
}
```

### Offline-First Operations

```typescript
//++ Queue operations for eventual consistency
export function queueOperation(operation: Operation): Promise<void> {
  const queue = getOperationQueue();
  const enriched = {
    ...operation,
    timestamp: now(),
    retryCount: 0,
  };

  return queue.add(enriched);
}
```

## Benefits

- **Universal**: Works in Lynx, Mosaic, or modern browsers
- **Resumable**: Bookmark and resume complex workflows
- **Shareable**: URL contains complete UI state
- **Offline-capable**: Queue operations, sync when connected
- **Secure**: Signed, encrypted, time-bound tokens
- **Idempotent**: UUID-based operations prevent duplicates
- **Progressive**: Same model with or without JavaScript
- **Type-safe**: Full TypeScript with functional patterns

## Philosophy Redux

Custodian isn't trying to be clever. It's returning to the web's roots: stateless HTTP, semantic HTML, progressive enhancement. The radical idea is that we never needed to abandon these principles. We just needed to implement them correctly.

State isn't something to be "managed" - it's something to be transformed through pure functions, encoded in URLs, and synchronized via idempotent operations. The browser already has a state machine (the history API), a persistence layer (URLs), and a synchronization protocol (HTTP). Custodian simply orchestrates these existing pieces into a coherent whole.

The future of web development isn't more complexity - it's rediscovering the elegant simplicity that was there all along.
