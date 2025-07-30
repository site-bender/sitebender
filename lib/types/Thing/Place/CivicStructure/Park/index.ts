import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface ParkProps {
	"@type"?: "Park"}

type Park = Thing & PlaceProps & CivicStructureProps & ParkProps

export default Park
