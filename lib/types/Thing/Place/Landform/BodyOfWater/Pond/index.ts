import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

import PondComponent from "../../../../../../../components/Thing/Place/Landform/BodyOfWater/Pond/index.tsx"

export interface PondProps {
}

type Pond =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& PondProps

export default Pond
