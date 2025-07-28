import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { AutomotiveBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import AutoRentalComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/AutomotiveBusiness/AutoRental/index.tsx"

export interface AutoRentalProps {
}

type AutoRental =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& AutomotiveBusinessProps
	& OrganizationProps
	& AutoRentalProps

export default AutoRental
