// Mountain extends Landform but adds no additional properties
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MountainProps {}

type Mountain =
	& Thing
	& LandformProps
	& PlaceProps
	& MountainProps

export default Mountain
