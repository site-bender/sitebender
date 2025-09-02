import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

export type ReservoirType = "Reservoir"

export interface ReservoirProps {
	"@type"?: ReservoirType
}

type Reservoir =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& ReservoirProps

export default Reservoir
