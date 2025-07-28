import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import PoliticalPartyComponent from "../../../../../components/Thing/Organization/PoliticalParty/index.tsx"

export interface PoliticalPartyProps {
}

type PoliticalParty =
	& Thing
	& OrganizationProps
	& PoliticalPartyProps

export default PoliticalParty
