import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type SubwayStationType = "SubwayStation"

export interface SubwayStationProps {
	"@type"?: SubwayStationType
}

type SubwayStation =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& SubwayStationProps

export default SubwayStation
