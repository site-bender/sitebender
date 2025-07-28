import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import RealEstateAgentComponent from "../../../../../../components/Thing/Organization/LocalBusiness/RealEstateAgent/index.tsx"

export interface RealEstateAgentProps {
}

type RealEstateAgent =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& RealEstateAgentProps

export default RealEstateAgent
