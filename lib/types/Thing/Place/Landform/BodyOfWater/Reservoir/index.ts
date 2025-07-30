import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

export interface ReservoirProps {
	"@type"?: "Reservoir"}

type Reservoir =
	& Thing
	& PlaceProps
	& LandformProps
	& BodyOfWaterProps
	& ReservoirProps

export default Reservoir
