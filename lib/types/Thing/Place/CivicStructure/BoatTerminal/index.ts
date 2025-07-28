import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import BoatTerminalComponent from "../../../../../../components/Thing/Place/CivicStructure/BoatTerminal/index.tsx"

export interface BoatTerminalProps {
}

type BoatTerminal =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& BoatTerminalProps

export default BoatTerminal
