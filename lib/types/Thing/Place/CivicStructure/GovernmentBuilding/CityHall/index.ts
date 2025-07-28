import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

import CityHallComponent from "../../../../../../../components/Thing/Place/CivicStructure/GovernmentBuilding/CityHall/index.tsx"

export interface CityHallProps {
}

type CityHall =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps
	& CityHallProps

export default CityHall
