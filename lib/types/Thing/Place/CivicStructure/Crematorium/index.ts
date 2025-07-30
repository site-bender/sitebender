import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface CrematoriumProps {
	"@type"?: "Crematorium"}

type Crematorium = Thing & PlaceProps & CivicStructureProps & CrematoriumProps

export default Crematorium
