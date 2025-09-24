import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type FurnitureStoreType = "FurnitureStore"

export interface FurnitureStoreProps {
	"@type"?: FurnitureStoreType
}

type FurnitureStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& FurnitureStoreProps

export default FurnitureStore
