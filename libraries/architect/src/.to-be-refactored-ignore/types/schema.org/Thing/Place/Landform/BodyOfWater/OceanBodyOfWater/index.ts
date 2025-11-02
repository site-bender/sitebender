import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

export type OceanBodyOfWaterType = "OceanBodyOfWater"

export interface OceanBodyOfWaterProps {
	"@type"?: OceanBodyOfWaterType
}

type OceanBodyOfWater =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& OceanBodyOfWaterProps

export default OceanBodyOfWater
