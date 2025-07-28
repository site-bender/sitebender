import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

import CourthouseComponent from "../../../../../../../components/Thing/Place/CivicStructure/GovernmentBuilding/Courthouse/index.tsx"

export interface CourthouseProps {
}

type Courthouse =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps
	& CourthouseProps

export default Courthouse
