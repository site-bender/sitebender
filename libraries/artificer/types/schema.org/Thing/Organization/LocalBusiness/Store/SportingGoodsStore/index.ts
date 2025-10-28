import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type SportingGoodsStoreType = "SportingGoodsStore"

export interface SportingGoodsStoreProps {
	"@type"?: SportingGoodsStoreType
}

type SportingGoodsStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& SportingGoodsStoreProps

export default SportingGoodsStore
