import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

import ReservoirComponent from "../../../../../../../components/Thing/Place/Landform/BodyOfWater/Reservoir/index.tsx"

export interface ReservoirProps {
}

type Reservoir =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& ReservoirProps

export default Reservoir
