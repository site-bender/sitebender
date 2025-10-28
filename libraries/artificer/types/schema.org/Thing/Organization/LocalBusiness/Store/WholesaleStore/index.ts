import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type WholesaleStoreType = "WholesaleStore"

export interface WholesaleStoreProps {
	"@type"?: WholesaleStoreType
}

type WholesaleStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& WholesaleStoreProps

export default WholesaleStore
