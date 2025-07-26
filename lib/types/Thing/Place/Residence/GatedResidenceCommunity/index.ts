import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { ResidenceProps } from "../index.ts"

export interface GatedResidenceCommunityProps {
}

type GatedResidenceCommunity =
	& Thing
	& PlaceProps
	& ResidenceProps
	& GatedResidenceCommunityProps

export default GatedResidenceCommunity
