# Loading States Strategy for Navigation Components

## Overview

Loading states provide visual feedback during navigation, especially important for slow connections or heavy resources. This document outlines a progressive enhancement approach that starts with CSS-only solutions and layers on JavaScript enhancements while maintaining performance and accessibility.

## Core Principles

1. **CSS First**: Pure CSS loading states work without JavaScript
2. **Perceived Performance**: Immediate visual feedback improves UX
3. **Progressive Enhancement**: JavaScript adds features, not core functionality
4. **Accessibility**: Loading states must be announced to screen readers
5. **Performance**: Minimize impact on page performance
6. **Customizable**: Different loading strategies for different use cases

## CSS Foundation

### Basic Active States

Start with immediate feedback using CSS `:active` pseudo-class:

```css
/* Immediate feedback on click */
a:active {
	opacity: 0.7;
	transform: scale(0.98);
}

/* Pointer changes */
a[data-loading] {
	cursor: progress;
}

/* CSS-only spinner */
a[data-loading="spinner"]::after {
	content: "";
	display: inline-block;
	width: 12px;
	height: 12px;
	margin-left: 8px;
	border: 2px solid transparent;
	border-top-color: currentColor;
	border-radius: 50%;
	animation: spin 0.6s linear infinite;
	vertical-align: middle;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

/* Skeleton/placeholder state */
a[data-loading="skeleton"] {
	position: relative;
	color: transparent;
	background: linear-gradient(
		90deg,
		#f0f0f0 25%,
		#e0e0e0 50%,
		#f0f0f0 75%
	);
	background-size: 200% 100%;
	animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
	0% {
		background-position: -200% 0;
	}
	100% {
		background-position: 200% 0;
	}
}

/* Progress bar */
a[data-loading="progress"] {
	position: relative;
	overflow: hidden;
}

a[data-loading="progress"]::before {
	content: "";
	position: absolute;
	bottom: 0;
	left: 0;
	height: 2px;
	width: var(--progress, 30%);
	background: currentColor;
	animation: progress 2s ease-out forwards;
}

@keyframes progress {
	0% {
		width: 0;
	}
	50% {
		width: 70%;
	}
	100% {
		width: var(--progress, 100%);
	}
}

/* Pulse animation */
a[data-loading="pulse"] {
	animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}

/* Dots animation */
a[data-loading="dots"]::after {
	content: ".";
	animation: dots 1.5s steps(4, end) infinite;
}

@keyframes dots {
	0%, 20% {
		content: ".";
	}
	40% {
		content: "..";
	}
	60% {
		content: "...";
	}
	80%, 100% {
		content: "";
	}
}
```

### Accessible Loading States

```css
/* Screen reader only loading text */
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

/* Ensure loading states are perceivable */
a[data-loading] {
	position: relative;
	min-height: 1em;
	min-width: 3em;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	a[data-loading="spinner"]::after {
		border-top-color: LinkText;
	}

	a[data-loading="progress"]::before {
		background: LinkText;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	a[data-loading="spinner"]::after,
	a[data-loading="skeleton"],
	a[data-loading="pulse"],
	a[data-loading="dots"]::after {
		animation: none;
	}

	/* Static loading indicator for reduced motion */
	a[data-loading]::after {
		content: " (loading)";
		font-size: 0.875em;
		opacity: 0.7;
	}
}
```

## JavaScript Enhancement

### Type Definitions

```typescript
type LoadingStyle =
	| "spinner"
	| "skeleton"
	| "progress"
	| "pulse"
	| "dots"
	| "custom"

type LoadingConfig = {
	style?: LoadingStyle
	timeout?: number // Milliseconds before showing loading state
	duration?: number // Maximum loading duration
	text?: string // Loading text for screen readers
	announceInterval?: number // How often to announce loading status
	onTimeout?: () => void // Callback when loading times out
	preventClick?: boolean // Prevent multiple clicks during loading
}

type LoadingState = {
	isLoading: boolean
	startTime: number | null
	timeoutId: number | null
	announceId: number | null
	element: HTMLElement | null
}

type NavigationTiming = {
	start: number
	duration: number
	url: string
	success: boolean
}
```

### Basic Loading State Enhancement

```typescript
function createLoadingEnhancer(
	element: HTMLAnchorElement,
): () => void {
	const config = parseLoadingConfig(element.dataset)
	let state: LoadingState = {
		isLoading: false,
		startTime: null,
		timeoutId: null,
		announceId: null,
		element: null,
	}

	const handleClick = (e: MouseEvent) => {
		// Prevent multiple clicks if configured
		if (state.isLoading && config.preventClick !== false) {
			e.preventDefault()
			return
		}

		// Don't show loading for same-page anchors
		if (element.hash && !element.pathname) {
			return
		}

		// Start loading state
		state = startLoading(element, config, state)

		// For external links or downloads, we can't detect completion
		if (isUrlExternal(element.href) || element.download) {
			// Use a reasonable timeout
			setTimeout(() => {
				state = stopLoading(state)
			}, config.duration || 3000)
		}
	}

	element.addEventListener("click", handleClick)

	// Listen for navigation events to stop loading
	const handleNavigation = () => {
		if (state.isLoading) {
			state = stopLoading(state)
		}
	}

	window.addEventListener("pagehide", handleNavigation)
	window.addEventListener("popstate", handleNavigation)

	// Return cleanup function
	return () => {
		element.removeEventListener("click", handleClick)
		window.removeEventListener("pagehide", handleNavigation)
		window.removeEventListener("popstate", handleNavigation)
		if (state.isLoading) {
			stopLoading(state)
		}
	}
}

function parseLoadingConfig(dataset: DOMStringMap): LoadingConfig {
	const config: LoadingConfig = {}

	if (dataset.loading) {
		config.style = dataset.loading as LoadingStyle
	}

	if (dataset.loadingTimeout) {
		config.timeout = parseInt(dataset.loadingTimeout)
	}

	if (dataset.loadingDuration) {
		config.duration = parseInt(dataset.loadingDuration)
	}

	if (dataset.loadingText) {
		config.text = dataset.loadingText
	}

	return config
}
```

### Loading State Management

```typescript
function startLoading(
	element: HTMLElement,
	config: LoadingConfig,
	currentState: LoadingState,
): LoadingState {
	// Clean up any existing state
	const cleanState = stopLoading(currentState)

	let newState: LoadingState = {
		...cleanState,
		isLoading: true,
		startTime: Date.now(),
		element,
	}

	// Delay showing loading state if configured
	if (config.timeout && config.timeout > 0) {
		newState = {
			...newState,
			timeoutId: setTimeout(() => {
				showLoadingUI(element, config)
			}, config.timeout),
		}
	} else {
		showLoadingUI(element, config)
	}

	// Set maximum duration timeout
	if (config.duration) {
		setTimeout(() => {
			if (newState.isLoading) {
				newState = stopLoading(newState)
				config.onTimeout?.()
			}
		}, config.duration)
	}

	// Start accessibility announcements
	newState = startAccessibilityAnnouncements(element, config, newState)

	return newState
}

function stopLoading(state: LoadingState): LoadingState {
	if (!state.isLoading || !state.element) return state

	// Clear timeouts
	if (state.timeoutId) {
		clearTimeout(state.timeoutId)
	}

	if (state.announceId) {
		clearInterval(state.announceId)
	}

	// Remove loading UI
	hideLoadingUI(state.element)

	// Announce completion
	announceLoadingComplete(state.element)

	// Track timing
	if (state.startTime) {
		trackNavigationTiming({
			start: state.startTime,
			duration: Date.now() - state.startTime,
			url: (state.element as HTMLAnchorElement).href,
			success: true,
		})
	}

	return {
		isLoading: false,
		startTime: null,
		timeoutId: null,
		announceId: null,
		element: null,
	}
}
```

### UI Updates

```typescript
function showLoadingUI(element: HTMLElement, config: LoadingConfig): void {
	const style = config.style || "spinner"

	// Add loading attribute
	element.setAttribute("data-loading", style)
	element.setAttribute("aria-busy", "true")

	// Add loading class for additional styling
	element.classList.add("is-loading", `is-loading--${style}`)

	// Disable pointer events to prevent accidental clicks
	if (config.preventClick !== false) {
		element.style.pointerEvents = "none"
	}

	// Add custom loading element if needed
	if (style === "custom" && config.text) {
		const loader = createCustomLoader(config.text)
		element.appendChild(loader)
	}

	// Update progress variable for CSS
	if (style === "progress") {
		updateProgressBar(element, 0)
	}
}

function hideLoadingUI(element: HTMLElement): void {
	// Remove loading attributes
	element.removeAttribute("data-loading")
	element.removeAttribute("aria-busy")

	// Remove loading classes
	element.classList.remove("is-loading")
	element.className = element.className.replace(/is-loading--\w+/g, "").trim()

	// Restore pointer events
	element.style.pointerEvents = ""

	// Remove custom loader if present
	const loader = element.querySelector(".custom-loader")
	if (loader) {
		loader.remove()
	}
}

function createCustomLoader(text: string): HTMLElement {
	const loader = document.createElement("span")
	loader.className = "custom-loader"
	loader.setAttribute("role", "status")
	loader.setAttribute("aria-live", "polite")
	loader.textContent = text
	return loader
}

function updateProgressBar(element: HTMLElement, percentage: number): void {
	element.style.setProperty("--progress", `${percentage}%`)
}
```

### Accessibility Support

```typescript
function startAccessibilityAnnouncements(
	element: HTMLElement,
	config: LoadingConfig,
	state: LoadingState,
): LoadingState {
	// Initial announcement
	announceLoadingStart(element, config.text)

	// Periodic announcements
	const interval = config.announceInterval || 5000
	const announceId = setInterval(() => {
		if (state.startTime) {
			const elapsed = Date.now() - state.startTime
			announceLoadingProgress(element, elapsed)
		}
	}, interval)

	return {
		...state,
		announceId,
	}
}

function announceLoadingStart(element: HTMLElement, text?: string): void {
	const message = text || `Loading ${element.textContent || "content"}`
	createAnnouncement(message, "polite")
}

function announceLoadingProgress(element: HTMLElement, elapsed: number): void {
	const seconds = Math.floor(elapsed / 1000)
	const message = `Still loading, ${seconds} seconds elapsed`
	createAnnouncement(message, "polite")
}

function announceLoadingComplete(element: HTMLElement): void {
	const message = `Loading complete for ${element.textContent || "content"}`
	createAnnouncement(message, "polite")
}

function createAnnouncement(
	message: string,
	priority: "polite" | "assertive" = "polite",
): void {
	const announcement = document.createElement("div")
	announcement.setAttribute("role", "status")
	announcement.setAttribute("aria-live", priority)
	announcement.setAttribute("aria-atomic", "true")
	announcement.className = "sr-only"
	announcement.textContent = message

	document.body.appendChild(announcement)

	// Remove after announcement
	setTimeout(() => {
		announcement.remove()
	}, 1000)
}
```

### Advanced Loading Strategies

#### Network-Aware Loading

```typescript
function createNetworkAwareLoading(
	element: HTMLAnchorElement,
	config: LoadingConfig,
): LoadingConfig {
	const connection = (navigator as any).connection

	if (!connection) return config

	// Adjust timeouts based on connection speed
	const adjustedConfig = { ...config }

	switch (connection.effectiveType) {
		case "4g":
			// Fast connection - show loading only for very slow resources
			adjustedConfig.timeout = 1000
			adjustedConfig.style = "spinner"
			break
		case "3g":
			// Medium connection - show loading sooner
			adjustedConfig.timeout = 500
			adjustedConfig.style = "progress"
			break
		case "2g":
		case "slow-2g":
			// Slow connection - immediate loading state
			adjustedConfig.timeout = 0
			adjustedConfig.style = "skeleton"
			adjustedConfig.text = "Loading (slow connection detected)"
			break
	}

	return adjustedConfig
}
```

#### Predictive Loading States

```typescript
type ResourceTiming = {
	url: string
	averageDuration: number
	samples: number
}

function getPredictedLoadTime(url: string): number | null {
	const stored = localStorage.getItem("resource-timings")
	if (!stored) return null

	const timings: ResourceTiming[] = JSON.parse(stored)
	const timing = timings.find((t) => t.url === url)

	return timing?.averageDuration || null
}

function updateResourceTiming(timing: NavigationTiming): void {
	const stored = localStorage.getItem("resource-timings")
	const timings: ResourceTiming[] = stored ? JSON.parse(stored) : []

	const existing = timings.find((t) => t.url === timing.url)

	if (existing) {
		// Update rolling average
		const newAverage =
			(existing.averageDuration * existing.samples + timing.duration) /
			(existing.samples + 1)

		existing.averageDuration = newAverage
		existing.samples = Math.min(existing.samples + 1, 10) // Cap samples
	} else {
		// Add new timing
		timings.push({
			url: timing.url,
			averageDuration: timing.duration,
			samples: 1,
		})
	}

	// Keep only recent timings
	const recentTimings = timings.slice(-100)
	localStorage.setItem("resource-timings", JSON.stringify(recentTimings))
}

function createPredictiveLoading(
	element: HTMLAnchorElement,
	config: LoadingConfig,
): LoadingConfig {
	const predictedTime = getPredictedLoadTime(element.href)

	if (!predictedTime) return config

	const adjustedConfig = { ...config }

	if (predictedTime < 500) {
		// Very fast - no loading state
		adjustedConfig.timeout = predictedTime * 2
	} else if (predictedTime < 2000) {
		// Fast - quick spinner
		adjustedConfig.style = "spinner"
		adjustedConfig.timeout = 200
	} else if (predictedTime < 5000) {
		// Medium - progress bar
		adjustedConfig.style = "progress"
		adjustedConfig.timeout = 0
	} else {
		// Slow - skeleton with message
		adjustedConfig.style = "skeleton"
		adjustedConfig.timeout = 0
		adjustedConfig.text = "This may take a moment..."
	}

	return adjustedConfig
}
```

#### Optimistic Updates

```typescript
function createOptimisticLoading(
	element: HTMLAnchorElement,
	config: LoadingConfig,
): () => void {
	const cleanup = createLoadingEnhancer(element)

	// Prefetch the resource optimistically
	const link = document.createElement("link")
	link.rel = "prefetch"
	link.href = element.href
	link.as = "document"

	let prefetchComplete = false

	link.onload = () => {
		prefetchComplete = true
	}

	document.head.appendChild(link)

	// Override click handler for instant navigation if prefetched
	const handleClick = (e: MouseEvent) => {
		if (prefetchComplete) {
			// Resource is ready, navigate immediately
			// Loading state will be minimal or skipped
			element.setAttribute("data-loading-skip", "true")
		}
	}

	element.addEventListener("click", handleClick, { capture: true })

	return () => {
		cleanup()
		element.removeEventListener("click", handleClick)
	}
}
```

### Progress Tracking

```typescript
function trackNavigationTiming(timing: NavigationTiming): void {
	// Update resource timings for predictive loading
	updateResourceTiming(timing)

	// Send to analytics if available
	if (window.analytics) {
		window.analytics.track("navigation_timing", timing)
	}

	// Log to performance API
	performance.mark(`navigation-end-${timing.url}`)
	if (
		performance.getEntriesByName(`navigation-start-${timing.url}`).length > 0
	) {
		performance.measure(
			`navigation-${timing.url}`,
			`navigation-start-${timing.url}`,
			`navigation-end-${timing.url}`,
		)
	}
}

function createProgressTracker(
	element: HTMLAnchorElement,
	onProgress: (percentage: number) => void,
): () => void {
	// For demonstration - in real app, would track actual navigation progress
	let progress = 0
	const interval = setInterval(() => {
		progress = Math.min(progress + 10, 90)
		onProgress(progress)
		updateProgressBar(element, progress)
	}, 200)

	return () => clearInterval(interval)
}
```

### Complete Integration

```typescript
function initLoadingStates(): () => void {
	const cleanupFunctions: Array<() => void> = []

	// Enhance all links with loading data attribute
	document.querySelectorAll("a[data-loading]").forEach((link) => {
		const element = link as HTMLAnchorElement
		let config = parseLoadingConfig(element.dataset)

		// Apply smart defaults based on context
		config = createNetworkAwareLoading(element, config)
		config = createPredictiveLoading(element, config)

		// Create appropriate enhancer
		const cleanup = element.dataset.loadingOptimistic === "true"
			? createOptimisticLoading(element, config)
			: createLoadingEnhancer(element)

		cleanupFunctions.push(cleanup)
	})

	// Auto-detect slow external links
	document.querySelectorAll('a[href^="http"]').forEach((link) => {
		const element = link as HTMLAnchorElement

		// Skip if already has loading config
		if (element.dataset.loading) return

		// Add loading state for external links
		element.dataset.loading = "spinner"
		element.dataset.loadingTimeout = "500"

		const cleanup = createLoadingEnhancer(element)
		cleanupFunctions.push(cleanup)
	})

	// Return combined cleanup function
	return () => cleanupFunctions.forEach((fn) => fn())
}
```

## Usage Examples

### Basic Usage

```tsx
// Simple loading state
<Link to="/slow-page" loading="spinner">
  Load Page
</Link>

// With timeout
<Link 
  to="/api/data" 
  loading="progress"
  loadingTimeout={1000}
  loadingDuration={10000}
>
  Fetch Data
</Link>

// Custom loading text
<Link
  to="/large-file.pdf"
  loading="skeleton"
  loadingText="Downloading PDF..."
  asDownload
>
  Download Report
</Link>

// Compiles to:
<a href="/slow-page" data-loading="spinner">Load Page</a>
<a 
  href="/api/data" 
  data-loading="progress"
  data-loading-timeout="1000"
  data-loading-duration="10000"
>
  Fetch Data
</a>
```

### Configuration Object

```typescript
type LoadingStateConfig = {
	// Default loading style
	defaultStyle: LoadingStyle

	// Auto-detect settings
	autoDetect: {
		enabled: boolean
		externalLinks: boolean
		downloads: boolean
		largeFiles: boolean
	}

	// Timeout settings
	timeouts: {
		fast: 1000 // Show loading after 1s
		medium: 500 // Show loading after 500ms
		slow: 0 // Show loading immediately
	}

	// Network-aware settings
	networkAware: boolean

	// Predictive loading
	predictive: {
		enabled: boolean
		sampleSize: number
		storageKey: string
	}

	// Accessibility
	accessibility: {
		announceInterval: number
		messages: {
			start: string
			progress: string
			complete: string
			timeout: string
		}
	}
}

const loadingConfig: LoadingStateConfig = {
	defaultStyle: "spinner",
	autoDetect: {
		enabled: true,
		externalLinks: true,
		downloads: true,
		largeFiles: true,
	},
	timeouts: {
		fast: 1000,
		medium: 500,
		slow: 0,
	},
	networkAware: true,
	predictive: {
		enabled: true,
		sampleSize: 10,
		storageKey: "nav-timings",
	},
	accessibility: {
		announceInterval: 5000,
		messages: {
			start: "Loading content",
			progress: "Still loading",
			complete: "Loading complete",
			timeout: "Loading is taking longer than expected",
		},
	},
}
```

## Performance Monitoring

```typescript
function createLoadingMetrics() {
	let metrics = {
		total: 0,
		completed: 0,
		timedOut: 0,
		averageDuration: 0,
		byStyle: {} as Record<LoadingStyle, number>,
	}

	const record = (timing: NavigationTiming): void => {
		metrics = {
			...metrics,
			total: metrics.total + 1,
			completed: timing.success ? metrics.completed + 1 : metrics.completed,
			timedOut: !timing.success ? metrics.timedOut + 1 : metrics.timedOut,
			averageDuration:
				(metrics.averageDuration * (metrics.total - 1) + timing.duration) /
				metrics.total,
		}
	}

	const getMetrics = () => metrics

	return { record, getMetrics }
}
```

## Best Practices

1. **Start with CSS**: Use `:active` states for immediate feedback
2. **Progressive Enhancement**: Loading states should enhance, not break navigation
3. **Respect User Preferences**: Honor prefers-reduced-motion
4. **Set Reasonable Timeouts**: Don't show loading for very fast navigations
5. **Provide Escape Hatches**: Allow users to cancel long-running navigations
6. **Test on Slow Connections**: Use network throttling to test loading states
7. **Accessibility First**: Always announce loading states to screen readers
8. **Monitor Performance**: Track loading times to optimize thresholds
9. **Immutable State**: Keep all state updates immutable
10. **Pure Functions**: Use
