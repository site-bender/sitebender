// GasStation extends AutomotiveBusiness but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { AutomotiveBusinessProps } from "../../../../Place/LocalBusiness/AutomotiveBusiness/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface GasStationProps {}

type GasStation =
	& Thing
	& AutomotiveBusinessProps
	& LocalBusinessProps
	& PlaceProps
	& GasStationProps

export default GasStation
