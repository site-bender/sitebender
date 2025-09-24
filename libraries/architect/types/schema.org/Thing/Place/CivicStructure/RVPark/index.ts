import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type RVParkType = "RVPark"

export interface RVParkProps {
	"@type"?: RVParkType
}

type RVPark = Thing & PlaceProps & CivicStructureProps & RVParkProps

export default RVPark
