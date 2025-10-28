import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type CrematoriumType = "Crematorium"

export interface CrematoriumProps {
	"@type"?: CrematoriumType
}

type Crematorium = Thing & PlaceProps & CivicStructureProps & CrematoriumProps

export default Crematorium
