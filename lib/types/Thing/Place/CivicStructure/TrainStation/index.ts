import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type TrainStationType = "TrainStation"

export interface TrainStationProps {
	"@type"?: TrainStationType
}

type TrainStation = Thing & PlaceProps & CivicStructureProps & TrainStationProps

export default TrainStation
