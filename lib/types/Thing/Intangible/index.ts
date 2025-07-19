// Intangible extends Thing but adds no additional properties
import type Thing from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface IntangibleProps {}

type Intangible =
	& Thing
	& IntangibleProps

export default Intangible
