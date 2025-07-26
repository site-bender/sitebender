import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

export interface CableOrSatelliteServiceProps {
}

type CableOrSatelliteService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& CableOrSatelliteServiceProps

export default CableOrSatelliteService
