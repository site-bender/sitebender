import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import PawnShopComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/PawnShop/index.tsx"

export interface PawnShopProps {
}

type PawnShop =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& PawnShopProps

export default PawnShop
