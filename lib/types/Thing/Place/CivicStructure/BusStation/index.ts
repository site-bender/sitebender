import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import BusStationComponent from "../../../../../../components/Thing/Place/CivicStructure/BusStation/index.tsx"

export interface BusStationProps {
}

type BusStation =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& BusStationProps

export default BusStation
