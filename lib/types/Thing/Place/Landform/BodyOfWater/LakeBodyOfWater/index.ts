import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

import LakeBodyOfWaterComponent from "../../../../../../../components/Thing/Place/Landform/BodyOfWater/LakeBodyOfWater/index.tsx"

export interface LakeBodyOfWaterProps {
}

type LakeBodyOfWater =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& LakeBodyOfWaterProps

export default LakeBodyOfWater
