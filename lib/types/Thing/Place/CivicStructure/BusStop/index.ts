import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import BusStopComponent from "../../../../../../components/Thing/Place/CivicStructure/BusStop/index.tsx"

export interface BusStopProps {
}

type BusStop =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& BusStopProps

export default BusStop
