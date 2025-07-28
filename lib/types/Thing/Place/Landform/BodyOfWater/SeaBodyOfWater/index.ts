import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

import SeaBodyOfWaterComponent from "../../../../../../../components/Thing/Place/Landform/BodyOfWater/SeaBodyOfWater/index.tsx"

export interface SeaBodyOfWaterProps {
}

type SeaBodyOfWater =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& SeaBodyOfWaterProps

export default SeaBodyOfWater
