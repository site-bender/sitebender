# Analytics Strategy for Navigation Components

## Overview

Analytics tracking for navigation is essential for understanding user behavior, but must be implemented in a privacy-conscious, performant way that maintains progressive enhancement. This document outlines various analytics strategies for Link components.

## Core Principles

1. **Privacy First**: Respect user privacy preferences (DNT, GPC)
2. **Performance**: Minimal impact on page performance
3. **Flexibility**: Support multiple analytics providers
4. **Progressive Enhancement**: Links work without analytics
5. **GDPR Compliance**: Consent-aware implementation

## Analytics Event Types

### 1. Click Tracking

Basic click event tracking with contextual data:

```typescript
type ClickEvent = {
	type: "click"
	href: string
	text: string
	category?: string
	action?: string
	label?: string
	value?: number
	timestamp: number
	context: {
		referrer: string
		pathname: string
		viewport: { width: number; height: number }
		position?: { x: number; y: number }
	}
}

function trackClick(element: HTMLAnchorElement): ClickEvent {
	const rect = element.getBoundingClientRect()

	return {
		type: "click",
		href: element.href,
		text: element.textContent || "",
		category: element.dataset.trackCategory,
		action: element.dataset.trackAction || "click",
		label: element.dataset.trackLabel || element.textContent,
		value: parseInt(element.dataset.trackValue || "0"),
		timestamp: Date.now(),
		context: {
			referrer: document.referrer,
			pathname: window.location.pathname,
			viewport: {
				width: window.innerWidth,
				height: window.innerHeight,
			},
			position: {
				x: rect.left,
				y: rect.top,
			},
		},
	}
}
```

### 2. Visibility Tracking

Track when links become visible (impressions):

```typescript
type VisibilityEvent = {
	type: "impression"
	href: string
	duration: number
	percentage: number // How much of the element was visible
	timestamp: number
}

function createVisibilityTracker(
	element: HTMLAnchorElement,
	onVisibilityEvent: (event: VisibilityEvent) => void,
): () => void {
	let startTime: number | null = null

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				startTime = Date.now()
			} else if (startTime) {
				const event: VisibilityEvent = {
					type: "impression",
					href: element.href,
					duration: Date.now() - startTime,
					percentage: entry.intersectionRatio,
					timestamp: startTime,
				}

				// Only track if visible for minimum duration
				if (event.duration > 1000) {
					onVisibilityEvent(event)
				}

				startTime = null
			}
		})
	}, {
		threshold: [0, 0.25, 0.5, 0.75, 1.0],
	})

	observer.observe(element)

	// Return cleanup function
	return () => observer.disconnect()
}
```

### 3. Engagement Tracking

Track user engagement patterns:

```typescript
type EngagementEvent = {
	type: "engagement"
	href: string
	action: "hover" | "focus" | "longPress" | "rightClick"
	duration?: number
	timestamp: number
}

function createEngagementTracker(
	element: HTMLAnchorElement,
	onEngagementEvent: (event: EngagementEvent) => void,
): () => void {
	let hoverStart: number | null = null

	const handleMouseEnter = () => {
		hoverStart = Date.now()
	}

	const handleMouseLeave = () => {
		if (hoverStart) {
			const duration = Date.now() - hoverStart
			if (duration > 500) { // Only track meaningful hovers
				onEngagementEvent({
					type: "engagement",
					href: element.href,
					action: "hover",
					duration,
					timestamp: hoverStart,
				})
			}
			hoverStart = null
		}
	}

	const handleFocus = () => {
		onEngagementEvent({
			type: "engagement",
			href: element.href,
			action: "focus",
			timestamp: Date.now(),
		})
	}

	const handleContextMenu = () => {
		onEngagementEvent({
			type: "engagement",
			href: element.href,
			action: "rightClick",
			timestamp: Date.now(),
		})
	}

	element.addEventListener("mouseenter", handleMouseEnter)
	element.addEventListener("mouseleave", handleMouseLeave)
	element.addEventListener("focus", handleFocus)
	element.addEventListener("contextmenu", handleContextMenu)

	// Return cleanup function
	return () => {
		element.removeEventListener("mouseenter", handleMouseEnter)
		element.removeEventListener("mouseleave", handleMouseLeave)
		element.removeEventListener("focus", handleFocus)
		element.removeEventListener("contextmenu", handleContextMenu)
	}
}
```

## Analytics Providers Integration

### Generic Analytics Provider Type

```typescript
type AnalyticsEvent = ClickEvent | VisibilityEvent | EngagementEvent

type AnalyticsProvider = {
	name: string
	initialize: (config: Record<string, unknown>) => Promise<void>
	track: (event: AnalyticsEvent) => void
	identify: (userId: string, traits?: Record<string, unknown>) => void
	page: (name?: string, properties?: Record<string, unknown>) => void
	shutdown: () => void
}
```

### Google Analytics 4 Implementation

```typescript
type GA4Config = {
	measurementId: string
}

type GA4State = {
	initialized: boolean
}

function createGA4Provider(): AnalyticsProvider {
	let state: GA4State = { initialized: false }

	const initialize = async (config: Record<string, unknown>): Promise<void> => {
		if (state.initialized) return

		const ga4Config = config as GA4Config

		// Load GA4 script
		const script = document.createElement("script")
		script.async = true
		script.src =
			`https://www.googletagmanager.com/gtag/js?id=${ga4Config.measurementId}`
		document.head.appendChild(script)

		// Initialize dataLayer
		window.dataLayer = window.dataLayer || []
		window.gtag = function () {
			window.dataLayer.push(arguments)
		}
		window.gtag("js", new Date())
		window.gtag("config", ga4Config.measurementId)

		state = { ...state, initialized: true }
	}

	const track = (event: AnalyticsEvent): void => {
		if (!state.initialized) return

		if (event.type === "click") {
			window.gtag("event", "click", {
				event_category: event.category || "navigation",
				event_label: event.label,
				value: event.value,
				link_url: event.href,
				link_text: event.text,
				link_position: event.context?.position,
			})
		}
	}

	const identify = (userId: string, traits?: Record<string, unknown>): void => {
		if (!state.initialized) return
		window.gtag("set", { user_id: userId, ...traits })
	}

	const page = (name?: string, properties?: Record<string, unknown>): void => {
		if (!state.initialized) return
		window.gtag("event", "page_view", {
			page_title: name,
			...properties,
		})
	}

	const shutdown = (): void => {
		// Clean up if needed
	}

	return {
		name: "ga4",
		initialize,
		track,
		identify,
		page,
		shutdown,
	}
}
```

### Privacy-Focused Analytics (Plausible/Fathom)

```typescript
type PlausibleConfig = {
	domain: string
	apiHost?: string
}

type PlausibleState = {
	initialized: boolean
}

function createPlausibleProvider(): AnalyticsProvider {
	let state: PlausibleState = { initialized: false }

	const initialize = async (config: Record<string, unknown>): Promise<void> => {
		if (state.initialized) return

		const plausibleConfig = config as PlausibleConfig
		const script = document.createElement("script")
		script.defer = true
		script.dataset.domain = plausibleConfig.domain
		script.src = plausibleConfig.apiHost || "https://plausible.io/js/script.js"
		document.head.appendChild(script)

		state = { ...state, initialized: true }
	}

	const track = (event: AnalyticsEvent): void => {
		if (!state.initialized || !window.plausible) return

		// Plausible uses a simpler event model
		window.plausible("Link", {
			props: {
				url: event.href,
				text: "text" in event ? event.text?.substring(0, 100) : undefined,
				category: "category" in event ? event.category : undefined,
			},
		})
	}

	const identify = (): void => {
		// Plausible doesn't track users
	}

	const page = (name?: string): void => {
		if (!state.initialized || !window.plausible) return
		window.plausible("pageview")
	}

	const shutdown = (): void => {
		// Clean up if needed
	}

	return {
		name: "plausible",
		initialize,
		track,
		identify,
		page,
		shutdown,
	}
}
```

## Privacy & Consent Management

### Consent-Aware Tracking

```typescript
type ConsentState = {
	analytics: boolean
	marketing: boolean
	preferences: boolean
	necessary: boolean
}

const defaultConsent: ConsentState = {
	analytics: false,
	marketing: false,
	preferences: false,
	necessary: true,
}

function loadConsent(): ConsentState {
	const stored = localStorage.getItem("consent")
	const base = stored ? JSON.parse(stored) : defaultConsent

	// Check for consent management platforms
	if (window.__tcfapi) {
		// TCF v2 (EU) - handled asynchronously
		return base // Would need callback pattern for async
	}

	return base
}

function respectGlobalPrivacy(consent: ConsentState): ConsentState {
	// Do Not Track
	if (navigator.doNotTrack === "1") {
		return {
			...consent,
			analytics: false,
			marketing: false,
		}
	}

	// Global Privacy Control
	if ((navigator as any).globalPrivacyControl) {
		return {
			...consent,
			analytics: false,
			marketing: false,
		}
	}

	return consent
}

function hasConsent(
	state: ConsentState,
	category: keyof ConsentState,
): boolean {
	return state[category] || false
}

function updateConsent(
	state: ConsentState,
	category: keyof ConsentState,
	value: boolean,
): ConsentState {
	const newState = { ...state, [category]: value }
	localStorage.setItem("consent", JSON.stringify(newState))

	// Trigger consent change event
	window.dispatchEvent(
		new CustomEvent("consentchange", {
			detail: { category, value },
		}),
	)

	return newState
}
```

## Implementation Pattern

### Component Integration

```tsx
// Link component with analytics
<Link 
  to="/products" 
  track="ecommerce:view:products"
  trackValue={99}
>
  View Products
</Link>

// Compiles to:
<a 
  href="/products" 
  data-track="ecommerce:view:products"
  data-track-value="99"
>
  View Products
</a>
```

### Client-Side Enhancement

```typescript
type AnalyticsConfig = {
	providers: Array<{
		name: string
		enabled: boolean
		config: Record<string, unknown>
	}>
	sampling?: {
		enabled: boolean
		rate: number
	}
	batching?: {
		enabled: boolean
		maxBatchSize: number
		maxWaitTime: number
	}
	privacy: {
		respectDNT: boolean
		respectGPC: boolean
		requireConsent: boolean
	}
}

type AnalyticsState = {
	providers: AnalyticsProvider[]
	consent: ConsentState
	queue: AnalyticsEvent[]
}

function createAnalyticsEnhancer(config: AnalyticsConfig) {
	let state: AnalyticsState = {
		providers: [],
		consent: respectGlobalPrivacy(loadConsent()),
		queue: [],
	}

	const initializeProviders = async () => {
		const newProviders: AnalyticsProvider[] = []

		for (const providerConfig of config.providers) {
			if (!hasConsent(state.consent, "analytics")) continue

			const provider = createProvider(providerConfig.name)
			if (provider) {
				await provider.initialize(providerConfig.config)
				newProviders.push(provider)
			}
		}

		state = { ...state, providers: newProviders }

		// Process queued events
		processQueue()
	}

	const createProvider = (name: string): AnalyticsProvider | null => {
		switch (name) {
			case "ga4":
				return createGA4Provider()
			case "plausible":
				return createPlausibleProvider()
			default:
				return null
		}
	}

	const send = (event: AnalyticsEvent): void => {
		if (!hasConsent(state.consent, "analytics")) {
			return
		}

		if (state.providers.length === 0) {
			state = { ...state, queue: [...state.queue, event] }
			return
		}

		state.providers.forEach((provider) => {
			try {
				provider.track(event)
			} catch (error) {
				console.warn(`Analytics provider ${provider.name} failed:`, error)
			}
		})
	}

	const sendBeacon = (event: AnalyticsEvent): void => {
		// Use Beacon API for reliability
		if (navigator.sendBeacon) {
			const data = JSON.stringify(event)
			navigator.sendBeacon("/analytics/track", data)
		} else {
			// Fallback to sync XHR (not recommended but ensures delivery)
			const xhr = new XMLHttpRequest()
			xhr.open("POST", "/analytics/track", false) // Synchronous
			xhr.setRequestHeader("Content-Type", "application/json")
			xhr.send(JSON.stringify(event))
		}
	}

	const processQueue = (): void => {
		const events = [...state.queue]
		state = { ...state, queue: [] }
		events.forEach(send)
	}

	const enhanceLink = (element: HTMLAnchorElement): () => void => {
		// Parse tracking configuration
		const [category, action, label] = (element.dataset.track || "").split(":")
		const value = parseInt(element.dataset.trackValue || "0")

		const handleClick = (e: MouseEvent) => {
			const event = trackClick(element)
			const enhancedEvent = {
				...event,
				category,
				action,
				label,
				value,
			}

			send(enhancedEvent)

			// Handle external links that might leave before tracking completes
			if (isUrlExternal(element.href)) {
				e.preventDefault()
				sendBeacon(enhancedEvent)
				setTimeout(() => {
					window.location.href = element.href
				}, 100)
			}
		}

		element.addEventListener("click", handleClick)

		const cleanupFunctions: Array<() => void> = [
			() => element.removeEventListener("click", handleClick),
		]

		// Optional: visibility tracking
		if (element.dataset.trackVisibility) {
			cleanupFunctions.push(
				createVisibilityTracker(element, send),
			)
		}

		// Optional: engagement tracking
		if (element.dataset.trackEngagement) {
			cleanupFunctions.push(
				createEngagementTracker(element, send),
			)
		}

		// Return combined cleanup function
		return () => cleanupFunctions.forEach((fn) => fn())
	}

	const enhanceAllLinks = (): () => void => {
		const cleanupFunctions: Array<() => void> = []

		document.querySelectorAll("a[data-track]").forEach((link) => {
			const cleanup = enhanceLink(link as HTMLAnchorElement)
			cleanupFunctions.push(cleanup)
		})

		return () => cleanupFunctions.forEach((fn) => fn())
	}

	// Initialize
	initializeProviders()
	const cleanup = enhanceAllLinks()

	return {
		send,
		cleanup,
		updateConsent: (category: keyof ConsentState, value: boolean) => {
			state = {
				...state,
				consent: updateConsent(state.consent, category, value),
			}
		},
	}
}
```

## Server-Side Fallback

For critical analytics without JavaScript:

```html
<!-- No-JS tracking pixel -->
<noscript>
	<img
		src="/analytics/track?event=pageview&page=/products"
		width="1"
		height="1"
		alt=""
	/>
</noscript>

<!-- Server-side redirect tracking -->
<a href="/track/redirect?to=/external&event=outbound">External Link</a>
```

## Performance Optimization

### Batching Events

```typescript
type BatchState = {
	batch: AnalyticsEvent[]
	timer: number | null
}

type BatchConfig = {
	maxBatchSize: number
	maxWaitTime: number
}

function createEventBatcher(
	config: BatchConfig,
	onFlush: (events: AnalyticsEvent[]) => void,
) {
	let state: BatchState = {
		batch: [],
		timer: null,
	}

	const flush = (): void => {
		if (state.batch.length === 0) return

		// Send batch
		onFlush(state.batch)

		// Clear batch and timer
		if (state.timer) {
			clearTimeout(state.timer)
		}

		state = {
			batch: [],
			timer: null,
		}
	}

	const add = (event: AnalyticsEvent): void => {
		state = {
			...state,
			batch: [...state.batch, event],
		}

		if (state.batch.length >= config.maxBatchSize) {
			flush()
		} else if (!state.timer) {
			state = {
				...state,
				timer: setTimeout(flush, config.maxWaitTime),
			}
		}
	}

	return { add, flush }
}

// Usage
const batcher = createEventBatcher(
	{ maxBatchSize: 10, maxWaitTime: 5000 },
	(events) => {
		fetch("/analytics/batch", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(events),
			keepalive: true,
		})
	},
)
```

### Sampling

For high-traffic sites:

```typescript
type SamplingConfig = {
	rate: number
}

function createSamplingStrategy(initialRate: number = 1.0) {
	const sampleRate = Math.max(0, Math.min(1, initialRate))

	const shouldTrack = (): boolean => {
		return Math.random() < sampleRate
	}

	const adjustSampleRate = (traffic: number): number => {
		// Dynamically adjust based on traffic
		if (traffic > 10000) {
			return 0.1 // 10% sampling for high traffic
		} else if (traffic > 1000) {
			return 0.5 // 50% sampling for medium traffic
		} else {
			return 1.0 // 100% for low traffic
		}
	}

	return { shouldTrack, adjustSampleRate }
}
```

## Configuration Example

```typescript
const analyticsConfig: AnalyticsConfig = {
	providers: [
		{
			name: "ga4",
			enabled: true,
			config: {
				measurementId: "G-XXXXXXXXXX",
			},
		},
		{
			name: "plausible",
			enabled: true,
			config: {
				domain: "example.com",
			},
		},
	],
	sampling: {
		enabled: true,
		rate: 1.0,
	},
	batching: {
		enabled: true,
		maxBatchSize: 10,
		maxWaitTime: 5000,
	},
	privacy: {
		respectDNT: true,
		respectGPC: true,
		requireConsent: true,
	},
}
```

## Best Practices

1. **Consent First**: Always check for user consent before tracking
2. **Privacy by Design**: Minimize data collection to what's necessary
3. **Performance Impact**: Use batching and sampling for high-traffic sites
4. **Error Handling**: Gracefully handle analytics failures without affecting UX
5. **Data Quality**: Validate and sanitize data before sending
6. **Documentation**: Clearly document what data is collected and why
7. **Testing**: Test analytics implementation across browsers and devices
8. **Immutability**: Keep all state immutable, return new objects/arrays
9. **Pure Functions**: Analytics functions should not have side effects
10. **Cleanup**: Always return cleanup functions for event listeners
