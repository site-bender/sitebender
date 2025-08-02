import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type LiquorStoreType = "LiquorStore"

export interface LiquorStoreProps {
	"@type"?: LiquorStoreType
}

type LiquorStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& LiquorStoreProps

export default LiquorStore
