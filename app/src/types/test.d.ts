declare global {
	function describe(name: string, fn: () => void): void
	function it(name: string, fn: () => void | Promise<void>): void
	function beforeEach(fn: () => void | Promise<void>): void
	function afterEach(fn: () => void | Promise<void>): void

	interface Expected {
		toBe(expected: unknown): void
		toEqual(expected: unknown): void
		toContain(expected: unknown): void
		toHaveLength(expected: number): void
		anything(constructor?: unknown): unknown
		any(constructor: unknown): unknown
	}

	function expect(value: unknown): Expected
}

export {}
