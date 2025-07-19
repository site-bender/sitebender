// CityHall extends GovernmentBuilding but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CityHallProps {}

type CityHall =
	& Thing
	& CivicStructureProps
	& GovernmentBuildingProps
	& PlaceProps
	& CityHallProps

export default CityHall
