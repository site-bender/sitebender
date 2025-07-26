import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface PoliticalPartyProps {
}

type PoliticalParty =
	& Thing
	& OrganizationProps
	& PoliticalPartyProps

export default PoliticalParty
