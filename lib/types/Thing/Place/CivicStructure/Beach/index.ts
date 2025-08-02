import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type BeachType = "Beach"

export interface BeachProps {
	"@type"?: BeachType
}

type Beach = Thing & PlaceProps & CivicStructureProps & BeachProps

export default Beach
