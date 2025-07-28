import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

export interface WaterfallProps {}

type Waterfall =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& WaterfallProps

export default Waterfall
