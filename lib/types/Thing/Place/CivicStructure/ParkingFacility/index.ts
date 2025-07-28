import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import ParkingFacilityComponent from "../../../../../../components/Thing/Place/CivicStructure/ParkingFacility/index.tsx"

export interface ParkingFacilityProps {
}

type ParkingFacility =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& ParkingFacilityProps

export default ParkingFacility
