import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { AutomotiveBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import AutoBodyShopComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/AutomotiveBusiness/AutoBodyShop/index.tsx"

export interface AutoBodyShopProps {
}

type AutoBodyShop =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& AutomotiveBusinessProps
	& OrganizationProps
	& AutoBodyShopProps

export default AutoBodyShop
