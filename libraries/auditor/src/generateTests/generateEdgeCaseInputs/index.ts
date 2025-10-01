import type { TypeInfo } from "../../types/index.ts"

import { TypeKind } from "../../types/index.ts"
import generateTestInput from "../generateTestInputs/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateEdgeCaseInputs(type: TypeInfo): Array<unknown> {
	const cases: Array<unknown> = []

	if (type.kind === TypeKind.Primitive) {
		switch (type.raw) {
			case "string":
				cases.push("") // empty string
				cases.push(" ") // whitespace
				cases.push("🎯 Unicode 文字") // unicode
				cases.push("a".repeat(1000)) // long string
				break
			case "number":
				cases.push(0)
				cases.push(-0)
				cases.push(NaN)
				cases.push(Infinity)
				cases.push(-Infinity)
				cases.push(Number.MAX_SAFE_INTEGER)
				cases.push(Number.MIN_SAFE_INTEGER)
				cases.push(0.1 + 0.2) // floating point precision
				break
			case "boolean":
				cases.push(true)
				cases.push(false)
				break
		}
	}

	if (type.kind === TypeKind.Array) {
		cases.push([]) // empty array
		const element = type.elementType ? generateTestInput(type.elementType) : 1
		cases.push([element]) // single element
		cases.push(Array(1000).fill(element)) // large array
	}

	if (type.raw.startsWith("Result<")) {
		cases.push({ ok: true, value: "success" })
		cases.push({ ok: false, error: { message: "error" } })
	}

	// Always include null/undefined for nullable types
	if (
		type.raw.includes("null") || type.raw.includes("undefined") ||
		type.raw.includes("?")
	) {
		cases.push(null)
		cases.push(undefined)
	}

	return cases
}
