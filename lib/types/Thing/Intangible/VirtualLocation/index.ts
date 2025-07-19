// VirtualLocation extends Intangible but adds no additional properties
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface VirtualLocationProps {}

type VirtualLocation =
	& Thing
	& IntangibleProps
	& VirtualLocationProps

export default VirtualLocation
