import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface GovernmentBuildingProps {
	"@type"?: "GovernmentBuilding"}

type GovernmentBuilding =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps

export default GovernmentBuilding
