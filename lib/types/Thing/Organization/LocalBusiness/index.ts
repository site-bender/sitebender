import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { PlaceProps } from "../../Place/index.ts"
import type { OrganizationProps } from "../index.ts"
import type Organization from "../index.ts"

import LocalBusinessComponent from "../../../../../components/Thing/Organization/LocalBusiness/index.tsx"

export interface LocalBusinessProps {
	branchOf?: Organization
	currenciesAccepted?: Text
	openingHours?: Text
	paymentAccepted?: Text
	priceRange?: Text
}

type LocalBusiness =
	& Thing
	& PlaceProps
	& OrganizationProps
	& LocalBusinessProps

export default LocalBusiness
