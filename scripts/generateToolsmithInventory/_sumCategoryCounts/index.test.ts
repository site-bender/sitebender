import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import type { FunctionInfo } from "../types/index.ts"

import _sumCategoryCounts from "./index.ts"

Deno.test("_sumCategoryCounts - adds count of functions in empty category", () => {
	const category: Record<string, FunctionInfo> = {}
	const result = _sumCategoryCounts(0, category)
	assertEquals(result, 0)
})

Deno.test("_sumCategoryCounts - adds count of functions in single function category", () => {
	const category: Record<string, FunctionInfo> = {
		map: {
			signature: "function map<T, U>(fn: (item: T) => U): (array: T[]) => U[]",
			path: "array/map",
			curried: true,
		},
	}
	const result = _sumCategoryCounts(0, category)
	assertEquals(result, 1)
})

Deno.test("_sumCategoryCounts - adds count of functions in multiple function category", () => {
	const category: Record<string, FunctionInfo> = {
		map: {
			signature: "function map<T, U>(fn: (item: T) => U): (array: T[]) => U[]",
			path: "array/map",
			curried: true,
		},
		filter: {
			signature:
				"function filter<T>(predicate: (item: T) => boolean): (array: T[]) => T[]",
			path: "array/filter",
			curried: true,
		},
		reduce: {
			signature:
				"function reduce<T, U>(reducer: (acc: U, item: T) => U): (initial: U) => (array: T[]) => U",
			path: "array/reduce",
			curried: true,
		},
	}
	const result = _sumCategoryCounts(0, category)
	assertEquals(result, 3)
})

Deno.test("_sumCategoryCounts - accumulates with existing sum", () => {
	const category: Record<string, FunctionInfo> = {
		split: {
			signature: "function split(separator: string): (str: string) => string[]",
			path: "string/split",
			curried: true,
		},
		join: {
			signature:
				"function join(separator: string): (array: string[]) => string",
			path: "string/join",
			curried: true,
		},
	}
	const result = _sumCategoryCounts(5, category)
	assertEquals(result, 7)
})

Deno.test("_sumCategoryCounts - handles large existing sum", () => {
	const category: Record<string, FunctionInfo> = {
		isValid: {
			signature: "function isValid(value: unknown): boolean",
			path: "validation/isValid",
			curried: false,
		},
	}
	const result = _sumCategoryCounts(100, category)
	assertEquals(result, 101)
})

Deno.test("_sumCategoryCounts - works with non-curried functions", () => {
	const category: Record<string, FunctionInfo> = {
		identity: {
			signature: "function identity<T>(value: T): T",
			path: "utility/identity",
			curried: false,
		},
		noop: {
			signature: "function noop(): void",
			path: "utility/noop",
			curried: false,
		},
	}
	const result = _sumCategoryCounts(0, category)
	assertEquals(result, 2)
})

Deno.test("_sumCategoryCounts - correctly handles mixed curried and non-curried", () => {
	const category: Record<string, FunctionInfo> = {
		pipe: {
			signature: "function pipe<T>(fns: Function[]): (value: T) => any",
			path: "utility/pipe",
			curried: true,
		},
		compose: {
			signature: "function compose<T>(fns: Function[]): (value: T) => any",
			path: "utility/compose",
			curried: true,
		},
		identity: {
			signature: "function identity<T>(value: T): T",
			path: "utility/identity",
			curried: false,
		},
	}
	const result = _sumCategoryCounts(10, category)
	assertEquals(result, 13)
})
