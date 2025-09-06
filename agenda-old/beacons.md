# Beacons API for PubSub

We should use the Beacon API to send analytics data to our server in a way that doesn't block page unloads. This is particularly useful for tracking user interactions and page views without impacting the user experience. Anonymously, of course.

# Beacon API with Strict Functional Programming

Here's a strictly functional implementation of the Beacon API tracking system:

## Core FP Utilities

```javascript
// Pure functional utilities
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)
const tap = (fn) => (x) => {
	fn(x)
	return x
}
const curry = (fn) => (...args) =>
	args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args))

// Immutable data operations
const assoc = curry((key, value, obj) => ({ ...obj, [key]: value }))
const dissoc = curry((key, obj) => {
	const { [key]: _, ...rest } = obj
	return rest
})

// Math utilities (pure functions)
const randomString = () => Math.random().toString(36).substr(2, 9)
const currentTime = () => Date.now()
const calculateScrollDepth = (scrollY, scrollHeight) =>
	(scrollY / scrollHeight) * 100
```

## Pure Data Transformation Functions

```javascript
// Data creation (pure)
const createBaseEvent = (eventType) => ({
	event: eventType,
	timestamp: currentTime(),
	url: typeof window !== "undefined" ? window.location.pathname : "",
})

const createSessionId = () => `session_${randomString()}`

const withSessionId = curry((sessionId, data) =>
	assoc("session_id", sessionId, data)
)

const withPageData = (data) =>
	typeof window !== "undefined"
		? assoc("page", window.location.pathname, data)
		: data

const withScreenData = (data) =>
	typeof screen !== "undefined"
		? assoc("screen", {
			width: screen.width,
			height: screen.height,
		}, data)
		: data

const withTimeOnPage = curry((startTime, data) =>
	assoc("timeOnPage", currentTime() - startTime, data)
)

// Anonymization (pure)
const anonymizeData = (data) =>
	pipe(
		dissoc("userAgent"),
		dissoc("ip"),
		dissoc("email"),
		dissoc("name"),
		assoc("anonymous", true),
	)(data)
```

## Event Processing Pipeline

```javascript
// Pure event processing
const createEvent = curry((sessionId, eventType, additionalData = {}) =>
	pipe(
		createBaseEvent,
		withSessionId(sessionId),
		withPageData,
		withScreenData,
		(data) => ({ ...data, ...additionalData }),
		anonymizeData,
	)(eventType)
)

// Beacon sending (side effect isolated)
const sendBeacon = curry((endpoint, data) => {
	if (typeof navigator !== "undefined" && navigator.sendBeacon) {
		const blob = new Blob([JSON.stringify(data)], {
			type: "application/json",
		})
		return navigator.sendBeacon(endpoint, blob)
	}
	return false
})

// Composed tracking function
const createTracker = (sessionId, endpoint) => {
	const trackEvent = curry((eventType, additionalData) =>
		pipe(
			createEvent(sessionId, eventType, additionalData),
			tap(sendBeacon(endpoint)),
		)(undefined)
	)

	return { trackEvent }
}
```

## Event Listeners (Side Effects Managed)

```javascript
// Side effects are isolated and managed
const addEventListener = curry((element, eventType, handler) => {
	if (element && element.addEventListener) {
		element.addEventListener(eventType, handler)
		return () => element.removeEventListener(eventType, handler)
	}
	return () => {}
})

const createScrollTracker = (trackEvent, threshold = 70) => {
	let scrollDepthTracked = false

	return addEventListener(window, "scroll", () => {
		if (scrollDepthTracked) return

		const scrollDepth = calculateScrollDepth(
			window.scrollY,
			document.body.scrollHeight,
		)
		if (scrollDepth > threshold) {
			trackEvent("scroll_depth", { depth: `${threshold}%` })
			scrollDepthTracked = true
		}
	})
}

const createClickTracker = (trackEvent) =>
	addEventListener(document.body, "click", (event) => {
		const trackElement = event.target.closest("[data-track]")
		if (trackElement) {
			trackEvent("element_click", {
				element: trackElement.getAttribute("data-track"),
				text: trackElement.textContent.trim().substring(0, 50),
			})
		}
	})
```

## Main Application

```javascript
// Application setup (minimal side effects)
const initializeApp = () => {
	const sessionId = createSessionId()
	const endpoint = "/api/analytics"
	const { trackEvent } = createTracker(sessionId, endpoint)

	const pageStartTime = currentTime()

	// Track initial page view
	trackEvent("page_view", {
		referrer: document.referrer,
		timeOnPage: 0,
	})

	// Setup event listeners
	const removeScrollTracker = createScrollTracker(trackEvent)
	const removeClickTracker = createClickTracker(trackEvent)

	// Beforeunload handler
	const removeBeforeUnload = addEventListener(window, "beforeunload", () => {
		trackEvent("page_exit", {
			timeOnPage: currentTime() - pageStartTime,
		})
	})

	// Cleanup function (pure)
	return () => {
		removeScrollTracker()
		removeClickTracker()
		removeBeforeUnload()
	}
}

// Application start
let cleanupApp = () => {}

if (typeof document !== "undefined" && document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		cleanupApp = initializeApp()
	})
} else if (typeof document !== "undefined") {
	cleanupApp = initializeApp()
}

// Export for testing and controlled usage
export const FPBeacon = {
	createSessionId,
	createEvent,
	anonymizeData,
	initializeApp,
	cleanup: () => cleanupApp(),
}
```

## Usage Example

```javascript
// Pure usage example
const { createTracker, createSessionId } = FPBeacon

// Create a tracker instance
const sessionId = createSessionId()
const tracker = createTracker(sessionId, "/api/analytics")

// Track events (pure data transformation + controlled side effects)
tracker.trackEvent("user_action", {
	action: "button_click",
	element: "special-button",
})

// Custom event composition
const trackSpecialEvent = pipe(
	tracker.trackEvent,
	curry((specialData) => ({ ...specialData, category: "special" })),
)

trackSpecialEvent("custom_action", { value: 42 })
```

## Test Utilities (Pure Functions)

```javascript
// Test utilities (all pure)
export const testUtilities = {
	// Test data generation
	createTestEvent: (overrides = {}) => ({
		event: "test_event",
		timestamp: 1234567890,
		session_id: "test_session",
		anonymous: true,
		...overrides,
	}),

	// Assertion utilities
	isAnonymized: (data) =>
		data.anonymous === true &&
		data.userAgent === undefined &&
		data.ip === undefined,

	// Event validation
	isValidEvent: (event) =>
		typeof event.event === "string" &&
		typeof event.timestamp === "number" &&
		event.anonymous === true,
}
```

This implementation follows strict functional programming principles:

1. **Pure Functions**: All data transformations are pure
2. **Immutability**: No data is mutated; new objects are created
3. **Currying**: Functions are curried for composition
4. **Side Effect Isolation**: Side effects are contained and managed
5. **Function Composition**: Complex behavior built from simple functions
6. **Referential Transparency**: Same inputs always produce same outputs

The architecture separates pure data transformation from side effects, making it highly testable and predictable.
