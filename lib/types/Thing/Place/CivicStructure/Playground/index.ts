// Playground extends CivicStructure but adds no additional properties
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface PlaygroundProps {}

type Playground =
	& Thing
	& CivicStructureProps
	& PlaceProps
	& PlaygroundProps

export default Playground
