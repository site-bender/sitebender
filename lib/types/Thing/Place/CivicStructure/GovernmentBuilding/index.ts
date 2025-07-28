import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import GovernmentBuildingComponent from "../../../../../../components/Thing/Place/CivicStructure/GovernmentBuilding/index.tsx"

export interface GovernmentBuildingProps {
}

type GovernmentBuilding =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps

export default GovernmentBuilding
