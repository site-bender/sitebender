import type { Value } from "@engineTypes/index.ts"

import Error from "../constructors/Error/index.ts"
import asMonetaryAmount from "./asMonetaryAmount/index.ts"

type FormatterOperation = {
	tag: string
	operand?: unknown
	[k: string]: unknown
}
type FormatterFn = (
	operation: FormatterOperation,
) => (value: Value, localValues?: unknown) => unknown

const format: FormatterFn = (operation) => {
	switch (operation.tag) {
		case "AsMonetaryAmount":
			return asMonetaryAmount(operation as { operand: unknown }) as unknown as (
				value: Value,
			) => unknown
		default:
			return () => ({
				left: [
					Error(String(operation.tag || "Unknown"))("Operation")(
						`Formatter "${operation.tag}" does not exist.`,
					),
				],
			})
	}
}

export default format
