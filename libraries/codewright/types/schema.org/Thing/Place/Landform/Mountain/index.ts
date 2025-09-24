import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

export type MountainType = "Mountain"

export interface MountainProps {
	"@type"?: MountainType
}

type Mountain = Thing & PlaceProps & LandformProps & MountainProps

export default Mountain
