import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

export interface TaxiProps {
	"@type"?: "Taxi"}

type Taxi = Thing & IntangibleProps & ServiceProps & TaxiProps

export default Taxi
