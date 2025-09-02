import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type CemeteryType = "Cemetery"

export interface CemeteryProps {
	"@type"?: CemeteryType
}

type Cemetery = Thing & PlaceProps & CivicStructureProps & CemeteryProps

export default Cemetery
