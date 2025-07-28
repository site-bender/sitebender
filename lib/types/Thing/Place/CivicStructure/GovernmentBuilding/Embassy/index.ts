import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

import EmbassyComponent from "../../../../../../../components/Thing/Place/CivicStructure/GovernmentBuilding/Embassy/index.tsx"

export interface EmbassyProps {
}

type Embassy =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps
	& EmbassyProps

export default Embassy
