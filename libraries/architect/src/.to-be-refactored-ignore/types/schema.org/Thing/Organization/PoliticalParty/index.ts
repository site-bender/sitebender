import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export type PoliticalPartyType = "PoliticalParty"

export interface PoliticalPartyProps {
	"@type"?: PoliticalPartyType
}

type PoliticalParty = Thing & OrganizationProps & PoliticalPartyProps

export default PoliticalParty
