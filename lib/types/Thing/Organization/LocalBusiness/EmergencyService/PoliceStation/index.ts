// PoliceStation extends EmergencyService but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { EmergencyServiceProps } from "../../../../Place/LocalBusiness/EmergencyService/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface PoliceStationProps {}

type PoliceStation =
	& Thing
	& EmergencyServiceProps
	& LocalBusinessProps
	& PlaceProps
	& PoliceStationProps

export default PoliceStation
