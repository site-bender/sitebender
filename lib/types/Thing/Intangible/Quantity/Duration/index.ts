// Duration extends Quantity but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { QuantityProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface DurationProps {}

type Duration =
	& Thing
	& IntangibleProps
	& QuantityProps
	& DurationProps

export default Duration
