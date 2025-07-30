import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface BridgeProps {
	"@type"?: "Bridge"}

type Bridge = Thing & PlaceProps & CivicStructureProps & BridgeProps

export default Bridge
