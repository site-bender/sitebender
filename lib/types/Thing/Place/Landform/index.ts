import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"
import type { BodyOfWaterType } from "./BodyOfWater/index.ts"
import type { ContinentType } from "./Continent/index.ts"
import type { MountainType } from "./Mountain/index.ts"
import type { VolcanoType } from "./Volcano/index.ts"

export type LandformType =
	| "Landform"
	| BodyOfWaterType
	| ContinentType
	| MountainType
	| VolcanoType

export interface LandformProps {
	"@type"?: LandformType
}

type Landform = Thing & PlaceProps & LandformProps

export default Landform
