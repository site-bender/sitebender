import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface BusStationProps {}

type BusStation = Thing & PlaceProps & CivicStructureProps & BusStationProps

export default BusStation
