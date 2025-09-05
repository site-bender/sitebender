import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import {
	assertType,
	IsExact,
} from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import startsWith from "../../../../src/simple/array/startsWith/index.ts"

Deno.test("startsWith: basic functionality", async (t) => {
	await t.step("should return true when array starts with prefix", () => {
		assertEquals(startsWith([1, 2])([1, 2, 3, 4, 5]), true)
		assertEquals(startsWith(["a", "b"])(["a", "b", "c", "d"]), true)
	})

	await t.step(
		"should return false when array doesn't start with prefix",
		() => {
			assertEquals(startsWith([1, 3])([1, 2, 3, 4]), false)
			assertEquals(startsWith([2, 3])([1, 2, 3, 4]), false)
			assertEquals(startsWith(["b", "a"])(["a", "b", "c"]), false)
		},
	)

	await t.step("should handle exact matches", () => {
		assertEquals(startsWith([1, 2, 3])([1, 2, 3]), true)
		assertEquals(startsWith(["hello"])(["hello"]), true)
	})

	await t.step("should handle partial matches", () => {
		assertEquals(startsWith([1])([1, 2, 3]), true)
		assertEquals(startsWith([1, 2])([1, 2, 3]), true)
	})

	await t.step("should be case-sensitive for strings", () => {
		assertEquals(startsWith(["Hello"])(["hello", "world"]), false)
		assertEquals(startsWith(["hello"])(["Hello", "world"]), false)
	})
})

Deno.test("startsWith: empty prefix", async (t) => {
	await t.step("should return true for empty prefix", () => {
		assertEquals(startsWith([])([1, 2, 3]), true)
		assertEquals(startsWith([])([]), true)
		assertEquals(startsWith([])(["anything"]), true)
	})

	await t.step("should handle empty arrays correctly", () => {
		assertEquals(startsWith([1])([]), false)
		assertEquals(startsWith([])([]), true)
	})
})

Deno.test("startsWith: edge cases", async (t) => {
	await t.step("should handle null array input", () => {
		assertEquals(startsWith([1, 2])(null), false)
		assertEquals(startsWith([])(null), false)
	})

	await t.step("should handle undefined array input", () => {
		assertEquals(startsWith([1, 2])(undefined), false)
		assertEquals(startsWith([])(undefined), false)
	})

	await t.step("should handle null prefix input", () => {
		assertEquals(startsWith(null)([1, 2, 3]), false)
		assertEquals(startsWith(null)([]), false)
	})

	await t.step("should handle undefined prefix input", () => {
		assertEquals(startsWith(undefined)([1, 2, 3]), false)
		assertEquals(startsWith(undefined)([]), false)
	})

	await t.step("should handle both null inputs", () => {
		assertEquals(startsWith(null)(null), false)
		assertEquals(startsWith(undefined)(undefined), false)
	})

	await t.step("should handle prefix longer than array", () => {
		assertEquals(startsWith([1, 2, 3, 4])([1, 2]), false)
		assertEquals(startsWith(["a", "b", "c"])(["a", "b"]), false)
	})
})

Deno.test("startsWith: special values", async (t) => {
	await t.step("should handle NaN using Object.is (SameValue)", () => {
		assertEquals(startsWith([NaN])([NaN, 1, 2]), true)
		assertEquals(startsWith([NaN, 1])([NaN, 1, 2]), true)
		assertEquals(startsWith([NaN])([1, NaN, 2]), false)
	})

	await t.step("should handle +0 and -0 with Object.is", () => {
		// Object.is distinguishes +0 and -0
		assertEquals(startsWith([0])([0, 1, 2]), true)
		assertEquals(startsWith([-0])([-0, 1, 2]), true)
		assertEquals(startsWith([0])([-0, 1, 2]), false)
		assertEquals(startsWith([-0])([0, 1, 2]), false)
	})

	await t.step("should handle undefined in arrays", () => {
		assertEquals(startsWith([undefined])([undefined, 1, 2]), true)
		assertEquals(startsWith([1, undefined])([1, undefined, 3]), true)
		assertEquals(startsWith([undefined])([null, 1, 2]), false)
	})

	await t.step("should handle null in arrays", () => {
		assertEquals(startsWith([null])([null, 1, 2]), true)
		assertEquals(startsWith([1, null])([1, null, 3]), true)
		assertEquals(startsWith([null])([undefined, 1, 2]), false)
	})

	await t.step("should handle Infinity", () => {
		assertEquals(startsWith([Infinity])([Infinity, 1]), true)
		assertEquals(startsWith([-Infinity])([-Infinity, 1]), true)
		assertEquals(startsWith([Infinity])([-Infinity, 1]), false)
	})
})

Deno.test("startsWith: object references", async (t) => {
	await t.step("should use reference equality for objects", () => {
		const obj1 = { id: 1 }
		const obj2 = { id: 2 }
		const obj1Copy = { id: 1 }

		assertEquals(startsWith([obj1])([obj1, obj2]), true)
		assertEquals(startsWith([obj1, obj2])([obj1, obj2, "more"]), true)
		assertEquals(startsWith([obj1Copy])([obj1, obj2]), false) // Different reference
	})

	await t.step("should handle arrays as elements", () => {
		const arr1 = [1, 2]
		const arr2 = [3, 4]
		const arr1Copy = [1, 2]

		assertEquals(startsWith([arr1])([arr1, arr2]), true)
		assertEquals(startsWith([arr1Copy])([arr1, arr2]), false) // Different reference
	})

	await t.step("should handle functions as elements", () => {
		const fn1 = () => 1
		const fn2 = () => 2
		const fn1Ref = fn1

		assertEquals(startsWith([fn1])([fn1, fn2]), true)
		assertEquals(startsWith([fn1Ref])([fn1, fn2]), true) // Same reference
		assertEquals(startsWith([fn2])([fn1, fn2]), false)
	})
})

Deno.test("startsWith: type safety", async (t) => {
	await t.step("should maintain boolean return type", () => {
		const result = startsWith([1, 2])([1, 2, 3])
		assertType<IsExact<typeof result, boolean>>(true)
		assertEquals(result, true)
	})

	await t.step("should work with mixed types", () => {
		const mixed = [1, "two", true, null] as const
		const result = startsWith([1, "two"])(mixed as unknown as Array<unknown>)
		assertType<IsExact<typeof result, boolean>>(true)
		assertEquals(result, true)
	})

	await t.step("should work with complex types", () => {
		interface User {
			id: number
			name: string
		}
		const users: User[] = [
			{ id: 1, name: "Alice" },
			{ id: 2, name: "Bob" },
		]
		const prefix: User[] = [{ id: 1, name: "Alice" }]

		const result = startsWith(prefix)(users)
		assertType<IsExact<typeof result, boolean>>(true)
		// Will be false due to reference inequality
		assertEquals(result, false)
	})
})

Deno.test("startsWith: currying", async (t) => {
	await t.step("should be properly curried", () => {
		const startsWithApi = startsWith(["api"])

		assertEquals(startsWithApi(["api", "users"]), true)
		assertEquals(startsWithApi(["api", "posts"]), true)
		assertEquals(startsWithApi(["web", "users"]), false)
	})

	await t.step("should allow partial application for pattern matching", () => {
		const isGitCommand = startsWith(["git"])
		const isGitCommit = startsWith(["git", "commit"])
		const isGitPush = startsWith(["git", "push"])

		const command = ["git", "commit", "-m", "message"]

		assertEquals(isGitCommand(command), true)
		assertEquals(isGitCommit(command), true)
		assertEquals(isGitPush(command), false)
	})
})

Deno.test("startsWith: immutability", async (t) => {
	await t.step("should not modify the input arrays", () => {
		const prefix = [1, 2]
		const array = [1, 2, 3, 4]
		const prefixCopy = [...prefix]
		const arrayCopy = [...array]

		startsWith(prefix)(array)

		assertEquals(prefix, prefixCopy)
		assertEquals(array, arrayCopy)
	})
})

Deno.test("startsWith: practical examples", async (t) => {
	await t.step("should check API versioning", () => {
		const isApiV2 = startsWith(["api", "v2"])

		assertEquals(isApiV2(["api", "v2", "users"]), true)
		assertEquals(isApiV2(["api", "v2", "posts", "123"]), true)
		assertEquals(isApiV2(["api", "v1", "users"]), false)
		assertEquals(isApiV2(["web", "users"]), false)
	})

	await t.step("should validate command patterns", () => {
		const isDockerCommand = startsWith(["docker"])
		const isDockerRun = startsWith(["docker", "run"])

		assertEquals(isDockerCommand(["docker", "run", "nginx"]), true)
		assertEquals(isDockerCommand(["docker", "ps", "-a"]), true)
		assertEquals(isDockerRun(["docker", "run", "nginx"]), true)
		assertEquals(isDockerRun(["docker", "ps"]), false)
		assertEquals(isDockerCommand(["kubectl", "get", "pods"]), false)
	})

	await t.step("should check file paths", () => {
		const isInSrcFolder = startsWith(["src"])
		const isInTestFolder = startsWith(["tests"])

		const path1 = ["src", "components", "Button.tsx"]
		const path2 = ["tests", "unit", "Button.test.tsx"]
		const path3 = ["dist", "bundle.js"]

		assertEquals(isInSrcFolder(path1), true)
		assertEquals(isInSrcFolder(path2), false)
		assertEquals(isInTestFolder(path2), true)
		assertEquals(isInTestFolder(path3), false)
	})

	await t.step("should validate protocol sequences", () => {
		const httpGet = startsWith(["GET", "HTTP/1.1"])
		const httpPost = startsWith(["POST", "HTTP/1.1"])

		assertEquals(httpGet(["GET", "HTTP/1.1", "Host:", "example.com"]), true)
		assertEquals(httpPost(["POST", "HTTP/1.1", "Content-Type:", "json"]), true)
		assertEquals(httpGet(["POST", "HTTP/1.1", "Host:", "example.com"]), false)
	})
})

Deno.test("startsWith: property-based tests", async (t) => {
	await t.step("should return true when prefix is empty", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				(arr) => {
					return startsWith([])(arr) === true
				},
			),
		)
	})

	await t.step("should return true when array equals prefix", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				(arr) => {
					return startsWith(arr)(arr) === true
				},
			),
		)
	})

	await t.step("should return false when prefix is longer than array", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer(), { minLength: 0, maxLength: 10 }),
				fc.array(fc.integer(), { minLength: 11, maxLength: 20 }),
				(shortArr, longPrefix) => {
					if (longPrefix.length > shortArr.length) {
						return startsWith(longPrefix)(shortArr) === false
					}
					return true
				},
			),
		)
	})

	await t.step("should handle null/undefined consistently", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				(arr) => {
					const nullArray = startsWith(arr)(null)
					const undefinedArray = startsWith(arr)(undefined)
					const nullPrefix = startsWith(null)(arr)
					const undefinedPrefix = startsWith(undefined)(arr)

					return nullArray === false &&
						undefinedArray === false &&
						nullPrefix === false &&
						undefinedPrefix === false
				},
			),
		)
	})

	await t.step("should be consistent with slice comparison", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.nat(10),
				(arr, prefixLength) => {
					const length = Math.min(prefixLength, arr.length)
					const prefix = arr.slice(0, length)
					return startsWith(prefix)(arr) === true
				},
			),
		)
	})

	await t.step("should handle concatenation correctly", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.array(fc.integer()),
				(prefix, suffix) => {
					const combined = [...prefix, ...suffix]
					return startsWith(prefix)(combined) === true
				},
			),
		)
	})
})

Deno.test("startsWith: specific test cases from examples", async (t) => {
	await t.step("should handle basic usage", () => {
		assertEquals(startsWith([1, 2])([1, 2, 3, 4, 5]), true)
		assertEquals(startsWith([1, 3])([1, 2, 3, 4]), false)
	})

	await t.step("should handle empty prefix", () => {
		assertEquals(startsWith([])([1, 2, 3]), true)
		assertEquals(startsWith([])([]), true)
	})

	await t.step("should work with partial application", () => {
		const isApiV2 = startsWith(["api", "v2"])
		assertEquals(isApiV2(["api", "v2", "users"]), true)
		assertEquals(isApiV2(["api", "v1", "users"]), false)
	})

	await t.step("should handle command pattern matching", () => {
		const command = ["git", "commit", "-m", "message"]
		assertEquals(startsWith(["git", "commit"])(command), true)
		assertEquals(startsWith(["git", "push"])(command), false)
	})

	await t.step("should handle NaN with Object.is", () => {
		assertEquals(startsWith([NaN])([NaN, 1, 2]), true)
	})

	await t.step("should handle null/undefined inputs", () => {
		assertEquals(startsWith([1, 2])(null), false)
		assertEquals(startsWith(null)([1, 2]), false)
	})

	await t.step("should handle object reference equality", () => {
		const obj = { id: 1 }
		assertEquals(startsWith([obj])([obj, { id: 2 }]), true)
		assertEquals(startsWith([{ id: 1 }])([{ id: 1 }]), false)
	})
})
