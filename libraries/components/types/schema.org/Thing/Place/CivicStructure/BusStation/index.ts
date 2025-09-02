import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type BusStationType = "BusStation"

export interface BusStationProps {
	"@type"?: BusStationType
}

type BusStation = Thing & PlaceProps & CivicStructureProps & BusStationProps

export default BusStation
