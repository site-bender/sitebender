import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

export type CableOrSatelliteServiceType = "CableOrSatelliteService"

export interface CableOrSatelliteServiceProps {
	"@type"?: CableOrSatelliteServiceType
}

type CableOrSatelliteService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& CableOrSatelliteServiceProps

export default CableOrSatelliteService
