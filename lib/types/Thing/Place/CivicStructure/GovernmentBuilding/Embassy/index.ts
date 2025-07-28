import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

export interface EmbassyProps {}

type Embassy =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps
	& EmbassyProps

export default Embassy
