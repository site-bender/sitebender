// Taxi extends Service but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface TaxiProps {}

type Taxi =
	& Thing
	& IntangibleProps
	& ServiceProps
	& TaxiProps

export default Taxi
