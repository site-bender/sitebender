import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

export type PondType = "Pond"

export interface PondProps {
	"@type"?: PondType
}

type Pond = Thing & PlaceProps & LandformProps & BodyOfWaterProps & PondProps

export default Pond
