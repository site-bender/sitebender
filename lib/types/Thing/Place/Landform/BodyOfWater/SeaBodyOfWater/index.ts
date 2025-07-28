import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

export interface SeaBodyOfWaterProps {}

type SeaBodyOfWater =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& SeaBodyOfWaterProps

export default SeaBodyOfWater
