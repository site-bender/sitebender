// Volcano extends Landform but adds no additional properties
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface VolcanoProps {}

type Volcano =
	& Thing
	& LandformProps
	& PlaceProps
	& VolcanoProps

export default Volcano
