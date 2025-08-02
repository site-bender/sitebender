import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"
import type { CityHallType } from "./CityHall/index.ts"
import type { CourthouseType } from "./Courthouse/index.ts"
import type { DefenceEstablishmentType } from "./DefenceEstablishment/index.ts"
import type { EmbassyType } from "./Embassy/index.ts"
import type { LegislativeBuildingType } from "./LegislativeBuilding/index.ts"

export type GovernmentBuildingType =
	| "GovernmentBuilding"
	| DefenceEstablishmentType
	| LegislativeBuildingType
	| CourthouseType
	| EmbassyType
	| CityHallType

export interface GovernmentBuildingProps {
	"@type"?: GovernmentBuildingType
}

type GovernmentBuilding =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps

export default GovernmentBuilding
