import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type BoatTerminalType = "BoatTerminal"

export interface BoatTerminalProps {
	"@type"?: BoatTerminalType
}

type BoatTerminal = Thing & PlaceProps & CivicStructureProps & BoatTerminalProps

export default BoatTerminal
