import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"
import type { CanalType } from "./Canal/index.ts"
import type { LakeBodyOfWaterType } from "./LakeBodyOfWater/index.ts"
import type { OceanBodyOfWaterType } from "./OceanBodyOfWater/index.ts"
import type { PondType } from "./Pond/index.ts"
import type { ReservoirType } from "./Reservoir/index.ts"
import type { RiverBodyOfWaterType } from "./RiverBodyOfWater/index.ts"
import type { SeaBodyOfWaterType } from "./SeaBodyOfWater/index.ts"
import type { WaterfallType } from "./Waterfall/index.ts"

export type BodyOfWaterType =
	| "BodyOfWater"
	| PondType
	| ReservoirType
	| WaterfallType
	| LakeBodyOfWaterType
	| CanalType
	| SeaBodyOfWaterType
	| RiverBodyOfWaterType
	| OceanBodyOfWaterType

export interface BodyOfWaterProps {
	"@type"?: BodyOfWaterType
}

type BodyOfWater = Thing & PlaceProps & LandformProps & BodyOfWaterProps

export default BodyOfWater
