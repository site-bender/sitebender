import type { Value } from "../../../types/index.ts"

import head from "../../array/head/index.ts"
import isDefined from "../../isDefined/index.ts"
import isUndefined from "../../isUndefined/index.ts"
import not from "../../predicates/not/index.ts"

/**
 * Retrieves a nested value from an object path, with a default fallback
 * 
 * @param path - The path to the value (string or array of strings)
 * @param or - The default value to return if path doesn't exist
 * @param source - The object to retrieve from
 * @returns The value at the path or the default
 * @example
 * ```typescript
 * pathOr("a.b.c")("default")({ a: { b: { c: "value" } } }) // "value"
 * pathOr(["a", "x"])("default")({ a: { b: "value" } }) // "default"
 * ```
 */
const pathOr =
	<T extends Value>(path: Array<string> | string) =>
	(or: T) =>
	(source: Record<string, Value>): T | Value => {
		if (isUndefined(source) || not(path) || typeof source !== "object") {
			return or
		}

		const segments = Array.isArray(path) ? path : path.split(".")

		const out = source[head(segments)]

		if (isUndefined(out)) {
			return or
		}

		const [, ...tail] = segments

		if (tail.length && isDefined(out) && typeof out !== "object") {
			return or
		}

		return tail.length ? pathOr(tail)(or)(out) : out
	}

export default pathOr
