import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

export type TaxiType = "Taxi"

export interface TaxiProps {
	"@type"?: TaxiType
}

type Taxi = Thing & IntangibleProps & ServiceProps & TaxiProps

export default Taxi
