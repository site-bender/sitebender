import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

export type RiverBodyOfWaterType = "RiverBodyOfWater"

export interface RiverBodyOfWaterProps {
	"@type"?: RiverBodyOfWaterType
}

type RiverBodyOfWater =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& RiverBodyOfWaterProps

export default RiverBodyOfWater
