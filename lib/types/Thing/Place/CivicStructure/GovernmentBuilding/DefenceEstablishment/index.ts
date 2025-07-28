import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

import DefenceEstablishmentComponent from "../../../../../../../components/Thing/Place/CivicStructure/GovernmentBuilding/DefenceEstablishment/index.tsx"

export interface DefenceEstablishmentProps {
}

type DefenceEstablishment =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps
	& DefenceEstablishmentProps

export default DefenceEstablishment
