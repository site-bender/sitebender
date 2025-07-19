// Waterfall extends BodyOfWater but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface WaterfallProps {}

type Waterfall =
	& Thing
	& BodyOfWaterProps
	& LandformProps
	& PlaceProps
	& WaterfallProps

export default Waterfall
