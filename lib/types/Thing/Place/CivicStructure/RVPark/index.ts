import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface RVParkProps {
	"@type"?: "RVPark"}

type RVPark = Thing & PlaceProps & CivicStructureProps & RVParkProps

export default RVPark
