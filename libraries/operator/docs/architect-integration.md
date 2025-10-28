# Operator-Artificer Integration

## Overview

Operator integrates seamlessly with Artificer's reactive pipeline, enabling event-driven DOM updates without VDOM overhead. Events flow through the same functional composition pipeline that powers calculations, formatting, and validation.

## Event-Driven DOM Updates

### DOM Element Event Binding

When Artificer renders Operator components, it attaches event handlers as properties on DOM elements:

```typescript
//++ Attach event publisher to DOM element
// File: src/integration/artificer/attachPublisher/index.ts
export default function attachPublisher(
  element: HTMLElement
) (
  config: PublisherConfig
): HTMLElement {
  // Add to Artificer's property registry
  element.__sbPublish = async (event: Event) => {
    const triple = {
      subject: resolveSubject(config.subject, element),
      predicate: config.predicate,
      object: resolveObject(config.object, event),
      metadata: {
        timestamp: Temporal.Now.instant(),
        vectorClock: getCurrentVectorClock(),
        channel: config.channel
      }
    }

    // Dispatch through transport layer
    await dispatchEvent(triple)

    // Trigger Artificer's reactive pipeline
    element.dispatchEvent(
      new CustomEvent("sb:published", {
        detail: triple,
        bubbles: true
      })
    )
  }

  // Register with document-level tracking
  document.__sbPublishers ??= new Set()
  document.__sbPublishers.add(element.id)

  // Store config in dataset for hydration
  element.dataset.publisher = JSON.stringify(config)

  return element
}
```

### Subscriber Integration with Reactive Pipeline

Subscribers hook into Artificer's existing calculation pipeline:

```typescript
//++ Attach event subscriber to DOM element
// File: src/integration/artificer/attachSubscriber/index.ts
export default function attachSubscriber(
  element: HTMLElement
) (
  config: SubscriberConfig
): HTMLElement {
  // Compose with existing behaviors
  const existingCalculate = element.__sbCalculate
  const existingValidate = element.__sbValidate

  element.__sbSubscribe = async (triple: EventTriple) => {
    // Pattern matching
    if (!matchesPattern(config.pattern)(triple)) return

    // Apply filter if present
    if (config.filter) {
      const passed = await config.filter(triple)
      if (!passed) return
    }

    // Transform event to value
    const value = config.transform
      ? await config.transform(triple)
      : triple.object

    // Feed into Artificer's calculation pipeline
    if (existingCalculate) {
      const result = await existingCalculate(value)

      if (isRight(result)) {
        // Update element value/innerHTML
        if (isInputElement(element)) {
          element.value = String(result.value)
        } else {
          element.innerHTML = String(result.value)
        }

        // Trigger Artificer's update cascade
        element.dispatchEvent(
          new InputEvent("input", {
            data: String(result.value),
            bubbles: true
          })
        )
      }
    }

    // Run validation if present
    if (existingValidate) {
      await existingValidate(value)
    }

    // Apply effect
    if (config.effect) {
      await config.effect(triple, element)
    }
  }

  // Register subscription
  subscribeToPattern(config.pattern)(element.__sbSubscribe)

  // Track in document registry
  document.__sbSubscribers ??= new Map()
  const subscribers = document.__sbSubscribers.get(config.pattern) ?? new Set()
  subscribers.add(element.id)
  document.__sbSubscribers.set(config.pattern, subscribers)

  return element
}
```

## IR Compilation

Operator components compile to Artificer IR nodes:

### Publisher IR Node

```typescript
type PublisherIrNode = {
  tag: "Publisher"
  attributes: {
    subject: string | Expression
    predicate: string
    object?: string | Expression
    channel?: string
  }
  dataset: {
    publisher: string  // Serialized config
  }
  children: Array<IrNode>
  behaviors: {
    publish: EventHandlerConfig
  }
}

// Example IR JSON
{
  "tag": "Publisher",
  "attributes": {
    "subject": { "type": "reference", "path": "user.id" },
    "predicate": "clicked",
    "object": "save"
  },
  "dataset": {
    "publisher": "{\"channel\":\"ui-events\"}"
  },
  "children": [{
    "tag": "Button",
    "children": [{ "tag": "TextNode", "text": "Save" }]
  }],
  "behaviors": {
    "publish": {
      "event": "click",
      "transport": "local"
    }
  }
}
```

### Subscriber IR Node

```typescript
type SubscriberIrNode = {
	tag: "Subscribes"
	attributes: {
		to: string | Array<string>
		when?: FilterExpression
		then: EffectExpression
	}
	parent: string // ID of parent element
	behaviors: {
		subscribe: SubscriptionConfig
	}
}
```

## Reactive Composition

### Combining with Calculations

Events can trigger calculations that cascade through the DOM:

```tsx
<Data id="temperature">
	<Subscribes to="sensor:temp:*" />
	<Calculation
		operator="multiply"
		operands={[1.8, { ref: "value" }]}
		then="add"
		with={32}
	/>
	<Format as="temperature" unit="fahrenheit" />
</Data>
```

This compiles to composed behaviors:

```typescript
element.__sbSubscribe = compose(
	extractTemperature,
	element.__sbCalculate, // Celsius to Fahrenheit
	element.__sbFormat, // Format with unit
)
```

### Event-Driven Validation

Validation can be triggered by events:

```tsx
<Input type="email">
	<Subscribes to="user:email:changed" />
	<Validation comparator="matches" pattern="^[^@]+@[^@]+\.[^@]+$" />
</Input>
```

### Chained Event Effects

Events can cascade through multiple elements:

```tsx
<Form>
	<Input name="username">
		<Publishes event="change" as="form:field:changed" />
	</Input>

	<Button type="submit">
		<Subscribes to="form:field:*" />
		<Calculation operator="checkFormValidity" />
		<Effect apply={enableIfValid} />
	</Button>
</Form>
```

## Hydration Strategy

During SSR/hydration, Operator restores event bindings from data attributes:

```typescript
//++ Hydrate Operator behaviors from DOM
// File: src/integration/artificer/hydrateOperator/index.ts
export default function hydrateOperator(element: HTMLElement): void {
	// Restore publisher
	if (element.dataset.publisher) {
		const config = JSON.parse(element.dataset.publisher)
		attachPublisher(element)(config)

		// Re-bind DOM event listener
		const eventName = element.dataset.publishEvent ?? "click"
		element.addEventListener(eventName, element.__sbPublish)
	}

	// Restore subscriber
	if (element.dataset.subscriber) {
		const config = JSON.parse(element.dataset.subscriber)
		attachSubscriber(element)(config)

		// Re-subscribe to pattern
		subscribeToPattern(config.pattern)(element.__sbSubscribe)
	}

	// Restore channel context
	if (element.dataset.channel) {
		const channelConfig = JSON.parse(element.dataset.channel)
		initializeChannel(element)(channelConfig)
	}
}
```

## Document-Level Registries

Operator extends Artificer's document-level registries:

```typescript
type OperatorDocumentRegistries = {
	__sbPublishers: Set<string> // Element IDs that publish
	__sbSubscribers: Map<string, Set<string>> // Pattern -> Element IDs
	__sbChannels: Map<string, ChannelConfig> // Channel configurations
	__sbTransports: Map<string, Transport> // Active transports
	__sbEventLog: Array<EventTriple> // Event history for replay
}

// Extend Artificer's document type
// Note: In pure FP, we'd pass document as parameter, not mutate global
type OperatorDocument = Document & OperatorDocumentRegistries
```

## Performance Optimizations

### Event Batching

Batch multiple DOM updates from rapid events:

```typescript
//++ Batch DOM updates for performance
// File: src/integration/artificer/batchedSubscriber/index.ts
export default function batchedSubscriber(
  element: HTMLElement
) (
  config: SubscriberConfig
): void {
  const pending = new Set<EventTriple>()
  let scheduled = false

  element.__sbSubscribe = (triple: EventTriple) => {
    pending.add(triple)

    if (!scheduled) {
      scheduled = true
      requestAnimationFrame(() => {
        // Process all pending events in one frame
        const values = Array.from(pending).map(t => t.object)
        const aggregated = config.aggregate?.(values) ?? values

        // Single DOM update
        element.__sbCalculate?.(aggregated)

        pending.clear()
        scheduled = false
      })
    }
  }
}
```

### Selective Re-rendering

Only update DOM elements affected by events:

```typescript
//++ Selective DOM updates based on event patterns
// File: src/integration/artificer/selectiveUpdate/index.ts
export default function selectiveUpdate(pattern: string): Set<HTMLElement> {
	// Get only subscribers to this pattern
	const elementIds = document.__sbSubscribers.get(pattern) ?? new Set()

	return new Set(
		Array.from(elementIds)
			.map((id) => document.getElementById(id))
			.filter(Boolean) as Array<HTMLElement>,
	)
}
```

## Integration with Artificer Lifecycle

### Mount Phase

```typescript
//++ Called when Artificer mounts component
// File: src/integration/artificer/lifecycle/onMount/index.ts
export default function onMount(element: HTMLElement): void {
	// Initialize transport if needed
	initializeTransportForScope(element)

	// Start listening for events
	if (element.__sbSubscribe) {
		activateSubscription(element)
	}

	// Begin publishing if configured
	if (element.__sbPublish) {
		activatePublisher(element)
	}
}
```

### Unmount Phase

```typescript
//++ Called when Artificer unmounts component
// File: src/integration/artificer/lifecycle/onUnmount/index.ts
export default function onUnmount(element: HTMLElement): void {
	// Clean up subscriptions
	if (element.__sbSubscribe) {
		unsubscribeFromPattern(element)
		document.__sbSubscribers.forEach((subscribers) => {
			subscribers.delete(element.id)
		})
	}

	// Clean up publishers
	if (element.__sbPublish) {
		document.__sbPublishers?.delete(element.id)
	}

	// Clean up event listeners
	cleanupEventListeners(element)
}
```

## Testing Integration

Test event-driven behaviors using Artificer's test utilities:

```tsx
<TestHarness>
	<MockPublisher id="test-sensor">
		<EmitSequence
			events={[
				{ subject: "sensor", predicate: "reading", object: 25 },
				{ subject: "sensor", predicate: "reading", object: 30 },
			]}
		/>
	</MockPublisher>

	<Data id="display">
		<Subscribes to="sensor:reading" />
		<Calculation operator="multiply" operands={[1.8, { ref: "value" }]} />
	</Data>

	<AssertElement id="display">
		<HasValue equalTo="54" after="PT0.1S" />
	</AssertElement>
</TestHarness>
```

## Benefits of Integration

1. **No VDOM Overhead**: Direct DOM manipulation through element properties
2. **Unified Pipeline**: Events flow through same composition as calculations
3. **Progressive Enhancement**: Works with SSR, enhances with hydration
4. **Type Safety**: Full TypeScript types from TSX to runtime
5. **Testing**: Declarative test components for event scenarios
6. **Performance**: Batching, selective updates, and requestAnimationFrame
7. **Debugging**: All events logged and replayable through DevTools

This integration makes Operator events first-class citizens in Artificer's reactive architecture while maintaining pure functional principles and zero runtime dependencies.
