import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

export type TaxiServiceType = "TaxiService"

export interface TaxiServiceProps {
	"@type"?: TaxiServiceType
}

type TaxiService = Thing & IntangibleProps & ServiceProps & TaxiServiceProps

export default TaxiService
