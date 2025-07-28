import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

import OceanBodyOfWaterComponent from "../../../../../../../components/Thing/Place/Landform/BodyOfWater/OceanBodyOfWater/index.tsx"

export interface OceanBodyOfWaterProps {
}

type OceanBodyOfWater =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& OceanBodyOfWaterProps

export default OceanBodyOfWater
