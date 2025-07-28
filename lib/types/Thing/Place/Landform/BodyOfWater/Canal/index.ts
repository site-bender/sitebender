import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

import CanalComponent from "../../../../../../../components/Thing/Place/Landform/BodyOfWater/Canal/index.tsx"

export interface CanalProps {
}

type Canal =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& CanalProps

export default Canal
