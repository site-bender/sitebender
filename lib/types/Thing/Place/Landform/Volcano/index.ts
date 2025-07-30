import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

export interface VolcanoProps {
	"@type"?: "Volcano"}

type Volcano = Thing & PlaceProps & LandformProps & VolcanoProps

export default Volcano
