import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import HomeGoodsStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/HomeGoodsStore/index.tsx"

export interface HomeGoodsStoreProps {
}

type HomeGoodsStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& HomeGoodsStoreProps

export default HomeGoodsStore
