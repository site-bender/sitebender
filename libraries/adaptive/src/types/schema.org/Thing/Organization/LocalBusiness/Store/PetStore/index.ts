import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type PetStoreType = "PetStore"

export interface PetStoreProps {
	"@type"?: PetStoreType
}

type PetStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& PetStoreProps

export default PetStore
