// PerformingArtsTheater extends CivicStructure but adds no additional properties
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface PerformingArtsTheaterProps {}

type PerformingArtsTheater =
	& Thing
	& CivicStructureProps
	& PlaceProps
	& PerformingArtsTheaterProps

export default PerformingArtsTheater
