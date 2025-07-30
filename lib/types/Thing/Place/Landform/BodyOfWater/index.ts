import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

export interface BodyOfWaterProps {
	"@type"?: "BodyOfWater"}

type BodyOfWater = Thing & PlaceProps & LandformProps & BodyOfWaterProps

export default BodyOfWater
