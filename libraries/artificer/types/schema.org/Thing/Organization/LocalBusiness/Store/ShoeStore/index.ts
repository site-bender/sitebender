import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type ShoeStoreType = "ShoeStore"

export interface ShoeStoreProps {
	"@type"?: ShoeStoreType
}

type ShoeStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& ShoeStoreProps

export default ShoeStore
