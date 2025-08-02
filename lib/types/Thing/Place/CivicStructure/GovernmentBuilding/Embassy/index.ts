import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

export type EmbassyType = "Embassy"

export interface EmbassyProps {
	"@type"?: EmbassyType
}

type Embassy =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps
	& EmbassyProps

export default Embassy
