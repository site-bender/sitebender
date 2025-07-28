import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import SubwayStationComponent from "../../../../../../components/Thing/Place/CivicStructure/SubwayStation/index.tsx"

export interface SubwayStationProps {
}

type SubwayStation =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& SubwayStationProps

export default SubwayStation
