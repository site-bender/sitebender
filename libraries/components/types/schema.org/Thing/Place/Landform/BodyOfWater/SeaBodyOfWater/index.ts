import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

export type SeaBodyOfWaterType = "SeaBodyOfWater"

export interface SeaBodyOfWaterProps {
	"@type"?: SeaBodyOfWaterType
}

type SeaBodyOfWater =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& SeaBodyOfWaterProps

export default SeaBodyOfWater
