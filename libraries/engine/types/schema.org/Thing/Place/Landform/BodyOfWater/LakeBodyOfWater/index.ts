import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

export type LakeBodyOfWaterType = "LakeBodyOfWater"

export interface LakeBodyOfWaterProps {
	"@type"?: LakeBodyOfWaterType
}

type LakeBodyOfWater =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& LakeBodyOfWaterProps

export default LakeBodyOfWater
