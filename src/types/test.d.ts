declare global {
	function describe(name: string, fn: () => void): void
	function it(name: string, fn: () => void | Promise<void>): void
	function beforeEach(fn: () => void | Promise<void>): void
	function afterEach(fn: () => void | Promise<void>): void

	interface Expected {
		toBe(expected: any): void
		toEqual(expected: any): void
		toContain(expected: any): void
		toHaveLength(expected: number): void
		anything(constructor?: any): any
		any(constructor: any): any
	}

	function expect(value: any): Expected
}

export {}
