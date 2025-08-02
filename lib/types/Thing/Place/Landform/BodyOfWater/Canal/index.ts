import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

export type CanalType = "Canal"

export interface CanalProps {
	"@type"?: CanalType
}

type Canal = Thing & PlaceProps & LandformProps & BodyOfWaterProps & CanalProps

export default Canal
