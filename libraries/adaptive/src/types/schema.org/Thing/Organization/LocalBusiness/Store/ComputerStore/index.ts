import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type ComputerStoreType = "ComputerStore"

export interface ComputerStoreProps {
	"@type"?: ComputerStoreType
}

type ComputerStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& ComputerStoreProps

export default ComputerStore
