import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface ParkingFacilityProps {
	"@type"?: "ParkingFacility"}

type ParkingFacility =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& ParkingFacilityProps

export default ParkingFacility
