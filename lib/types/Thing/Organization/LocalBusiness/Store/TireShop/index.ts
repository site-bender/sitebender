import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import TireShopComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/TireShop/index.tsx"

export interface TireShopProps {
}

type TireShop =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& TireShopProps

export default TireShop
