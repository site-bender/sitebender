import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { LodgingBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import VacationRentalComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/LodgingBusiness/VacationRental/index.tsx"

export interface VacationRentalProps {
}

type VacationRental =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& LodgingBusinessProps
	& OrganizationProps
	& VacationRentalProps

export default VacationRental
