import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import type { Generator, ParseError, Seed } from "../../../../types/index.ts"
import err from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _tryParsers from "./index.ts"

describe("_tryParsers", function () {
	function makeParsingGenerator<T>(
		value: T,
		parser?: (input: unknown) => ReturnType<NonNullable<Generator<T>["parse"]>>,
	): Generator<T> {
		return {
			next: function generateNext(seed: Seed) {
				return { value, nextSeed: seed, size: 1 }
			},
			shrink: function shrinkValue(v: T) {
				return {
					value: v,
					children: function getChildren() {
						return []
					},
				}
			},
			parse: parser,
		}
	}

	it("should return error for empty generators", function () {
		const generators: ReadonlyArray<Generator<number>> = []
		const tryParser = _tryParsers(generators)
		const result = tryParser(42)

		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.type, "TypeMismatch")
		}
	})

	it("should try first generator's parser", function () {
		const gen1 = makeParsingGenerator(42, function (input) {
			if (input === 42) return ok(42)
			return err(
				{
					type: "TypeMismatch",
					expected: "42",
					received: String(input),
				} as ParseError,
			)
		})
		const gen2 = makeParsingGenerator(99)
		const generators = [gen1, gen2]

		const tryParser = _tryParsers(generators)
		const result = tryParser(42)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, 42)
		}
	})

	it("should try next generator if first fails", function () {
		const gen1 = makeParsingGenerator<string | number>(
			"hello",
			function (input) {
				if (typeof input === "string") return ok(input as string | number)
				return err(
					{
						type: "TypeMismatch",
						expected: "string",
						received: typeof input,
					} as ParseError,
				)
			},
		)
		const gen2 = makeParsingGenerator<string | number>(42, function (input) {
			if (typeof input === "number") return ok(input as string | number)
			return err(
				{
					type: "TypeMismatch",
					expected: "number",
					received: typeof input,
				} as ParseError,
			)
		})
		const generators: ReadonlyArray<Generator<string | number>> = [gen1, gen2]

		const tryParser = _tryParsers(generators)
		const result = tryParser(42)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, 42)
		}
	})

	it("should return first successful parse", function () {
		const gen1 = makeParsingGenerator("a", function () {
			return err(
				{
					type: "TypeMismatch",
					expected: "a",
					received: "other",
				} as ParseError,
			)
		})
		const gen2 = makeParsingGenerator("b", function (input) {
			return ok(input as string)
		})
		const gen3 = makeParsingGenerator("c", function (input) {
			return ok(`c:${input}`)
		})
		const generators = [gen1, gen2, gen3]

		const tryParser = _tryParsers(generators)
		const result = tryParser("test")

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "test")
		}
	})

	it("should skip generators without parse method", function () {
		const gen1 = makeParsingGenerator<string | number>("no-parser")
		const gen2 = makeParsingGenerator<string | number>(42, function (input) {
			if (input === 42) return ok(42 as string | number)
			return err(
				{
					type: "TypeMismatch",
					expected: "42",
					received: String(input),
				} as ParseError,
			)
		})
		const generators: ReadonlyArray<Generator<string | number>> = [gen1, gen2]

		const tryParser = _tryParsers(generators)
		const result = tryParser(42)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, 42)
		}
	})

	it("should return error when all parsers fail", function () {
		const gen1 = makeParsingGenerator("a", function () {
			return err(
				{
					type: "TypeMismatch",
					expected: "a",
					received: "other",
				} as ParseError,
			)
		})
		const gen2 = makeParsingGenerator("b", function () {
			return err(
				{
					type: "TypeMismatch",
					expected: "b",
					received: "other",
				} as ParseError,
			)
		})
		const generators = [gen1, gen2]

		const tryParser = _tryParsers(generators)
		const result = tryParser("c")

		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.type, "TypeMismatch")
		}
	})

	it("should handle all generators without parsers", function () {
		const gen1 = makeParsingGenerator("a")
		const gen2 = makeParsingGenerator("b")
		const gen3 = makeParsingGenerator("c")
		const generators = [gen1, gen2, gen3]

		const tryParser = _tryParsers(generators)
		const result = tryParser("anything")

		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.type, "TypeMismatch")
		}
	})

	it("should handle mixed success and failure", function () {
		type Mixed = string | number | boolean
		const stringGen = makeParsingGenerator<Mixed>("str", function (input) {
			if (typeof input === "string") return ok(input as Mixed)
			return err(
				{
					type: "TypeMismatch",
					expected: "string",
					received: typeof input,
				} as ParseError,
			)
		})
		const numberGen = makeParsingGenerator<Mixed>(0, function (input) {
			if (typeof input === "number") return ok(input as Mixed)
			return err(
				{
					type: "TypeMismatch",
					expected: "number",
					received: typeof input,
				} as ParseError,
			)
		})
		const boolGen = makeParsingGenerator<Mixed>(true, function (input) {
			if (typeof input === "boolean") return ok(input as Mixed)
			return err(
				{
					type: "TypeMismatch",
					expected: "boolean",
					received: typeof input,
				} as ParseError,
			)
		})
		const generators: ReadonlyArray<Generator<Mixed>> = [
			stringGen,
			numberGen,
			boolGen,
		]

		const tryParser = _tryParsers(generators)

		const result1 = tryParser("hello")
		assertEquals(result1._tag, "Ok")
		if (result1._tag === "Ok") {
			assertEquals(result1.value, "hello")
		}

		const result2 = tryParser(42)
		assertEquals(result2._tag, "Ok")
		if (result2._tag === "Ok") {
			assertEquals(result2.value, 42)
		}

		const result3 = tryParser(false)
		assertEquals(result3._tag, "Ok")
		if (result3._tag === "Ok") {
			assertEquals(result3.value, false)
		}

		const result4 = tryParser({})
		assertEquals(result4._tag, "Error")
	})

	it("should preserve error from last parser when all fail", function () {
		const gen1 = makeParsingGenerator("a", function () {
			return err(
				{
					type: "ValidationFailed",
					value: "test",
					reason: "first",
				} as ParseError,
			)
		})
		const gen2 = makeParsingGenerator("b", function () {
			return err(
				{ type: "FormatInvalid", input: "test", pattern: "last" } as ParseError,
			)
		})
		const generators = [gen1, gen2]

		const tryParser = _tryParsers(generators)
		const result = tryParser("test")

		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.type, "FormatInvalid")
		}
	})
})
