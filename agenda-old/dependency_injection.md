# Dependency Injection Patterns

## When to Use Dependency Injection

Use DI **only** for functions that interact with external systems or browser APIs. Pure functions don't need it.

## Pattern: Optional Configuration Object

For curried functions that need DI, the config object is the **first** parameter with sensible defaults:

```typescript
// Pattern for DOM operations
const querySelector =
	(config = { dom: globalThis.document }) => (selector: string) =>
		config.dom.querySelector(selector)

// Pattern for storage operations
const getFromLocalStorage =
	(config = { storage: globalThis.localStorage }) => (key: string) =>
		config.storage.getItem(key)

// Pattern for time operations
const getCurrentTime = (config = { now: () => Date.now() }) => () =>
	config.now()
```

## Common Injection Scenarios

### 1. DOM Operations

```typescript
// src/dom/createElement/index.ts
export default function createElement(
	config = { document: globalThis.document },
) {
	return (tag: string) => (attributes = {}) => (children = []) => {
		const element = config.document.createElement(tag)
		// ... set attributes and children
		return element
	}
}

// tests/dom/createElement/index.ts
import createTestDom from "../../helpers/createTestDom/index.ts"

test("creates element with attributes", () => {
	const { document } = createTestDom()
	const create = createElement({ document })

	const div = create("div")({ class: "test" })([])
	assertEquals(div.className, "test")
})
```

### 2. Storage Operations

```typescript
// src/storage/localStorage/index.ts
export default function localStorage(
	config = {
		storage: globalThis.localStorage,
		json: JSON,
	},
) {
	return {
		get: (key: string) => {
			const value = config.storage.getItem(key)
			return value ? config.json.parse(value) : null
		},
		set: (key: string) => (value: any) => {
			config.storage.setItem(key, config.json.stringify(value))
			return value
		},
		remove: (key: string) => {
			config.storage.removeItem(key)
		},
	}
}

// tests/storage/localStorage/index.ts
test("stores and retrieves values", () => {
	const mockStorage = new Map<string, string>()
	const storage = localStorage({
		storage: {
			getItem: (k) => mockStorage.get(k) ?? null,
			setItem: (k, v) => mockStorage.set(k, v),
			removeItem: (k) => mockStorage.delete(k),
		},
		json: JSON,
	})

	storage.set("user")({ name: "Test" })
	assertEquals(storage.get("user"), { name: "Test" })
})
```

### 3. Network Operations (Prefer MSW)

While we prefer MSW at the application edges, here's the DI pattern:

```typescript
// src/api/fetchJson/index.ts
export default function fetchJson(
	config = { fetch: globalThis.fetch },
) {
	return async (url: string) => {
		const response = await config.fetch(url)
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`)
		}
		return response.json()
	}
}

// tests/api/fetchJson/index.ts
test("fetches and parses JSON", async () => {
	const mockFetch = (url: string) =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve({ data: "test" }),
		})

	const fetch = fetchJson({ fetch: mockFetch })
	const result = await fetch("/api/test")
	assertEquals(result, { data: "test" })
})
```

### 4. Time/Date Operations

```typescript
// src/time/relativeTime/index.ts
export default function relativeTime(
	config = {
		now: () => Date.now(),
		locale: "en-US",
	},
) {
	return (timestamp: number) => {
		const diff = config.now() - timestamp
		const seconds = Math.floor(diff / 1000)

		if (seconds < 60) return "just now"
		if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
		// ... etc
	}
}

// tests/time/relativeTime/index.ts
test("formats relative time correctly", () => {
	const fixedNow = new Date("2024-01-01T12:00:00").getTime()
	const relative = relativeTime({ now: () => fixedNow })

	const fiveMinutesAgo = fixedNow - (5 * 60 * 1000)
	assertEquals(relative(fiveMinutesAgo), "5 minutes ago")
})
```

### 5. Random Number Generation

```typescript
// src/random/randomId/index.ts
export default function randomId(
	config = {
		random: () => Math.random(),
		prefix: "id-",
	},
) {
	return () => {
		const random = config.random()
			.toString(36)
			.substring(2, 10)
		return `${config.prefix}${random}`
	}
}

// tests/random/randomId/index.ts
test("generates predictable IDs with seeded random", () => {
	let seed = 0.5
	const id = randomId({
		random: () => seed,
		prefix: "test-",
	})

	assertEquals(id(), "test-i")
})
```

## Functions That DON'T Need DI

Pure functions that only transform data don't need injection:

```typescript
// ❌ Don't add unnecessary config
const add = (config = {}) => (a: number) => (b: number) => a + b

// ✅ Keep pure functions simple
const add = (a: number) => (b: number) => a + b

// ❌ Don't inject for data transformation
const toUpperCase = (config = {}) => (str: string) => str.toUpperCase()

// ✅ Pure transformation doesn't need DI
const toUpperCase = (str: string) => str.toUpperCase()
```

## Testing Utilities

### Creating Test DOMs

```typescript
// tests/helpers/createTestDom/index.ts
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

export default function createTestDom(
	html = "<!DOCTYPE html><html><body></body></html>",
) {
	const doc = new DOMParser().parseFromString(html, "text/html")
	return {
		document: doc,
		window: {
			document: doc,
			localStorage: new Map(),
			sessionStorage: new Map(),
			location: {
				href: "http://localhost:3000/",
				pathname: "/",
				search: "",
			},
		},
	}
}
```

### Creating Test Storage

```typescript
// tests/helpers/createTestStorage/index.ts
export default function createTestStorage(initial = {}) {
	const store = new Map(Object.entries(initial))

	return {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => store.set(key, value),
		removeItem: (key: string) => store.delete(key),
		clear: () => store.clear(),
		get length() {
			return store.size
		},
		key: (index: number) => Array.from(store.keys())[index] ?? null,
	}
}
```

### Creating Test Fetch

For simple cases (prefer MSW for complex scenarios):

```typescript
// tests/helpers/createTestFetch/index.ts
export default function createTestFetch(responses = new Map()) {
	return (url: string, options?: RequestInit) => {
		const response = responses.get(url)
		if (!response) {
			return Promise.reject(new Error(`No mock for ${url}`))
		}

		return Promise.resolve({
			ok: response.status >= 200 && response.status < 300,
			status: response.status || 200,
			json: () => Promise.resolve(response.data),
			text: () => Promise.resolve(JSON.stringify(response.data)),
		})
	}
}
```

## Best Practices

### 1. Default to Real Implementation

Always default to the real browser API:

```typescript
// ✅ Good - defaults to real implementation
const querySelector = (config = { dom: globalThis.document }) => ...

// ❌ Bad - no default
const querySelector = (config) => ...
```

### 2. Keep Config Minimal

Only inject what you need to override:

```typescript
// ✅ Good - minimal config
const timer = (config = { setTimeout: globalThis.setTimeout }) => ...

// ❌ Bad - over-configured
const timer = (config = { 
  setTimeout: globalThis.setTimeout,
  clearTimeout: globalThis.clearTimeout,
  setInterval: globalThis.setInterval,
  clearInterval: globalThis.clearInterval,
  Date: globalThis.Date,
  performance: globalThis.performance
}) => ...
```

### 3. Type the Config

Always provide TypeScript types:

```typescript
type QueryConfig = {
	dom: Document | DocumentFragment
}

const querySelector =
	(config: QueryConfig = { dom: globalThis.document }) =>
	(selector: string) => config.dom.querySelector(selector)
```

### 4. Document Injectable Dependencies

Make it clear what can be injected:

```typescript
/**
 * Creates elements with optional DOM injection for testing
 * @param config.document - DOM document (defaults to globalThis.document)
 */
export default function createElement(
	config = { document: globalThis.document },
) {
	// ...
}
```

## Migration Guide

Converting existing functions to support DI:

### Before (No DI)

```typescript
export default function saveToLocalStorage(key: string, value: any) {
	localStorage.setItem(key, JSON.stringify(value))
}
```

### After (With DI)

```typescript
export default function saveToLocalStorage(
	config = { storage: globalThis.localStorage },
) {
	return (key: string) => (value: any) => {
		config.storage.setItem(key, JSON.stringify(value))
		return value
	}
}
```

### Testing the Converted Function

```typescript
test("saves to storage", () => {
	const mockStorage = new Map()
	const save = saveToLocalStorage({
		storage: {
			setItem: (k, v) => mockStorage.set(k, v),
		},
	})

	save("user")({ name: "Test" })
	assertEquals(mockStorage.get("user"), '{"name":"Test"}')
})
```

This approach keeps our code testable without sacrificing simplicity or introducing mocking frameworks.
