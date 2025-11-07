import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

export type VolcanoType = "Volcano"

export interface VolcanoProps {
	"@type"?: VolcanoType
}

type Volcano = Thing & PlaceProps & LandformProps & VolcanoProps

export default Volcano
