# Operator

Pure functional pub/sub system for event-driven architectures. Enables reactive communication between components without tight coupling or shared mutable state.

## Philosophy

Operator provides publish-subscribe messaging as pure functions that return immutable event streams. Unlike traditional pub/sub systems that rely on callbacks and mutable registries, Operator treats subscriptions as data and events as values flowing through composed functions.

## Core Concepts

### Events as Immutable Values

Events are plain data objects with no behavior:

```typescript
//++ Event is just data, not an object with methods
export type Event<T = unknown> = {
  readonly topic: string;
  readonly payload: T;
  readonly timestamp: number;
  readonly id: string;
  readonly metadata?: Record<string, unknown>;
};
```

### Subscriptions as Data

Subscriptions are declarative specifications, not imperative registrations:

```typescript
//++ Subscription is configuration, not registration
export type Subscription<T = unknown> = {
  readonly topic: string | RegExp;
  readonly filter?: (event: Event<T>) => boolean;
  readonly transform?: (event: Event<T>) => Event;
  readonly debounce?: number;
  readonly throttle?: number;
};
```

### Pure Functional Operations

All operations return new values without side effects:

```typescript
//++ Creates new bus, doesn't mutate global state
export function createBus<T>(): Bus<T> {
  return {
    events: [],
    subscriptions: new Map(),
    history: [],
  };
}

//++ Returns new bus with event added
export function publish<T>(bus: Bus<T>): (event: Event<T>) => Bus<T> {
  return (event) => ({
    ...bus,
    events: [...bus.events, event],
    history: [...bus.history, event].slice(-1000), // Keep last 1000
  });
}
```

### Composable Transformations

Event streams compose like any other functional pipeline:

```typescript
//++ Compose multiple transformations
export function pipe<T>(...transforms: Array<(e: Event<T>) => Event<T>>) {
  return (event: Event<T>) =>
    transforms.reduce((e, transform) => transform(e), event);
}

//++ Filter events functionally
export function filter<T>(predicate: (e: Event<T>) => boolean) {
  return (events: Array<Event<T>>) => events.filter(predicate);
}
```

## Usage Patterns

### Basic Pub/Sub

```typescript
import { createBus, publish, subscribe, deliver } from "@sitebender/operator";

// Create immutable bus
const bus = createBus<string>();

// Add subscription (returns new bus)
const bus2 = subscribe(bus)({
  topic: "user.*",
  filter: (e) => e.payload.length > 0,
});

// Publish event (returns new bus)
const bus3 = publish(bus2)({
  topic: "user.login",
  payload: "alice@example.com",
  timestamp: Date.now(),
  id: crypto.randomUUID(),
});

// Deliver events to subscribers (pure function)
const delivered = deliver(bus3);
```

### Declarative JSX Components

```tsx
import {
  EventBus,
  Publisher,
  Subscriber,
} from "@sitebender/operator/components";

<EventBus id="app-events">
  <Publisher topic="form.submit" trigger="#submit-button" event="click" />

  <Subscriber topic="form.*" target="#status" transform={formatStatus} />

  <Subscriber topic="error.*" target="#error-log" throttle={1000} />
</EventBus>;
```

### Time-Travel Debugging

Since all state changes are immutable:

```typescript
//++ Replay events from history
export function replay(bus: Bus): (from: number, to: number) => Array<Event> {
  return (from, to) =>
    bus.history.filter((e) => e.timestamp >= from && e.timestamp <= to);
}

//++ Rewind to previous state
export function rewind(bus: Bus): (steps: number) => Bus {
  return (steps) => ({
    ...bus,
    events: bus.history.slice(0, -steps),
  });
}
```

## Integration with Studio

### With Architect

Operator events trigger reactive computations:

```tsx
<Calculate
  operation="Add"
  operands={["#quantity", "#price"]}
  target="#total"
  publish="calculation.complete"
/>
```

### With Agent

Distributed event synchronization:

```tsx
<EventSync
  local="app-events"
  remote="wss://events.example.com"
  topics={["user.*", "system.*"]}
/>
```

### With Custodian

State changes as events:

```tsx
<StatePublisher store="app-state" topic="state.changed" diff={true} />
```

## Declarative Testing

Test event flows as data:

```tsx
<TestScenario name="Login flow">
  <PublishEvent topic="user.login" payload={{ email: "test@example.com" }} />
  <ExpectEvent topic="auth.success" within={1000} />
  <ExpectEvent topic="navigation.dashboard" within={2000} />
</TestScenario>
```
