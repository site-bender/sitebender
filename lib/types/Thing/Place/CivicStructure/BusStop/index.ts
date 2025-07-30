import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface BusStopProps {
	"@type"?: "BusStop"}

type BusStop = Thing & PlaceProps & CivicStructureProps & BusStopProps

export default BusStop
