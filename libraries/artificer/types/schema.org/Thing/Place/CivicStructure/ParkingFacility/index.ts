import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type ParkingFacilityType = "ParkingFacility"

export interface ParkingFacilityProps {
	"@type"?: ParkingFacilityType
}

type ParkingFacility =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& ParkingFacilityProps

export default ParkingFacility
