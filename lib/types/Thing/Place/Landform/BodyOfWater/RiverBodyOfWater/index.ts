import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

import RiverBodyOfWaterComponent from "../../../../../../../components/Thing/Place/Landform/BodyOfWater/RiverBodyOfWater/index.tsx"

export interface RiverBodyOfWaterProps {
}

type RiverBodyOfWater =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& RiverBodyOfWaterProps

export default RiverBodyOfWater
