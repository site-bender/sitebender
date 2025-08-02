import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

export type CityHallType = "CityHall"

export interface CityHallProps {
	"@type"?: CityHallType
}

type CityHall =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps
	& CityHallProps

export default CityHall
