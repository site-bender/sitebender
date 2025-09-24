import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

export type CourthouseType = "Courthouse"

export interface CourthouseProps {
	"@type"?: CourthouseType
}

type Courthouse =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps
	& CourthouseProps

export default Courthouse
