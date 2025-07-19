// BoatTerminal extends CivicStructure but adds no additional properties
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface BoatTerminalProps {}

type BoatTerminal =
	& Thing
	& CivicStructureProps
	& PlaceProps
	& BoatTerminalProps

export default BoatTerminal
