import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type ParkType = "Park"

export interface ParkProps {
	"@type"?: ParkType
}

type Park = Thing & PlaceProps & CivicStructureProps & ParkProps

export default Park
