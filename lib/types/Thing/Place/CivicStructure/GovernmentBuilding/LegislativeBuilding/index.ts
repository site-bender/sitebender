import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

export interface LegislativeBuildingProps {
}

type LegislativeBuilding =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps
	& LegislativeBuildingProps

export default LegislativeBuilding
