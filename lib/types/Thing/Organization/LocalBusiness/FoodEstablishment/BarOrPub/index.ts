import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FoodEstablishmentProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import BarOrPubComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/FoodEstablishment/BarOrPub/index.tsx"

export interface BarOrPubProps {
}

type BarOrPub =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FoodEstablishmentProps
	& OrganizationProps
	& BarOrPubProps

export default BarOrPub
