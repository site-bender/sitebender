import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { ResidenceProps } from "../index.ts"

export type GatedResidenceCommunityType = "GatedResidenceCommunity"

export interface GatedResidenceCommunityProps {
	"@type"?: GatedResidenceCommunityType
}

type GatedResidenceCommunity =
	& Thing
	& PlaceProps
	& ResidenceProps
	& GatedResidenceCommunityProps

export default GatedResidenceCommunity
