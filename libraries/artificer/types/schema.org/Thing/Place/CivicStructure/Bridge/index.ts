import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type BridgeType = "Bridge"

export interface BridgeProps {
	"@type"?: BridgeType
}

type Bridge = Thing & PlaceProps & CivicStructureProps & BridgeProps

export default Bridge
