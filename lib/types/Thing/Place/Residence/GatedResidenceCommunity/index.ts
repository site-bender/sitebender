import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { ResidenceProps } from "../index.ts"

import GatedResidenceCommunityComponent from "../../../../../../components/Thing/Place/Residence/GatedResidenceCommunity/index.tsx"

export interface GatedResidenceCommunityProps {
}

type GatedResidenceCommunity =
	& Thing
	& PlaceProps
	& ResidenceProps
	& GatedResidenceCommunityProps

export default GatedResidenceCommunity
