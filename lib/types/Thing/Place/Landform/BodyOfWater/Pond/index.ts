// Pond extends BodyOfWater but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface PondProps {}

type Pond =
	& Thing
	& BodyOfWaterProps
	& LandformProps
	& PlaceProps
	& PondProps

export default Pond
