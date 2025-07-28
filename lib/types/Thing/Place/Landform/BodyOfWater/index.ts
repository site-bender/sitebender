import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

import BodyOfWaterComponent from "../../../../../../components/Thing/Place/Landform/BodyOfWater/index.tsx"

export interface BodyOfWaterProps {
}

type BodyOfWater =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps

export default BodyOfWater
