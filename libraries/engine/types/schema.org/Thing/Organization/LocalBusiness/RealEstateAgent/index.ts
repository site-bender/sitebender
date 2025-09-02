import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type RealEstateAgentType = "RealEstateAgent"

export interface RealEstateAgentProps {
	"@type"?: RealEstateAgentType
}

type RealEstateAgent =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& RealEstateAgentProps

export default RealEstateAgent
