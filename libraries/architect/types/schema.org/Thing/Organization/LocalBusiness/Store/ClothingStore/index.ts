import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type ClothingStoreType = "ClothingStore"

export interface ClothingStoreProps {
	"@type"?: ClothingStoreType
}

type ClothingStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& ClothingStoreProps

export default ClothingStore
