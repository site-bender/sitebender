# Prefetching Strategy for Navigation Components

## Overview

Prefetching is a progressive enhancement that improves perceived performance by loading resources before users need them. This document outlines various prefetching strategies that can be applied to Link components while maintaining the library's core principle: **everything must work without JavaScript**.

## Prefetching Strategies

### 1. Static/Build-Time Prefetching

For SSG (Static Site Generation), we can analyze the component tree at build time and inject prefetch hints:

```html
<!-- The Link component with prefetch prop -->
<link to="/about" prefetch>About</Link>

<!-- Compiles to HTML with prefetch hint -->
<a href="/about" data-enhance-prefetch="eager">About</a>
<link rel="prefetch" href="/about" as="document">
```

The build process would:

- Scan for Links with `prefetch` prop
- Generate `<link rel="prefetch">` tags in the document head
- Add data attributes for client-side enhancement

### 2. Hover-Based Prefetching

When users hover over a link, there's typically a 200-400ms delay before click. We can use this time:

```typescript
// Client-side enhancement
function createHoverPrefetchEnhancer(
	element: HTMLAnchorElement,
	cache: Set<string>,
): () => void {
	let prefetchTimeout: number | undefined

	const handleMouseEnter = () => {
		// Small delay to avoid prefetching during quick mouse movements
		prefetchTimeout = setTimeout(() => {
			if (!cache.has(element.href)) {
				const link = document.createElement("link")
				link.rel = "prefetch"
				link.href = element.href
				link.as = "document"
				document.head.appendChild(link)
				cache.add(element.href)
			}
		}, 100) // 100ms delay
	}

	const handleMouseLeave = () => {
		if (prefetchTimeout) {
			clearTimeout(prefetchTimeout)
			prefetchTimeout = undefined
		}
	}

	element.addEventListener("mouseenter", handleMouseEnter)
	element.addEventListener("mouseleave", handleMouseLeave)

	// Return cleanup function
	return () => {
		if (prefetchTimeout) clearTimeout(prefetchTimeout)
		element.removeEventListener("mouseenter", handleMouseEnter)
		element.removeEventListener("mouseleave", handleMouseLeave)
	}
}
```

### 3. Visibility-Based Prefetching (IntersectionObserver)

Prefetch links when they become visible in the viewport:

```typescript
function createVisibilityPrefetchEnhancer(
	element: HTMLAnchorElement,
	cache: Set<string>,
): () => void {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && !cache.has(element.href)) {
				// Link is visible, prefetch it
				const link = document.createElement("link")
				link.rel = "prefetch"
				link.href = element.href
				link.as = "document"
				document.head.appendChild(link)
				cache.add(element.href)

				// Stop observing once prefetched
				observer.unobserve(element)
			}
		})
	}, {
		rootMargin: "50px", // Start prefetching 50px before visible
	})

	observer.observe(element)

	// Return cleanup function
	return () => observer.disconnect()
}
```

### 4. Predictive Prefetching

More advanced strategy based on user patterns:

```typescript
type NavigationEntry = {
	from: string
	to: string
	timestamp: number
}

function getNavigationHistory(): NavigationEntry[] {
	// Retrieve from sessionStorage (immutable)
	const stored = sessionStorage.getItem("nav-history")
	return stored ? JSON.parse(stored) : []
}

function addToNavigationHistory(entry: NavigationEntry): NavigationEntry[] {
	const history = getNavigationHistory()
	const newHistory = [...history, entry].slice(-50) // Keep last 50 entries
	sessionStorage.setItem("nav-history", JSON.stringify(newHistory))
	return newHistory
}

function calculateProbability(
	href: string,
	history: NavigationEntry[],
): number {
	// Simple frequency-based calculation
	const pageVisits = history.filter((entry) => entry.to === href).length
	const totalVisits = history.length

	if (totalVisits === 0) return 0

	// Factor in recency and frequency
	const frequency = pageVisits / totalVisits
	const recency = history[history.length - 1]?.to === href ? 0.2 : 0

	return Math.min(frequency + recency, 1)
}

function createPredictivePrefetchEnhancer(
	element: HTMLAnchorElement,
	cache: Set<string>,
): () => void {
	const history = getNavigationHistory()
	const probability = calculateProbability(element.href, history)

	let idleCallbackId: number | undefined

	if (probability > 0.7 && !cache.has(element.href)) {
		// High probability - prefetch immediately
		prefetchResource(element.href, cache)
	} else if (probability > 0.3 && !cache.has(element.href)) {
		// Medium probability - prefetch on idle
		idleCallbackId = requestIdleCallback(() => {
			prefetchResource(element.href, cache)
		})
	}
	// Low probability - don't prefetch

	// Return cleanup function
	return () => {
		if (idleCallbackId) cancelIdleCallback(idleCallbackId)
	}
}

function prefetchResource(href: string, cache: Set<string>): void {
	if (cache.has(href)) return

	const link = document.createElement("link")
	link.rel = "prefetch"
	link.href = href
	link.as = "document"

	link.onload = () => cache.add(href)
	link.onerror = () => cache.delete(href)

	document.head.appendChild(link)
}
```

### 5. Resource Hints for External Domains

For external links, we can't prefetch the page but can speed up connection:

```typescript
function createExternalPrefetchEnhancer(
	element: HTMLAnchorElement,
	cache: Set<string>,
): () => void {
	try {
		const url = new URL(element.href)
		const origin = url.origin

		if (cache.has(origin)) return () => {}

		// DNS prefetch - resolve domain name early
		const dnsPrefetch = document.createElement("link")
		dnsPrefetch.rel = "dns-prefetch"
		dnsPrefetch.href = origin

		// Preconnect - establish connection early (DNS + TCP + TLS)
		const preconnect = document.createElement("link")
		preconnect.rel = "preconnect"
		preconnect.href = origin

		document.head.appendChild(dnsPrefetch)
		document.head.appendChild(preconnect)
		cache.add(origin)

		// No cleanup needed for link elements
		return () => {}
	} catch {
		// Invalid URL, no prefetching
		return () => {}
	}
}
```

### 6. Network-Aware Prefetching

Adapt strategy based on connection quality:

```typescript
type ConnectionInfo = {
	effectiveType?: "4g" | "3g" | "2g" | "slow-2g"
	saveData?: boolean
}

function getConnectionInfo(): ConnectionInfo {
	const connection = (navigator as any).connection
	if (!connection) return {}

	return {
		effectiveType: connection.effectiveType,
		saveData: connection.saveData,
	}
}

function createEnginePrefetchEnhancer(
	element: HTMLAnchorElement,
	cache: Set<string>,
): () => void {
	const connection = getConnectionInfo()

	// User has data saver enabled - no prefetching
	if (connection.saveData) {
		return () => {}
	}

	// Choose strategy based on connection
	switch (connection.effectiveType) {
		case "4g":
			// Fast connection - aggressive prefetching
			return createVisibilityPrefetchEnhancer(element, cache)
		case "3g":
			// Medium connection - hover only
			return createHoverPrefetchEnhancer(element, cache)
		default:
			// Slow or unknown connection - conservative hover strategy
			return createHoverPrefetchEnhancer(element, cache)
	}
}
```

## Complete Integration Pattern

### Component Usage

```tsx
// In the Link component
<Link 
  to="/about" 
  prefetch="visible" // or "hover", "eager", "sitebender"
>
  About
</Link>

// Compiles to:
<a href="/about" data-enhance-prefetch="visible">About</a>
```

### Client-Side Enhancement

```typescript
// scripts/enhancements/prefetch.ts

type PrefetchStrategy =
	| "hover"
	| "visible"
	| "eager"
	| "sitebender"
	| "predictive"

function initPrefetching(): () => void {
	// Check for support
	if (!("IntersectionObserver" in window)) {
		return () => {}
	}

	// Track prefetched URLs (shared cache)
	const prefetchCache = new Set<string>()
	const cleanupFunctions: Array<() => void> = []

	document.querySelectorAll("a[data-enhance-prefetch]").forEach((link) => {
		const element = link as HTMLAnchorElement
		const strategy = element.dataset.enhancePrefetch as PrefetchStrategy

		// Skip if already prefetched
		if (prefetchCache.has(element.href)) return

		const cleanup = createPrefetchEnhancer(strategy, element, prefetchCache)
		cleanupFunctions.push(cleanup)
	})

	// Return combined cleanup function
	return () => cleanupFunctions.forEach((fn) => fn())
}

function createPrefetchEnhancer(
	strategy: PrefetchStrategy,
	element: HTMLAnchorElement,
	cache: Set<string>,
): () => void {
	switch (strategy) {
		case "hover":
			return createHoverPrefetchEnhancer(element, cache)
		case "visible":
			return createVisibilityPrefetchEnhancer(element, cache)
		case "eager":
			prefetchResource(element.href, cache)
			return () => {}
		case "sitebender":
			return createEnginePrefetchEnhancer(element, cache)
		case "predictive":
			return createPredictivePrefetchEnhancer(element, cache)
		default:
			return () => {}
	}
}
```

## Resource Budget Management

To prevent excessive prefetching using pure functions:

```typescript
type PrefetchBudget = {
	maxConcurrent: number
	maxTotal: number
	maxSize: number
}

type PrefetchState = {
	active: Set<string>
	completed: Set<string>
	queue: string[]
}

const defaultBudget: PrefetchBudget = {
	maxConcurrent: 2,
	maxTotal: 10,
	maxSize: 500_000, // 500KB
}

function createPrefetchManager(
	budget: PrefetchBudget = defaultBudget,
) {
	let state: PrefetchState = {
		active: new Set(),
		completed: new Set(),
		queue: [],
	}

	const canPrefetch = (href: string): boolean => {
		return state.completed.size < budget.maxTotal &&
			!state.completed.has(href) &&
			!state.active.has(href)
	}

	const shouldQueue = (): boolean => {
		return state.active.size >= budget.maxConcurrent
	}

	const prefetch = async (href: string): Promise<void> => {
		if (!canPrefetch(href)) return

		if (shouldQueue()) {
			state = {
				...state,
				queue: [...state.queue, href],
			}
			return
		}

		// Add to active set
		state = {
			...state,
			active: new Set([...state.active, href]),
		}

		try {
			// Check resource size first with HEAD request
			const response = await fetch(href, { method: "HEAD" })
			const size = parseInt(response.headers.get("content-length") || "0")

			if (size > budget.maxSize) {
				throw new Error("Resource too large")
			}

			// Actually prefetch
			const link = document.createElement("link")
			link.rel = "prefetch"
			link.href = href
			document.head.appendChild(link)

			// Update state - move from active to completed
			const newActive = new Set(state.active)
			newActive.delete(href)

			state = {
				...state,
				active: newActive,
				completed: new Set([...state.completed, href]),
			}
		} catch (error) {
			console.warn(`Prefetch failed for ${href}:`, error)

			// Remove from active
			const newActive = new Set(state.active)
			newActive.delete(href)
			state = { ...state, active: newActive }
		}

		// Process queue
		processQueue()
	}

	const processQueue = (): void => {
		if (
			state.queue.length > 0 && state.active.size < budget.maxConcurrent
		) {
			const [next, ...rest] = state.queue
			state = { ...state, queue: rest }
			if (next) prefetch(next)
		}
	}

	return { prefetch, getState: () => state }
}
```

## Performance Monitoring

Track prefetch effectiveness using pure functions:

```typescript
type PrefetchMetrics = {
	attempted: number
	successful: number
	used: number
	hitRate: number
}

function createPrefetchMonitor() {
	let metrics: PrefetchMetrics = {
		attempted: 0,
		successful: 0,
		used: 0,
		hitRate: 0,
	}

	const recordAttempt = (href: string): PrefetchMetrics => {
		metrics = { ...metrics, attempted: metrics.attempted + 1 }

		// Mark in performance API
		performance.mark(`prefetch-start-${href}`)

		return metrics
	}

	const recordSuccess = (href: string): PrefetchMetrics => {
		metrics = { ...metrics, successful: metrics.successful + 1 }
		performance.mark(`prefetch-end-${href}`)

		// Measure duration
		performance.measure(
			`prefetch-${href}`,
			`prefetch-start-${href}`,
			`prefetch-end-${href}`,
		)

		return metrics
	}

	const recordUsage = (href: string): PrefetchMetrics => {
		const newUsed = metrics.used + 1
		const hitRate = metrics.successful > 0
			? newUsed / metrics.successful
			: 0

		metrics = {
			...metrics,
			used: newUsed,
			hitRate,
		}

		// Send to analytics if configured
		reportMetrics(metrics)

		return metrics
	}

	const reportMetrics = (currentMetrics: PrefetchMetrics): void => {
		// Report to analytics service
		if (window.analytics) {
			window.analytics.track("prefetch_metrics", currentMetrics)
		}
	}

	const getMetrics = (): PrefetchMetrics => metrics

	return {
		recordAttempt,
		recordSuccess,
		recordUsage,
		getMetrics,
	}
}
```

## Best Practices

1. **Progressive Enhancement**: Links must work without prefetching
2. **User Preference**: Respect `Save-Data` header and reduced motion settings
3. **Resource Budget**: Limit concurrent prefetches and total bandwidth
4. **Cache Awareness**: Check if resources are already cached before prefetching
5. **Error Handling**: Gracefully handle prefetch failures
6. **Analytics**: Monitor prefetch effectiveness to optimize strategies
7. **Security**: Only prefetch same-origin or explicitly trusted cross-origin resources
8. **Immutability**: Never mutate state directly, always create new objects
9. **Pure Functions**: Prefetch functions should return cleanup functions
10. **Functional Composition**: Build complex behaviors from simple functions

## Configuration Example

```typescript
// Global configuration
type PrefetchConfig = {
	strategies: {
		default: PrefetchStrategy
		navigation: PrefetchStrategy
		critical: PrefetchStrategy
	}
	budget: PrefetchBudget
	ignore: RegExp[]
}

const prefetchConfig: PrefetchConfig = {
	strategies: {
		default: "hover",
		navigation: "visible",
		critical: "eager",
	},
	budget: {
		maxConcurrent: 2,
		maxTotal: 10,
		maxSize: 500_000,
	},
	ignore: [
		/\.(pdf|zip|dmg|exe)$/i, // Large files
		/logout|signout/i, // Logout links
		/^mailto:|^tel:/i, // Non-HTTP protocols
	],
}

// Helper function to check if URL should be ignored
function shouldIgnore(href: string, patterns: RegExp[]): boolean {
	return patterns.some((pattern) => pattern.test(href))
}

// Apply configuration
function applyPrefetchConfig(
	element: HTMLAnchorElement,
	config: PrefetchConfig,
	cache: Set<string>,
): () => void {
	if (shouldIgnore(element.href, config.ignore)) {
		return () => {}
	}

	const strategy = element.dataset.enhancePrefetch as PrefetchStrategy ||
		config.strategies.default

	return createPrefetchEnhancer(strategy, element, cache)
}
```
