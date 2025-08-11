# Smooth Scrolling Strategy for Navigation Components

## Overview

Smooth scrolling enhances the user experience for anchor links by providing visual continuity when navigating within a page. This document outlines a progressive enhancement approach that starts with CSS and layers on JavaScript enhancements while maintaining accessibility and respecting user preferences.

## Core Principles

1. **CSS First**: Use native CSS `scroll-behavior` as the foundation
2. **Progressive Enhancement**: JavaScript adds features, not core functionality
3. **Accessibility**: Respect `prefers-reduced-motion` and manage focus properly
4. **Performance**: Minimize JavaScript, use native APIs where possible
5. **User Control**: Allow customization of scroll behavior per link

## CSS Foundation

The simplest implementation uses pure CSS:

```css
/* Global smooth scrolling */
html {
	scroll-behavior: smooth;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}
}

/* Optional: Different behavior for specific containers */
.smooth-scroll-container {
	scroll-behavior: smooth;
}
```

This provides smooth scrolling for all anchor links without any JavaScript.

## Enhanced Smooth Scrolling with JavaScript

### Data Attribute Configuration

Links can specify custom scroll behavior:

```html
<!-- Simple boolean -->
<a href="#section" data-smooth-scroll="true">Smooth scroll</a>

<!-- With configuration -->
<a href="#section" data-smooth-scroll='{"duration": 500, "offset": 100}'
>Custom scroll</a>

<!-- Disable for specific link -->
<a href="#section" data-smooth-scroll="false">Instant jump</a>
```

### Type Definitions

```typescript
type ScrollConfig = {
	duration?: number // Animation duration in ms
	offset?: number // Offset from top in pixels
	behavior?: "smooth" | "instant" | "auto"
	focusTarget?: boolean // Whether to focus the target element
	updateHistory?: boolean // Whether to update URL
	container?: string // Selector for scroll container
}

type ScrollState = {
	isScrolling: boolean
	targetId: string | null
	startTime: number | null
	startPosition: number
	endPosition: number
}

type EasingFunction = (t: number) => number
```

### Basic Enhancement Implementation

```typescript
function createSmoothScrollEnhancer(
	element: HTMLAnchorElement,
): () => void {
	// Parse configuration
	const config = parseScrollConfig(element.dataset.smoothScroll)

	// Skip if user prefers reduced motion and not explicitly overridden
	if (prefersReducedMotion() && config.behavior !== "smooth") {
		return () => {}
	}

	const handleClick = (e: MouseEvent) => {
		const targetId = element.hash?.slice(1)
		if (!targetId) return

		const target = document.getElementById(targetId)
		if (!target) return

		e.preventDefault()

		// Perform the scroll
		smoothScrollTo(target, config)

		// Update history without triggering scroll
		if (config.updateHistory !== false) {
			updateHistory(element.hash)
		}

		// Manage focus after scroll
		if (config.focusTarget !== false) {
			manageFocus(target)
		}
	}

	element.addEventListener("click", handleClick)

	// Return cleanup function
	return () => element.removeEventListener("click", handleClick)
}

function parseScrollConfig(data: string | undefined): ScrollConfig {
	if (!data) return {}
	if (data === "true") return { behavior: "smooth" }
	if (data === "false") return { behavior: "instant" }

	try {
		return JSON.parse(data)
	} catch {
		return {}
	}
}

function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
```

### Smooth Scroll Implementation

```typescript
function smoothScrollTo(
	target: HTMLElement,
	config: ScrollConfig = {},
): Promise<void> {
	return new Promise((resolve) => {
		const {
			duration = 500,
			offset = 0,
			behavior = "smooth",
			container,
		} = config

		// Use native scrollIntoView for simple cases
		if (behavior === "smooth" && !offset && !container && !duration) {
			target.scrollIntoView({ behavior: "smooth", block: "start" })
			// Estimate completion time
			setTimeout(resolve, 500)
			return
		}

		// Get scroll container
		const scrollContainer = container
			? document.querySelector(container)
			: window

		// Calculate positions
		const startPosition = getScrollPosition(scrollContainer)
		const targetPosition = getTargetPosition(target, offset, scrollContainer)
		const distance = targetPosition - startPosition

		// Instant scroll
		if (behavior === "instant" || duration === 0) {
			setScrollPosition(scrollContainer, targetPosition)
			resolve()
			return
		}

		// Animated scroll
		animateScroll(
			scrollContainer,
			startPosition,
			distance,
			duration,
			resolve,
		)
	})
}

function getScrollPosition(container: Element | Window): number {
	if (container === window) {
		return window.pageYOffset || document.documentElement.scrollTop
	}
	return (container as Element).scrollTop
}

function setScrollPosition(
	container: Element | Window,
	position: number,
): void {
	if (container === window) {
		window.scrollTo(0, position)
	} else {
		;(container as Element).scrollTop = position
	}
}

function getTargetPosition(
	target: HTMLElement,
	offset: number,
	container: Element | Window,
): number {
	const rect = target.getBoundingClientRect()
	const scrollTop = getScrollPosition(container)

	if (container === window) {
		return rect.top + scrollTop - offset
	} else {
		const containerRect = (container as Element).getBoundingClientRect()
		return rect.top - containerRect.top + scrollTop - offset
	}
}
```

### Animation with Easing

```typescript
// Easing functions (pure)
const easingFunctions: Record<string, EasingFunction> = {
	linear: (t: number) => t,
	easeInQuad: (t: number) => t * t,
	easeOutQuad: (t: number) => t * (2 - t),
	easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
	easeInCubic: (t: number) => t * t * t,
	easeOutCubic: (t: number) => (--t) * t * t + 1,
	easeInOutCubic: (t: number) =>
		t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
}

function animateScroll(
	container: Element | Window,
	start: number,
	distance: number,
	duration: number,
	onComplete: () => void,
	easing: EasingFunction = easingFunctions.easeInOutQuad,
): void {
	const startTime = performance.now()

	const scroll = (currentTime: number) => {
		const elapsed = currentTime - startTime
		const progress = Math.min(elapsed / duration, 1)
		const easedProgress = easing(progress)
		const position = start + (distance * easedProgress)

		setScrollPosition(container, position)

		if (progress < 1) {
			requestAnimationFrame(scroll)
		} else {
			onComplete()
		}
	}

	requestAnimationFrame(scroll)
}
```

### Focus Management

```typescript
function manageFocus(target: HTMLElement): void {
	// Make target focusable if it isn't already
	const originalTabIndex = target.getAttribute("tabindex")
	const wasFocusable = isFocusable(target)

	if (!wasFocusable) {
		target.setAttribute("tabindex", "-1")
	}

	// Focus the target
	target.focus()

	// Announce to screen readers
	announceNavigation(target)

	// Remove tabindex if we added it (after a delay to ensure focus is set)
	if (!wasFocusable && !originalTabIndex) {
		setTimeout(() => {
			target.removeAttribute("tabindex")
		}, 100)
	}
}

function isFocusable(element: HTMLElement): boolean {
	const focusableElements = [
		"a[href]",
		"area[href]",
		"input:not([disabled])",
		"select:not([disabled])",
		"textarea:not([disabled])",
		"button:not([disabled])",
		'[tabindex]:not([tabindex="-1"])',
	]

	return focusableElements.some((selector) => element.matches(selector))
}

function announceNavigation(target: HTMLElement): void {
	// Create a live region for screen reader announcement
	const announcement = document.createElement("div")
	announcement.setAttribute("role", "status")
	announcement.setAttribute("aria-live", "polite")
	announcement.setAttribute("aria-atomic", "true")
	announcement.style.position = "absolute"
	announcement.style.left = "-10000px"
	announcement.style.width = "1px"
	announcement.style.height = "1px"
	announcement.style.overflow = "hidden"

	// Get section heading if available
	const heading = target.querySelector("h1, h2, h3, h4, h5, h6")
	const text = heading?.textContent || target.id || "New section"

	announcement.textContent = `Navigated to ${text}`
	document.body.appendChild(announcement)

	// Remove after announcement
	setTimeout(() => {
		document.body.removeChild(announcement)
	}, 1000)
}
```

### History Management

```typescript
function updateHistory(hash: string): void {
	// Update URL without triggering scroll
	if (history.pushState) {
		history.pushState(null, "", hash)
	} else {
		// Fallback for older browsers
		const scrollPos = getScrollPosition(window)
		window.location.hash = hash
		window.scrollTo(0, scrollPos)
	}
}

function preventHistoryScroll(): () => void {
	// Prevent browser from scrolling on hash change
	const handleHashChange = (e: HashChangeEvent) => {
		e.preventDefault()
		return false
	}

	window.addEventListener("hashchange", handleHashChange)

	// Return cleanup function
	return () => window.removeEventListener("hashchange", handleHashChange)
}
```

### Complete Integration

```typescript
function initSmoothScrolling(): () => void {
	const cleanupFunctions: Array<() => void> = []

	// Prevent default browser scroll on hash change
	cleanupFunctions.push(preventHistoryScroll())

	// Enhance all links with smooth scroll data attribute
	document.querySelectorAll('a[href^="#"]').forEach((link) => {
		const element = link as HTMLAnchorElement

		// Skip if explicitly disabled
		if (element.dataset.smoothScroll === "false") return

		// Auto-detect internal links that should smooth scroll
		if (!element.dataset.smoothScroll && element.hash) {
			element.dataset.smoothScroll = "true"
		}

		const cleanup = createSmoothScrollEnhancer(element)
		cleanupFunctions.push(cleanup)
	})

	// Handle browser back/forward buttons
	const handlePopState = (e: PopStateEvent) => {
		if (window.location.hash) {
			const target = document.querySelector(window.location.hash)
			if (target) {
				smoothScrollTo(target as HTMLElement, { updateHistory: false })
			}
		}
	}

	window.addEventListener("popstate", handlePopState)
	cleanupFunctions.push(() =>
		window.removeEventListener("popstate", handlePopState)
	)

	// Return combined cleanup function
	return () => cleanupFunctions.forEach((fn) => fn())
}
```

### Scroll Spy Integration

Track which section is currently visible:

```typescript
type ScrollSpyState = {
	activeId: string | null
	observers: Map<string, IntersectionObserver>
}

function createScrollSpy(
	links: NodeListOf<HTMLAnchorElement>,
	onActiveChange: (activeId: string | null) => void,
): () => void {
	const observers = new Map<string, IntersectionObserver>()
	const visibleSections = new Set<string>()

	links.forEach((link) => {
		const targetId = link.hash?.slice(1)
		if (!targetId) return

		const target = document.getElementById(targetId)
		if (!target) return

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleSections.add(targetId)
					} else {
						visibleSections.delete(targetId)
					}
				})

				// Determine the topmost visible section
				const activeId = findTopmostVisible(visibleSections)
				onActiveChange(activeId)
			},
			{
				rootMargin: "-20% 0px -70% 0px", // Consider top 30% of viewport
			},
		)

		observer.observe(target)
		observers.set(targetId, observer)
	})

	// Return cleanup function
	return () => {
		observers.forEach((observer) => observer.disconnect())
	}
}

function findTopmostVisible(visibleIds: Set<string>): string | null {
	if (visibleIds.size === 0) return null

	let topmost: { id: string; top: number } | null = null

	visibleIds.forEach((id) => {
		const element = document.getElementById(id)
		if (!element) return

		const rect = element.getBoundingClientRect()
		if (!topmost || rect.top < topmost.top) {
			topmost = { id, top: rect.top }
		}
	})

	return topmost?.id || null
}
```

### Scroll Progress Indicator

Show scroll progress for long pages:

```typescript
type ScrollProgress = {
	percentage: number
	pixels: number
	remaining: number
}

function createScrollProgress(
	onProgress: (progress: ScrollProgress) => void,
): () => void {
	const calculateProgress = (): ScrollProgress => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop
		const scrollHeight = document.documentElement.scrollHeight
		const clientHeight = document.documentElement.clientHeight
		const maxScroll = scrollHeight - clientHeight

		const percentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0

		return {
			percentage: Math.min(100, Math.max(0, percentage)),
			pixels: scrollTop,
			remaining: maxScroll - scrollTop,
		}
	}

	const handleScroll = throttle(() => {
		onProgress(calculateProgress())
	}, 16) // ~60fps

	window.addEventListener("scroll", handleScroll, { passive: true })

	// Initial calculation
	onProgress(calculateProgress())

	// Return cleanup function
	return () => window.removeEventListener("scroll", handleScroll)
}

function throttle<T extends (...args: any[]) => void>(
	fn: T,
	delay: number,
): T {
	let lastCall = 0
	return ((...args: Parameters<T>) => {
		const now = Date.now()
		if (now - lastCall >= delay) {
			lastCall = now
			fn(...args)
		}
	}) as T
}
```

## Usage Examples

### Basic Usage

```tsx
// Component with smooth scrolling
<Link to="#features" smoothScroll>
  View Features
</Link>

// With custom configuration
<Link 
  to="#contact" 
  smoothScroll={{ duration: 800, offset: 80 }}
>
  Contact Us
</Link>

// Compiles to:
<a href="#features" data-smooth-scroll="true">View Features</a>
<a href="#contact" data-smooth-scroll='{"duration":800,"offset":80}'>Contact Us</a>
```

### Advanced Configuration

```typescript
type SmoothScrollConfig = {
	// Global settings
	default: {
		duration: number
		easing: string
		offset: number
		updateHistory: boolean
		focusTarget: boolean
	}
	// Breakpoint-specific settings
	breakpoints: {
		mobile: { maxWidth: 768; offset: 60 }
		tablet: { maxWidth: 1024; offset: 80 }
	}
	// Ignore patterns
	ignore: RegExp[]
}

const smoothScrollConfig: SmoothScrollConfig = {
	default: {
		duration: 500,
		easing: "easeInOutQuad",
		offset: 0,
		updateHistory: true,
		focusTarget: true,
	},
	breakpoints: {
		mobile: { maxWidth: 768, offset: 60 },
		tablet: { maxWidth: 1024, offset: 80 },
	},
	ignore: [
		/^#$/, // Empty hash
		/#!\//, // Hashbang routes
	],
}

function applyScrollConfig(
	element: HTMLAnchorElement,
	config: SmoothScrollConfig,
): ScrollConfig {
	// Get responsive offset
	const offset = getResponsiveOffset(config.breakpoints)

	// Merge with defaults
	return {
		...config.default,
		offset,
		...parseScrollConfig(element.dataset.smoothScroll),
	}
}

function getResponsiveOffset(
	breakpoints: SmoothScrollConfig["breakpoints"],
): number {
	const width = window.innerWidth

	if (width <= breakpoints.mobile.maxWidth) {
		return breakpoints.mobile.offset
	}
	if (width <= breakpoints.tablet.maxWidth) {
		return breakpoints.tablet.offset
	}

	return 0
}
```

## Performance Considerations

1. **Use CSS scroll-behavior when possible** - It's hardware accelerated
2. **Throttle scroll events** - Use passive listeners and throttling
3. **Avoid layout thrashing** - Batch DOM reads and writes
4. **Clean up observers** - Always disconnect IntersectionObservers
5. **Respect user preferences** - Check prefers-reduced-motion
6. **Test on low-end devices** - Ensure smooth performance everywhere

## Accessibility Guidelines

1. **Focus Management**: Always move focus to the target element
2. **Screen Reader Announcements**: Announce navigation to sections
3. **Keyboard Navigation**: Ensure all smooth scroll links work with keyboard
4. **Reduced Motion**: Respect user's motion preferences
5. **Skip Links**: Provide skip navigation links for keyboard users
6. **ARIA Labels**: Use descriptive labels for anchor links

## Best Practices

1. **Progressive Enhancement**: Start with working anchor links
2. **User Control**: Allow users to disable smooth scrolling
3. **Performance Budget**: Keep JavaScript minimal and efficient
4. **Error Handling**: Gracefully handle missing targets
5. **History Management**: Update URL without breaking back button
6. **Mobile Consideration**: Adjust offsets for fixed headers
7. **Testing**: Test across browsers and devices
8. **Documentation**: Document configuration options clearly
9. **Immutability**: Keep all state immutable
10. **Pure Functions**: Use
