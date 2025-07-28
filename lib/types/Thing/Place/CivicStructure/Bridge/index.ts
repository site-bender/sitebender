import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import BridgeComponent from "../../../../../../components/Thing/Place/CivicStructure/Bridge/index.tsx"

export interface BridgeProps {
}

type Bridge =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& BridgeProps

export default Bridge
