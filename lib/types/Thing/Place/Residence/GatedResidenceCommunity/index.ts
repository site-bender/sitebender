// GatedResidenceCommunity extends Residence but adds no additional properties
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { ResidenceProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface GatedResidenceCommunityProps {}

type GatedResidenceCommunity =
	& Thing
	& PlaceProps
	& ResidenceProps
	& GatedResidenceCommunityProps

export default GatedResidenceCommunity
