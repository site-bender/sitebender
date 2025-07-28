import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

import CableOrSatelliteServiceComponent from "../../../../../../components/Thing/Intangible/Service/CableOrSatelliteService/index.tsx"

export interface CableOrSatelliteServiceProps {
}

type CableOrSatelliteService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& CableOrSatelliteServiceProps

export default CableOrSatelliteService
