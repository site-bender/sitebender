import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import TrainStationComponent from "../../../../../../components/Thing/Place/CivicStructure/TrainStation/index.tsx"

export interface TrainStationProps {
}

type TrainStation =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& TrainStationProps

export default TrainStation
