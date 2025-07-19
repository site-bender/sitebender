// Landform extends Place but adds no additional properties
import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface LandformProps {}

type Landform =
	& Thing
	& PlaceProps
	& LandformProps

export default Landform
